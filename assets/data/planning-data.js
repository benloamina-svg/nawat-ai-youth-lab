/* =====================================================================
   NAWAT AI Youth Lab — "Plan it" data (Initiative Canvas + SMART game)
   Based on the TIRYAQ NGO participant worksheets (sheets 3 and 10).
   Edit text freely; keep the quotes and commas.
   ===================================================================== */
window.PLANNING_DATA = {

  /* The 13 blocks of the One-Page Initiative Canvas, in order. */
  canvas: [
    { id: 'problem',    title: 'Problem',              hint: 'The negative situation you observe. Two sentences, no solutions.' },
    { id: 'target',     title: 'Target group',         hint: 'Exactly who: age, place, number, situation. Not just "youth".' },
    { id: 'solution',   title: 'Solution / idea',      hint: 'Your proposed response to the need.' },
    { id: 'goal',       title: 'Overall goal',         hint: 'One sentence: the direction of change.' },
    { id: 'smart',      title: 'SMART objectives',     hint: 'Specific, Measurable, Achievable, Relevant, Time-bound. Use the builder below.', wide: true },
    { id: 'activities', title: 'Activities',           hint: 'What you will do. Every activity must serve an objective.', wide: true },
    { id: 'team',       title: 'Team',                 hint: 'One name per task, plus a backup for critical tasks.' },
    { id: 'resources',  title: 'Resources',            hint: 'Space, equipment, partners, volunteers.' },
    { id: 'budget',     title: 'Budget',               hint: 'Cash and in-kind support (a free room has a value too). Plan A and Plan B.' },
    { id: 'indicators', title: 'Indicators',           hint: 'For each objective: one number and one quality measure, with a tool.' },
    { id: 'comms',      title: 'Communication',        hint: 'Before: announce and register. During: document. After: share honest results.' },
    { id: 'docs',       title: 'Documentation',        hint: 'Attendance sheet, photos with consent, shared folder, final report.' },
    { id: 'next',       title: 'Next step',            hint: 'One concrete action, one person, one date.' }
  ],

  /* SMART Court: spot which letters each weak goal fails.
     fails: list of letters the goal does NOT meet. */
  court: [
    { goal: 'Empower youth in Biskra.',
      fails: ['S', 'M', 'T'],
      why: 'Who exactly? Empower how? No number, no deadline.',
      fixed: 'By 30 April 2027, 25 unemployed youth (18–30) in Biskra will complete a 6-session CV and interview workshop, and 15 of them will apply to at least 3 jobs.' },
    { goal: 'Raise awareness about the environment.',
      fails: ['S', 'M', 'T'],
      why: '"Awareness" of what, for whom, and how will you know it changed?',
      fixed: 'By the end of March 2027, 200 pupils in 4 middle schools in Biskra will take part in a 3-week plastic-free challenge, measured by a before/after quiz and the weight of plastic collected.' },
    { goal: 'Train 5,000 young people in AI next week with no budget and two volunteers.',
      fails: ['A'],
      why: 'It is specific, measurable and dated, but impossible with the team and time you have.',
      fixed: 'By 15 January 2027, 2 volunteers will train 40 university students in 4 hands-on AI sessions, using free tools and a borrowed computer room.' },
    { goal: 'Organise 4 reading workshops for 30 pupils at the Biskra public library.',
      fails: ['T'],
      why: 'Clear and realistic, but when? Without a date, it never starts.',
      fixed: 'Between 1 and 28 February 2027, organise 4 weekly reading workshops for 30 pupils at the Biskra public library, with at least 80% attendance.' },
    { goal: 'For our maths tutoring project for rural pupils: gain 500 Instagram followers by December 2026.',
      fails: ['R'],
      why: 'Measurable and dated, but followers do not solve the pupils’ need. Is it relevant?',
      fixed: 'By December 2026, raise the average mock-exam score of 40 rural pupils by 3 points through weekly tutoring, measured by pre/post tests.' },
    { goal: 'By 30 June 2027, 80% of our 25 volunteers will complete 4 stamped activities in their Volunteer Passport, tracked by attendance sheets.',
      fails: [],
      why: 'Trick question: this one is already SMART. Specific group, a number, realistic, linked to the need and dated.',
      fixed: 'Keep it as it is!' }
  ],

  letters: {
    S: { name: 'Specific',    question: 'Does it say clearly who, what and where?' },
    M: { name: 'Measurable',  question: 'Is there a number or a criterion you can check?' },
    A: { name: 'Achievable',  question: 'Do you have the time, team and budget?' },
    R: { name: 'Relevant',    question: 'Does it serve the need you identified?' },
    T: { name: 'Time-bound',  question: 'Does it have a date or a duration?' }
  }
};
