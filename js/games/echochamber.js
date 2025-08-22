// Echo Chamber Escape Game - Chatroom simulation with bias detection
class EchoChamberGame {
    constructor() {
        this.currentPostIndex = 0;
        this.echoScore = 0; // Starts at 0, increases with bias
        this.correctChoices = 0;
        this.totalPosts = 0;
        this.gameContainer = document.getElementById('echochamber-content');
        this.chatPosts = [];
        this.aiIntegration = new AIIntegration();
        this.chatHistory = [];
    }
    
    start() {
        this.currentPostIndex = 0;
        this.echoScore = 0;
        this.correctChoices = 0;
        this.chatHistory = [];
        
        // Ensure we have access to fallback stories
        this.chatPosts = window.FALLBACK_STORIES?.echochamber || [];
        this.totalPosts = Math.min(7, this.chatPosts.length); // Analyze 7 chat posts
        
        console.log('Echo Chamber Escape game started with', this.totalPosts, 'posts');
        console.log('First post sample:', this.chatPosts[0]);
        
        this.showIntroduction();
        
        // Play techno start sound
        window.playSound('ping');
    }
    
    showIntroduction() {
        const introHtml = `
            <div style="text-align: center;">
                <h2 style="color: #2d3436; margin-bottom: 2rem;">
                    <i class="fas fa-comments-dollar" style="color: #ee5a6f;"></i>
                    Echo Chamber Escape Room
                </h2>
                <div style="background: linear-gradient(135deg, #ee5a6f, #f29263); color: white; padding: 2rem; border-radius: 20px; margin-bottom: 2rem;">
                    <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1rem;">
                        💬 You've stumbled into an online discussion forum. The conversations seem intense, and you notice some concerning patterns...
                    </p>
                    <p style="font-size: 1rem; margin-bottom: 1rem;">
                        <strong>Your Mission:</strong> Navigate the discussion wisely. You can:
                    </p>
                    <ul style="list-style: none; padding: 0; text-align: left; max-width: 400px; margin: 0 auto;">
                        <li style="margin: 0.5rem 0;"><span style="color: #e74c3c;">👍 SUPPORT</span> - Agree with the post</li>
                        <li style="margin: 0.5rem 0;"><span style="color: #f39c12;">❓ QUESTION</span> - Ask for evidence or nuance</li>
                        <li style="margin: 0.5rem 0;"><span style="color: #95a5a6;">🤐 IGNORE</span> - Don't engage</li>
                    </ul>
                    <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 10px; margin-top: 1rem;">
                        <p style="margin: 0;"><strong>Watch the Echo Meter:</strong> Supporting biased content traps you deeper in the chamber!</p>
                    </div>
                </div>
                <button class="action-btn question-btn" onclick="echochamberGame.enterChatroom()">
                    Enter the Discussion <i class="fas fa-sign-in-alt"></i>
                </button>
            </div>
        `;
        
        this.gameContainer.innerHTML = introHtml;
    }
    
    enterChatroom() {
        this.showChatroom();
        this.loadNextPost();
    }
    
    showChatroom() {
        const chatroomHtml = `
            <div class="echo-chamber-interface">
                <div class="chatroom-header" style="text-align: center; margin-bottom: 1rem; color: #2d3436;">
                    <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">
                        <i class="fas fa-users"></i> Discussion Post ${this.currentPostIndex + 1} of ${this.totalPosts}
                    </div>
                    <div style="background: #2c3e50; color: white; padding: 0.5rem 1rem; border-radius: 20px; display: inline-block;">
                        <span>Echo Level: </span>
                        <span style="color: ${this.getEchoColor()}; font-weight: bold;">${this.echoScore}%</span>
                    </div>
                </div>
                
                <div class="chatroom" id="chatroom">
                    ${this.renderChatHistory()}
                    <div id="current-post" class="chat-post" style="border: 2px solid #ee5a6f; animation: newMessage 0.5s ease;">
                        <!-- Current post will be loaded here -->
                    </div>
                </div>
                
                <div class="echo-meter">
                    <div class="echo-fill" style="width: ${this.echoScore}%;"></div>
                </div>
                
                <div class="chat-actions" id="chat-actions">
                    <button class="action-btn support-btn" onclick="echochamberGame.handleChoice('support')">
                        <i class="fas fa-thumbs-up"></i> Support
                    </button>
                    <button class="action-btn question-btn" onclick="echochamberGame.handleChoice('question')">
                        <i class="fas fa-question-circle"></i> Question
                    </button>
                    <button class="action-btn ignore-btn" onclick="echochamberGame.handleChoice('ignore')">
                        <i class="fas fa-eye-slash"></i> Ignore
                    </button>
                </div>
            </div>
        `;
        
        this.gameContainer.innerHTML = chatroomHtml;
    }
    
