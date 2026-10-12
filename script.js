const questionPool = [
{q:"When a student is struggling with a topic, what would you prefer to do first?",o:[["🧩","Explain it using a different example"],["💬","Ask questions to find where they are stuck"],["👥","Let them discuss it with classmates"],["✍️","Give a short practice activity"]]},
{q:"Which kind of classroom activity do you enjoy using most?",o:[["💬","Discussion and questions"],["🧪","Experiments or demonstrations"],["🎯","Practice and problem-solving"],["🎨","Projects and creative work"]]},
{q:"How do you prefer students to show that they understand a topic?",o:[["🗣️","Explain it in their own words"],["📝","Solve questions independently"],["🛠️","Apply it to a real situation"],["🤝","Work on something together"]]},
{q:"What matters most to you when planning a lesson?",o:[["🎯","Students understand the main concept"],["🙋","Students actively participate"],["🌍","Students connect it to real life"],["✨","Students become curious about the topic"]]},
{q:"A class is unusually quiet. What would you most likely try?",o:[["❓","Ask an open-ended question"],["👥","Start a small group discussion"],["🎲","Change the activity"],["🙂","Give students a little time and observe"]]},
{q:"Which feedback style feels most useful to you?",o:[["🎯","Specific feedback on what to improve"],["🌟","Encouragement plus one improvement"],["💬","A conversation about the work"],["📋","A clear checklist or rubric"]]},
{q:"What do you value most in a good student?",o:[["🧠","Curiosity"],["💪","Consistency"],["🤝","Respect and cooperation"],["🚀","Willingness to try and improve"]]},
{q:"When introducing a difficult new topic, where would you start?",o:[["🌍","A real-world example"],["📖","The basic concept"],["❓","A question or problem"],["👀","A demonstration or visual"]]},
{q:"How do you usually prefer to keep students engaged?",o:[["💬","Ask questions throughout the lesson"],["🧪","Use activities or demonstrations"],["🎯","Give students a clear challenge"],["📚","Connect the topic to their interests"]]},
{q:"Which classroom atmosphere do you prefer?",o:[["🤫","Calm and focused"],["💬","Interactive and discussion-based"],["⚡","Energetic and active"],["🌱","Relaxed but purposeful"]]},
{q:"When a student makes a mistake, what response feels most helpful?",o:[["🔍","Help them find where the mistake happened"],["🔄","Ask them to try another approach"],["💡","Give a hint rather than the answer"],["🌟","Encourage them and revisit the concept"]]},
{q:"Which school activity would you be most likely to volunteer for?",o:[["🎤","Debate, speaking or presentations"],["🧪","Science or technology exhibition"],["🎭","Cultural or creative event"],["🏆","Competition or quiz"]]},
{q:"How do you prefer to use technology in teaching?",o:[["💻","Interactive presentations or simulations"],["🎥","Videos and visual explanations"],["🤖","AI tools and digital assistants"],["🧰","Only when it genuinely improves the lesson"]]},
{q:"What makes a lesson feel successful to you?",o:[["💡","Students have an 'aha!' moment"],["🙋","Many students participate"],["🎯","Students can apply what they learned"],["😊","Students leave interested in learning more"]]},
{q:"When you have to adapt a lesson, what would you prioritize?",o:[["⏱️","Keeping the main objective on track"],["🙋","Responding to what students need"],["🔄","Trying a different explanation"],["🎯","Simplifying the task without losing the idea"]]},
{q:"What kind of question from a student do you enjoy most?",o:[["🤔","A thoughtful 'why?' question"],["🌍","A real-world connection"],["🔗","A question linking two topics"],["🚀","A surprising question you hadn't considered"]]}
];
let questions=[], current=0, answers=[];
function pickRandomQuestions(n=5){return [...questionPool].sort(()=>Math.random()-0.5).slice(0,n).map(x=>({q:x.q,options:x.o}));}
function startGame(){questions=pickRandomQuestions();current=0;answers=[];renderQuestion();}

function renderQuestion() {
  const item = questions[current];
  qNumber.textContent = current + 1;
  progressBar.style.width = `${((current + 1) / questions.length) * 100}%`;
  questionArea.innerHTML = `
    <div class="question-kicker">AI INPUT • CHOICE ${current + 1}</div>
    <div class="question">${item.q}</div>
    <div class="options">
      ${item.options.map((o,i) => `
        <button class="option ${answers[current] === i ? "selected" : ""}" data-index="${i}">
          <span class="letter">${String.fromCharCode(65+i)}</span>
          ${o[0]} ${o[1]}
        </button>`).join("")}
    </div>`;
  document.querySelectorAll(".option").forEach(btn => {
    btn.addEventListener("click", () => {
      answers[current] = Number(btn.dataset.index);
      renderQuestion();
    });
  });
  backBtn.disabled = current === 0;
  nextBtn.textContent = current === questions.length - 1 ? "Analyze with AI →" : "Next →";
}

