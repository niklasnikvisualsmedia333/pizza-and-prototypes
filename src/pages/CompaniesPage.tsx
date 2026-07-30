import { type FormEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
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
import { SectionHeading, TeamBlock } from '../components/layout/SharedSections';
import { SiteFooter } from '../components/layout/SiteFooter';
import { SiteHeader } from '../components/layout/SiteHeader';
import { ASSETS } from '../config/assets';
import { SITE } from '../config/site';
import { companiesContent } from '../content/companies';
import {
  ANALYTICS_CONSENT_KEY,
  type AnalyticsConsent,
  getStoredAnalyticsConsent,
  loadGoogleAnalyticsAndSendPageView,
} from '../lib/analytics';
import { type Lang, getInitialLanguage, persistLanguage, withLanguage } from '../lib/language';

type CompanyForm = {
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  format: string;
  challenge: string;
  phone: string;
  timeframe: string;
  details: string;
};

const initialCompanyForm: CompanyForm = {
  company: '',
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  format: '',
  challenge: '',
  phone: '',
  timeframe: '',
  details: '',
};

const COMPANY_CONTACT_ENDPOINT = import.meta.env.VITE_COMPANY_CONTACT_ENDPOINT?.trim();

function setMetaContent(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
}

export default function CompaniesPage() {
  const [lang, setLang] = useState<Lang>(() => getInitialLanguage());
  const [analyticsConsent, setAnalyticsConsent] = useState<AnalyticsConsent | null>(() => getStoredAnalyticsConsent());
  const [form, setForm] = useState<CompanyForm>(initialCompanyForm);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const content = companiesContent[lang];

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      ...form,
      submissionType: 'company_interest',
      formVersion: '2026-07-company-prototype-v1',
      language: lang,
      submittedAt: new Date().toISOString(),
      landingPage: window.location.href,
      referrer: document.referrer,
    };

    if (!COMPANY_CONTACT_ENDPOINT) {
      const body = [
        content.form.emailIntro,
        '',
        `${content.form.company}: ${form.company}`,
        `${content.form.firstName}: ${form.firstName}`,
        `${content.form.lastName}: ${form.lastName}`,
        `${content.form.email}: ${form.email}`,
        `${content.form.role}: ${form.role}`,
        `${content.form.format}: ${form.format}`,
        `${content.form.challenge}: ${form.challenge}`,
        `${content.form.phone}: ${form.phone || '-'}`,
        `${content.form.timeframe}: ${form.timeframe || '-'}`,
        `${content.form.details}: ${form.details || '-'}`,
      ].join('\n');

      window.location.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(content.form.subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setFormState('sending');
    try {
      const response = await fetch(COMPANY_CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Company contact request failed');
      }
      setFormState('success');
      setForm(initialCompanyForm);
      setPrivacyAccepted(false);
    } catch (error) {
      console.warn('Company contact request failed', error);
      setFormState('error');
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
            <h1>{content.heroTitle}</h1>
            <p>{content.heroText}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#company-contact">
                {content.heroPrimary}
                <ArrowRight aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="#pilot-proof">
                {content.heroSecondary}
              </a>
            </div>
          </div>
          <figure className="company-hero-media">
            <img
              src={ASSETS.event.companyHero}
              alt={content.heroImageAlt}
              width="2048"
              height="1365"
              fetchPriority="high"
            />
            <figcaption>
              <span>Tech Meets Problems</span>
              <strong>{lang === 'de' ? 'Reale Herausforderung. Neue Perspektiven.' : 'Real challenge. New perspectives.'}</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="benefits" className="page-section">
        <div className="site-shell">
          <SectionHeading eyebrow={content.benefitsEyebrow} title={content.benefitsTitle} />
          <div className="benefit-columns">
            {content.benefits.map((benefit, index) => {
              const Icon = [Target, Users, Lightbulb][index];
              return (
                <article key={benefit.title}>
                  <Icon aria-hidden="true" />
                  <h3>{benefit.title}</h3>
                  <ul>
                    {benefit.points.map((point) => (
                      <li key={point}>
                        <Check aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
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
          <p className="format-note">
            {lang === 'de'
              ? 'Hackathons und individuelle Formate können wir bei Bedarf separat prüfen.'
              : 'Hackathons and individual formats can be reviewed separately when useful.'}
          </p>
        </div>
      </section>

      <section className="page-section disciplines-section">
        <div className="site-shell disciplines-layout">
          <SectionHeading eyebrow={content.disciplinesEyebrow} title={content.disciplinesTitle} />
          <div className="discipline-list">
            {content.disciplines.map((discipline) => (
              <span key={discipline}>
                <Cpu aria-hidden="true" />
                {discipline}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="pilot-proof" className="page-section page-section-muted">
        <div className="site-shell">
          <SectionHeading eyebrow={content.proofEyebrow} title={content.proofTitle} intro={content.proofText} />
          <div className="proof-gallery">
            {[ASSETS.event.conceptReview, ASSETS.event.codeReview, ASSETS.event.demo].map((image, index) => (
              <figure key={image} className={index === 0 ? 'proof-gallery-large' : undefined}>
                <img
                  src={image}
                  alt={content.proofImageAlt}
                  width="2048"
                  height="1365"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
          <div className="expectation-band">
            <Sparkles aria-hidden="true" />
            <p>{content.proofExpectation}</p>
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

      <section className="page-section page-section-compact">
        <div className="site-shell expectation-card">
          <div>
            <p className="section-eyebrow">{content.expectationEyebrow}</p>
            <h2>{content.expectationTitle}</h2>
          </div>
          <p>{content.expectationText}</p>
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
            </div>

            <form className="company-form" onSubmit={handleSubmit}>
              <div className="company-form-grid">
                <CompanyInput
                  label={content.form.company}
                  value={form.company}
                  onChange={(value) => updateField('company', value)}
                  required
                />
                <CompanyInput
                  label={content.form.role}
                  value={form.role}
                  onChange={(value) => updateField('role', value)}
                  required
                />
                <CompanyInput
                  label={content.form.firstName}
                  value={form.firstName}
                  onChange={(value) => updateField('firstName', value)}
                  required
                />
                <CompanyInput
                  label={content.form.lastName}
                  value={form.lastName}
                  onChange={(value) => updateField('lastName', value)}
                  required
                />
                <CompanyInput
                  label={content.form.email}
                  value={form.email}
                  onChange={(value) => updateField('email', value)}
                  type="email"
                  required
                />
                <CompanyInput
                  label={content.form.phone}
                  value={form.phone}
                  onChange={(value) => updateField('phone', value)}
                />
                <label className="company-field">
                  <span>
                    {content.form.format}
                    <strong aria-label="required">*</strong>
                  </span>
                  <select required value={form.format} onChange={(event) => updateField('format', event.target.value)}>
                    <option value="">{content.form.select}</option>
                    {content.form.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <CompanyInput
                  label={content.form.timeframe}
                  value={form.timeframe}
                  onChange={(value) => updateField('timeframe', value)}
                />
                <label className="company-field company-field-wide">
                  <span>
                    {content.form.challenge}
                    <strong aria-label="required">*</strong>
                  </span>
                  <textarea
                    required
                    rows={5}
                    value={form.challenge}
                    onChange={(event) => updateField('challenge', event.target.value)}
                  />
                </label>
                <label className="company-field company-field-wide">
                  <span>{content.form.details}</span>
                  <textarea rows={4} value={form.details} onChange={(event) => updateField('details', event.target.value)} />
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
              {formState === 'success' && <p className="company-form-message success">{content.form.success}</p>}
              {formState === 'error' && <p className="company-form-message error">{content.form.error}</p>}

              <button className="button button-primary company-submit" type="submit" disabled={formState === 'sending'}>
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

      <section id="about" className="page-section">
        <div className="site-shell">
          <SectionHeading
            eyebrow={lang === 'de' ? 'Team und Unterstützer' : 'Team and supporters'}
            title={lang === 'de' ? 'Regional verankert. Praktisch orientiert.' : 'Rooted in the region. Focused on practice.'}
          />
          <TeamBlock
            lang={lang}
            title={lang === 'de' ? 'Das Team hinter Tech Meets Problems' : 'The team behind Tech Meets Problems'}
            text={
              lang === 'de'
                ? 'Wir entwickeln das Format gemeinsam mit Community und Partnern aus der Region.'
                : 'We develop the format together with the community and regional partners.'
            }
            imageAlt={lang === 'de' ? 'Team von Tech Meets Problems' : 'Tech Meets Problems team'}
            members={[
              {
                name: 'Niklas Brüne',
                role: lang === 'de' ? 'Strategie, Produkt und Kommunikation' : 'Strategy, product and communication',
              },
              {
                name: 'Frederik Krause',
                role: lang === 'de' ? 'Partnerschaften und Open Innovation' : 'Partnerships and open innovation',
              },
              {
                name: 'Johanna Brenner',
                role: lang === 'de' ? 'Community, Operations und Strategie' : 'Community, operations and strategy',
              },
            ]}
          />
        </div>
      </section>

      <SiteFooter lang={lang} page="companies" />
    </main>
  );
}

function CompanyInput({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="company-field">
      <span>
        {label}
        {required && <strong aria-label="required">*</strong>}
      </span>
      <input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