    renderChatHistory() {
        return this.chatHistory.map((post, index) => `
            <div class="chat-post ${post.biasLevel}" style="opacity: 0.7; border-left-color: ${post.biasLevel === 'biased' ? '#e74c3c' : '#27ae60'};">
                <div class="post-author">User${index + 1}</div>
                <div class="post-content">${post.text}</div>
                <div style="font-size: 0.8rem; color: #bdc3c7; margin-top: 0.5rem;">
                    Your response: ${post.userChoice}
                </div>
            </div>
        `).join('');
    }
    
    loadNextPost() {
        if (this.currentPostIndex >= this.totalPosts) {
            this.showFinalResults();
            return;
        }
        
        const post = this.chatPosts[this.currentPostIndex];
        if (!post) {
            console.error('No post found at index', this.currentPostIndex, 'Total posts:', this.chatPosts.length);
            this.showFinalResults();
            return;
        }
        
        const currentPostEl = document.getElementById('current-post');
        
        if (currentPostEl) {
            currentPostEl.innerHTML = `
                <div class="post-author" style="color: #3498db;">
                    <i class="fas fa-user-circle"></i> ForumUser${Math.floor(Math.random() * 999) + 1}
                </div>
                <div class="post-content">${post.text}</div>
                <div style="margin-top: 1rem; padding: 0.5rem; background: rgba(238, 90, 111, 0.1); border-radius: 5px; font-size: 0.9rem;">
                    <i class="fas fa-exclamation-circle" style="color: #ee5a6f;"></i>
                    How do you respond to this statement?
                </div>
            `;
        }
        
        // Play notification sound
        window.playSound('ping');
    }
    
    async handleChoice(choice) {
        const post = this.chatPosts[this.currentPostIndex];
        const actions = document.getElementById('chat-actions');
        actions.style.pointerEvents = 'none';
        
        // Show loading
        this.gameContainer.innerHTML += showLoading('Analyzing discussion dynamics...');
        
        let result;
        try {
            // Try AI bias analysis
            result = await this.aiIntegration.analyzeBias(post.text);
        } catch (error) {
            console.log('AI bias analysis failed, using fallback');
        }
        
        // Use fallback bias assessment
        if (!result) {
            result = {
                biasLevel: post.biasLevel,
                biasType: post.biasType || 'confirmation',
                confidence: 0.8,
                reasoning: post.explanation
            };
        }
        
        // Process the choice
        this.processChoice(choice, result, post);
    }
    
    processChoice(choice, result, post) {
        let echoImpact = 0;
        let feedback;
        let isGoodChoice = false;
        
        const isBiased = result.biasLevel === 'biased' || result.biasLevel === 'Biased';
        
        switch (choice) {
            case 'support':
                if (isBiased) {
                    echoImpact = 15; // Supporting bias increases echo chamber
                    feedback = "You supported a biased statement, reinforcing the echo chamber effect!";
                    isGoodChoice = false;
                } else {
                    echoImpact = 0; // Supporting balanced content is neutral
                    feedback = "You supported balanced content - but questioning is always valuable!";
                    isGoodChoice = true;
                }
                break;
                
            case 'question':
                if (isBiased) {
                    echoImpact = -10; // Questioning bias reduces echo chamber
                    feedback = "Great! You questioned biased content and promoted critical thinking!";
                    isGoodChoice = true;
                } else {
                    echoImpact = -5; // Questioning balanced content still promotes discourse
                    feedback = "Good approach! Even balanced content benefits from thoughtful questions.";
                    isGoodChoice = true;
                }
                break;
                
            case 'ignore':
                echoImpact = 5; // Ignoring contributes slightly to echo chamber
                feedback = "You stayed silent. Sometimes this avoids conflict, but it can allow bias to spread.";
                isGoodChoice = false;
                break;
        }
        
        // Update echo score (0-100 range)
        this.echoScore = Math.max(0, Math.min(100, this.echoScore + echoImpact));
        
        if (isGoodChoice) {
            this.correctChoices++;
        }
        
        // Add to chat history
        this.chatHistory.push({
            text: post.text,
            biasLevel: isBiased ? 'biased' : 'balanced',
            userChoice: choice.charAt(0).toUpperCase() + choice.slice(1)
        });
        
        this.showPostResult(choice, result, feedback, echoImpact, isGoodChoice);
    }
    
