import { type FormEvent, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Cpu,
  ExternalLink,
  Lightbulb,
  Mail,
  Network,
  Sparkles,
  Target,
  Users,
  Workflow,
} from 'lucide-react';
import { AnalyticsConsentBanner } from '../components/layout/AnalyticsConsentBanner';
import { SectionHeading, Supporters, TeamBlock } from '../components/layout/SharedSections';
import { EventGallery } from '../components/media/EventGallery';
import { SiteFooter } from '../components/layout/SiteFooter';
import { SiteHeader } from '../components/layout/SiteHeader';
import { ASSETS, EVENT_MEDIA } from '../config/assets';
import { DOWNLOADS } from '../config/downloads';
import { SITE } from '../config/site';
import { companiesContent } from '../content/companies';
import { communityContent } from '../content/community';
import {
  ANALYTICS_CONSENT_KEY,
  type AnalyticsConsent,
  getStoredAnalyticsConsent,
  loadGoogleAnalyticsAndSendPageView,
} from '../lib/analytics';
import { type Lang, getInitialLanguage, persistLanguage, withLanguage } from '../lib/language';

type CompanyForm = {
  company: string;
  name: string;
  email: string;
  role: string;
  format: string;
  challenge: string;
  phone: string;
  timeframe: string;
};

const initialCompanyForm: CompanyForm = {
  company: '',
  name: '',
  email: '',
  role: '',
  format: '',
  challenge: '',
  phone: '',
  timeframe: '',
};

const COMPANY_CONTACT_ENDPOINT = import.meta.env.VITE_COMPANY_CONTACT_ENDPOINT?.trim();
const COMPANY_FORM_VERSION = '2026-08-company-v1';
const COMPANY_PRIVACY_VERSION = '2026-08-company-privacy-v1';
const COMPANY_REQUEST_TIMEOUT_MS = 12000;

function setMetaContent(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
}

