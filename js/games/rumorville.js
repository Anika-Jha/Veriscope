// RumorVille Game - Cartoonish bright town UI for rumor verification
class RumorVilleGame {
    constructor() {
        this.currentRumorIndex = 0;
        this.score = 0;
        this.totalRumors = 0;
        this.gameContainer = document.getElementById('rumorville-content');
        this.rumors = [];
        this.aiIntegration = new AIIntegration();
    }
    
    start() {
        this.currentRumorIndex = 0;
        this.score = 0;

        // Load fallback stories
        const allRumors = window.FALLBACK_STORIES?.rumorville || [];
        if (!allRumors.length) {
            this.gameContainer.innerHTML = "<p>No rumors available to play.</p>";
            return;
        }

        // Shuffle and pick up to 5
        this.rumors = allRumors
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.min(5, allRumors.length));
        this.totalRumors = this.rumors.length;

        console.log('RumorVille game started with', this.totalRumors, 'rumors');
        
        this.showIntroduction();
        window.playSound?.('pop');
    }
    
    showIntroduction() {
        const introHtml = `
            <div class="rumor-container">
                <h2 style="color: #2d3436; margin-bottom: 2rem;">
                    <i class="fas fa-home" style="color: #fdcb6e;"></i>
                    Welcome to RumorVille!
                </h2>
                <div style="background: linear-gradient(135deg, #74b9ff, #0984e3); color: white; padding: 2rem; border-radius: 20px; margin-bottom: 2rem;">
                    <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1rem;">
                        🏘️ In this colorful town, rumors spread fast! Your job is to act responsibly.
                    </p>
                    <p><strong>Your Mission:</strong></p>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin: 0.5rem 0;"><span style="color: #ff7675;">📤 SHARE</span> - Spread it immediately</li>
                        <li style="margin: 0.5rem 0;"><span style="color: #00cec9;">🔍 VERIFY</span> - Check if it's true first</li>
                        <li style="margin: 0.5rem 0;"><span style="color: #636e72;">🤐 IGNORE</span> - Don’t engage</li>
                    </ul>
                </div>
                <button class="action-btn verify-btn" id="rumorville-start">
                    Let's Start! <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        this.gameContainer.innerHTML = introHtml;
        document.getElementById("rumorville-start")
            .addEventListener("click", () => this.playRound());
    }

    playRound() {
        if (this.currentRumorIndex >= this.totalRumors) {
            this.showFinalResults();
            return;
        }
        this.showNextRumor();
    }
    
    showNextRumor() {
        const rumor = this.rumors[this.currentRumorIndex];
        if (!rumor) {
            this.showFinalResults();
            return;
        }
        
        const rumorHtml = `
            <div class="rumor-container">
                <div class="game-progress" style="text-align: center; margin-bottom: 2rem; color: #636e72;">
                    Rumor ${this.currentRumorIndex + 1} of ${this.totalRumors}
                </div>
                
                <div class="rumor-bubble">
                    <div class="rumor-text">${rumor.text}</div>
                </div>
                
                <div class="town-context" style="background: rgba(116, 185, 255, 0.1); padding: 1rem; border-radius: 15px; margin: 1rem 0; text-align: center;">
                    <i class="fas fa-users" style="color: #74b9ff;"></i>
                    <span>You see this message in the town square. What do you do?</span>
                </div>
                
                <div class="rumor-actions">
                    <button class="action-btn share-btn" id="rumor-share">
                        <i class="fas fa-share"></i> Share
                    </button>
                    <button class="action-btn verify-btn" id="rumor-verify">
                        <i class="fas fa-search"></i> Verify
                    </button>
                    <button class="action-btn ignore-btn" id="rumor-ignore">
                        <i class="fas fa-times"></i> Ignore
                    </button>
                </div>
            </div>
        `;
        
        this.gameContainer.innerHTML = rumorHtml;

        // Hook up buttons to proper methods
        document.getElementById("rumor-share").onclick = () => this.handleChoice('share');
        document.getElementById("rumor-verify").onclick = () => this.handleChoice('verify');
        document.getElementById("rumor-ignore").onclick = () => this.handleChoice('ignore');

        window.playSound?.('whoosh');
    }
    
    async handleChoice(choice) {
        const rumor = this.rumors[this.currentRumorIndex];
        this.gameContainer.innerHTML += showLoading('Checking the rumor...');
    
        let result;
        try {
            result = await this.aiIntegration.analyzeFakeNews(rumor.text);
        } catch (error) {
            console.log('AI analysis failed, using fallback');
        }
    
        if (!result) {
            result = {
                isCredible: rumor?.isCredible ?? false,
                confidence: 0.85,
                reasoning: rumor?.explanation ?? "No explanation available"
            };
        }
    
        const isGoodChoice = this.evaluateChoice(choice, result.isCredible);
        if (isGoodChoice) this.score++;
    
        this.showRumorResult(choice, result, isGoodChoice);
    }
    
    evaluateChoice(choice, isTrue) {
        if (choice === 'verify') return true;
        if (choice === 'ignore' && !isTrue) return true;
        if (choice === 'share' && isTrue) return false; 
        return false;
    }
    
    showRumorResult(choice, result, isGoodChoice) {
        const rumor = this.rumors[this.currentRumorIndex];
        
        let choiceDescription;
        switch (choice) {
            case 'share':
                choiceDescription = isGoodChoice ? 
                    "You shared this info, but remember - even true info should be verified first!" :
                    "You shared this without checking. This spreads misinformation!";
                break;
            case 'verify':
                choiceDescription = "Great choice! You verified before acting. Responsible digital citizenship!";
                break;
            case 'ignore':
                choiceDescription = isGoodChoice ? 
                    "Smart move! You didn't engage with suspicious content." :
                    "You ignored it, but if it was important true information, others missed out.";
                break;
        }
        
        const resultTitle = result.isCredible ? "This rumor was TRUE" : "This rumor was FALSE";
        
        const resultHtml = `
            <div class="rumor-result">
                ${showGameResult(
                    isGoodChoice,
                    resultTitle,
                    `
                        <p><strong>Your Action:</strong> ${choiceDescription}</p>
                         <br>
                        <p><strong>Remember:</strong> Always verify before sharing!</p>
                    `
                )}
                <button class="action-btn verify-btn" id="next-rumor">
                    Next Rumor <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        
        this.gameContainer.innerHTML = resultHtml;

        // Proper event binding for next round
        document.getElementById("next-rumor").onclick = () => this.nextRound();

        window.playSound?.(isGoodChoice ? 'success' : 'error');
    }
    
    nextRound() {
        this.currentRumorIndex++;
        this.playRound();
    }
    
    showFinalResults() {
        const percentage = this.totalRumors > 0
            ? Math.round((this.score / this.totalRumors) * 100)
            : 0;
            
        let performanceLevel, performanceColor, advice;
        
        if (percentage >= 80) {
            performanceLevel = "RumorVille Truth Mayor 🏆";
            performanceColor = "#27ae60";
            advice = "You lead the town with wisdom—misinformation doesn’t stand a chance!";
        } else if (percentage >= 60) {
            performanceLevel = "Neighborhood Fact Checker 🏘️";
            performanceColor = "#f39c12";
            advice = "You keep your block safe from rumors—sharpen those skills to rise higher!";
        } else {
            performanceLevel = "Rookie Rumor Buster 🕵️‍♀️";
            performanceColor = "#e74c3c";
            advice = "RumorVille needs you! Double-check before spreading the word.";
        }
        
        const resultsHtml = `
            <div class="final-results" style="text-align: center;">
                <div style="background: linear-gradient(135deg, #ffeaa7, #fdcb6e); padding: 2rem; border-radius: 20px; margin-bottom: 2rem;">
                    <h2><i class="fas fa-flag-checkered"></i> RumorVille Complete!</h2>
                    <div style="font-size: 2rem; margin-bottom: 1rem;">${performanceLevel}</div>
                    <div style="font-size: 1.5rem; color: ${performanceColor}; margin-bottom: 1rem;">
                        Score: ${this.score}/${this.totalRumors} (${percentage}%)
                    </div>
                    <p>${advice}</p>
                </div>
                <button class="action-btn verify-btn" onclick="rumorvilleGame.complete()">
                    Continue to Learning Card <i class="fas fa-graduation-cap"></i>
                </button>
            </div>
        `;
        
        this.gameContainer.innerHTML = resultsHtml;
        window.playSound?.('completion');
    }
    
    complete() {
        const learningContent = `
            <h3>🏘️ RumorVille: Information Verification Mastery</h3>
            <div style="text-align: left; margin: 1.5rem 0;">
                <h4>Key Learnings</h4>
                <ul>
                    <li>✓ <strong>Verify before sharing:</strong> Cross-check facts using diverse and credible sources.</li>
                    <li>✓ <strong>Recognize bias and emotion:</strong> Watch for manipulative or emotional language.</li>
                    <li>✓ <strong>Identify the purpose:</strong> Who created it? Why? Who benefits?</li>
                    <li>✓ <strong>Practice digital responsibility:</strong> Not sharing unverified info prevents disinformation.</li>
                    <li>✓ <strong>Engage ethically:</strong> Respect rights and dignity online.</li>
                    <li>✓ <strong>Question media power:</strong> Reflect on how politics/economy shape media.</li>
                </ul>
                <div style="background: #e8f4f8; padding: 1rem; border-radius: 10px; margin-top: 1.5rem;">
                    🌟 <strong>Congratulations!</strong> You've completed your mission as a <em>RumorVille Digital Detective</em>!
                </div>
            </div>
        `;
        window.completeGame('rumorville', learningContent);
    }
    
    reset() {
        this.currentRumorIndex = 0;
        this.score = 0;
        this.gameContainer.innerHTML = '';
    }
}

// Initialize game instance
const rumorvilleGame = new RumorVilleGame();