    showPostResult(choice, result, feedback, echoImpact, isGoodChoice) {
        const impactText = echoImpact === 0 ? 'No change' : 
                          echoImpact > 0 ? `+${echoImpact}%` : `${echoImpact}%`;
        
        const biasLabel = result.biasLevel === 'biased' || result.biasLevel === 'Biased' ? 
                         "BIASED CONTENT" : "BALANCED CONTENT";
        const biasColor = result.biasLevel === 'biased' || result.biasLevel === 'Biased' ? 
                         "#e74c3c" : "#27ae60";
        
        const resultHtml = `
            <div class="post-analysis" style="text-align: center; padding: 2rem;">
                <div style="background: linear-gradient(135deg, #2c3e50, #34495e); color: white; padding: 2rem; border-radius: 20px; margin-bottom: 2rem;">
                    <div style="font-size: 2.5rem; margin-bottom: 1rem;">
                        ${isGoodChoice ? '🎯' : '📢'}
                    </div>
                    <h3 style="color: ${biasColor}; margin-bottom: 1rem;">${biasLabel}</h3>
                    
                    <div style="background: rgba(238, 90, 111, 0.2); padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
                        <h4 style="color: #ee5a6f; margin-bottom: 1rem;">Discussion Impact:</h4>
                        <p style="margin-bottom: 1rem;">${feedback}</p>
                        <p><strong>Analysis:</strong> ${result.reasoning}</p>
                    </div>
                    
                    <div class="echo-change" style="font-size: 1.2rem; margin-bottom: 1rem;">
                        <span style="color: #ecf0f1;">Echo Chamber Level: </span>
                        <span style="color: ${this.getEchoColor()}; font-weight: bold;">${this.echoScore}%</span>
                        <span style="color: ${echoImpact >= 0 ? '#e74c3c' : '#27ae60'};">(${impactText})</span>
                    </div>
                    
                    <div class="echo-meter">
                        <div class="echo-fill" style="width: ${this.echoScore}%;"></div>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 10px; margin-top: 1rem;">
                        <p style="margin: 0; font-style: italic; color: #bdc3c7;">
                            💡 Pro tip: Question biased statements to promote healthy discourse and prevent echo chambers!
                        </p>
                    </div>
                </div>
                <button class="action-btn question-btn" onclick="echochamberGame.nextPost()">
                    Continue Discussion <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        
        this.gameContainer.innerHTML = resultHtml;
        
        // Play appropriate sound
        window.playSound(isGoodChoice ? 'unlock' : 'ping');
    }
    
    nextPost() {
        this.currentPostIndex++;
        this.showChatroom();
        this.loadNextPost();
    }
    
    getEchoColor() {
        if (this.echoScore <= 30) return '#27ae60'; // Green - healthy discourse
        if (this.echoScore <= 60) return '#f39c12'; // Orange - getting echo-y
        return '#e74c3c'; // Red - echo chamber
    }
    
    showFinalResults() {
        const questionRate = Math.round((this.correctChoices / this.totalPosts) * 100);
        let escapeStatus;
        let statusColor;
        let statusIcon;
        let evaluation;
        
        if (this.echoScore <= 30 && questionRate >= 70) {
            escapeStatus = "Echo Chamber Escaped! 🎉";
            statusColor = "#27ae60";
            statusIcon = "🚪✨";
            evaluation = "Brilliant! You promoted healthy discourse and avoided the echo chamber trap.";
        } else if (this.echoScore <= 50) {
            escapeStatus = "Partially Escaped 🤔";
            statusColor = "#f39c12";
            statusIcon = "🚪";
            evaluation = "Good effort! You're learning to recognize bias, but keep practicing questioning techniques.";
        } else {
            escapeStatus = "Trapped in Echo Chamber 📢";
            statusColor = "#e74c3c";
            statusIcon = "🔒";
            evaluation = "The echo chamber has you! Remember to question biased statements and promote diverse perspectives.";
        }
        
        const resultsHtml = `
            <div class="final-results" style="text-align: center;">
                <div style="background: linear-gradient(135deg, #ee5a6f, #f29263); color: white; padding: 3rem; border-radius: 20px; margin-bottom: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">${statusIcon}</div>
                    <h2 style="margin-bottom: 1rem;">Discussion Complete</h2>
                    <div style="font-size: 1.8rem; color: ${statusColor}; margin-bottom: 2rem;">${escapeStatus}</div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                        <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 10px;">
                            <div style="font-size: 2rem;">📢</div>
                            <div>Final Echo Level</div>
                            <div style="font-size: 1.5rem; font-weight: bold; color: ${this.getEchoColor()};">${this.echoScore}%</div>
                        </div>
                        <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 10px;">
                            <div style="font-size: 2rem;">❓</div>
                            <div>Critical Thinking</div>
                            <div style="font-size: 1.5rem; font-weight: bold;">${questionRate}%</div>
                        </div>
                        <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 10px;">
                            <div style="font-size: 2rem;">💬</div>
                            <div>Posts Analyzed</div>
                            <div style="font-size: 1.5rem; font-weight: bold;">${this.totalPosts}</div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem;">Escape Room Analysis</h3>
                        <p style="font-size: 1.1rem; line-height: 1.6;">${evaluation}</p>
                    </div>
                    
                    <div style="background: rgba(39, 174, 96, 0.2); padding: 1rem; border-radius: 10px;">
                        <p style="margin: 0; font-style: italic;">"The best way to escape an echo chamber is to question everything, including your own beliefs."</p>
                    </div>
                </div>
                
                <button class="action-btn support-btn" onclick="echochamberGame.complete()">
                    Exit Discussion Room <i class="fas fa-graduation-cap"></i>
                </button>
            </div>
        `;
        
        this.gameContainer.innerHTML = resultsHtml;
        
        // Play completion sound
        window.playSound('completion');
    }
    
    complete() {
        const questionRate = Math.round((this.correctChoices / this.totalPosts) * 100);
        
        const learningContent = `
            <h3>📢 Echo Chamber Escape: Bias Recognition Mastery</h3>
            <div style="text-align: left; margin: 1.5rem 0;">
                <h4 style="color: #2d3436; margin-bottom: 1rem;">Escape Skills Mastered:</h4>
                <ul style="list-style-type: none; padding: 0;">
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #ee5a6f; margin-right: 0.5rem;">❓</span>
                        <div>
                            <strong>Question Bias:</strong> Always ask for evidence when encountering extreme or emotional statements.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #ee5a6f; margin-right: 0.5rem;">👂</span>
                        <div>
                            <strong>Listen for Balance:</strong> Healthy discussions include nuance, multiple perspectives, and acknowledgment of complexity.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #ee5a6f; margin-right: 0.5rem;">🔍</span>
                        <div>
                            <strong>Identify Red Flags:</strong> Absolute statements, us-vs-them language, and emotional manipulation indicate bias.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #ee5a6f; margin-right: 0.5rem;">🌉</span>
                        <div>
                            <strong>Bridge Building:</strong> Promote understanding by asking clarifying questions rather than attacking positions.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #ee5a6f; margin-right: 0.5rem;">🧠</span>
                        <div>
                            <strong>Critical Thinking:</strong> Pause before reacting emotionally. Consider: "What evidence supports this claim?"
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #ee5a6f; margin-right: 0.5rem;">🎯</span>
                        <div>
                            <strong>Avoid Echo Chambers:</strong> Actively seek out diverse perspectives, even if they challenge your views.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #ee5a6f; margin-right: 0.5rem;">⚖️</span>
                        <div>
                            <strong>Fact vs Opinion:</strong> Learn to distinguish between factual claims and personal opinions in discussions.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #ee5a6f; margin-right: 0.5rem;">🤝</span>
                        <div>
                            <strong>Respectful Disagreement:</strong> You can challenge ideas without attacking the person expressing them.
                        </div>
                    </li>
                </ul>
                <div style="background: #e8f4f8; padding: 1rem; border-radius: 10px; margin-top: 1.5rem; border-left: 4px solid #ee5a6f;">
                    <strong>Your Escape Rating:</strong> ${questionRate}% Critical Thinking - ${this.getEscapeAdvice()}
                </div>
                <div style="background: #2c3e50; color: white; padding: 1rem; border-radius: 10px; margin-top: 1rem;">
                    <div style="text-align: center;">
                        <strong>Final Echo Level: ${this.echoScore}%</strong><br>
                        <em>${this.getEchoAdvice()}</em>
                    </div>
                </div>
            </div>
        `;
        
        window.completeGame('echochamber', learningContent);
    }
    
    getEscapeAdvice() {
        if (this.echoScore <= 30) {
            return "Master of discourse! You avoided the echo chamber completely.";
        } else if (this.echoScore <= 50) {
            return "Good awareness! Keep practicing bias recognition.";
        } else {
            return "Learning opportunity! Focus on questioning techniques.";
        }
    }
    
    getEchoAdvice() {
        if (this.echoScore <= 30) {
            return "You maintained healthy, diverse discourse throughout!";
        } else if (this.echoScore <= 60) {
            return "Some echo chamber effects, but you showed good awareness.";
        } else {
            return "Strong echo chamber influence - practice questioning bias more.";
        }
    }
    
    reset() {
        this.currentPostIndex = 0;
        this.echoScore = 0;
        this.correctChoices = 0;
        this.chatHistory = [];
        this.gameContainer.innerHTML = '';
    }
}

// Initialize game instance
const echochamberGame = new EchoChamberGame();
