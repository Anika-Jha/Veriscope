// Echo Chamber Escape Game - Chatroom simulation with bias detection
class EchoChamberGame {
    constructor() {
      this.currentPostIndex = 0;
      this.echoScore = 0;
      this.correctChoices = 0;
      this.totalPosts = 0;
      this.chatHistory = [];
      this.chatPosts = [];
  
      this.gameContainer = document.getElementById('echochamber-content');
      this.aiIntegration = new AIIntegration();
    }
  
    start() {
      this.reset();
  
      // Load and randomize fallback posts
      this.chatPosts = this.shuffleArray(
        (window.FALLBACK_STORIES?.echochamber || []).map((p, i) => ({
          id: i + 1,
          text: p.text,
          biasLevel: p.biasLevel || (p.isBiased ? "biased" : "balanced"),
          explanation: p.explanation || "This example shows how bias can shape conversations."
        }))
      );
      this.totalPosts = Math.min(7, this.chatPosts.length);
  
      this.showTutorial();
      window.playSound?.("ping");
    }
  
    // Shuffle utility
    shuffleArray(arr) {
      return arr.sort(() => Math.random() - 0.5);
    }
  
    // Step 1: Tutorial
    showTutorial() {
      this.gameContainer.innerHTML = `
        <div class="tutorial">
          <h2>📘 How This Game Works</h2>
          <p>Welcome to <strong>Echo Chamber Escape</strong>!</p>
          <ul>
            <li>👍 <b>Support</b>: Increases echo if the post is biased.</li>
            <li>❓ <b>Question</b>: Reduces echo and shows critical thinking.</li>
            <li>🤐 <b>Ignore</b>: Leaves echo unchanged (silence can be harmful).</li>
          </ul>
          <p>Your goal is to <b>keep the Echo Level low</b> by thinking critically!</p>
          <button class="action-btn" id="tutorial-next">Got it!</button>
        </div>
      `;
      document.getElementById("tutorial-next")
        .onclick = () => this.showIntroduction();
    }
  
    // Step 2: Intro
    showIntroduction() {
      this.gameContainer.innerHTML = `
        <div class="intro">
          <h2>🔊 Echo Chamber Escape</h2>
          <p>💬 Navigate discussions wisely. Supporting bias traps you deeper. Questioning helps you escape!</p>
          <button class="action-btn" id="enter-btn">Enter the Discussion</button>
        </div>
      `;
      document.getElementById("enter-btn")
        .onclick = () => this.enterChatroom();
    }
  
    // Step 3: Start chat
    enterChatroom() {
      this.showChatroom();
      this.loadNextPost();
    }
  
    showChatroom() {
      this.gameContainer.innerHTML = `
        <div class="echo-interface">
          <div class="header">
            Post ${this.currentPostIndex + 1} of ${this.totalPosts} &nbsp;|&nbsp;
            Echo Level: <span style="color:${this.getEchoColor()}">${this.echoScore}%</span>
          </div>
          <div class="chatroom" id="chatroom">
            ${this.renderChatHistory()}
            <div id="current-post" class="chat-post highlight"></div>
          </div>
          <div class="actions">
            <button id="btn-support">👍 Support</button>
            <button id="btn-question">❓ Question</button>
            <button id="btn-ignore">🤐 Ignore</button>
          </div>
        </div>
      `;
      document.getElementById("btn-support")
        .onclick = () => this.handleChoice("support");
      document.getElementById("btn-question")
        .onclick = () => this.handleChoice("question");
      document.getElementById("btn-ignore")
        .onclick = () => this.handleChoice("ignore");
    }
  
    renderChatHistory() {
      return this.chatHistory.map((p, i) => `
        <div class="chat-post ${p.biasLevel}">
          <div><strong>User${i+1}:</strong> ${p.text}</div>
          <div class="user-choice">Your response: ${p.userChoice}</div>
        </div>
      `).join("");
    }
  
    loadNextPost() {
      if (this.currentPostIndex >= this.totalPosts) {
        return this.showFinalResults();
      }
      const post = this.chatPosts[this.currentPostIndex];
      document.getElementById("current-post").innerHTML = `
        <strong>ForumUser:</strong> ${post.text}<br/>
        <em>How do you respond?</em>
      `;
      window.playSound?.("ping");
    }
  
    async handleChoice(choice) {
      const post = this.chatPosts[this.currentPostIndex];
      document.querySelector(".actions").style.pointerEvents = "none";
  
      let result = null;
      try {
        result = await this.aiIntegration.analyzeBias(post.text);
      } catch { /* ignore AI failures */ }
  
      if (!result) {
        result = { biasLevel: post.biasLevel, reasoning: post.explanation };
      }
  
      this.processChoice(choice, result, post);
    }
  
