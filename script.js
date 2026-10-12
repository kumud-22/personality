// Teacher 5.0 — local, offline-friendly AI-style profile generator.
// No API key is used. Answers are matched to teaching-style signals in this browser.

const questionBank = [
  {
    q: "How do you usually like students to participate in a lesson?",
    a: [
      { text: "Open discussion and questions", tags: ["discussion", "curiosity"] },
      { text: "Think first, then answer", tags: ["structure", "reflection"] },
      { text: "Students volunteer when they have something to add", tags: ["support", "discussion"] },
      { text: "A mix of discussion, activities and individual work", tags: ["flexibility", "practical"] }
    ]
  },
  {
    q: "A student is struggling to understand a topic. What would you most likely do first?",
    a: [
      { text: "Explain the idea in a different way", tags: ["clarity", "support"] },
      { text: "Use an example from everyday life", tags: ["practical", "creativity"] },
      { text: "Work through the problem with the student", tags: ["support", "structure"] },
      { text: "Ask classmates to discuss another approach", tags: ["discussion", "flexibility"] }
    ]
  },
  {
    q: "What makes a lesson feel successful to you?",
    a: [
      { text: "Students genuinely understand the concept", tags: ["clarity", "support"] },
      { text: "Students ask thoughtful questions", tags: ["discussion", "curiosity"] },
      { text: "Students can apply what they learned", tags: ["practical", "structure"] },
      { text: "The class stays engaged and involved", tags: ["creativity", "flexibility"] }
    ]
  },
  {
    q: "How would you prefer to give feedback on student work?",
    a: [
      { text: "Clear written comments", tags: ["structure", "clarity"] },
      { text: "A short conversation with the student", tags: ["support", "discussion"] },
      { text: "Specific points on what to improve", tags: ["clarity", "structure"] },
      { text: "Positive feedback plus one or two next steps", tags: ["support", "flexibility"] }
    ]
  },
  {
    q: "A student gives an unexpected but interesting answer. What would you do?",
    a: [
      { text: "Ask them to explain their reasoning", tags: ["curiosity", "discussion"] },
      { text: "Discuss the idea with the class", tags: ["discussion", "flexibility"] },
      { text: "Encourage them to explore it further", tags: ["creativity", "support"] },
      { text: "Connect it to the topic being taught", tags: ["clarity", "structure"] }
    ]
  },
  {
    q: "How comfortable are you with using technology in teaching?",
    a: [
      { text: "I enjoy using digital tools regularly", tags: ["creativity", "flexibility"] },
      { text: "I use technology when it genuinely helps", tags: ["practical", "structure"] },
      { text: "I prefer a balance of digital and traditional methods", tags: ["flexibility", "support"] },
      { text: "I mostly prefer traditional teaching methods", tags: ["clarity", "structure"] }
    ]
  },
  {
    q: "If a class becomes distracted, what would you be most likely to do?",
    a: [
      { text: "Bring everyone back to the main task", tags: ["structure", "clarity"] },
      { text: "Change the activity or ask a question", tags: ["flexibility", "discussion"] },
      { text: "Pause and address the distraction directly", tags: ["clarity", "support"] },
      { text: "Turn the moment into a short interactive activity", tags: ["creativity", "practical"] }
    ]
  },
  {
    q: "Which kind of classroom activity would you most enjoy?",
    a: [
      { text: "A practical experiment or demonstration", tags: ["practical", "curiosity"] },
      { text: "A debate or group discussion", tags: ["discussion", "curiosity"] },
      { text: "A creative project", tags: ["creativity", "flexibility"] },
      { text: "A problem-solving challenge", tags: ["structure", "practical"] }
    ]
  },
  {
    q: "When planning a lesson, what matters most to you?",
    a: [
      { text: "Clear learning objectives", tags: ["structure", "clarity"] },
      { text: "Knowing what students already understand", tags: ["support", "clarity"] },
      { text: "Having activities that support the topic", tags: ["practical", "creativity"] },
      { text: "Being ready to adapt if the class needs something different", tags: ["flexibility", "support"] }
    ]
  },
  {
    q: "A student makes a mistake while answering in class. How would you usually respond?",
    a: [
      { text: "Ask questions that help them find the mistake", tags: ["discussion", "clarity"] },
      { text: "Give them another chance to work through it", tags: ["support", "structure"] },
      { text: "Invite the class to discuss the answer", tags: ["discussion", "flexibility"] },
      { text: "Treat it as part of the learning process", tags: ["support", "curiosity"] }
    ]
  },
  {
    q: "Which statement best describes your approach to homework?",
    a: [
      { text: "It reinforces what was taught", tags: ["structure", "clarity"] },
      { text: "It should be focused and purposeful", tags: ["practical", "structure"] },
      { text: "It should sometimes challenge students to think independently", tags: ["curiosity", "discussion"] },
      { text: "It should be balanced with students' other responsibilities", tags: ["support", "flexibility"] }
    ]
  },
  {
    q: "What do you value most in a student?",
    a: [
      { text: "Curiosity", tags: ["curiosity", "discussion"] },
      { text: "Persistence", tags: ["structure", "support"] },
      { text: "Respect and cooperation", tags: ["support", "flexibility"] },
      { text: "Independent thinking", tags: ["curiosity", "creativity"] }
    ]
  },
  {
    q: "How would you most like students to remember your lessons?",
    a: [
      { text: "They understood something they once found difficult", tags: ["clarity", "support"] },
      { text: "They connected the lesson to real life", tags: ["practical", "creativity"] },
      { text: "They left with a question they wanted to explore", tags: ["curiosity", "discussion"] },
      { text: "They enjoyed learning something new", tags: ["creativity", "flexibility"] }
    ]
  },
  {
    q: "If you had an extra 15 minutes in a lesson, what would you most likely use it for?",
    a: [
      { text: "Questions and discussion", tags: ["discussion", "curiosity"] },
      { text: "A practical demonstration", tags: ["practical", "creativity"] },
      { text: "A short challenge or activity", tags: ["practical", "flexibility"] },
      { text: "Reviewing the part students found difficult", tags: ["clarity", "support"] }
    ]
  },
  {
    q: "How would you describe your ideal teacher-student relationship?",
    a: [
      { text: "Respectful and approachable", tags: ["support", "structure"] },
      { text: "Friendly but with clear boundaries", tags: ["structure", "support"] },
      { text: "Open and communication-focused", tags: ["discussion", "flexibility"] },
      { text: "Supportive and encouraging", tags: ["support", "creativity"] }
    ]
  },
  {
    q: "When a topic is difficult, what helps students learn it best?",
    a: [
      { text: "Breaking it into clear, manageable steps", tags: ["clarity", "structure"] },
      { text: "Seeing a real-world example", tags: ["practical", "clarity"] },
      { text: "Talking it through together", tags: ["discussion", "support"] },
      { text: "Trying an activity and learning by doing", tags: ["creativity", "practical"] }
    ]
  },
  {
    q: "How do you prefer to check whether students understood a lesson?",
    a: [
      { text: "A few focused questions", tags: ["clarity", "structure"] },
      { text: "A short practical task", tags: ["practical", "creativity"] },
      { text: "A discussion where students explain their thinking", tags: ["discussion", "curiosity"] },
      { text: "A quick check-in and adapting from there", tags: ["flexibility", "support"] }
    ]
  },
  {
    q: "What would you most want students to feel comfortable doing in your classroom?",
    a: [
      { text: "Asking questions when they are unsure", tags: ["discussion", "support"] },
      { text: "Trying again after a mistake", tags: ["support", "structure"] },
      { text: "Sharing original ideas", tags: ["creativity", "curiosity"] },
      { text: "Connecting concepts to everyday life", tags: ["practical", "curiosity"] }
    ]
  }
];

