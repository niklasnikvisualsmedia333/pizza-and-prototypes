import type { Lang } from '../lib/language';

export type GoalId = 'jobs' | 'projects' | 'startups' | 'companies' | 'events' | 'community' | 'exploring';
export type StageId = 'bachelor' | 'master' | 'research' | 'professional' | 'founder' | 'other';
export type StudyFieldId = 'computer-science' | 'ai-data' | 'engineering' | 'business-informatics' | 'business' | 'entrepreneurship' | 'product-design' | 'media' | 'science-research' | 'other' | 'unsure';
export type ContributionId = 'tech' | 'data' | 'product' | 'business' | 'entrepreneurship' | 'community' | 'unsure';
export type ExperienceId = 'none' | 'uni-projects' | 'first-role' | 'multiple';
export type ProfileLinkType = 'linkedin' | 'github' | 'portfolio';

export interface CommunityProfileV2 {
  status?: StageId;
  studyField?: StudyFieldId;
  studyFieldOther?: string;
  university?: string;
  experienceLevel?: ExperienceId;
  contributionAreas?: ContributionId[];
  profileLinks?: Partial<Record<ProfileLinkType, string>>;
  updatedAt?: string;
}

export const commonUniversities = [
  'Universität Siegen', 'TH Köln', 'Hochschule Bonn-Rhein-Sieg', 'Universität zu Köln',
  'Universität Bonn', 'Universität Marburg', 'Hochschule Koblenz', 'Technische Hochschule Mittelhessen',
  'FOM Hochschule', 'IU Internationale Hochschule',
];

const sharedStages = [
  { id: 'bachelor', title: 'Bachelor' }, { id: 'master', title: 'Master' },
  { id: 'research', title: 'PhD / Research' }, { id: 'professional', title: 'Young Professional' },
  { id: 'founder', title: 'Founder / Self-employed' }, { id: 'other', title: 'Other' },
] as Array<{ id: StageId; title: string }>;
const englishStudy = [
  ['computer-science', 'Computer Science / Software'], ['ai-data', 'AI / Data'], ['engineering', 'Engineering'],
  ['business-informatics', 'Business Informatics'], ['business', 'Business / Management'], ['entrepreneurship', 'Entrepreneurship'],
  ['product-design', 'Product / UX / Design'], ['media', 'Media / Communications'], ['science-research', 'Natural Sciences / Research'],
  ['other', 'Other'], ['unsure', 'Still figuring it out'],
] as Array<[StudyFieldId, string]>;
const englishContribution = [
  ['tech', 'Tech & Engineering'], ['data', 'AI / Data / Research'], ['product', 'Product / UX / Design'],
  ['business', 'Business / Strategy / GTM'], ['entrepreneurship', 'Entrepreneurship / Startups'],
  ['community', 'Community / Operations'], ['unsure', 'Still figuring it out'],
] as Array<[ContributionId, string]>;

