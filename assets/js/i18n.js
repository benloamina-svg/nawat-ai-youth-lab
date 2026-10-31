/* =====================================================================
   Interface messages in English and Arabic.
   The page language comes from <html lang="..">; Arabic pages live in /ar/.
   Use {name} placeholders; keep the same keys in both languages.
   ===================================================================== */
(function () {
  'use strict';
  const STR = {
    en: {
      navOpen: 'Open navigation', navClose: 'Close navigation',
      linkSoon: ' (link coming soon)', copied: 'Copied ✓', copyFailed: 'Copy failed',
      copyBlocked: 'Copy is blocked in this browser. Use Print instead.',
      cardBrand: 'N A W A T   A I', cardFooter: 'NAWAT AI YOUTH LAB  ·  PROBLEM → AI → SOLUTION → ACTION',
      // Idea Game
      pickTheme: 'Pick a theme to see suggestions.',
      promptCopied: 'Prompt copied. Paste it into ChatGPT, Claude or Google AI Studio.',
      promptCopyFailed: 'Copy failed: select the text and copy it manually.',
      copyPrompt: 'Copy prompt',
      ideaReady: 'Your initiative "{name}" is ready.',
      fProblem: 'Problem', fWho: 'Who it helps', fSkills: 'Skills built', fTwist: 'Signature activity',
      sPlan: 'Activity plan', sHave: 'With what you have', sZero: 'Zero-budget option', sRoles: 'Team roles', sIndicators: 'Success indicators', sAI: 'Develop it with AI',
      sWhoSkills: 'Who it helps · Skills',
      ideaByline: 'Initiative idea by NAWAT AI Youth Lab',
      pleaseChoose: 'Please choose: {list}.',
      k_theme: 'theme', k_target: 'target group', k_skill: 'skill', k_format: 'format', k_org: 'organisation type', k_material: 'materials',
      ideaCopied: 'Initiative copied to your clipboard.',
      imageDone: 'Image downloaded. Share it with your team.',
      gameLabel: 'Initiative Idea Game',
      // Idea-builder
      bTeam: 'Team name', bLeader: 'Team leader', bMembers: 'Team members', bCountry: 'Country / countries', bRoles: 'Roles in the team',
      bChallenge: 'The challenge', bAffected: 'Who is affected', bAI: 'How AI could help', bSolution: 'Our solution idea', bNext: 'Our next action',
      draftSaved: 'Draft saved on this device.', noAutosave: 'Autosave is not available in this browser.',
      draftRestored: 'Your saved draft was restored.', draftCleared: 'Draft cleared.',
      clearDraft: 'Clear all fields and delete the saved draft?',
      cardReady: 'Your idea card is ready. Copy it, print it or download it as an image.',
      builderCopied: 'Copied! Paste it into the showcase form or your team chat.',
      teamIdeaTitle: 'FROM AI USERS TO AI MAKERS — TEAM IDEA', workshopLabel: 'From AI Users to AI Makers',
      ledBy: 'Led by {name}', imageDownloaded: 'Image downloaded.',
      // Canvas
      blocksFilled: '{n} / {total} blocks filled',
      noGameCard: 'No Idea Game card found on this device yet. Generate one first in the Initiative Idea Game.',
      filledFrom: 'Filled {n} empty blocks from "{name}". Now write your SMART objectives below.',
      nothingReplaced: 'Those blocks already have text, so nothing was replaced.',
      goalFromIdea: 'Help {target} tackle "{problem}" while building {skill}.',
      ourInitiative: 'Our initiative', canvasTitle: 'Initiative Canvas', madeWith: 'Made with NAWAT AI Youth Lab',
      canvasCopied: 'Canvas copied.', fillOne: 'Fill at least one block first.',
      blocksDone: '{n} of 13 blocks completed', canvasImage: 'Canvas image downloaded.',
      clearCanvas: 'Clear the whole canvas on this device?', canvasCleared: 'Canvas cleared.',
      // SMART Court
      goalOf: 'Goal {n} of {total}', score: 'Score: {n}', quote: '“{text}”',
      correct: 'Correct verdict! ✓', notQuite: 'Not quite. It fails: {list}.', alreadySmart: 'nothing — it is already SMART',
      smartVersion: 'SMART version: ', seeResult: 'See my result', nextGoal: 'Next goal →',
      scored: 'You scored {n} / {total}. {msg}',
      perfect: 'Perfect score — you are a SMART judge!', great: 'Great job! You can spot weak goals.', goodStart: 'Good start. Read the SMART versions again and replay.',
      // SMART Builder
      gBy: 'By {when}, ', gIn: ' in {where}', gWill: ' will {what}', gMeasured: ', measured by {measure}', gEnd: '.',
      gWho: '[who]', gWhat: '[do what]',
      goalPlaceholder: 'Your goal will appear here as you type.',
      isSmart: 'Your goal is SMART ✓', yes: 'yes', notYet: 'not yet',
      writeFirst: 'Write your goal first.', addedToCanvas: 'Added to block 05 of your canvas.',
      addedPartial: 'Added to the canvas ({n}/5 SMART — you can improve it later).', goalCopied: 'Goal copied.'
    },
    ar: {
      navOpen: 'فتح القائمة', navClose: 'إغلاق القائمة',
      linkSoon: ' (الرابط قريباً)', copied: 'تم النسخ ✓', copyFailed: 'تعذّر النسخ',
      copyBlocked: 'النسخ غير متاح في هذا المتصفح. استخدموا الطباعة بدلاً منه.',
      cardBrand: 'N A W A T   A I', cardFooter: 'مختبر نوات للذكاء الاصطناعي  ·  مشكلة ← ذكاء اصطناعي ← حل ← فعل',
      pickTheme: 'اختاروا مجالاً لتظهر الاقتراحات.',
      promptCopied: 'تم نسخ الأمر. الصقوه في ChatGPT أو Claude أو Google AI Studio.',
      promptCopyFailed: 'تعذّر النسخ: حدّدوا النص وانسخوه يدوياً.',
      copyPrompt: 'نسخ الأمر',
      ideaReady: 'مبادرتكم «{name}» جاهزة.',
      fProblem: 'المشكلة', fWho: 'الفئة المستفيدة', fSkills: 'المهارات', fTwist: 'النشاط المميِّز',
      sPlan: 'خطة الأنشطة', sHave: 'بما هو متاح لديكم', sZero: 'خيار بدون ميزانية', sRoles: 'أدوار الفريق', sIndicators: 'مؤشرات النجاح', sAI: 'طوّروها بالذكاء الاصطناعي',
      sWhoSkills: 'الفئة · المهارات',
      ideaByline: 'فكرة مبادرة من مختبر نوات للذكاء الاصطناعي',
      pleaseChoose: 'يرجى اختيار: {list}.',
      k_theme: 'المجال', k_target: 'الفئة المستهدفة', k_skill: 'المهارة', k_format: 'الشكل', k_org: 'نوع الجهة', k_material: 'الموارد',
      ideaCopied: 'تم نسخ المبادرة.',
      imageDone: 'تم تحميل الصورة. شاركوها مع فريقكم.',
      gameLabel: 'لعبة أفكار المبادرات',
      bTeam: 'اسم الفريق', bLeader: 'قائد الفريق', bMembers: 'أعضاء الفريق', bCountry: 'البلد / البلدان', bRoles: 'الأدوار في الفريق',
      bChallenge: 'التحدي', bAffected: 'من المتأثر؟', bAI: 'كيف يساعد الذكاء الاصطناعي؟', bSolution: 'فكرة الحل', bNext: 'خطوتنا التالية',
      draftSaved: 'تم حفظ المسودة على هذا الجهاز.', noAutosave: 'الحفظ التلقائي غير متاح في هذا المتصفح.',
      draftRestored: 'تمت استعادة مسودتكم المحفوظة.', draftCleared: 'تم مسح المسودة.',
      clearDraft: 'مسح كل الحقول وحذف المسودة المحفوظة؟',
      cardReady: 'بطاقة فكرتكم جاهزة. انسخوها أو اطبعوها أو حمّلوها كصورة.',
      builderCopied: 'تم النسخ! الصقوها في استمارة المعرض أو في مجموعة فريقكم.',
      teamIdeaTitle: 'من مستخدمي الذكاء الاصطناعي إلى صنّاعه — فكرة الفريق', workshopLabel: 'من مستخدمين إلى صنّاع',
      ledBy: 'بقيادة {name}', imageDownloaded: 'تم تحميل الصورة.',
      blocksFilled: '{n} / {total} خانة مكتملة',
      noGameCard: 'لا توجد بطاقة من لعبة الأفكار على هذا الجهاز بعد. أنشئوا واحدة أولاً في لعبة أفكار المبادرات.',
      filledFrom: 'تم ملء {n} خانات فارغة من «{name}». اكتبوا الآن أهدافكم الذكية في الأسفل.',
      nothingReplaced: 'هذه الخانات فيها نص مسبقاً، فلم يُستبدل شيء.',
      goalFromIdea: 'مساعدة {target} على مواجهة «{problem}» مع تنمية مهارة {skill}.',
      ourInitiative: 'مبادرتنا', canvasTitle: 'بطاقة المبادرة', madeWith: 'أُعدّت مع مختبر نوات للذكاء الاصطناعي',
      canvasCopied: 'تم نسخ البطاقة.', fillOne: 'املؤوا خانة واحدة على الأقل أولاً.',
      blocksDone: '{n} من 13 خانة مكتملة', canvasImage: 'تم تحميل صورة البطاقة.',
      clearCanvas: 'مسح البطاقة كاملة من هذا الجهاز؟', canvasCleared: 'تم مسح البطاقة.',
      goalOf: 'الهدف {n} من {total}', score: 'النتيجة: {n}', quote: '«{text}»',
      correct: 'حكم صحيح! ✓', notQuite: 'ليس تماماً. الهدف لا يحقق: {list}.', alreadySmart: 'لا شيء — الهدف ذكي أصلاً',
      smartVersion: 'الصيغة الذكية: ', seeResult: 'اعرض نتيجتي', nextGoal: 'الهدف التالي ←',
      scored: 'نتيجتكم {n} / {total}. {msg}',
      perfect: 'علامة كاملة — أنتم قضاة SMART!', great: 'عمل رائع! تعرفون كيف تكتشفون الأهداف الضعيفة.', goodStart: 'بداية جيدة. اقرؤوا الصيغ الذكية مجدداً وأعيدوا اللعب.',
      gBy: 'بحلول {when}، ', gIn: ' في {where}', gWill: ' {what}', gMeasured: '، ويُقاس ذلك عبر {measure}', gEnd: '.',
      gWho: '[من؟]', gWhat: '[ماذا سيفعلون؟]',
      goalPlaceholder: 'سيظهر هدفكم هنا أثناء الكتابة.',
      isSmart: 'هدفكم ذكي (SMART) ✓', yes: 'نعم', notYet: 'ليس بعد',
      writeFirst: 'اكتبوا هدفكم أولاً.', addedToCanvas: 'أُضيف إلى الخانة 05 في بطاقتكم.',
      addedPartial: 'أُضيف إلى البطاقة ({n}/5 من شروط SMART — يمكنكم تحسينه لاحقاً).', goalCopied: 'تم نسخ الهدف.'
    }
  };
  const lang = (document.documentElement.lang || 'en').slice(0, 2) === 'ar' ? 'ar' : 'en';
  const dict = STR[lang];
  window.NAWAT_LANG = lang;
  window.NAWAT_RTL = lang === 'ar';
  /** Translate a key, filling {placeholders} from vars. Falls back to English. */
  window.t = function (key, vars) {
    const s = dict[key] !== undefined ? dict[key] : (STR.en[key] !== undefined ? STR.en[key] : key);
    return vars ? s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m)) : s;
  };
})();