const profiles = {
  discussion: {
    title: "The Discussion Architect", icon: "💬",
    subtitle: "A classroom where questions are always welcome.",
    summary: "Your choices suggest a teaching style that makes room for dialogue, thoughtful questions and shared discovery. You would rather hear students explain their thinking than simply memorise an answer.",
    vibeTitle: "Curiosity leads the way",
    vibeText: "You make learning feel like a conversation, not a one-way broadcast. The class gets to think out loud and build ideas together.",
    strengthTitle: "Turning questions into learning",
    strengthText: "You invite students to explain, challenge and connect ideas—while keeping the lesson moving toward its goal.",
    signatureTitle: "“Talk me through how you got there.”",
    signatureText: "Your signature move is asking one extra question that helps a student discover what they really understand.",
    catchphrase: "A good question can be the beginning of a brilliant lesson."
  },
  practical: {
    title: "The Practical Professor", icon: "🧪",
    subtitle: "Show it, try it, understand it.",
    summary: "Your answers lean toward examples, demonstrations and useful applications. You seem to value learning that students can connect to the world outside the classroom.",
    vibeTitle: "Learning by doing",
    vibeText: "Abstract ideas become easier to grasp when students can test them, see them or connect them to everyday situations.",
    strengthTitle: "Making ideas tangible",
    strengthText: "You look for ways to turn a concept into something students can apply, investigate or solve.",
    signatureTitle: "“Where could we use this in real life?”",
    signatureText: "You bring a topic to life with a demonstration, a practical example or a challenge that makes the idea stick.",
    catchphrase: "If students can use it, they can truly understand it."
  },
  creativity: {
    title: "The Creative Professor", icon: "🎨",
    subtitle: "Fresh approaches, flexible thinking, lively lessons.",
    summary: "Your choices point toward variety, experimentation and original thinking. You would likely enjoy giving students more than one way to explore a topic.",
    vibeTitle: "A little unexpected—in a good way",
    vibeText: "You like learning experiences that spark interest and make room for students to approach a problem creatively.",
    strengthTitle: "Finding another route",
    strengthText: "When one explanation or activity is not working, you are ready to try a new angle rather than repeat the same approach.",
    signatureTitle: "“Let’s try a different way.”",
    signatureText: "You turn a lesson into a mini-workshop where students can experiment, create and discover connections.",
    catchphrase: "There is often more than one interesting way to learn something."
  },
  structure: {
    title: "The Clear-Cut Educator", icon: "📘",
    subtitle: "Clear goals, useful feedback and steady progress.",
    summary: "Your answers suggest that clarity and purposeful structure matter to you. You want students to know what they are learning, how to improve and what the next step looks like.",
    vibeTitle: "Clear and focused",
    vibeText: "You value well-organised lessons where expectations are understandable and every activity has a reason.",
    strengthTitle: "Making progress visible",
    strengthText: "You break complicated ideas into manageable steps and help students see how their understanding is developing.",
    signatureTitle: "“Let’s take it one step at a time.”",
    signatureText: "You make the path forward feel achievable by setting a clear goal and giving practical next steps.",
    catchphrase: "Clarity turns a big challenge into a series of doable steps."
  },
  support: {
    title: "The Supportive Mentor", icon: "🌱",
    subtitle: "High expectations, encouragement and room to grow.",
    summary: "Your answers highlight the importance of support, feedback and understanding what students need. You would likely try to help learners feel able to ask for help and improve with practice.",
    vibeTitle: "Encouragement with purpose",
    vibeText: "You want students to feel respected while still being challenged to learn and keep improving.",
    strengthTitle: "Helping learners try again",
    strengthText: "You treat mistakes as useful information and focus on what students can do next to build understanding.",
    signatureTitle: "“You’re not there yet—let’s work it out.”",
    signatureText: "You combine reassurance with a practical next step, so encouragement also helps students move forward.",
    catchphrase: "Progress grows when students feel supported enough to keep trying."
  },
  flexibility: {
    title: "The Adaptive Guide", icon: "🧭",
    subtitle: "Responsive teaching that meets the moment.",
    summary: "Your choices suggest you value adapting the lesson to the class in front of you. You are open to changing the activity, pace or explanation when students need a different route.",
    vibeTitle: "Read the room, then respond",
    vibeText: "You aim to balance a plan with the flexibility to change course when a class needs something different.",
    strengthTitle: "Adjusting without losing the goal",
    strengthText: "You can keep the learning objective in view while changing how the class gets there.",
    signatureTitle: "“Let’s see what works best for this class.”",
    signatureText: "You notice when the original plan needs a tweak and turn that moment into a better learning opportunity.",
    catchphrase: "A good plan matters—and so does knowing when to adapt it."
  },
  curiosity: {
    title: "The Curious Explorer", icon: "🔎",
    subtitle: "Follow the question and find the connection.",
    summary: "Your choices lean toward exploration and independent thinking. You would likely enjoy helping students connect ideas, investigate possibilities and ask what lies beyond the first answer.",
    vibeTitle: "Wonder is part of the lesson",
    vibeText: "You treat curiosity as a useful learning tool and make space for students to explore why something works.",
    strengthTitle: "Making room for discovery",
    strengthText: "You encourage students to investigate, explain their reasoning and follow a thoughtful question further.",
    signatureTitle: "“What makes you think that?”",
    signatureText: "You invite students to look for evidence, notice connections and keep asking useful questions.",
    catchphrase: "Curiosity turns information into something worth understanding."
  },
  clarity: {
    title: "The Clarity Coach", icon: "💡",
    subtitle: "Make the confusing part make sense.",
    summary: "Your answers suggest you care about clear explanations and checking what students understand. You would likely look for the point where an idea gets difficult and explain it from another angle.",
    vibeTitle: "Simple, not simplistic",
    vibeText: "You aim to make complex ideas understandable without losing what makes them important.",
    strengthTitle: "Finding the missing step",
    strengthText: "You focus on useful examples, manageable explanations and feedback that helps students move forward.",
    signatureTitle: "“Which part should we unpack first?”",
    signatureText: "You slow down at the right moment, identify the sticking point and make the next step clearer.",
    catchphrase: "Understanding begins when the confusing part becomes clear."
  }
};

