import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Building2, CalendarDays, Check, CheckCircle2, Compass, Lightbulb, Rocket, Users } from 'lucide-react';
import { commonUniversities, onboardingCopy, type CommunityProfileV2, type ContributionId, type ExperienceId, type GoalId, type ProfileLinkType, type StageId, type StudyFieldId } from '../../content/communityOnboarding';
import { readMockMember, readPreJoinDraft, retryPendingCommunityProfileUpdates, savePreJoinDraft, submitCommunityJoin, trackPrototypeEvent, updateCommunityGoals, updateCommunityProfile, type PrototypeEvent } from '../../lib/communitySignupPrototype';
import type { Lang } from '../../lib/language';

type Screen = 'goals' | 'join' | 'stage' | 'study' | 'studyOther' | 'university' | 'experience' | 'contribution' | 'profileLink' | 'profileLinkInput' | 'summary';
type Variant = 'guided' | 'email-first';
type FlowState = { screen: Screen; goals: GoalId[]; firstName: string; lastName: string; email: string; consent: boolean; profile: CommunityProfileV2; variant: Variant; joinRequestId?: string; memberId?: string; profileUpdateToken?: string; activeLink?: ProfileLinkType; showJoinNotice?: boolean };

const STORAGE_KEY = 'tmp_surgical_community_onboarding_v2';
const GOAL_ICONS = { jobs: BriefcaseBusiness, projects: Lightbulb, startups: Rocket, companies: Building2, events: CalendarDays, community: Users, exploring: Compass } as const;

function getVariant(): Variant { return new URLSearchParams(window.location.search).get('onboarding') === 'email-first' ? 'email-first' : 'guided'; }
function getInitialState(variant: Variant): FlowState {
  const draft = readPreJoinDraft(variant);
  const initial: FlowState = { screen: (draft?.screen as Screen) ?? (variant === 'guided' ? 'goals' : 'join'), goals: draft?.goals ?? [], firstName: '', lastName: '', email: '', consent: false, profile: {}, variant, joinRequestId: draft?.requestId };
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<FlowState> | null;
    if (saved?.variant === variant && saved.memberId && saved.screen) {
      const member = readMockMember(saved.memberId);
      if (member) return { ...initial, ...saved, firstName: member.join.firstName, lastName: member.join.lastName, email: member.join.email, goals: member.join.selectedGoals, profile: member.profile, consent: true, profileUpdateToken: member.profileUpdateToken };
    }
  } catch { /* a fresh local draft is fine */ }
  return initial;
}

