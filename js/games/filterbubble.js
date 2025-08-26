// Filter Bubble Simulator - Abstract surreal UI with drifting bubbles

// Fallback helpers (only created if they don't already exist)
if (typeof AIIntegration === "undefined") {
    class AIIntegration {
      async analyzeSentiment(text) {
        return {
          sentiment: "Neutral",
          reasoning: "No external AI available – using neutral fallback."
        };
      }
    }
    window.AIIntegration = AIIntegration;
  }
  
  // Silent stub – avoids console errors if you don't provide sounds
  window.playSound ??= () => {};
  
  // Stub for whatever should happen after the learning screen
  window.completeGame ??= (id, html) => {
    console.log(`Game ${id} completed with HTML: ${html}`);
    alert("Game complete! Check the learning materials in the console.");
  };
  
  // Dummy stories if none were injected from the server
  window.FALLBACK_STORIES ??= {
    filterbubble: [
      { text: "This article strongly supports your opinion.", sentiment: "Positive" },
      { text: "An opposing viewpoint challenges your beliefs.", sentiment: "Negative" },
      { text: "A neutral report presents multiple perspectives.", sentiment: "Neutral" },
      { text: "A viral meme ridiculing the opposite side.", sentiment: "Negative" },
      { text: "A thoughtful commentary that partially agrees with you.", sentiment: "Positive" },
      { text: "Balanced coverage from multiple sources.", sentiment: "Neutral" }
    ]
  };
  
  class FilterBubbleGame {
    constructor() {
      this.currentRound = 0;
      this.totalRounds = 6;
      this.diversityScore = 100; // Starts at 100%, decreases with rejections
      this.acceptedCount = 0;
      this.rejectedCount = 0;
      this.gameContainer = document.getElementById('filterbubble-content');
      this.infoBubbles = [];
      this.aiIntegration = new AIIntegration();
    }
      
    start() {
      this.reset();
  
      // Fallback bubbles
      this.infoBubbles = window.FALLBACK_STORIES?.filterbubble || [
        { text: "This article strongly supports your opinion.", sentiment: "Positive" },
        { text: "An opposing viewpoint challenges your beliefs.", sentiment: "Negative" },
        { text: "A neutral report presents multiple perspectives.", sentiment: "Neutral" },
        { text: "A viral meme ridiculing the opposite side.", sentiment: "Negative" },
        { text: "A thoughtful commentary that partially agrees with you.", sentiment: "Positive" },
        { text: "Balanced coverage from multiple sources.", sentiment: "Neutral" }
      ];
  
      this.totalRounds = Math.min(6, this.infoBubbles.length);
      console.log("Filter Bubble Simulator started with", this.totalRounds, "bubbles");
  
      this.showIntroduction();
      window.playSound?.("chime");
    }
      
    showIntroduction() {
      this.gameContainer.innerHTML = `
        <div style="text-align: center;">
          <h2 style="color: #2d3436; margin-bottom: 2rem;">
            🫧 Filter Bubble Simulator
          </h2>
          <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 2rem; border-radius: 20px; margin-bottom: 2rem;">
            <p>🫧 You are floating in an information space where content bubbles drift toward you. 
               Your choices shape what you see next!</p>
            <p><strong>How it works:</strong> Accept information you want to see more of, 
               or reject content you find uninteresting.</p>
            <p><strong>Diversity Meter:</strong> Rejecting too much narrows your information diet!</p>
          </div>
          <button class="action-btn accept-btn" onclick="filterbubbleGame.startSimulation()">
            Enter the Information Space ▶️
          </button>
        </div>
      `;
    }
      
    startSimulation() {
      this.showBubbleArena();
      this.launchNextBubble();
    }
      
    showBubbleArena() {
      this.gameContainer.innerHTML = `
        <style>
          /* Ensure bubbles are always visible */
          .bubble-arena .info-bubble {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            word-wrap: break-word;
            z-index: 2;
          }
        </style>
        <div class="bubble-simulation">
          <div class="simulation-header" style="text-align: center; margin-bottom: 1rem;">
            <div>Information Bubble ${this.currentRound + 1} of ${this.totalRounds}</div>
            <div style="margin-top: 0.5rem;">
              Diversity: <span style="color:${this.getDiversityColor()}; font-weight:bold;">${this.diversityScore}%</span>
            </div>
          </div>
          <div class="bubble-arena" style="position:relative; height:250px; overflow:hidden;">
            <div class="player-bubble" style="position:absolute; bottom:20px; left:50%; transform:translateX(-50%);
                 background:#74b9ff; color:white; padding:0.5rem 1rem; border-radius:50%;">YOU</div>
            <div id="floating-info-bubble" class="info-bubble" 
                 style="display:none; position:absolute; top:40%; left:-250px; width:200px; 
                 background:#ffeaa7; padding:1rem; border-radius:15px; text-align:center;"></div>
          </div>
          <div class="diversity-meter" style="height:15px; background:#dfe6e9; border-radius:10px; overflow:hidden; margin:1rem 0;">
            <div class="diversity-fill" style="width:${this.diversityScore}%; height:100%; background:${this.getDiversityColor()};"></div>
          </div>
          <div id="bubble-actions" style="display:none; text-align:center; margin-top:1rem;">
            <button class="action-btn accept-btn" onclick="filterbubbleGame.handleChoice('accept')">👍 Accept</button>
            <button class="action-btn reject-btn" onclick="filterbubbleGame.handleChoice('reject')">👎 Reject</button>
          </div>
        </div>
      `;
    }
      
    launchNextBubble() {
      if (this.currentRound >= this.totalRounds) {
        return this.showFinalResults();
      }
          
      const infoBubble = this.infoBubbles[this.currentRound];
      const floatingBubble = document.getElementById("floating-info-bubble");
      const actions = document.getElementById("bubble-actions");
          
      floatingBubble.textContent = infoBubble.text;
      floatingBubble.style.display = "block";
      floatingBubble.style.left = "-250px";
      floatingBubble.style.transition = "left 200s linear";
          
      setTimeout(() => { floatingBubble.style.left = "calc(50% - 100px)"; }, 100);
      setTimeout(() => { actions.style.display = "block"; }, 3200);
          
      window.playSound?.("ping");
    }
      
    async handleChoice(choice) {
      const infoBubble = this.infoBubbles[this.currentRound];
      const actions = document.getElementById("bubble-actions");
      if (actions) actions.style.display = "none";
  
      let result;
      try {
        result = await this.aiIntegration.analyzeSentiment(infoBubble.text);
      } catch (err) {
        console.warn("AI sentiment failed, using fallback", err);
      }
      
      if (!result) {
        result = {
          sentiment: infoBubble.sentiment || "Neutral",
          reasoning: `This content is considered ${infoBubble.sentiment || "Neutral"}.`
        };
      }
          
      this.processChoice(choice, result);
    }
      
    processChoice(choice, result) {
      let feedback = "";
      let diversityImpact = 0;
  
      if (choice === "accept") {
        this.acceptedCount++;
        feedback = "You accepted this content. Your feed will adapt to show more like it.";
        diversityImpact = result.sentiment === "Negative" ? -5 : 0;
      } else if (choice === "reject") {
        this.rejectedCount++;
        feedback = "You rejected this content. Your bubble narrows, filtering out similar perspectives.";
        diversityImpact = -10;
      } else {
        feedback = "Ignored bubble. Algorithms will still push similar content.";
        diversityImpact = -2;
      }
  
      this.diversityScore = Math.max(0, this.diversityScore + diversityImpact);
      this.showRoundResult(choice, result, feedback, diversityImpact);
    }
      
    showRoundResult(choice, result, feedback, diversityImpact) {
      const impactText = diversityImpact === 0 ? "No change" : `${diversityImpact > 0 ? "+" : ""}${diversityImpact}%`;
  
      this.gameContainer.innerHTML = `
        <div style="text-align:center; padding:2rem;">
          <h3>✅ Information Processed</h3>
          <p><strong>Your Choice:</strong> ${choice}</p>
          <p><strong>Content Type:</strong> ${result.sentiment}</p>
          <p>${feedback}</p>
          <p><strong>Diversity Score:</strong> 
             <span style="color:${this.getDiversityColor()}">${this.diversityScore}%</span> (${impactText})</p>
          <button class="action-btn" onclick="filterbubbleGame.nextRound()">➡️ Next Bubble</button>
        </div>
      `;
  
      window.playSound?.(diversityImpact < 0 ? "thud" : "chime");
    }
      
    nextRound() {
      this.currentRound++;
      this.showBubbleArena();
      this.launchNextBubble();
    }
      
    getDiversityColor() {
      if (this.diversityScore >= 70) return "#27ae60";
      if (this.diversityScore >= 40) return "#f39c12";
      return "#e74c3c";
    }
      
    showFinalResults() {
      let msg;
      if (this.diversityScore >= 70) {
        msg = "🌐 Open Information Ecosystem – You maintained diversity!";
      } else if (this.diversityScore >= 40) {
        msg = "🫧 Narrowing Bubble – Your information space is getting limited.";
      } else {
        msg = "📢 Echo Chamber Alert – Your information diet has become very narrow!";
      }
  
      this.gameContainer.innerHTML = `
        <div style="text-align:center; padding:2rem;">
          <h2>Simulation Complete</h2>
          <p><strong>Final Diversity:</strong> ${this.diversityScore}%</p>
          <p>${msg}</p>
          <button class="action-btn accept-btn" onclick="filterbubbleGame.complete()">📘 Continue to Learning</button>
        </div>
      `;
      window.playSound?.("completion");
    }
      
    complete() {
      const learn = `
        <h3>🫧 Filter Bubble Learnings</h3>
        <ul>
          <li>
            <b>Algorithms shape your information world:</b> 
            Recommendation systems and social media feeds use your behavior to select what you see, often showing you what you already agree with. This can create an invisible “bubble” and hide other perspectives.
          </li>
          <li>
            <b>Diversity of sources is vital for truth:</b> 
            Engaging with news and content from a variety of people, cultures, and viewpoints helps prevent one-sided understanding and polarization.
          </li>
          <li>
            <b>Over-filtering limits awareness:</b> 
            If you only accept, follow, or read things that confirm your beliefs, you reduce the diversity of your feed—making it easier to be misled or miss important issues.
          </li>
          <li>
            <b>Balance and critical inquiry are key:</b> 
            Seek out different viewpoints on important topics. Check information using trusted, independent, and credible sources. Ask who created the content, why, and who benefits.
          </li>
          <li>
            <b>You have agency as a digital citizen:</b> 
            By being aware of filter bubbles, you can control your media environment: follow a range of sources, verify claims, and think critically about what you see and share.
          </li>
        </ul>
        <p><strong>Your final diversity score:</strong> ${this.diversityScore}%</p>
        <p>🌏 <i>Staying curious and seeking out new information keeps you truly informed!</i></p>
      `;
      window.completeGame?.("filterbubble", learn);
    }
    
      
    reset() {
      this.currentRound = 0;
      this.diversityScore = 100;
      this.acceptedCount = 0;
      this.rejectedCount = 0;
      this.gameContainer.innerHTML = "";
    }
  }
  
  // Initialize game
  const filterbubbleGame = new FilterBubbleGame();
  filterbubbleGame.start();
  