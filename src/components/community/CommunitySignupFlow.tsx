import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Building2, CalendarDays, Check, CheckCircle2, Compass, Lightbulb, Rocket, Sparkles, Users } from 'lucide-react';
import { commonUniversities, onboardingCopy, type CommunityProfileV2, type ExperienceId, type FieldId, type GoalId, type StageId } from '../../content/communityOnboarding';
import { saveLocalGoals, saveLocalProfile, submitCommunityJoin, trackPrototypeEvent } from '../../lib/communitySignupPrototype';
import type { Lang } from '../../lib/language';

type Screen = 'goals' | 'join' | 'success' | 'stage' | 'fields' | 'experience' | 'university' | 'summary';
type Variant = 'guided' | 'email-first';
type FlowState = {
  screen: Screen;
  goals: GoalId[];
  firstName: string;
  email: string;
  consent: boolean;
  profile: CommunityProfileV2;
  variant: Variant;
};

const STORAGE_KEY = 'tmp_surgical_community_onboarding_v2';
const GOAL_ICONS = {
  jobs: BriefcaseBusiness,
  projects: Lightbulb,
  startups: Rocket,
  companies: Building2,
  events: CalendarDays,
  community: Users,
  exploring: Compass,
} as const;

function getVariant(): Variant {
  return new URLSearchParams(window.location.search).get('onboarding') === 'email-first' ? 'email-first' : 'guided';
}

function getInitialState(variant: Variant): FlowState {
  const defaultState: FlowState = {
    screen: variant === 'guided' ? 'goals' : 'join', goals: [], firstName: '', email: '', consent: false, profile: {}, variant,
  };
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState;
    const candidate = JSON.parse(saved) as Partial<FlowState>;
    const screens: Screen[] = ['goals', 'join', 'success', 'stage', 'fields', 'experience', 'university', 'summary'];
    if (candidate.variant !== variant || !candidate.screen || !screens.includes(candidate.screen)) return defaultState;
    return { ...defaultState, ...candidate, variant } as FlowState;
  } catch {
    return defaultState;
  }
}