const tagLabels = {
  discussion: "Discussion", practical: "Practical learning", creativity: "Creativity",
  structure: "Structure", support: "Student support", flexibility: "Flexibility",
  curiosity: "Curiosity", clarity: "Clear explanations"
};

const intro = document.getElementById("intro");
const quizPanel = document.getElementById("quizPanel");
const resultPanel = document.getElementById("resultPanel");
const startBtn = document.getElementById("startBtn");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const retryBtn = document.getElementById("retryBtn");
const printBtn = document.getElementById("printBtn");

let activeQuestions = [];
let answers = [];
let currentIndex = 0;

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startQuiz() {
  // Pick a fresh random set and random order on every run.
  activeQuestions = shuffle(questionBank).slice(0, 5);
  answers = Array(activeQuestions.length).fill(null);
  currentIndex = 0;
  intro.classList.add("hidden");
  resultPanel.classList.add("hidden");
  quizPanel.classList.remove("hidden");
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const item = activeQuestions[currentIndex];
  document.getElementById("currentNumber").textContent = String(currentIndex + 1).padStart(2, "0");
  document.getElementById("questionIndex").textContent = `QUESTION ${String(currentIndex + 1).padStart(2, "0")}`;
  document.getElementById("questionText").textContent = item.q;
  document.getElementById("progressFill").style.width = `${((currentIndex + 1) / activeQuestions.length) * 100}%`;
  backBtn.disabled = currentIndex === 0;
  nextBtn.disabled = answers[currentIndex] === null;
  nextBtn.innerHTML = currentIndex === activeQuestions.length - 1 ? 'Reveal my profile <span>✦</span>' : 'Next question <span>→</span>';

  const list = document.getElementById("answerList");
  list.innerHTML = "";
  item.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `answer-option${answers[currentIndex] === index ? " selected" : ""}`;
    button.setAttribute("aria-pressed", answers[currentIndex] === index ? "true" : "false");
    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = String.fromCharCode(65 + index);
    const text = document.createElement("span");
    text.textContent = answer.text;
    button.append(letter, text);
    button.addEventListener("click", () => {
      answers[currentIndex] = index;
      renderQuestion();
    });
    list.appendChild(button);
  });
}