nextBtn.addEventListener("click", () => {
  if (answers[current] === undefined) {
    nextBtn.animate([{transform:"translateX(-4px)"},{transform:"translateX(4px)"},{transform:"translateX(0)"}], {duration:180});
    return;
  }
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResult();
  }
});

backBtn.addEventListener("click", () => {
  if (current > 0) { current--; renderQuestion(); }
});

document.getElementById("againBtn").addEventListener("click", () => {
  result.classList.add("hidden");
  quiz.classList.remove("hidden");
  startGame();
  window.scrollTo({top:0, behavior:"smooth"});
});

document.getElementById("printBtn").addEventListener("click", () => window.print());

function showResult() {
  const resultData = generateProfile();
  resultContent.innerHTML = `
    <div class="profile-head">
      <div class="avatar">${resultData.emoji}</div>
      <div>
        <div class="type">${resultData.title}</div>
        <div class="subtitle">${resultData.subtitle}</div>
      </div>
    </div>
    <div class="grid">
      <div class="card"><h3>Teaching style</h3><p>${resultData.style}</p></div>
      <div class="card"><h3>Special ability</h3><p>${resultData.power}</p></div>
      <div class="card"><h3>Weakness</h3><p>${resultData.weakness}</p></div>
      <div class="card"><h3>Classroom status</h3><p>${resultData.status}</p></div>
    </div>
    <div class="quote">💬 ${resultData.catchphrase}</div>
    <div class="scores">
      ${resultData.scores.map(s => `
        <div class="score">
          <div class="score-row"><span>${s[0]}</span><strong>${s[1]}%</strong></div>
          <div class="bar"><i style="width:${s[1]}%"></i></div>
        </div>`).join("")}
    </div>`;
  quiz.classList.add("hidden");
  result.classList.remove("hidden");
  window.scrollTo({top:0, behavior:"smooth"});
}

function generateProfile() {
  const picks=answers.map((a,i)=>questions[i].options[a][1].toLowerCase()).join(" ");
  const profiles=[
    [/different example|different explanation|another approach|simplifying|basic concept/,
      ["🧩","The Adaptive Explainer","You change the explanation, not the goal.","You value finding another route when students do not understand something the first time.","Turning a difficult idea into a simpler example.","You may spend five extra minutes finding the perfect explanation.","Teaching approach: ADAPTIVE","“Let's try looking at it another way.”",[["Adaptability",96],["Clarity",94],["Patience",91],["Creativity",84]]]],
    [/discussion|conversation|open-ended|questions|participate/,
      ["💬","The Discussion Driver","Your classroom has questions — lots of them.","You naturally make space for students to speak, question ideas and build understanding through conversation.","Turning a quiet room into a thoughtful discussion.","One good question can accidentally create ten more.","Teaching approach: INTERACTIVE","“What do you think — and why?”",[["Interaction",98],["Listening",94],["Curiosity",96],["Classroom energy",88]]]],
    [/real-world|apply|demonstration|experiment|activity/,
      ["🧪","The Practical Mentor","If students can try it, even better.","You prefer connecting ideas to examples, activities and situations students can actually understand and use.","Making abstract concepts feel real.","A simple explanation can turn into an unexpected mini-project.","Teaching approach: HANDS-ON","“Okay — where would we use this in real life?”",[["Practical thinking",98],["Engagement",93],["Curiosity",91],["Creativity",89]]]],
    [/curiosity|interested|creative|aha|surprising|why/,
      ["💡","The Curiosity Coach","The best lesson ends with another question.","You care about curiosity, exploration and helping students become interested beyond the textbook.","Turning a small question into a bigger idea.","You may accidentally make the lesson too interesting to finish on time.","Teaching approach: CURIOUS","“Good question. Let's find out.”",[["Curiosity",99],["Creativity",95],["Engagement",93],["Exploration",97]]]]
  ];
  let m=profiles.find(x=>x[0].test(picks))?.[1] || ["🌱","The Balanced Mentor","Clear goals, real learning, room to grow.","You value a balanced classroom where students understand concepts, participate and have room to improve.","Adjusting your approach to what the class needs.","You may try to make every lesson work for everyone.","Teaching approach: BALANCED","“Let's make sure everyone understands.”",[["Balance",95],["Clarity",92],["Support",94],["Adaptability",90]]];
  const scores=m[8].map((x,i)=>[x[0],Math.max(70,Math.min(100,x[1]+((answers.reduce((a,b)=>a+b,0)+i)%5)-2))]);
  return {emoji:m[0],title:m[1],subtitle:m[2],style:m[3],power:m[4],weakness:m[5],status:m[6],catchphrase:m[7],scores};
}
renderQuestion();

startGame();
