import type { Survey } from './types';

// Demo survey for the POC. Deliberately short (~60s) but engineered to show
// ONE live example of every supported question/response type. Copy is drawn
// from the supplied Navigate question bank where a real question fits the type.
export const demoSurvey: Survey = {
  id: 'navigate-insights-2026',
  title: 'Navigate Student Insights 2026',
  introHeading: "We're running an important piece of research",
  introText:
    'We’d like to understand how we can better support young people into education, employment and training.',
  highlights: [
    {
      icon: 'clock',
      title: 'It only takes about 3 minutes',
      text: 'Just a few short questions.',
    },
    {
      icon: 'shield',
      title: 'Your answers are confidential',
      text: 'Your responses will only be used for research.',
    },
    {
      icon: 'gift',
      title: 'Prize draw – you could win £100!',
      text: 'Everyone who completes the survey can enter our prize draw to win £100.',
    },
  ],
  reason:
    'Your answers help schools, colleges, employers and policy makers understand how young people can be better supported.',
  estimatedTime: 'about 60 seconds',
  prizeDraw: {
    enabled: true,
    blurb: 'Everyone who completes the survey can enter our prize draw to win £100.',
  },
  thankYou:
    'Your answers will help schools, colleges, employers and policy makers understand how young people can be better supported.',
  questions: [
    {
      id: 'level',
      type: 'single',
      text: 'What best describes your current level of education?',
      helpText: 'Choose the option that fits you best.',
      required: true,
      options: [
        { value: 'col1', label: 'College – First Year' },
        { value: 'col2', label: 'College – Second Year' },
        { value: 'col3', label: 'College – Third Year' },
        { value: 'appr', label: 'Apprenticeship / Vocational Training' },
        { value: 'sixth', label: 'Sixth Form' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      id: 'confidence-money',
      type: 'rating',
      text: 'How confident are you in managing your money (budgeting and saving)?',
      required: true,
      // Labelled (Likert) variant — renders the 5 named options as a scale.
      options: [
        { value: '1', label: 'Not confident at all' },
        { value: '2', label: 'Slightly confident' },
        { value: '3', label: 'Moderately confident' },
        { value: '4', label: 'Quite confident' },
        { value: '5', label: 'Very confident' },
      ],
    },
    {
      id: 'satisfaction',
      type: 'rating',
      text: 'On a scale of 1 to 5, how satisfied are you with the careers support you have received so far?',
      required: true,
      // Numeric variant — no options, so renders 1..points with end labels.
      points: 5,
      lowLabel: 'Not at all satisfied',
      highLabel: 'Very satisfied',
    },
    {
      id: 'enough-support',
      type: 'yesno',
      text: 'Do you feel you currently get enough support with managing your money?',
      required: true,
    },
    {
      id: 'support-types',
      type: 'multiple',
      text: 'What types of support would be most useful to you?',
      helpText: 'Select all that apply.',
      maxSelections: 4,
      options: [
        { value: 'workshops', label: 'In-person workshops' },
        { value: 'video', label: 'Short videos or social content' },
        { value: 'apps', label: 'Interactive tools or apps' },
        { value: '121', label: 'One-to-one advice' },
        { value: 'events', label: 'Events or talks' },
        { value: 'guides', label: 'Guides or online resources' },
        { value: 'discounts', label: 'Discounts, offers or incentives' },
      ],
    },
    {
      id: 'situation',
      type: 'dropdown',
      text: 'Which of the following best describes your current situation?',
      required: true,
      placeholder: 'Please select…',
      options: [
        { value: 'fte-edu', label: 'In full-time education' },
        { value: 'pte-edu', label: 'In part-time education' },
        { value: 'fte-emp', label: 'In full-time employment' },
        { value: 'pte-emp', label: 'In part-time employment' },
        { value: 'neet', label: 'Not in education, employment or training' },
      ],
    },
    {
      id: 'hours',
      type: 'numeric',
      text: 'Approximately how many hours per week do you spend looking for work?',
      helpText: 'Enter a whole number (e.g. 0, 5, 10).',
      min: 0,
      max: 168,
      unitLabel: 'hours per week',
      placeholder: '0',
    },
    {
      id: 'reason',
      type: 'short-text',
      text: 'What is the main reason you are taking part in this survey?',
      maxLength: 200,
      placeholder: 'Type your answer here…',
    },
    {
      id: 'challenges',
      type: 'long-text',
      text: 'Please tell us more about any challenges you face when looking for work.',
      helpText: 'Optional — this is your space to add detail.',
      maxLength: 1000,
      placeholder: 'Type your answer here…',
    },
  ],
};
