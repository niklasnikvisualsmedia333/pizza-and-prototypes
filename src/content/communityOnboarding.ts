import type { Lang } from '../lib/language';

export type GoalId = 'jobs' | 'projects' | 'startups' | 'companies' | 'events' | 'community' | 'exploring';
export type StageId = 'bachelor' | 'master' | 'research' | 'professional' | 'founder' | 'other';
export type FieldId = 'tech' | 'data' | 'product' | 'business' | 'entrepreneurship' | 'figuring-out';
export type ExperienceId = 'none' | 'uni-projects' | 'first-role' | 'multiple';

export interface CommunityProfileV2 {
  status?: StageId;
  contributionAreas?: FieldId[];
  experienceLevel?: ExperienceId;
  university?: string;
}

export const commonUniversities = [
  'Universität Siegen', 'TH Köln', 'Hochschule Bonn-Rhein-Sieg', 'Universität zu Köln',
  'Universität Bonn', 'Universität Marburg', 'Hochschule Koblenz', 'Technische Hochschule Mittelhessen',
  'FOM Hochschule', 'IU Internationale Hochschule',
];

export const onboardingCopy = {
  de: {
    questionEyebrow: 'Dein Start bei TMP',
    goalsTitle: 'Was interessiert dich gerade am meisten?',
    goalsText: 'Wähle bis zu drei Bereiche. Du kannst das später jederzeit ändern.',
    goals: [
      { id: 'jobs', title: 'Jobs & Praktika', description: 'Ausgewählte Möglichkeiten, wenn verfügbar.' },
      { id: 'projects', title: 'Reale Projekte', description: 'An konkreten Herausforderungen arbeiten.' },
      { id: 'startups', title: 'Startups & Entrepreneurship', description: 'Ideen und Unternehmertum praktisch erleben.' },
      { id: 'companies', title: 'Unternehmen & Karriere', description: 'Einblicke in Rollen und Arbeitsweisen.' },
      { id: 'events', title: 'Events & Workshops', description: 'Menschen treffen und gemeinsam ausprobieren.' },
      { id: 'community', title: 'Community & Leute', description: 'Motivierte Menschen aus mehreren Bereichen.' },
      { id: 'exploring', title: 'Ich schaue mich erstmal um', description: 'Ganz unverbindlich kennenlernen.' },
    ] as Array<{ id: GoalId; title: string; description: string }>,
    selected: '{count} ausgewählt', continue: 'Weiter', back: 'Zurück', skip: 'Später',
    joinEyebrow: 'Kostenloser Community-Beitritt', joinTitle: 'Werde Teil der Community.',
    joinText: 'Tritt kostenlos bei. Keine Bewerbung. Kein Spam.',
    firstNameLabel: 'Vorname', firstNamePlaceholder: 'Dein Vorname', firstNameRequired: 'Bitte gib deinen Vornamen ein.',
    emailLabel: 'E-Mail-Adresse', emailPlaceholder: 'du@beispiel.de', emailRequired: 'Bitte gib deine E-Mail-Adresse ein.',
    emailInvalid: 'Bitte gib eine gültige E-Mail-Adresse ein.', consentRequired: 'Bitte bestätige den Datenschutzhinweis und die Community-Updates.',
    joinSubmit: 'Kostenlos beitreten', joinSubmitting: 'Wird gespeichert …', joinError: 'Das hat gerade nicht geklappt. Bitte versuche es erneut.',
    freeNote: 'Keine Bewerbung. Kein Spam.',
    successEyebrow: 'Mitgliedschaft bestätigt', successTitle: 'Du bist drin.',
    successText: 'Du bist der TMP Community beigetreten.',
    successNext: 'Wenn du willst, mach TMP in wenigen Klicks relevanter für dich. Alles Weitere ist freiwillig.',
    successCta: 'Profil ergänzen', successSkip: 'Für jetzt abschließen', optional: 'Optional · jederzeit überspringbar',
    stageTitle: 'Was beschreibt dich am besten?', stageText: 'Wähle die passendste Option. Das ist kein Bewerbungskriterium.',
    stages: [
      { id: 'bachelor', title: 'Bachelor-Student:in' }, { id: 'master', title: 'Master-Student:in' },
      { id: 'research', title: 'Promotion / Forschung' }, { id: 'professional', title: 'Young Professional' },
      { id: 'founder', title: 'Gründer:in / selbstständig' }, { id: 'other', title: 'Sonstiges' },
    ] as Array<{ id: StageId; title: string }>,
    fieldTitle: 'In welchen Bereichen möchtest du beitragen?', fieldText: 'Wähle bis zu zwei. Programmieren ist keine Voraussetzung.',
    fields: [
      { id: 'tech', title: 'Tech & Engineering' }, { id: 'data', title: 'AI / Data / Research' },
      { id: 'product', title: 'Product / UX / Design' }, { id: 'business', title: 'Business / Strategy / GTM' },
      { id: 'entrepreneurship', title: 'Entrepreneurship / Startups' }, { id: 'figuring-out', title: 'Sonstiges / finde ich noch heraus' },
    ] as Array<{ id: FieldId; title: string }>,
    fieldLimit: 'Bis zu zwei Bereiche auswählen.',
    experienceTitle: 'Wie viel relevante Praxiserfahrung hast du bisher?',
    experienceText: 'Eine grobe Einordnung reicht. Das ist keine Bewertung.',
    experience: [
      { id: 'none', title: 'Noch keine relevante Praxiserfahrung' },
      { id: 'uni-projects', title: 'Vor allem Uni- oder eigene Projekte' },
      { id: 'first-role', title: 'Eine erste relevante Rolle, ein Praktikum oder Projekt' },
      { id: 'multiple', title: 'Mehrere relevante praktische Erfahrungen' },
    ] as Array<{ id: ExperienceId; title: string }>,
    universityTitle: 'Wo studierst oder arbeitest du?', universityText: 'Optional. So verstehen wir besser, wo sich Community-Schwerpunkte entwickeln.',
    universityLabel: 'Hochschule oder Universität', universityPlaceholder: 'Zum Beispiel Universität Siegen',
    universityHint: 'Du kannst den Namen frei eingeben oder die Antwort überspringen.',
    summaryEyebrow: 'Dein TMP-Profil', summaryTitle: 'Das könnte für dich relevant sein.',
    summaryText: 'Deine Auswahl hilft uns, passende Community-Updates besser einzuordnen. Sie ist kein Matching-Score.',
    summaryGoals: 'Dein Fokus', summaryProfile: 'Optionales Profil', summaryEmpty: 'Erstmal umsehen',
    finalInstagramText: 'Bleib mit TMP verbunden und erfahre, wenn es passende Neuigkeiten gibt.',
    finalCta: 'TMP Community-Kanal öffnen', finalSecondary: 'Auf Instagram folgen', finalRestart: 'Zurück zur Community-Seite',
  },
  en: {
    questionEyebrow: 'Your start at TMP',
    goalsTitle: 'What are you most interested in right now?',
    goalsText: 'Choose up to three. You can change this later.',
    goals: [
      { id: 'jobs', title: 'Jobs & Internships', description: 'Selected opportunities when available.' },
      { id: 'projects', title: 'Real Projects', description: 'Work on concrete challenges.' },
      { id: 'startups', title: 'Startups & Entrepreneurship', description: 'Explore ideas and building a venture.' },
      { id: 'companies', title: 'Companies & Career', description: 'Learn about roles and how teams work.' },
      { id: 'events', title: 'Events & Workshops', description: 'Meet people and try things together.' },
      { id: 'community', title: 'Community & People', description: 'Meet motivated people across fields.' },
      { id: 'exploring', title: 'Just exploring', description: 'Get to know TMP without pressure.' },
    ] as Array<{ id: GoalId; title: string; description: string }>,
    selected: '{count} selected', continue: 'Continue', back: 'Back', skip: 'Skip for now',
    joinEyebrow: 'Join the community for free', joinTitle: 'Become part of the community.',
    joinText: 'Join for free. No application. No spam.',
    firstNameLabel: 'First name', firstNamePlaceholder: 'Your first name', firstNameRequired: 'Enter your first name.',
    emailLabel: 'Email address', emailPlaceholder: 'you@example.com', emailRequired: 'Enter your email address.',
    emailInvalid: 'Enter a valid email address.', consentRequired: 'Please confirm the privacy notice and community updates.',
    joinSubmit: 'Join for free', joinSubmitting: 'Saving …', joinError: 'We could not save this just now. Please try again.',
    freeNote: 'No application. No spam.',
    successEyebrow: 'Membership confirmed', successTitle: "You're in.",
    successText: 'You have joined the TMP community.',
    successNext: 'If you like, make TMP more relevant to you in a few clicks. Everything else is optional.',
    successCta: 'Add optional profile details', successSkip: 'Finish for now', optional: 'Optional · you can skip at any time',
    stageTitle: 'What describes you best?', stageText: 'Choose the closest fit. This is not an application criterion.',
    stages: [
      { id: 'bachelor', title: 'Bachelor student' }, { id: 'master', title: 'Master student' },
      { id: 'research', title: 'PhD / Research' }, { id: 'professional', title: 'Young professional' },
      { id: 'founder', title: 'Founder / Self-employed' }, { id: 'other', title: 'Other' },
    ] as Array<{ id: StageId; title: string }>,
    fieldTitle: 'Where would you like to contribute?', fieldText: 'Choose up to two areas. Coding is not required to join.',
    fields: [
      { id: 'tech', title: 'Tech & Engineering' }, { id: 'data', title: 'AI / Data / Research' },
      { id: 'product', title: 'Product / UX / Design' }, { id: 'business', title: 'Business / Strategy / GTM' },
      { id: 'entrepreneurship', title: 'Entrepreneurship / Startups' }, { id: 'figuring-out', title: 'Other / still figuring it out' },
    ] as Array<{ id: FieldId; title: string }>,
    fieldLimit: 'Choose up to two areas.',
    experienceTitle: 'How much relevant real-world experience do you have so far?',
    experienceText: 'A rough direction is enough. This is not an assessment.',
    experience: [
      { id: 'none', title: 'No relevant experience yet' },
      { id: 'uni-projects', title: 'Mostly university or personal projects' },
      { id: 'first-role', title: 'One first relevant role, internship or project' },
      { id: 'multiple', title: 'Several relevant practical experiences' },
    ] as Array<{ id: ExperienceId; title: string }>,
    universityTitle: 'Where do you study or work?', universityText: 'Optional. This helps us understand where community clusters may be emerging.',
    universityLabel: 'University or institution', universityPlaceholder: 'For example University of Siegen',
    universityHint: 'Type any institution name or skip this question.',
    summaryEyebrow: 'Your TMP mix', summaryTitle: 'A few relevant next steps.',
    summaryText: 'Your choices help us make community updates more relevant. This is not a match score.',
    summaryGoals: 'Your focus', summaryProfile: 'Optional profile', summaryEmpty: 'Just exploring',
    finalInstagramText: 'Stay connected with TMP and hear when there is something relevant to share.',
    finalCta: 'Open the TMP community channel', finalSecondary: 'Follow on Instagram', finalRestart: 'Back to the community page',
  },
} as const;