    processChoice(choice, result, post) {
      let echoImpact = 0, feedback = "", good = false;
      const isBiased = result.biasLevel === "biased";
  
      switch (choice) {
        case "support":
          echoImpact = isBiased ? 15 : 0;
          feedback = isBiased
            ? "You reinforced bias! Supporting biased posts amplifies the echo chamber."
            : "You supported balanced content. Good job!";
          good = !isBiased;
          break;
        case "question":
          echoImpact = isBiased ? -10 : -5;
          feedback = "You questioned the post. This reduces bias and promotes healthy debate!";
          good = true;
          break;
        case "ignore":
          echoImpact = 5;
          feedback = "Ignoring lets bias continue unchallenged. Sometimes silence is harmful.";
          break;
      }
  
      this.echoScore = Math.max(0, Math.min(100, this.echoScore + echoImpact));
      if (good) this.correctChoices++;
      this.chatHistory.push({
        text: post.text,
        biasLevel: isBiased ? "biased" : "balanced",
        userChoice: choice
      });
  
      this.showPostResult(feedback, echoImpact, result.reasoning);
    }
  
    showPostResult(feedback, echoImpact, explanation) {
      this.gameContainer.innerHTML = `
        <div class="result">
          <p><strong>Feedback:</strong> ${feedback}</p>
          <p><strong>Why it matters:</strong> ${explanation}</p>
          <p>Echo Level now: <span style="color:${this.getEchoColor()}">${this.echoScore}%</span>
            (${echoImpact > 0 ? "+" : ""}${echoImpact})
          </p>
          <button id="next-btn">Next Post</button>
        </div>
      `;
      document.getElementById("next-btn")
        .onclick = () => this.nextPost();
    }
  
    nextPost() {
      this.currentPostIndex++;
      this.showChatroom();
      this.loadNextPost();
    }
  
    getEchoColor() {
      if (this.echoScore <= 30) return "green";
      if (this.echoScore <= 60) return "orange";
      return "red";
    }
  
    showFinalResults() {
      const rate = Math.round((this.correctChoices / this.totalPosts) * 100);
      const msg = this.echoScore <= 30
        ? "🎉 You Escaped the Echo Chamber!"
        : this.echoScore <= 50
          ? "🤔 Partial Escape"
          : "📢 Trapped in the Echo Chamber";
  
      this.gameContainer.innerHTML = `
        <div class="final">
          <h2>Discussion Complete</h2>
          <p>Echo Score: ${this.echoScore}%</p>
          <p>Critical Thinking: ${rate}%</p>
          <h3>${msg}</h3>
  
          <div style="background:#e8f4f8; padding:1rem; border-radius:10px; margin-top:1.2rem;">
            <h3>🔊 What is an Echo Chamber?</h3>
            <ul>
              <li>
                <b>An echo chamber is a space</b> where you mostly hear opinions that match your own. Dissenting voices get filtered out.
              </li>
              <li>
                <b>It strengthens bias:</b> Repeating the same viewpoints makes them seem more true—even if they're not.
              </li>
              <li>
                <b>Breaking out requires critical inquiry:</b> Question assumptions, seek evidence, and welcome respectful debate.
              </li>
              <li>
                <b>UNESCO Media & Information Literacy skills:</b>
                <ul>
                  <li>Access diverse, reliable information.</li>
                  <li>Identify and reflect on your own biases.</li>
                  <li>Evaluate sources and claims critically.</li>
                  <li>Respect and engage with different viewpoints.</li>
                </ul>
              </li>
            </ul>
            <p>
              <strong>Why escape?</strong> 
              Because challenging the echo strengthens democratic dialogue, reduces polarization, and helps you make informed decisions.
            </p>
          </div>
  
          <button id="exit-btn" class="action-btn verify-btn" style="margin-top:1.4rem;">
            Continue Journey <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      `;
  
      document.getElementById("exit-btn")
        .addEventListener("click", () => this.complete());
  
      window.playSound?.("completion");
    }
  
    complete() {
      // Package and hand off a learning card to your host platform:
      const learnHtml = `
        <h3>🔊 Understanding Echo Chambers</h3>
        <ul>
          <li><b>Echo Chambers:</b> Filter out dissenting views, reinforcing bias.</li>
          <li><b>Critical Inquiry:</b> Question, verify, and seek diverse voices.</li>
          <li><b>Media & Information Literacy:</b> Access reliable sources, reflect on bias, and engage ethically.</li>
        </ul>
        <p><strong>Your final echo score:</strong> ${this.echoScore}%</p>
      `;
      window.completeGame?.("echochamber", learnHtml);
    }
  
    reset() {
      this.currentPostIndex = 0;
      this.echoScore = 0;
      this.correctChoices = 0;
      this.chatHistory = [];
    }
  }
  
  // Initialize
  const echochamberGame = new EchoChamberGame();
  