export function CommunitySignupFlow({ lang, privacyCopy, onOpenPrivacyNotice, whatsappLink, instagramLink }: {
  lang: Lang; privacyCopy: { start: string; link: string; end: string; note: string }; onOpenPrivacyNotice: () => void; whatsappLink: string; instagramLink: string;
}) {
  const copy = onboardingCopy[lang];
  const variant = useMemo(getVariant, []);
  const [flow, setFlow] = useState<FlowState>(() => getInitialState(variant));
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!flow.memberId) {
      savePreJoinDraft(flow.goals, variant, flow.screen === 'join' ? 'join' : 'goals', flow.joinRequestId);
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(flow));
  }, [flow, variant]);

  useEffect(() => {
    if (flow.memberId && flow.profileUpdateToken) void retryPendingCommunityProfileUpdates(flow.memberId, flow.profileUpdateToken);
  }, [flow.memberId, flow.profileUpdateToken]);

  useEffect(() => {
    trackPrototypeEvent('onboarding_step_view', { step: flow.screen, language: lang });
  }, [flow.screen, lang]);

  function move(screen: Screen) { setError(''); setFlow((current) => ({ ...current, screen, showJoinNotice: false })); }
  function saveProfile(partial: Partial<CommunityProfileV2>, event?: PrototypeEvent, value?: string) {
    setFlow((current) => ({ ...current, profile: { ...current.profile, ...partial } }));
    if (flow.memberId && flow.profileUpdateToken) void updateCommunityProfile(flow.memberId, flow.profileUpdateToken, partial);
    if (event) trackPrototypeEvent(event, { language: lang, ...(value ? { value } : {}) });
  }
  function toggleGoal(id: GoalId) {
    setError('');
    if (!flow.memberId && flow.goals.length === 0) trackPrototypeEvent('onboarding_start', { language: lang, variant });
    let goals = flow.goals;
    if (id === 'exploring') goals = flow.goals.includes(id) ? [] : ['exploring'];
    else {
      const withoutExploring = flow.goals.filter((goal) => goal !== 'exploring');
      goals = withoutExploring.includes(id) ? withoutExploring.filter((goal) => goal !== id) : withoutExploring.length < 3 ? [...withoutExploring, id] : withoutExploring;
    }
    setFlow((current) => ({ ...current, goals }));
    if (flow.memberId && flow.profileUpdateToken) void updateCommunityGoals(flow.memberId, flow.profileUpdateToken, goals);
  }
  function continueGoals() {
    if (!flow.goals.length) { setError(lang === 'de' ? 'Wähle einen Bereich oder „Ich schaue mich erstmal um“.' : 'Choose an area or “Just exploring.”'); return; }
    trackPrototypeEvent('interest_selected', { language: lang, goals: flow.goals.join(',') });
    move(variant === 'guided' && !flow.memberId ? 'join' : 'stage');
  }
  async function handleJoin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('');
    const firstName = flow.firstName.trim(); const lastName = flow.lastName.trim(); const email = flow.email.trim();
    if (!firstName) { setError(copy.firstNameRequired); return; }
    if (!lastName) { setError(copy.lastNameRequired); return; }
    if (!email) { setError(copy.emailRequired); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(copy.emailInvalid); return; }
    if (!flow.consent) { setError(copy.consentRequired); return; }
    const requestId = flow.joinRequestId ?? crypto.randomUUID();
    setFlow((current) => ({ ...current, joinRequestId: requestId }));
    savePreJoinDraft(flow.goals, variant, 'join', requestId);
    setBusy(true);
    try {
      const submission = await submitCommunityJoin({ requestId, firstName, lastName, email, goals: flow.goals, consent: true, language: lang });
      const nextScreen: Screen = variant === 'email-first' ? 'goals' : 'stage';
      setFlow((current) => ({ ...current, firstName: submission.join.firstName, lastName: submission.join.lastName, email: submission.join.email, goals: submission.join.selectedGoals, profile: submission.profile, memberId: submission.join.memberId, profileUpdateToken: submission.profileUpdateToken, joinRequestId: undefined, screen: nextScreen, showJoinNotice: true }));
      trackPrototypeEvent('community_join_success', { language: lang });
      trackPrototypeEvent('community_profile_start', { language: lang });
    } catch { setError(copy.joinError); } finally { setBusy(false); }
  }
  function skip(screen: Screen = flow.screen) {
    trackPrototypeEvent('onboarding_skipped', { step: screen, language: lang });
    const next: Partial<Record<Screen, Screen>> = { goals: 'stage', stage: 'study', study: 'university', studyOther: 'university', university: 'experience', experience: 'contribution', contribution: 'profileLink', profileLink: 'summary', profileLinkInput: 'profileLink' };
    move(next[screen] ?? 'summary');
  }
  function back() {
    const previous: Partial<Record<Screen, Screen>> = {
      join: 'goals', stage: 'goals',
      study: 'stage', studyOther: 'study', university: flow.profile.studyField === 'other' ? 'studyOther' : 'study',
      experience: 'university', contribution: 'experience', profileLink: 'contribution', profileLinkInput: 'profileLink',
    };
    const screen = previous[flow.screen];
    if (screen) move(screen);
    else { window.location.hash = ''; document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' }); }
  }
  function chooseStage(id: StageId) { saveProfile({ status: id }, 'profile_status_saved', id); move('study'); }
  function chooseStudy(id: StudyFieldId) { saveProfile({ studyField: id, studyFieldOther: id === 'other' ? flow.profile.studyFieldOther : '' }, 'profile_background_saved', id); move(id === 'other' ? 'studyOther' : 'university'); }
  function toggleContribution(id: ContributionId) {
    const current = flow.profile.contributionAreas ?? [];
    const contributionAreas = id === 'unsure' ? (current.includes(id) ? [] : [id]) : current.includes(id) ? current.filter((item) => item !== id && item !== 'unsure') : current.filter((item) => item !== 'unsure').length < 2 ? [...current.filter((item) => item !== 'unsure'), id] : current;
    saveProfile({ contributionAreas });
  }
  function selectLink(type: ProfileLinkType) { setFlow((current) => ({ ...current, activeLink: type, screen: 'profileLinkInput' })); }
  function changeProfileLink(value: string) {
    const type = flow.activeLink;
    if (!type) return;
    setFlow((current) => ({ ...current, profile: { ...current.profile, profileLinks: { ...current.profile.profileLinks, [type]: value } } }));
  }
  function saveLink() {
    if (!flow.activeLink) { move('summary'); return; }
    const value = flow.profile.profileLinks?.[flow.activeLink]?.trim();
    if (!value || !/^https?:\/\//i.test(value)) { setError(copy.invalidUrl); return; }
    saveProfile({ profileLinks: { ...flow.profile.profileLinks, [flow.activeLink]: value } }, 'profile_link_saved', flow.activeLink);
    move('profileLink');
  }
  function resetFlow() { sessionStorage.removeItem(STORAGE_KEY); sessionStorage.removeItem('tmp_community_onboarding_prejoin'); setFlow(getInitialState(variant)); window.location.hash = ''; document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' }); }

  const selectedGoalTitles = flow.goals.filter((id) => id !== 'exploring').map((id) => copy.goals.find((goal) => goal.id === id)?.title).filter((value): value is string => Boolean(value));
  const profileTitles = [
    flow.profile.status && copy.stages.find((item) => item.id === flow.profile.status)?.title,
    flow.profile.studyField && copy.studyFields.find(([id]) => id === flow.profile.studyField)?.[1],
    flow.profile.studyFieldOther, flow.profile.university,
    flow.profile.experienceLevel && copy.experience.find((item) => item.id === flow.profile.experienceLevel)?.title,
    ...(flow.profile.contributionAreas ?? []).map((id) => copy.contributions.find(([key]) => key === id)?.[1]),
    ...Object.keys(flow.profile.profileLinks ?? {}).map((id) => copy.linkTypes.find(([type]) => type === id)?.[1] ?? id),
  ].filter((value): value is string => Boolean(value));

  return <div className="form-card tmp-onboarding-card" aria-live="polite">
    {flow.showJoinNotice && <div className="tmp-onboarding-success-note"><CheckCircle2 aria-hidden="true" /><span>{copy.joinedNotice}</span></div>}
    {flow.screen === 'goals' && <>
      <div className="tmp-onboarding-heading"><p className="section-eyebrow">{copy.questionEyebrow}</p><h3>{copy.goalsTitle}</h3><p>{copy.goalsText}</p></div>
      <div className="tmp-onboarding-options tmp-goals-grid">{copy.goals.map((goal) => { const Icon = GOAL_ICONS[goal.id]; const selected = flow.goals.includes(goal.id); return <button type="button" key={goal.id} className={`tmp-onboarding-option${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => toggleGoal(goal.id)}><Icon aria-hidden="true" /><span><strong>{goal.title}</strong><small>{goal.description}</small></span><span className="tmp-onboarding-check">{selected && <Check size={15} aria-hidden="true" />}</span></button>; })}</div>
      {error && <p className="tmp-onboarding-error" role="alert">{error}</p>}
      <div className="tmp-onboarding-actions">{variant === 'email-first' && !flow.memberId && <button type="button" className="tmp-onboarding-back" onClick={() => skip('goals')}>{copy.skip}</button>}<button className="button button-primary" type="button" onClick={continueGoals}>{copy.continue}<ArrowRight aria-hidden="true" /></button><span className="tmp-onboarding-hint">{copy.selected.replace('{count}', String(flow.goals.length))}</span></div>
    </>}

    {flow.screen === 'join' && <>
      <div className="tmp-onboarding-heading"><p className="section-eyebrow">{copy.joinEyebrow}</p><h3>{copy.joinTitle}</h3><p>{copy.joinText}</p></div>
      <form className="tmp-onboarding-form" onSubmit={handleJoin} noValidate>
        <div className="tmp-community-name-fields">
          <div><label htmlFor="tmp-community-first-name">{copy.firstNameLabel}</label><input id="tmp-community-first-name" type="text" autoComplete="given-name" required value={flow.firstName} placeholder={copy.firstNamePlaceholder} aria-describedby={error ? 'tmp-join-error' : undefined} onChange={(event) => setFlow((current) => ({ ...current, firstName: event.target.value }))} /></div>
          <div><label htmlFor="tmp-community-last-name">{copy.lastNameLabel}</label><input id="tmp-community-last-name" type="text" autoComplete="family-name" required value={flow.lastName} placeholder={copy.lastNamePlaceholder} aria-describedby={error ? 'tmp-join-error' : undefined} onChange={(event) => setFlow((current) => ({ ...current, lastName: event.target.value }))} /></div>
        </div>
        <div><label htmlFor="tmp-community-email">{copy.emailLabel}</label><input id="tmp-community-email" type="email" autoComplete="email" inputMode="email" required value={flow.email} placeholder={copy.emailPlaceholder} aria-describedby={error ? 'tmp-join-error' : 'tmp-privacy-copy'} onChange={(event) => setFlow((current) => ({ ...current, email: event.target.value }))} /></div>
        <div className="tmp-onboarding-consent"><input id="tmp-community-consent" type="checkbox" required aria-label={copy.consentAccessibleLabel} checked={flow.consent} onChange={(event) => setFlow((current) => ({ ...current, consent: event.target.checked }))} /><span><label htmlFor="tmp-community-consent">{privacyCopy.start}</label><button type="button" className="privacy-link-button" onClick={onOpenPrivacyNotice}>{privacyCopy.link}</button>{privacyCopy.end}</span></div>
        <p id="tmp-privacy-copy" className="tmp-onboarding-privacy">{privacyCopy.note}</p>{error && <p className="tmp-onboarding-error" id="tmp-join-error" role="alert">{error}</p>}
        <button type="submit" className="button button-primary tmp-onboarding-submit" disabled={busy}>{busy ? copy.joinSubmitting : copy.joinSubmit}<ArrowRight aria-hidden="true" /></button>
      </form><div className="tmp-onboarding-actions"><button type="button" className="tmp-onboarding-back" onClick={back}><ArrowLeft aria-hidden="true" />{copy.back}</button><span className="tmp-onboarding-hint">{copy.freeNote}</span></div>
    </>}

    {flow.screen === 'stage' && <OptionalStep copy={copy.optional} backLabel={copy.back} skipLabel={copy.skip} title={copy.stageTitle} description={copy.stageText} onBack={back} onSkip={() => skip('stage')}><div className="tmp-onboarding-options">{copy.stages.map((item) => <Option key={item.id} selected={flow.profile.status === item.id} title={item.title} onClick={() => chooseStage(item.id)} />)}</div></OptionalStep>}

    {flow.screen === 'study' && <OptionalStep copy={copy.optional} backLabel={copy.back} skipLabel={copy.skip} title={copy.studyTitle} description={copy.studyText} onBack={back} onSkip={() => skip('study')}><div className="tmp-onboarding-options">{copy.studyFields.map(([id, title]) => <Option key={id} selected={flow.profile.studyField === id} title={title} onClick={() => chooseStudy(id)} />)}</div></OptionalStep>}

    {flow.screen === 'studyOther' && <OptionalStep copy={copy.optional} backLabel={copy.back} skipLabel={copy.skip} title={copy.otherStudyTitle} description={copy.otherStudyText} onBack={back} onSkip={() => skip('studyOther')} showActions={false}><div className="tmp-onboarding-form"><label htmlFor="tmp-study-other">{copy.otherStudyLabel}</label><input id="tmp-study-other" value={flow.profile.studyFieldOther ?? ''} onChange={(event) => setFlow((current) => ({ ...current, profile: { ...current.profile, studyFieldOther: event.target.value } }))} placeholder={copy.otherStudyPlaceholder} /></div><StepActions backLabel={copy.back} skipLabel={copy.skip} continueLabel={copy.continue} onBack={back} onSkip={() => skip('studyOther')} onContinue={() => { saveProfile({ studyFieldOther: flow.profile.studyFieldOther }); move('university'); }} /></OptionalStep>}

    {flow.screen === 'university' && <OptionalStep copy={copy.optional} backLabel={copy.back} skipLabel={copy.skip} title={['bachelor', 'master', 'research'].includes(flow.profile.status ?? '') ? copy.universityStudentTitle : copy.universityOtherTitle} description={copy.universityText} onBack={back} onSkip={() => skip('university')} showActions={false}><div className="tmp-onboarding-form"><label htmlFor="tmp-community-university">{copy.universityLabel}</label><input id="tmp-community-university" list="tmp-community-university-options" autoComplete="organization" placeholder={copy.universityPlaceholder} value={flow.profile.university ?? ''} onChange={(event) => setFlow((current) => ({ ...current, profile: { ...current.profile, university: event.target.value } }))} /><datalist id="tmp-community-university-options">{commonUniversities.map((name) => <option value={name} key={name} />)}</datalist><p className="tmp-onboarding-privacy">{copy.universityHint}</p></div><StepActions backLabel={copy.back} skipLabel={copy.skip} continueLabel={copy.continue} onBack={back} onSkip={() => skip('university')} onContinue={() => { saveProfile({ university: flow.profile.university }, 'profile_university_saved', flow.profile.university ? 'provided' : 'skipped'); move('experience'); }} /></OptionalStep>}

    {flow.screen === 'experience' && <OptionalStep copy={copy.optional} backLabel={copy.back} skipLabel={copy.skip} title={copy.experienceTitle} description={copy.experienceText} onBack={back} onSkip={() => skip('experience')}><div className="tmp-onboarding-experience">{copy.experience.map((item, index) => <button type="button" className={`tmp-onboarding-option tmp-experience-option${flow.profile.experienceLevel === item.id ? ' is-selected' : ''}`} key={item.id} aria-pressed={flow.profile.experienceLevel === item.id} onClick={() => { saveProfile({ experienceLevel: item.id as ExperienceId }, 'profile_experience_saved', item.id); move('contribution'); }}><span className="tmp-onboarding-level">{index + 1}</span><strong>{item.title}</strong><span className="tmp-onboarding-check">{flow.profile.experienceLevel === item.id && <Check size={15} aria-hidden="true" />}</span></button>)}</div></OptionalStep>}

    {flow.screen === 'contribution' && <OptionalStep copy={copy.optional} backLabel={copy.back} skipLabel={copy.skip} title={copy.contributionTitle} description={copy.contributionText} onBack={back} onSkip={() => skip('contribution')} showActions={false}><div className="tmp-onboarding-options">{copy.contributions.map(([id, title]) => <button type="button" className={`tmp-onboarding-option tmp-simple-option${(flow.profile.contributionAreas ?? []).includes(id) ? ' is-selected' : ''}`} key={id} aria-pressed={(flow.profile.contributionAreas ?? []).includes(id)} onClick={() => toggleContribution(id)}><strong>{title}</strong><span className="tmp-onboarding-check">{(flow.profile.contributionAreas ?? []).includes(id) && <Check size={15} aria-hidden="true" />}</span></button>)}</div><p className="tmp-onboarding-hint">{copy.contributionLimit}</p><StepActions backLabel={copy.back} skipLabel={copy.skip} continueLabel={copy.continue} onBack={back} onSkip={() => skip('contribution')} onContinue={() => { trackPrototypeEvent('profile_contribution_saved', { language: lang, areas: (flow.profile.contributionAreas ?? []).join(',') }); move('profileLink'); }} /></OptionalStep>}

    {flow.screen === 'profileLink' && <OptionalStep copy={copy.optional} backLabel={copy.back} skipLabel={copy.skip} title={copy.linkTitle} description={copy.linkText} onBack={back} onSkip={() => skip('profileLink')}><div className="tmp-onboarding-options">{copy.linkTypes.map(([id, title]) => <Option key={id} selected={Boolean(flow.profile.profileLinks?.[id])} title={title} onClick={() => selectLink(id)} />)}</div></OptionalStep>}

    {flow.screen === 'profileLinkInput' && flow.activeLink && <OptionalStep copy={copy.optional} backLabel={copy.back} skipLabel={copy.skip} title={copy.linkTypes.find(([id]) => id === flow.activeLink)?.[1] ?? copy.linkTitle} description={copy.linkText} onBack={back} onSkip={() => skip('profileLinkInput')} showActions={false}><div className="tmp-onboarding-form"><label htmlFor="tmp-profile-link">{copy.linkLabel}</label><input id="tmp-profile-link" type="url" inputMode="url" autoComplete="url" placeholder={copy.linkPlaceholder} value={flow.profile.profileLinks?.[flow.activeLink] ?? ''} onChange={(event) => changeProfileLink(event.target.value)} />{error && <p className="tmp-onboarding-error" role="alert">{error}</p>}</div><StepActions backLabel={copy.back} skipLabel={copy.skip} continueLabel={copy.saveContinue} onBack={back} onSkip={() => skip('profileLinkInput')} onContinue={saveLink} /></OptionalStep>}

    {flow.screen === 'summary' && <div className="tmp-onboarding-summary"><p className="section-eyebrow">{copy.summaryEyebrow}</p><h3>{copy.summaryTitle}</h3><p>{copy.summaryText}</p><SummaryTags title={copy.summaryGoals} tags={selectedGoalTitles} empty={copy.summaryEmpty} />{profileTitles.length > 0 && <SummaryTags title={copy.summaryProfile} tags={profileTitles} />}<div className="tmp-onboarding-success-note"><CheckCircle2 aria-hidden="true" /><span><strong>{copy.finalEmailTitle}</strong><br />{copy.finalEmailText}</span></div><div className="tmp-onboarding-summary-actions"><p>{copy.finalInstagramText}</p><a className="button button-primary" href={whatsappLink} target="_blank" rel="noopener noreferrer">{copy.finalCta}<ArrowRight aria-hidden="true" /></a><a className="tmp-onboarding-external" href={instagramLink} target="_blank" rel="noopener noreferrer">{copy.finalSecondary}<ArrowRight aria-hidden="true" /></a></div><button type="button" className="tmp-onboarding-back" onClick={() => { trackPrototypeEvent('onboarding_finished', { language: lang }); resetFlow(); }}>{copy.finalRestart}</button></div>}
  </div>;
}

function Option({ selected, title, onClick }: { selected: boolean; title: string; onClick: () => void }) { return <button type="button" className={`tmp-onboarding-option tmp-simple-option${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={onClick}><strong>{title}</strong><span className="tmp-onboarding-check">{selected && <Check size={15} aria-hidden="true" />}</span></button>; }
function OptionalStep({ copy, backLabel, skipLabel, showActions = true, title, description, children, onBack, onSkip }: { copy: string; backLabel: string; skipLabel: string; showActions?: boolean; title: string; description: string; children: ReactNode; onBack: () => void; onSkip: () => void }) { return <div className="tmp-onboarding-step"><div className="tmp-onboarding-heading"><p className="section-eyebrow">{copy}</p><h3>{title}</h3><p>{description}</p></div>{children}{showActions && <div className="tmp-onboarding-actions"><button type="button" className="tmp-onboarding-back" onClick={onBack}><ArrowLeft aria-hidden="true" />{backLabel}</button><button type="button" className="tmp-onboarding-back" onClick={onSkip}>{skipLabel}</button></div>}</div>; }
function StepActions({ backLabel, skipLabel, continueLabel, onBack, onSkip, onContinue }: { backLabel: string; skipLabel: string; continueLabel: string; onBack: () => void; onSkip: () => void; onContinue: () => void }) { return <div className="tmp-onboarding-actions"><button type="button" className="tmp-onboarding-back" onClick={onBack}><ArrowLeft aria-hidden="true" />{backLabel}</button><button type="button" className="tmp-onboarding-back" onClick={onSkip}>{skipLabel}</button><button type="button" className="button button-primary" onClick={onContinue}>{continueLabel}<ArrowRight aria-hidden="true" /></button></div>; }
function SummaryTags({ title, tags, empty }: { title: string; tags: string[]; empty?: string }) { return <div className="tmp-onboarding-summary-group"><strong>{title}</strong><div className="tmp-onboarding-tags">{tags.length ? tags.map((tag) => <span key={tag}>{tag}</span>) : empty && <span>{empty}</span>}</div></div>; }