export const onboardingCopy = {
  de: {
    questionEyebrow: 'Dein Start bei TMP', goalsTitle: 'Was interessiert dich gerade am meisten?', goalsText: 'Wähle bis zu drei Bereiche.',
    goals: [
      { id: 'jobs', title: 'Jobs & Praktika', description: 'Ausgewählte Möglichkeiten, wenn verfügbar.' },
      { id: 'projects', title: 'Reale Projekte', description: 'An konkreten Herausforderungen arbeiten.' },
      { id: 'startups', title: 'Startups & Entrepreneurship', description: 'Ideen praktisch weiterbringen.' },
      { id: 'companies', title: 'Unternehmen & Karriere', description: 'Einblicke in Rollen und Arbeitsweisen.' },
      { id: 'events', title: 'Events & Workshops', description: 'Gemeinsam ausprobieren und lernen.' },
      { id: 'community', title: 'Community & Leute', description: 'Motivierte Menschen aus mehreren Bereichen.' },
      { id: 'exploring', title: 'Ich schaue mich erstmal um', description: 'Ganz unverbindlich kennenlernen.' },
    ] as Array<{ id: GoalId; title: string; description: string }>,
    selected: '{count} ausgewählt', continue: 'Weiter', back: 'Zurück', skip: 'Überspringen',
    joinEyebrow: 'Kostenlos der Community beitreten', joinTitle: 'Werde Teil von Tech Meets Problems.',
    joinText: 'Du bekommst relevante Updates zu Projekten, Opportunities, Unternehmen und Events. Mitmachen ist freiwillig. Du entscheidest selbst, was für dich interessant ist.',
    firstNameLabel: 'Vorname', firstNamePlaceholder: 'Dein Vorname', firstNameRequired: 'Bitte gib deinen Vornamen ein.',
    lastNameLabel: 'Nachname', lastNamePlaceholder: 'Dein Nachname', lastNameRequired: 'Bitte gib deinen Nachnamen ein.',
    consentAccessibleLabel: 'Datenschutzhinweis und Community-Updates akzeptieren',
    emailLabel: 'E-Mail-Adresse', emailPlaceholder: 'du@beispiel.de', emailRequired: 'Bitte gib deine E-Mail-Adresse ein.',
    emailInvalid: 'Bitte gib eine gültige E-Mail-Adresse ein.', consentRequired: 'Bitte bestätige den Datenschutzhinweis und die Community-Updates.',
    joinSubmit: 'Kostenlos beitreten', joinSubmitting: 'Wird gespeichert …', joinError: 'Das hat gerade nicht geklappt. Bitte versuche es erneut.',
    freeNote: 'Kostenlos beitreten. Keine Bewerbung, kein Spam.',
    successEyebrow: 'Mitgliedschaft bestätigt', successTitle: 'Du bist drin.',
    successText: 'Du bist jetzt Teil der Tech Meets Problems Community und bekommst die wichtigsten Updates mit.',
    successNext: 'Wenn du willst, kannst du uns noch ein bisschen über dich erzählen. So können wir besser einschätzen, welche Inhalte und Möglichkeiten für dich relevant sind.',
    successOptional: 'Alles Weitere ist optional.', successCta: 'Profil kurz ergänzen', successSkip: 'Für jetzt fertig', optional: 'Optional',
    stageTitle: 'Was beschreibt dich gerade am besten?', stageText: 'Wähle die passendste Option.',
    stages: [
      { id: 'bachelor', title: 'Bachelor' }, { id: 'master', title: 'Master' }, { id: 'research', title: 'PhD / Forschung' },
      { id: 'professional', title: 'Young Professional' }, { id: 'founder', title: 'Gründer:in / selbstständig' }, { id: 'other', title: 'Sonstiges' },
    ] as Array<{ id: StageId; title: string }>,
    studyTitle: 'Was studierst du bzw. was ist dein Hintergrund?', studyText: 'Wähle eine Option, die am besten passt.',
    studyFields: [
      ['computer-science', 'Informatik / Software'], ['ai-data', 'AI / Data'], ['engineering', 'Engineering'],
      ['business-informatics', 'Wirtschaftsinformatik'], ['business', 'BWL / Business / Management'], ['entrepreneurship', 'Entrepreneurship'],
      ['product-design', 'Product / UX / Design'], ['media', 'Medien / Kommunikation'], ['science-research', 'Naturwissenschaften / Research'],
      ['other', 'Sonstiges'], ['unsure', 'Noch unsicher'],
    ] as Array<[StudyFieldId, string]>,
    otherStudyTitle: 'Was ist dein Hintergrund?', otherStudyText: 'Optional. Ein paar Worte reichen.', otherStudyLabel: 'Hintergrund', otherStudyPlaceholder: 'Zum Beispiel Psychologie',
    universityStudentTitle: 'Wo studierst du?', universityOtherTitle: 'Hochschule oder Institution, falls relevant', universityText: 'Optional. Du kannst jede Hochschule eintragen oder überspringen.',
    universityLabel: 'Hochschule oder Institution', universityPlaceholder: 'Zum Beispiel Universität Siegen', universityHint: 'Freitext ist möglich.',
    experienceTitle: 'Wie viel relevante Praxiserfahrung hast du bisher?', experienceText: 'Eine grobe Einordnung reicht.',
    experience: [
      { id: 'none', title: 'Noch keine relevante Praxiserfahrung' }, { id: 'uni-projects', title: 'Vor allem Uni- oder eigene Projekte' },
      { id: 'first-role', title: 'Erste relevante Rolle, Praktikum oder Projekt' }, { id: 'multiple', title: 'Mehrere relevante praktische Erfahrungen' },
    ] as Array<{ id: ExperienceId; title: string }>,
    contributionTitle: 'Wo würdest du am liebsten mitwirken?', contributionText: 'Wähle bis zu zwei Bereiche. Das ist unabhängig davon, was du studierst.', contributionLimit: 'Bis zu zwei auswählen.',
    contributions: [
      ['tech', 'Tech & Engineering'], ['data', 'AI / Data / Research'], ['product', 'Product / UX / Design'],
      ['business', 'Business / Strategy / GTM'], ['entrepreneurship', 'Entrepreneurship / Startups'], ['community', 'Community / Operations'], ['unsure', 'Noch unsicher'],
    ] as Array<[ContributionId, string]>,
    linkTitle: 'Möchtest du ein Profil verlinken?', linkText: 'Optional. Du kannst auch einfach weitermachen.',
    linkTypes: [['linkedin', 'LinkedIn'], ['github', 'GitHub'], ['portfolio', 'Portfolio / Website']] as Array<[ProfileLinkType, string]>,
    linkLabel: 'Profil-Link', linkPlaceholder: 'https://', addAnother: 'Weiteres Profil hinzufügen', saveContinue: 'Weiter',
    summaryEyebrow: 'Dein TMP-Profil', summaryTitle: 'Danke, dass du dabei bist.', summaryText: 'Deine Auswahl hilft uns, relevante Community-Updates besser einzuordnen.',
    summaryGoals: 'Dein Interesse', summaryProfile: 'Was du ergänzt hast', summaryEmpty: 'Erstmal umsehen', finalInstagramText: 'Du entscheidest selbst, was für dich relevant ist.',
    finalCta: 'TMP WhatsApp Community beitreten', finalSecondary: 'Auf Instagram folgen', finalRestart: 'Zurück zur Community-Seite', invalidUrl: 'Bitte gib einen gültigen Profil-Link ein.',
  },
  en: {
    questionEyebrow: 'Your start at TMP', goalsTitle: 'What are you most interested in right now?', goalsText: 'Choose up to three areas.',
    goals: [
      { id: 'jobs', title: 'Jobs & Internships', description: 'Selected opportunities when available.' },
      { id: 'projects', title: 'Real Projects', description: 'Work on concrete challenges.' },
      { id: 'startups', title: 'Startups & Entrepreneurship', description: 'Move ideas forward in practice.' },
      { id: 'companies', title: 'Companies & Career', description: 'Learn about roles and how teams work.' },
      { id: 'events', title: 'Events & Workshops', description: 'Learn and try things together.' },
      { id: 'community', title: 'Community & People', description: 'Meet motivated people across fields.' },
      { id: 'exploring', title: 'Just exploring', description: 'Get to know TMP without pressure.' },
    ] as Array<{ id: GoalId; title: string; description: string }>,
    selected: '{count} selected', continue: 'Continue', back: 'Back', skip: 'Skip',
    joinEyebrow: 'Join the community for free', joinTitle: 'Join Tech Meets Problems.',
    joinText: 'Get relevant updates about projects, opportunities, companies and events. Taking part is optional. You choose what is relevant to you.',
    firstNameLabel: 'First name', firstNamePlaceholder: 'Your first name', firstNameRequired: 'Enter your first name.',
    lastNameLabel: 'Last name', lastNamePlaceholder: 'Your last name', lastNameRequired: 'Enter your last name.',
    consentAccessibleLabel: 'Accept the privacy notice and community updates',
    emailLabel: 'Email address', emailPlaceholder: 'you@example.com', emailRequired: 'Enter your email address.',
    emailInvalid: 'Enter a valid email address.', consentRequired: 'Please confirm the privacy notice and community updates.',
    joinSubmit: 'Join for free', joinSubmitting: 'Saving …', joinError: 'We could not save this just now. Please try again.',
    freeNote: 'Free to join. No application and no spam.',
    successEyebrow: 'Membership confirmed', successTitle: "You're in.",
    successText: 'You are now part of the Tech Meets Problems community and will receive the key updates.',
    successNext: 'If you like, tell us a little more about yourself so we can better understand what is relevant to you.',
    successOptional: 'Everything else is optional.', successCta: 'Add a few profile details', successSkip: 'Finish for now', optional: 'Optional',
    stageTitle: 'What describes you best right now?', stageText: 'Choose the closest fit.', stages: sharedStages,
    studyTitle: "What do you study or what's your background?", studyText: 'Choose the option that fits best.', studyFields: englishStudy,
    otherStudyTitle: "What's your background?", otherStudyText: 'Optional. A few words are enough.', otherStudyLabel: 'Background', otherStudyPlaceholder: 'For example, psychology',
    universityStudentTitle: 'Where do you study?', universityOtherTitle: 'University or institution, if relevant', universityText: 'Optional. Enter any institution or skip.',
    universityLabel: 'University or institution', universityPlaceholder: 'For example, University of Siegen', universityHint: 'You can enter any institution.',
    experienceTitle: 'How much relevant real-world experience do you have so far?', experienceText: 'A rough direction is enough.',
    experience: [
      { id: 'none', title: 'No relevant experience yet' }, { id: 'uni-projects', title: 'Mostly university or personal projects' },
      { id: 'first-role', title: 'A first relevant role, internship or project' }, { id: 'multiple', title: 'Several relevant practical experiences' },
    ] as Array<{ id: ExperienceId; title: string }>,
    contributionTitle: 'Where would you most like to contribute?', contributionText: 'Choose up to two. This is separate from what you study.', contributionLimit: 'Choose up to two.', contributions: englishContribution,
    linkTitle: 'Want to add a profile link?', linkText: 'Optional. You can also keep going.',
    linkTypes: [['linkedin', 'LinkedIn'], ['github', 'GitHub'], ['portfolio', 'Portfolio / Website']] as Array<[ProfileLinkType, string]>,
    linkLabel: 'Profile link', linkPlaceholder: 'https://', addAnother: 'Add another profile', saveContinue: 'Continue',
    summaryEyebrow: 'Your TMP profile', summaryTitle: 'Thanks for being here.', summaryText: 'Your choices help us make community updates more relevant.',
    summaryGoals: 'Your interests', summaryProfile: 'What you added', summaryEmpty: 'Just exploring', finalInstagramText: 'You decide what is relevant to you.',
    finalCta: 'Join the TMP WhatsApp community', finalSecondary: 'Follow on Instagram', finalRestart: 'Back to the community page', invalidUrl: 'Enter a valid profile link.',
  },
} as const satisfies Record<Lang, object>;

export const onboardingStages = sharedStages;