export function CommunitySignupFlow({
  lang,
  privacyCopy,
  onOpenPrivacyNotice,
  whatsappLink,
  instagramLink,
}: {
  lang: Lang;
  privacyCopy: { start: string; link: string; end: string; note: string };
  onOpenPrivacyNotice: () => void;
  whatsappLink: string;
  instagramLink: string;
}) {
  const copy = onboardingCopy[lang];
  const variant = useMemo(getVariant, []);
  const [flow, setFlow] = useState<FlowState>(() => getInitialState(variant));
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(flow));
  }, [flow]);

  useEffect(() => {
    if (flow.screen !== 'summary' && flow.screen !== 'success') {
      trackPrototypeEvent('onboarding_step_view', { step: flow.screen, language: lang });
    }
  }, [flow.screen, lang]);

  function move(screen: Screen) {
    setError('');
    setFlow((current) => ({ ...current, screen }));
  }

  function updateProfile(profile: CommunityProfileV2) {
    setFlow((current) => ({ ...current, profile }));
    saveLocalProfile(flow.email, profile);
  }

  function toggleGoal(id: GoalId) {
    setError('');
    setFlow((current) => {
      if (id === 'exploring') return { ...current, goals: current.goals.includes(id) ? [] : ['exploring'] };
      const withoutExploring = current.goals.filter((goal) => goal !== 'exploring');
      if (withoutExploring.includes(id)) return { ...current, goals: withoutExploring.filter((goal) => goal !== id) };
      return withoutExploring.length < 3 ? { ...current, goals: [...withoutExploring, id] } : current;
    });
  }

  function continueGoals() {
    if (!flow.goals.length) {
      setError(lang === 'de' ? 'Wähle einen Bereich oder „Ich schaue mich erstmal um“.' : 'Choose an area or “Just exploring.”');
      return;
    }
    if (variant === 'email-first') saveLocalGoals(flow.email, flow.goals);
    trackPrototypeEvent('onboarding_step_complete', { step: 'goals', language: lang, goals: flow.goals.join(',') });
    move(variant === 'guided' ? 'join' : 'stage');
  }

  async function handleJoin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const firstName = flow.firstName.trim();
    if (!firstName) {
      setError(copy.firstNameRequired);
      return;
    }
    const email = flow.email.trim();
    if (!email) {
      setError(copy.emailRequired);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(copy.emailInvalid);
      return;
    }
    if (!flow.consent) {
      setError(copy.consentRequired);
      return;
    }
    setBusy(true);
    try {
      const submission = await submitCommunityJoin({ firstName, email, goals: flow.goals, consent: true, language: lang });
      setFlow((current) => ({ ...current, firstName: submission.join.firstName, email: submission.join.email, goals: submission.join.selectedGoals, screen: 'success' }));
      trackPrototypeEvent('community_join_success', { language: lang });
    } catch {
      setError(copy.joinError);
    } finally {
      setBusy(false);
    }
  }

  function skipToNextOptional(screen = flow.screen) {
    trackPrototypeEvent('community_onboarding_skip', { step: screen, language: lang });
    const next: Record<string, Screen> = {
      success: variant === 'email-first' ? 'goals' : 'stage',
      goals: 'stage', stage: 'fields', fields: 'experience', experience: 'university', university: 'summary',
    };
    move(next[screen] ?? 'summary');
  }

  function goBack() {
    if (flow.screen === 'goals' && variant === 'guided') {
      window.location.hash = '';
      document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (flow.screen === 'join' && variant === 'email-first') {
      window.location.hash = '';
      document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const previous: Partial<Record<Screen, Screen>> = {
      join: 'goals', goals: 'success', stage: variant === 'email-first' ? 'goals' : 'success',
      fields: 'stage', experience: 'fields', university: 'experience',
    };
    const next = previous[flow.screen];
    if (next) move(next);
  }

  function toggleField(id: FieldId) {
    const current = flow.profile.contributionAreas ?? [];
    const contributionAreas = current.includes(id)
      ? current.filter((area) => area !== id)
      : current.length < 2 ? [...current, id] : current;
    updateProfile({ ...flow.profile, contributionAreas });
  }

  function resetFlow() {
    sessionStorage.removeItem(STORAGE_KEY);
    setFlow(getInitialState(variant));
    window.location.hash = '';
    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
  }

  const selectedGoalTitles = flow.goals
    .filter((id) => id !== 'exploring')
    .map((id) => copy.goals.find((goal) => goal.id === id)?.title)
    .filter((title): title is string => Boolean(title));
  const profileTitles = [
    flow.profile.status && copy.stages.find((item) => item.id === flow.profile.status)?.title,
    ...(flow.profile.contributionAreas ?? []).map((id) => copy.fields.find((item) => item.id === id)?.title),
    flow.profile.experienceLevel && copy.experience.find((item) => item.id === flow.profile.experienceLevel)?.title,
    flow.profile.university,
  ].filter((value): value is string => Boolean(value));

  return (
    <div className="form-card tmp-onboarding-card" aria-live="polite">
      {flow.screen === 'goals' && (
        <>
          <div className="tmp-onboarding-heading"><p className="section-eyebrow">{copy.questionEyebrow}</p><h3>{copy.goalsTitle}</h3><p>{copy.goalsText}</p></div>
          <div className="tmp-onboarding-options tmp-goals-grid">
            {copy.goals.map((goal) => {
              const Icon = GOAL_ICONS[goal.id];
              const selected = flow.goals.includes(goal.id);
              return <button type="button" key={goal.id} className={`tmp-onboarding-option${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => toggleGoal(goal.id)}>
                <Icon aria-hidden="true" /><span><strong>{goal.title}</strong><small>{goal.description}</small></span><span className="tmp-onboarding-check">{selected && <Check size={15} aria-hidden="true" />}</span>
              </button>;
            })}
          </div>
          {error && <p className="tmp-onboarding-error" role="alert">{error}</p>}
          <div className="tmp-onboarding-actions">
            {variant === 'email-first' && <button type="button" className="tmp-onboarding-back" onClick={() => skipToNextOptional('goals')}>{copy.skip}</button>}
            <button className="button button-primary" type="button" onClick={continueGoals}>{copy.continue}<ArrowRight aria-hidden="true" /></button>
            <span className="tmp-onboarding-hint">{copy.selected.replace('{count}', String(flow.goals.length))}</span>
          </div>
        </>
      )}

      {flow.screen === 'join' && (
        <>
          <div className="tmp-onboarding-heading"><p className="section-eyebrow">{copy.joinEyebrow}</p><h3>{copy.joinTitle}</h3><p>{copy.joinText}</p></div>
          <form className="tmp-onboarding-form" onSubmit={handleJoin} noValidate>
            <label htmlFor="tmp-community-first-name">{copy.firstNameLabel}</label>
            <input id="tmp-community-first-name" type="text" autoComplete="given-name" required value={flow.firstName} placeholder={copy.firstNamePlaceholder} aria-describedby={error ? 'tmp-join-error' : undefined} onChange={(event) => setFlow((current) => ({ ...current, firstName: event.target.value }))} />
            <label htmlFor="tmp-community-email">{copy.emailLabel}</label>
            <input id="tmp-community-email" type="email" autoComplete="email" inputMode="email" required value={flow.email} placeholder={copy.emailPlaceholder} aria-describedby={error ? 'tmp-join-error' : 'tmp-privacy-copy'} onChange={(event) => setFlow((current) => ({ ...current, email: event.target.value }))} />
            <div className="tmp-onboarding-consent"><input id="tmp-community-consent" type="checkbox" checked={flow.consent} onChange={(event) => setFlow((current) => ({ ...current, consent: event.target.checked }))} /><span><label htmlFor="tmp-community-consent">{privacyCopy.start}</label><button type="button" className="privacy-link-button" onClick={onOpenPrivacyNotice}>{privacyCopy.link}</button>{privacyCopy.end}</span></div>
            <p id="tmp-privacy-copy" className="tmp-onboarding-privacy">{privacyCopy.note}</p>
            {error && <p className="tmp-onboarding-error" id="tmp-join-error" role="alert">{error}</p>}
            <button type="submit" className="button button-primary tmp-onboarding-submit" disabled={busy}>{busy ? copy.joinSubmitting : copy.joinSubmit}<ArrowRight aria-hidden="true" /></button>
          </form>
          <div className="tmp-onboarding-actions"><button type="button" className="tmp-onboarding-back" onClick={goBack}><ArrowLeft aria-hidden="true" />{copy.back}</button><span className="tmp-onboarding-hint">{copy.freeNote}</span></div>
        </>
      )}

      {flow.screen === 'success' && <div className="tmp-onboarding-success">
        <span className="tmp-onboarding-success-icon"><CheckCircle2 aria-hidden="true" /></span><p className="section-eyebrow">{copy.successEyebrow}</p><h3>{copy.successTitle}</h3><p>{copy.successText}</p>
        <div className="tmp-onboarding-success-note"><Sparkles aria-hidden="true" /><span>{copy.successNext}</span></div>
        <button type="button" className="button button-primary" onClick={() => { trackPrototypeEvent('community_profile_start', { language: lang }); move(variant === 'email-first' ? 'goals' : 'stage'); }}>{copy.successCta}<ArrowRight aria-hidden="true" /></button>
        <button type="button" className="tmp-onboarding-back" onClick={() => { trackPrototypeEvent('community_onboarding_skip', { step: 'profile', language: lang }); move('summary'); }}>{copy.successSkip}</button>
      </div>}

      {flow.screen === 'stage' && <OptionalStep copy={copy.optional} backLabel={copy.back} skipLabel={copy.skip} title={copy.stageTitle} description={copy.stageText} onBack={goBack} onSkip={() => skipToNextOptional('stage')}>
        <div className="tmp-onboarding-options">
          {copy.stages.map((stage) => <button type="button" className={`tmp-onboarding-option tmp-simple-option${flow.profile.status === stage.id ? ' is-selected' : ''}`} key={stage.id} aria-pressed={flow.profile.status === stage.id} onClick={() => { updateProfile({ ...flow.profile, status: stage.id as StageId }); trackPrototypeEvent('onboarding_step_complete', { step: 'stage', value: stage.id, language: lang }); move('fields'); }}><strong>{stage.title}</strong><span className="tmp-onboarding-check">{flow.profile.status === stage.id && <Check size={15} aria-hidden="true" />}</span></button>)}
        </div>
      </OptionalStep>}

      {flow.screen === 'fields' && <OptionalStep copy={copy.optional} backLabel={copy.back} skipLabel={copy.skip} showActions={false} title={copy.fieldTitle} description={copy.fieldText} onBack={goBack} onSkip={() => skipToNextOptional('fields')}>
        <div className="tmp-onboarding-options">
          {copy.fields.map((field) => <button type="button" className={`tmp-onboarding-option tmp-simple-option${(flow.profile.contributionAreas ?? []).includes(field.id) ? ' is-selected' : ''}`} key={field.id} aria-pressed={(flow.profile.contributionAreas ?? []).includes(field.id)} onClick={() => toggleField(field.id)}><strong>{field.title}</strong><span className="tmp-onboarding-check">{(flow.profile.contributionAreas ?? []).includes(field.id) && <Check size={15} aria-hidden="true" />}</span></button>)}
        </div>
        <p className="tmp-onboarding-hint">{copy.fieldLimit}</p>
        <div className="tmp-onboarding-actions"><button type="button" className="tmp-onboarding-back" onClick={goBack}><ArrowLeft aria-hidden="true" />{copy.back}</button><button type="button" className="tmp-onboarding-back" onClick={() => skipToNextOptional('fields')}>{copy.skip}</button><button type="button" className="button button-primary" onClick={() => { trackPrototypeEvent('onboarding_step_complete', { step: 'fields', language: lang, areas: (flow.profile.contributionAreas ?? []).join(',') }); move('experience'); }}>{copy.continue}<ArrowRight aria-hidden="true" /></button></div>
      </OptionalStep>}

      {flow.screen === 'experience' && <OptionalStep copy={copy.optional} backLabel={copy.back} skipLabel={copy.skip} title={copy.experienceTitle} description={copy.experienceText} onBack={goBack} onSkip={() => skipToNextOptional('experience')}>
        <div className="tmp-onboarding-experience">
          {copy.experience.map((experience, index) => <button type="button" className={`tmp-onboarding-option tmp-experience-option${flow.profile.experienceLevel === experience.id ? ' is-selected' : ''}`} key={experience.id} aria-pressed={flow.profile.experienceLevel === experience.id} onClick={() => { updateProfile({ ...flow.profile, experienceLevel: experience.id as ExperienceId }); trackPrototypeEvent('onboarding_step_complete', { step: 'experience', value: experience.id, language: lang }); move('university'); }}><span className="tmp-onboarding-level">{index + 1}</span><strong>{experience.title}</strong><span className="tmp-onboarding-check">{flow.profile.experienceLevel === experience.id && <Check size={15} aria-hidden="true" />}</span></button>)}
        </div>
      </OptionalStep>}

      {flow.screen === 'university' && <OptionalStep copy={copy.optional} backLabel={copy.back} skipLabel={copy.skip} showActions={false} title={copy.universityTitle} description={copy.universityText} onBack={goBack} onSkip={() => skipToNextOptional('university')}>
        <div className="tmp-onboarding-form"><label htmlFor="tmp-community-university">{copy.universityLabel}</label><input id="tmp-community-university" list="tmp-community-university-options" autoComplete="organization" placeholder={copy.universityPlaceholder} value={flow.profile.university ?? ''} onChange={(event) => updateProfile({ ...flow.profile, university: event.target.value })} /><datalist id="tmp-community-university-options">{commonUniversities.map((name) => <option value={name} key={name} />)}</datalist><p className="tmp-onboarding-privacy">{copy.universityHint}</p></div>
        <div className="tmp-onboarding-actions"><button type="button" className="tmp-onboarding-back" onClick={goBack}><ArrowLeft aria-hidden="true" />{copy.back}</button><button type="button" className="tmp-onboarding-back" onClick={() => skipToNextOptional('university')}>{copy.skip}</button><button type="button" className="button button-primary" onClick={() => { trackPrototypeEvent('onboarding_step_complete', { step: 'university', language: lang, answered: flow.profile.university ? 'yes' : 'no' }); move('summary'); }}>{copy.continue}<ArrowRight aria-hidden="true" /></button></div>
      </OptionalStep>}

      {flow.screen === 'summary' && <div className="tmp-onboarding-summary"><p className="section-eyebrow">{copy.summaryEyebrow}</p><h3>{copy.summaryTitle}</h3><p>{copy.summaryText}</p><SummaryTags title={copy.summaryGoals} tags={selectedGoalTitles} empty={copy.summaryEmpty} />{profileTitles.length > 0 && <SummaryTags title={copy.summaryProfile} tags={profileTitles} />}<div className="tmp-onboarding-summary-actions"><p>{copy.finalInstagramText}</p><a className="button button-primary" href={whatsappLink} target="_blank" rel="noopener noreferrer">{copy.finalCta}<ArrowRight aria-hidden="true" /></a><a className="tmp-onboarding-external" href={instagramLink} target="_blank" rel="noopener noreferrer">{copy.finalSecondary}<ArrowRight aria-hidden="true" /></a></div><button type="button" className="tmp-onboarding-back" onClick={() => { trackPrototypeEvent('community_profile_complete', { language: lang, profileFields: String(profileTitles.length) }); resetFlow(); }}>{copy.finalRestart}</button></div>}
    </div>
  );
}

function OptionalStep({
  copy, backLabel, skipLabel, showActions = true, title, description, children, onBack, onSkip,
}: { copy: string; backLabel: string; skipLabel: string; showActions?: boolean; title: string; description: string; children: ReactNode; onBack: () => void; onSkip: () => void }) {
  return <div className="tmp-onboarding-step"><div className="tmp-onboarding-heading"><p className="section-eyebrow">{copy}</p><h3>{title}</h3><p>{description}</p></div>{children}{showActions && <div className="tmp-onboarding-actions"><button type="button" className="tmp-onboarding-back" onClick={onBack}><ArrowLeft aria-hidden="true" />{backLabel}</button><button type="button" className="tmp-onboarding-back" onClick={onSkip}>{skipLabel}</button></div>}</div>;
}

function SummaryTags({ title, tags, empty }: { title: string; tags: string[]; empty?: string }) {
  return <div className="tmp-onboarding-summary-group"><strong>{title}</strong><div className="tmp-onboarding-tags">{tags.length ? tags.map((tag) => <span key={tag}>{tag}</span>) : empty && <span>{empty}</span>}</div></div>;
}