function calculateScores() {
  const scores = Object.fromEntries(Object.keys(tagLabels).map(tag => [tag, 0]));
  answers.forEach((answerIndex, questionIndex) => {
    const answer = activeQuestions[questionIndex].a[answerIndex];
    answer.tags.forEach(tag => scores[tag]++);
  });
  return scores;
}

function buildProfile(scores) {
  // Sort by scores, then use the leading signal as the profile.
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  let primary = ranked[0][0];
  // A tie-breaker based on a random choice keeps repeated rounds feeling fresh.
  const tied = ranked.filter(entry => entry[1] === ranked[0][1]).map(entry => entry[0]);
  if (tied.length > 1) primary = tied[Math.floor(Math.random() * tied.length)];
  return profiles[primary];
}

function showResults() {
  const scores = calculateScores();
  const profile = buildProfile(scores);

  document.getElementById("resultIcon").textContent = profile.icon;
  document.getElementById("resultTitle").textContent = profile.title;
  document.getElementById("resultSubtitle").textContent = profile.subtitle;
  document.getElementById("resultSummary").textContent = profile.summary;
  document.getElementById("vibeTitle").textContent = profile.vibeTitle;
  document.getElementById("vibeText").textContent = profile.vibeText;
  document.getElementById("strengthTitle").textContent = profile.strengthTitle;
  document.getElementById("strengthText").textContent = profile.strengthText;
  document.getElementById("signatureTitle").textContent = profile.signatureTitle;
  document.getElementById("signatureText").textContent = profile.signatureText;
  document.getElementById("catchphrase").textContent = profile.catchphrase;

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const max = Math.max(1, ...sorted.map(entry => entry[1]));
  const scoreBars = document.getElementById("scoreBars");
  scoreBars.innerHTML = "";
  sorted.forEach(([tag, value]) => {
    const row = document.createElement("div");
    row.className = "score-row";
    const label = document.createElement("span");
    label.className = "score-name";
    label.textContent = tagLabels[tag];
    const track = document.createElement("div");
    track.className = "score-track";
    const fill = document.createElement("div");
    fill.className = "score-fill";
    fill.style.width = "0%";
    track.appendChild(fill);
    const number = document.createElement("span");
    number.className = "score-value";
    number.textContent = value;
    row.append(label, track, number);
    scoreBars.appendChild(row);
    requestAnimationFrame(() => { fill.style.width = `${Math.max(12, (value / max) * 100)}%`; });
  });

  quizPanel.classList.add("hidden");
  resultPanel.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

startBtn.addEventListener("click", startQuiz);
retryBtn.addEventListener("click", startQuiz);
backBtn.addEventListener("click", () => {
  if (currentIndex > 0) { currentIndex--; renderQuestion(); }
});
nextBtn.addEventListener("click", () => {
  if (answers[currentIndex] === null) return;
  if (currentIndex < activeQuestions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    showResults();
  }
});
printBtn.addEventListener("click", () => window.print());