export default function CompaniesPage() {
  const [lang, setLang] = useState<Lang>(() => getInitialLanguage());
  const [analyticsConsent, setAnalyticsConsent] = useState<AnalyticsConsent | null>(() => getStoredAnalyticsConsent());
  const [form, setForm] = useState<CompanyForm>(initialCompanyForm);
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const successCloseRef = useRef<HTMLButtonElement>(null);
  const content = companiesContent[lang];

  useEffect(() => {
    if (formState !== 'success') {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    successCloseRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFormState('idle');
        window.requestAnimationFrame(() => submitButtonRef.current?.focus());
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [formState]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = content.metaTitle;
    setMetaContent('meta[name="description"]', content.metaDescription);
    setMetaContent('meta[property="og:title"]', content.metaTitle);
    setMetaContent('meta[property="og:description"]', content.metaDescription);
    setMetaContent('meta[name="twitter:title"]', content.metaTitle);
    setMetaContent('meta[name="twitter:description"]', content.metaDescription);
  }, [content.metaDescription, content.metaTitle, lang]);

  useEffect(() => {
    if (analyticsConsent === 'accepted') {
      void loadGoogleAnalyticsAndSendPageView();
    }
  }, [analyticsConsent]);

  const changeLanguage = (nextLanguage: Lang) => {
    setLang(nextLanguage);
    persistLanguage(nextLanguage);
  };

  const updateConsent = (nextConsent: AnalyticsConsent) => {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, nextConsent);
    setAnalyticsConsent(nextConsent);
  };

  const updateField = (field: keyof CompanyForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (formState !== 'idle') {
      setFormState('idle');
    }
  };

  const chooseTailoredFormat = () => {
    const tailoredOption = content.form.options.at(-2);
    if (tailoredOption) {
      updateField('format', tailoredOption);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (companyWebsite.trim()) {
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!form.company.trim() || !form.name.trim() || !emailIsValid || !form.format.trim() || !form.challenge.trim() || !privacyAccepted) {
      setFormState('error');
      return;
    }

    const submittedAt = new Date().toISOString();
    const query = new URLSearchParams(window.location.search);
    const trimmedForm = {
      company: form.company.trim(),
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role.trim(),
      format: form.format.trim(),
      challenge: form.challenge.trim(),
      phone: form.phone.trim(),
      timeframe: form.timeframe.trim(),
    };
    const payload = {
      ...trimmedForm,
      submissionType: 'company_interest',
      formVersion: COMPANY_FORM_VERSION,
      language: lang,
      submittedAt,
      landingPage: window.location.href,
      referrer: document.referrer,
      utmSource: query.get('utm_source') || '',
      utmMedium: query.get('utm_medium') || '',
      utmCampaign: query.get('utm_campaign') || '',
      utmContent: query.get('utm_content') || '',
      utmTerm: query.get('utm_term') || '',
      trackingSummary: ['source', 'medium', 'campaign', 'content', 'term']
        .map((key) => {
          const value = query.get(`utm_${key}`);
          return value ? `${key}:${value}` : '';
        })
        .filter(Boolean)
        .join(' | '),
      privacyAccepted,
      privacyAcceptedAt: submittedAt,
      privacyVersion: COMPANY_PRIVACY_VERSION,
      privacyText: content.form.privacy,
    };

    if (!COMPANY_CONTACT_ENDPOINT) {
      const body = [
        content.form.emailIntro,
        '',
        `${content.form.company}: ${trimmedForm.company}`,
        `${content.form.name}: ${trimmedForm.name}`,
        `${content.form.email}: ${trimmedForm.email}`,
        `${content.form.role}: ${trimmedForm.role || '-'}`,
        `${content.form.format}: ${trimmedForm.format}`,
        `${content.form.challenge}: ${trimmedForm.challenge}`,
        `${content.form.phone}: ${trimmedForm.phone || '-'}`,
        `${content.form.timeframe}: ${trimmedForm.timeframe || '-'}`,
        `Landing page: ${payload.landingPage}`,
      ].join('\n');

      window.location.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(content.form.subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setFormState('sending');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), COMPANY_REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(COMPANY_CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error('Company contact request failed');
      }
      const result: unknown = await response.json();
      if (!result || typeof result !== 'object' || !('ok' in result) || result.ok !== true) {
        throw new Error('Company contact response was not accepted');
      }
      setFormState('success');
      setForm(initialCompanyForm);
      setCompanyWebsite('');
      setPrivacyAccepted(false);
    } catch (error) {
      console.warn('Company contact request failed', error);
      setFormState('error');
    } finally {
      window.clearTimeout(timeout);
    }
  };

  return (
    <main className="refresh-site">
      <div className="refresh-background" aria-hidden="true" />
      <SiteHeader lang={lang} page="companies" onLanguageChange={changeLanguage} />
      <AnalyticsConsentBanner lang={lang} consent={analyticsConsent} onChoice={updateConsent} />

      <section className="company-hero">
        <div className="site-shell company-hero-grid">
          <div className="company-hero-copy">
            <p className="section-eyebrow">{content.heroEyebrow}</p>
            <h1>
              {content.heroTitlePrefix}{' '}
              <span className="company-hero-title-tail">{content.heroTitleTail}</span>
            </h1>
            <p>{content.heroText}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#company-contact">
                {content.heroPrimary}
                <ArrowRight aria-hidden="true" />
              </a>
              <a className="button button-secondary" href={withLanguage('/', lang)} target="_blank" rel="noopener noreferrer">
                {content.heroSecondary}
              </a>
            </div>
          </div>
          <figure className="company-hero-media">
            <picture>
              <source media="(min-width: 1280px)" srcSet={`${EVENT_MEDIA.companyHero.xlarge} 1600w, ${EVENT_MEDIA.companyHero.large} 1280w`} />
              <source media="(min-width: 640px)" srcSet={`${EVENT_MEDIA.companyHero.large} 1280w, ${EVENT_MEDIA.companyHero.medium} 768w`} />
              <img
                src={EVENT_MEDIA.companyHero.src}
                srcSet={`${EVENT_MEDIA.companyHero.medium} 768w, ${EVENT_MEDIA.companyHero.large} 1280w`}
                sizes="(min-width: 1280px) 50vw, (min-width: 900px) 45vw, 100vw"
                alt={content.heroImageAlt}
                width={EVENT_MEDIA.companyHero.width}
                height={EVENT_MEDIA.companyHero.height}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </figure>
        </div>
        <div className="site-shell hero-trust-row">
          <Supporters lang={lang} compact />
        </div>
      </section>

      <section id="benefits" className="page-section">
        <div className="site-shell">
          <SectionHeading eyebrow={content.benefitsEyebrow} title={content.benefitsTitle} />
          <div className="benefit-columns">
            {content.benefits.map((benefit, index) => {
              const Icon = [Users, Lightbulb, Workflow, Target][index];
              return (
                <article key={benefit.title}>
                  <Icon aria-hidden="true" />
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="formats" className="page-section page-section-muted">
        <div className="site-shell">
          <SectionHeading
            eyebrow={content.formatsEyebrow}
            title={content.formatsTitle}
            intro={content.formatsIntro}
          />
          <div className="format-grid">
            {content.formats.map((format, index) => (
              <article key={format.title}>
                <span>0{index + 1}</span>
                <h3>{format.title}</h3>
                <p>{format.text}</p>
                <strong>{format.frame}</strong>
              </article>
            ))}
          </div>
          <p className="formats-note">{content.formatsNote}</p>
          <div className="tailored-format-card">
            <div>
              <p className="section-eyebrow">{content.tailoredEyebrow}</p>
              <h3>{content.tailoredTitle}</h3>
              <p>{content.tailoredText}</p>
            </div>
            <a className="button button-secondary" href="#company-contact" onClick={chooseTailoredFormat}>
              {content.tailoredCta}
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="page-section disciplines-section">
        <div className="site-shell disciplines-layout">
          <SectionHeading eyebrow={content.disciplinesEyebrow} title={content.disciplinesTitle} />
          <div>
            <div className="community-profile-card">
              <p className="section-eyebrow">{content.communityProfileEyebrow}</p>
              <h3>{content.communityProfileTitle}</h3>
              <div className="community-profile-facts">
                {content.communityProfileFacts.map((fact) => (
                  <strong key={fact}>{fact}</strong>
                ))}
              </div>
              <p>{content.communityProfileText}</p>
            </div>
            <p className="disciplines-intro">{content.disciplinesText}</p>
            <div className="discipline-list">
              {content.disciplines.map((discipline) => (
                <span key={discipline}>
                  <Cpu aria-hidden="true" />
                  {discipline}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pilot-proof" className="page-section page-section-muted">
        <div className="site-shell">
          <SectionHeading eyebrow={content.proofEyebrow} title={content.proofTitle} intro={content.proofText} />
          <a
            className="button button-secondary recap-aftermovie-link"
            href={SITE.aftermovie.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {SITE.aftermovie.label[lang]}
            <ExternalLink aria-hidden="true" />
          </a>
          <EventGallery
            images={[
              EVENT_MEDIA.roomAlternative,
              EVENT_MEDIA.builderDiscussion,
              EVENT_MEDIA.codeCloseup,
              EVENT_MEDIA.presenterProjector,
              EVENT_MEDIA.demo,
            ].map((image, index) => ({
              ...image,
              alt: content.proofImageAlts[index],
              caption: content.proofImageCaptions[index],
            }))}
            lightboxLabel={content.galleryLabel}
            previousLabel={content.galleryPrevious}
            nextLabel={content.galleryNext}
            closeLabel={content.galleryClose}
          />
          <div className="expectation-card expectation-card-compact">
            <Sparkles aria-hidden="true" />
            <div>
              <h3>{content.proofExpectationTitle}</h3>
              <p>{content.proofExpectation}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-shell process-layout">
          <SectionHeading eyebrow={content.processEyebrow} title={content.processTitle} />
          <ol className="process-list">
            {content.process.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="company-contact" className="page-section page-section-muted">
        <div className="site-shell">
          <SectionHeading eyebrow={content.contactEyebrow} title={content.contactTitle} intro={content.contactText} />
          <div className="company-contact-layout">
            <div className="company-contact-aside">
              <Network aria-hidden="true" />
              <h3>{lang === 'de' ? 'Direkter Austausch' : 'Direct exchange'}</h3>
              <p>
                {lang === 'de'
                  ? 'Ein kurzer Problemaufriss reicht für den ersten Kontakt. Wir prüfen gemeinsam, welcher Rahmen sinnvoll ist.'
                  : 'A short outline is enough for the first conversation. Together, we review which setup makes sense.'}
              </p>
              <span>{content.directContact}</span>
              <a href={`mailto:${SITE.contactEmail}`}>
                <Mail aria-hidden="true" />
                {SITE.contactEmail}
              </a>
              <div className="one-pager-box">
                <p className="section-eyebrow">{content.onePagerEyebrow}</p>
                <h3>{content.onePagerTitle}</h3>
                <p>{content.onePagerText}</p>
                {DOWNLOADS.onePager.status === 'available' ? (
                  <a
                    className="button button-secondary"
                    href={DOWNLOADS.onePager.url}
                    download={DOWNLOADS.onePager.filename}
                  >
                    {content.onePagerDownload}
                    <ExternalLink aria-hidden="true" />
                  </a>
                ) : (
                  <>
                    <button type="button" className="button button-secondary button-disabled" disabled aria-disabled="true">
                      {content.onePagerDownload}
                    </button>
                    <small className="one-pager-status">{content.onePagerPending}</small>
                  </>
                )}
              </div>
            </div>

            <form className="company-form" onSubmit={handleSubmit}>
              <label className="company-honeypot" aria-hidden="true">
                Website
                <input
                  type="text"
                  name="company_website"
                  value={companyWebsite}
                  onChange={(event) => setCompanyWebsite(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
              <div className="company-form-grid">
                <CompanyInput
                  name="company"
                  autocomplete="organization"
                  maxLength={200}
                  label={content.form.company}
                  value={form.company}
                  onChange={(value) => updateField('company', value)}
                  required
                />
                <CompanyInput
                  name="name"
                  autocomplete="name"
                  maxLength={160}
                  label={content.form.name}
                  value={form.name}
                  onChange={(value) => updateField('name', value)}
                  required
                />
                <CompanyInput
                  name="email"
                  autocomplete="email"
                  maxLength={254}
                  label={content.form.email}
                  value={form.email}
                  onChange={(value) => updateField('email', value)}
                  type="email"
                  required
                />
                <CompanyInput
                  name="role"
                  autocomplete="organization-title"
                  maxLength={160}
                  label={content.form.role}
                  value={form.role}
                  onChange={(value) => updateField('role', value)}
                />
                <CompanyInput
                  name="phone"
                  autocomplete="tel"
                  maxLength={80}
                  label={content.form.phone}
                  value={form.phone}
                  onChange={(value) => updateField('phone', value)}
                />
                <label className="company-field" htmlFor="company-format">
                  <span>
                    {content.form.format}
                    <strong aria-label="required">*</strong>
                  </span>
                  <select id="company-format" name="format" required value={form.format} onChange={(event) => updateField('format', event.target.value)}>
                    <option value="">{content.form.select}</option>
                    {content.form.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <CompanyInput
                  name="timeframe"
                  autocomplete="off"
                  maxLength={200}
                  label={content.form.timeframe}
                  value={form.timeframe}
                  onChange={(value) => updateField('timeframe', value)}
                />
                <label className="company-field company-field-wide" htmlFor="company-challenge">
                  <span>
                    {content.form.challenge}
                    <strong aria-label="required">*</strong>
                  </span>
                  <textarea
                    id="company-challenge"
                    name="challenge"
                    maxLength={5000}
                    required
                    rows={5}
                    value={form.challenge}
                    onChange={(event) => updateField('challenge', event.target.value)}
                  />
                </label>
              </div>

              <label className="company-privacy">
                <input
                  type="checkbox"
                  required
                  checked={privacyAccepted}
                  onChange={(event) => setPrivacyAccepted(event.target.checked)}
                />
                <span>
                  {content.form.privacy}{' '}
                  <a href={withLanguage('/#privacy', lang)}>{content.form.privacyLink}</a>
                </span>
              </label>

              {!COMPANY_CONTACT_ENDPOINT && <p className="company-mail-help">{content.form.mailHelp}</p>}
              {formState === 'error' && (
                <p className="company-form-message error" role="alert" aria-live="assertive">
                  {content.form.error}{' '}
                  <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
                </p>
              )}

              <button ref={submitButtonRef} className="button button-primary company-submit" type="submit" disabled={formState === 'sending'}>
                {formState === 'sending'
                  ? content.form.sending
                  : COMPANY_CONTACT_ENDPOINT
                    ? content.form.submitEndpoint
                    : content.form.submitMail}
                {COMPANY_CONTACT_ENDPOINT ? <ArrowRight aria-hidden="true" /> : <ExternalLink aria-hidden="true" />}
              </button>
              <p className="company-required-note">{content.form.required}</p>
            </form>
          </div>
        </div>
      </section>

      {formState === 'success' && (
        <div
          className="company-success-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setFormState('idle');
              window.requestAnimationFrame(() => submitButtonRef.current?.focus());
            }
          }}
        >
          <section
            className="company-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="company-success-title"
            aria-describedby="company-success-description"
          >
            <button
              ref={successCloseRef}
              type="button"
              className="company-success-close"
              onClick={() => {
                setFormState('idle');
                window.requestAnimationFrame(() => submitButtonRef.current?.focus());
              }}
              aria-label={content.form.successClose}
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="company-success-icon" aria-hidden="true">
              <span>✓</span>
            </div>
            <h2 id="company-success-title">{content.form.successTitle}</h2>
            <p id="company-success-description">{content.form.successText}</p>
            <p>
              {content.form.successAdditional}{' '}
              <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
            </p>
            <button
              type="button"
              className="button button-primary company-success-submit"
              onClick={() => {
                setFormState('idle');
                window.requestAnimationFrame(() => submitButtonRef.current?.focus());
              }}
            >
              {content.form.successClose}
            </button>
          </section>
        </div>
      )}

      <section className="page-section page-section-muted">
        <div className="site-shell faq-layout">
          <SectionHeading eyebrow={content.faqEyebrow} title={content.faqTitle} />
          <div className="faq-list">
            {content.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="page-section">
        <div className="site-shell">
          <SectionHeading
            eyebrow={content.teamEyebrow}
            title={content.teamTitle}
          />
          <TeamBlock
            storyTitle={content.teamStoryTitle}
            storyParagraphs={content.teamStoryParagraphs}
            imageAlt={lang === 'de' ? 'Team von Tech Meets Problems' : 'Tech Meets Problems team'}
            members={communityContent[lang].teamMembers}
          />
        </div>
      </section>

      <SiteFooter lang={lang} page="companies" />
    </main>
  );
}

function CompanyInput({
  name,
  autocomplete,
  maxLength,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  name: string;
  autocomplete: string;
  maxLength: number;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="company-field" htmlFor={name}>
      <span>
        {label}
        {required && <strong aria-label="required">*</strong>}
      </span>
      <input id={name} name={name} type={type} autoComplete={autocomplete} maxLength={maxLength} required={required} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
