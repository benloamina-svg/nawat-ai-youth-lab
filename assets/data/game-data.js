/* =====================================================================
   NAWAT AI Youth Lab — Initiative Idea Game data
   ---------------------------------------------------------------------
   This file holds ALL the content the game uses. You can edit it
   without touching the game logic (assets/js/game.js).

   Placeholders you can use inside text:
     {theme} {target} {skill} {problem} {twist} {format}
     {aformat} = "a workshop" / "an ongoing programme" ({Aformat} = capitalised)
   Keep commas and quotes exactly as they are when editing.
   ===================================================================== */
window.GAME_DATA = {

  /* ---- 1. THEMES -------------------------------------------------
     problems: suggestions shown when the theme is selected
     twists:   creative angles that make each idea different
     names:    first word of the generated initiative name        */
  themes: {
    education: {
      label: 'Education',
      problems: ['Pupils lose motivation to read outside school', 'Students lack study and exam skills', 'Rural pupils have little access to extra learning support'],
      twists: ['a Human Library where people are the "books"', 'a peer-teaching relay where learners become teachers', 'an escape-room style learning challenge'],
      names: ['Spark', 'Bright Minds', 'Learn Loop', 'Open Page']
    },
    employment: {
      label: 'Employment',
      problems: ['Graduates do not know how to write a CV or prepare for interviews', 'Youth lack work experience employers ask for', 'Young people do not know which jobs exist locally'],
      twists: ['a speed-mentoring round with local professionals', 'a mock job fair with real recruiters', 'a "shadow a professional for a day" challenge'],
      names: ['Career Bridge', 'Job Ready', 'Next Step', 'Skill Up']
    },
    entrepreneurship: {
      label: 'Entrepreneurship',
      problems: ['Young people have ideas but no way to test them', 'Youth fear failure and do not start projects', 'Small projects fail because of weak planning'],
      twists: ['a 48-hour "start with zero" challenge', 'a mini-market where teams sell a prototype', 'a pitch arena judged by the community'],
      names: ['Startup Seed', 'Idea Forge', 'Launch Pad', 'Maker Market']
    },
    climate: {
      label: 'Climate & environment',
      problems: ['Plastic waste piles up in public spaces', 'Water is wasted at home and at school', 'Few green spaces in the neighbourhood'],
      twists: ['a recycled-art exhibition', 'a "green map" of the city built by volunteers', 'a 30-day eco-challenge with a public scoreboard'],
      names: ['Green Wave', 'Eco Pulse', 'Oasis', 'Clean Steps']
    },
    health: {
      label: 'Health & wellbeing',
      problems: ['Students feel stressed and isolated', 'Young people move too little and sit too much', 'Wrong health information spreads online'],
      twists: ['a wellbeing walk-and-talk circle', 'a "myth-busters" fact-check campaign', 'a peer support corner run by trained volunteers'],
      names: ['Well Youth', 'Balance', 'Healthy Minds', 'Breathe']
    },
    culture: {
      label: 'Culture & heritage',
      problems: ['Youth lose interest in local heritage', 'Local stories and crafts are being forgotten', 'Few cultural activities for young people'],
      twists: ['a storytelling night with elders and youth', 'a digital museum built with phone photos', 'a heritage treasure hunt in the old town'],
      names: ['Roots', 'Heritage Lab', 'Story Keepers', 'Living Memory']
    },
    civic: {
      label: 'Civic participation',
      problems: ['Young people feel their voice is not heard', 'Youth do not know how local decisions are made', 'Low youth involvement in community life'],
      twists: ['a youth town-hall with local officials', 'a "solve your street" community challenge', 'a simulation of a local council'],
      names: ['Youth Voice', 'Civic Spark', 'Our City', 'Speak Up']
    },
    digital: {
      label: 'Digital & AI literacy',
      problems: ['Youth use AI only to copy answers', 'Many young people cannot spot fake news', 'Small NGOs do not use digital tools for their work'],
      twists: ['an AI challenge lab where teams solve a real problem with AI', 'a "human vs AI" debate game', 'a digital helpdesk run by young volunteers'],
      names: ['AI Makers', 'Digital Spark', 'Code & Care', 'Smart Start']
    },
    women: {
      label: "Women's empowerment",
      problems: ['Girls have fewer role models in leadership and tech', 'Women lack access to skills training', 'Young women hesitate to speak in public'],
      twists: ['a role-model circle with inspiring women', 'a "she leads" public-speaking bootcamp', 'a skills-swap café for women'],
      names: ['She Leads', 'Rise', 'Her Voice', 'Bold Steps']
    },
    volunteering: {
      label: 'Volunteering',
      problems: ['Volunteers join once and never come back', 'Volunteering is not recognised as real experience', 'Youth do not know where to volunteer'],
      twists: ['a volunteer passport with stamps for every activity', 'a "volunteer for a day" open challenge', 'a volunteer awards night'],
      names: ['Volunteer Passport', 'Hands Up', 'Give Back', 'Together']
    }
  },

  /* ---- 2. SIMPLE LISTS ------------------------------------------- */
  targets: {
    pupils: 'pupils', students: 'university students', unemployed: 'unemployed youth',
    women: 'women and girls', rural: 'rural youth', volunteers: 'volunteers',
    teachers: 'teachers', public: 'the general public'
  },
  skills: {
    leadership: 'leadership', communication: 'communication and public speaking',
    digital: 'digital and AI skills', teamwork: 'teamwork', critical: 'critical thinking',
    pm: 'project management', creativity: 'creativity'
  },

  /* ---- 3. FORMATS -------------------------------------------------
     steps: the activity plan. indicators: how to measure success. */
  formats: {
    workshop: {
      label: 'Workshop', suffix: 'Workshop',
      steps: [
        'Open with a 10-minute icebreaker that links {target} to the topic.',
        'Present the problem in plain words: "{problem}".',
        'Run the main activity: {twist}.',
        'Small groups practise {skill} through a short hands-on task.',
        'Close with each participant writing one action they will take this week.'
      ],
      indicators: ['Number of participants who complete the activity', 'Share of participants who say they gained {skill} (end-of-session survey)', 'Number of personal actions written at the end']
    },
    event: {
      label: 'Event', suffix: 'Day',
      steps: [
        'Choose a visible public place and invite {target} through social media and partners.',
        'Set up 3 stations around "{problem}": learn, try, act.',
        'Make the highlight of the day {twist}.',
        'Give volunteers roles that build their {skill}.',
        'End with a group photo and a short pledge wall.'
      ],
      indicators: ['Number of visitors', 'Number of pledges or sign-ups collected', 'Social media reach of event posts']
    },
    conference: {
      label: 'Conference', suffix: 'Forum',
      steps: [
        'Invite 3 short speakers who have tackled "{problem}".',
        'Replace long talks with 7-minute lightning talks and one panel led by {target}.',
        'Add an interactive segment: {twist}.',
        'Run round-table discussions where participants practise {skill}.',
        'Publish a one-page list of recommendations after the conference.'
      ],
      indicators: ['Number of attendees', 'Number of recommendations produced', 'Satisfaction score (1–5) from a feedback form']
    },
    campaign: {
      label: 'Campaign', suffix: 'Campaign',
      steps: [
        'Define one clear message about "{problem}" for {target}.',
        'Create 6 short posts or videos with a simple hashtag.',
        'Build the campaign around {twist}.',
        'Train a small team of ambassadors in {skill} to spread the message.',
        'Finish with a public result post: what changed and who joined.'
      ],
      indicators: ['Reach and engagement of campaign posts', 'Number of people who took the campaign action', 'Number of ambassadors trained']
    },
    competition: {
      label: 'Competition / game', suffix: 'Challenge',
      steps: [
        'Launch a challenge: teams of {target} propose solutions to "{problem}".',
        'Give teams one week and a simple template to fill in.',
        'Make the final round {twist}.',
        'Score teams on impact, creativity and {skill}.',
        'Reward winners with mentoring or visibility, not only prizes.'
      ],
      indicators: ['Number of teams registered', 'Number of solutions submitted', 'Number of winning ideas that continue after the challenge']
    },
    programme: {
      label: 'Ongoing programme', suffix: 'Programme',
      steps: [
        'Recruit a first cohort of 15–25 {target}.',
        'Meet every week for 6 weeks on one part of "{problem}".',
        'Use {twist} as the programme signature.',
        'Give each member a role that builds {skill} over time.',
        'Celebrate the cohort and invite them to mentor the next one.'
      ],
      indicators: ['Retention: share of members active after 6 weeks', 'Number of sessions delivered', 'Number of members who become mentors']
    }
  },

  /* ---- 4. ORGANISATION TYPE: suggested team roles ------------------ */
  orgs: {
    ngo:  { label: 'NGO',  roles: ['Project coordinator', 'Content and communication lead', 'Logistics and partnerships lead', 'Monitoring and evaluation volunteer'] },
    club: { label: 'Club', roles: ['Club president as project lead', 'Two members for content and social media', 'One member for logistics', 'Everyone helps on the day'] },
    solo: { label: 'Solo', roles: ['You: project lead', '2–3 friends or volunteers for the day', 'One local partner (school, library, youth house) for space and visibility'] }
  },

  /* ---- 5. AVAILABLE MATERIALS ------------------------------------- */
  materials: {
    nothing:   { label: 'Nothing yet',            plan: 'Use free public spaces (park, school yard, youth house), paper and a whiteboard. Ask a partner to lend a room.', limited: true },
    phones:    { label: 'Phones only',            plan: 'Run everything from phones: WhatsApp group for coordination, free AI tools for content, Google Forms for registration and feedback.', limited: true },
    room:      { label: 'Room + projector',       plan: 'Use the room for the main session and the projector for short visuals, examples and live AI demos.', limited: false },
    computers: { label: 'Computers + internet',   plan: 'Let participants work hands-on with free AI tools (ChatGPT, Claude, Google AI Studio) in pairs.', limited: false },
    budget:    { label: 'Small budget',           plan: 'Spend on what participants feel: refreshments, printed certificates and one small prize. Keep a simple expense sheet.', limited: false },
    partners:  { label: 'Partners',               plan: 'Ask partners for one concrete thing each: a venue, a speaker, printing or visibility.', limited: false }
  },
  zeroBudget: 'Zero-budget version: borrow a room from a school, library or youth house; replace printed materials with a WhatsApp group and Google Forms; use free AI tools for posters and posts; thank volunteers with digital certificates.',

  /* ---- 6. PITCH LINES --------------------------------------------- */
  pitches: [
    '{Aformat} that helps {target} tackle "{problem}" through {twist}.',
    'Turning "{problem}" into action: {target} build {skill} through {twist}.',
    'Small team, real impact: {aformat} where {target} grow their {skill}.'
  ],

  /* ---- 7. "DEVELOP IT WITH AI" PROMPTS ----------------------------- */
  prompts: [
    { title: 'Turn it into a project plan', text: 'Act as an experienced youth programme coordinator. Our {org} wants to run "{name}", {aformat} for {target} about this problem: "{problem}". Our main activity is {twist}, and we want participants to build {skill}. Our resources: {materials}. Create a simple project plan with: objectives (SMART), a timeline of 4 weeks, team tasks, a list of materials, and 3 risks with solutions. Use a table and simple English.' },
    { title: 'Write a promo post', text: 'Act as a social media manager for a youth {org}. Write an Instagram post to invite {target} to "{name}", {aformat} about "{problem}". Highlight {twist}. Keep it under 120 words, energetic, with a clear call to action and 5 hashtags. Then give me 2 alternative headlines.' },
    { title: 'Design a feedback survey', text: 'Act as a monitoring and evaluation officer. Create a short feedback survey (8 questions max) for participants of "{name}", {aformat} for {target}. Measure satisfaction, what they learned about {skill}, and whether they will take action on "{problem}". Mix rating scales and one open question. Keep it anonymous and under 3 minutes.' }
  ],

  /* ---- 8. BUILT-IN EXAMPLE ---------------------------------------- */
  example: {
    theme: 'volunteering', target: 'students', skill: 'leadership', format: 'programme',
    org: 'ngo', material: 'phones',
    problem: 'Volunteering is not recognised as real experience',
    twist: 'a volunteer passport with stamps for every activity',
    name: 'Volunteer Passport'
  }
};
