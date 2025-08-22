// RumorVille Game - Cartoonish bright town UI for rumor verification
class RumorVilleGame {
    constructor() {
        this.currentRumorIndex = 0;
        this.score = 0;
        this.totalRumors = 0;
        this.gameContainer = document.getElementById('rumorville-content');
        this.rumors = FALLBACK_STORIES.rumorville;
        this.aiIntegration = new AIIntegration();
    }
    
    start() {
        this.currentRumorIndex = 0;
        this.score = 0;
        this.totalRumors = Math.min(5, this.rumors.length); // Play 5 rounds
        this.showIntroduction();
        
        console.log('RumorVille game started');
        
        // Play start sound
        window.playSound('pop');
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
                        🏘️ In this colorful town, rumors spread faster than wildfire! Your job is to be a responsible citizen who thinks before acting.
                    </p>
                    <p style="font-size: 1rem; margin-bottom: 1rem;">
                        <strong>Your Mission:</strong> When you see a rumor, you can:
                    </p>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin: 0.5rem 0;"><span style="color: #ff7675;">📤 SHARE</span> - Spread it immediately</li>
                        <li style="margin: 0.5rem 0;"><span style="color: #00cec9;">🔍 VERIFY</span> - Check if it's true first</li>
                        <li style="margin: 0.5rem 0;"><span style="color: #636e72;">🤐 IGNORE</span> - Don't engage with it</li>
                    </ul>
                </div>
                <button class="action-btn verify-btn" onclick="rumorvilleGame.showNextRumor()">
                    Let's Start! <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        
        this.gameContainer.innerHTML = introHtml;
    }
    
    showNextRumor() {
        if (this.currentRumorIndex >= this.totalRumors) {
            this.showFinalResults();
            return;
        }
        
        const rumor = this.rumors[this.currentRumorIndex];
        
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
                    <span style="color: #2d3436;">You see this message in the town square. What do you do?</span>
                </div>
                
                <div class="rumor-actions">
                    <button class="action-btn share-btn" onclick="rumorvilleGame.handleChoice('share')">
                        <i class="fas fa-share"></i> Share
                    </button>
                    <button class="action-btn verify-btn" onclick="rumorvilleGame.handleChoice('verify')">
                        <i class="fas fa-search"></i> Verify
                    </button>
                    <button class="action-btn ignore-btn" onclick="rumorvilleGame.handleChoice('ignore')">
                        <i class="fas fa-times"></i> Ignore
                    </button>
                </div>
            </div>
        `;
        
        this.gameContainer.innerHTML = rumorHtml;
        
        // Play whoosh sound
        window.playSound('whoosh');
    }
    
    async handleChoice(choice) {
        const rumor = this.rumors[this.currentRumorIndex];
        
        // Show loading while processing
        this.gameContainer.innerHTML += showLoading('Checking the rumor...');
        
        let result;
        try {
            // Try AI analysis first
            result = await this.aiIntegration.analyzeFakeNews(rumor.text);
        } catch (error) {
            console.log('AI analysis failed, using fallback');
        }
        
        // Use fallback if AI failed
        if (!result) {
            result = {
                isCredible: rumor.isTrue,
                confidence: 0.85,
                reasoning: rumor.explanation
            };
        }
        
        // Determine if the choice was good
        const isGoodChoice = this.evaluateChoice(choice, result.isCredible);
        
        if (isGoodChoice) {
            this.score++;
        }
        
        this.showRumorResult(choice, result, isGoodChoice);
    }
    
    evaluateChoice(choice, isTrue) {
        // Good choices:
        // - Always verify (regardless of truth)
        // - Ignore false rumors
        // - Share true rumors (but verify is still better)
        
        if (choice === 'verify') {
            return true; // Always good to verify
        } else if (choice === 'ignore' && !isTrue) {
            return true; // Good to ignore false rumors
        } else if (choice === 'share' && isTrue) {
            return false; // Even true rumors should be verified first
        } else {
            return false; // Sharing false rumors or ignoring true ones
        }
    }
    
    showRumorResult(choice, result, isGoodChoice) {
        const rumor = this.rumors[this.currentRumorIndex];
        
        let choiceDescription;
        switch (choice) {
            case 'share':
                choiceDescription = isGoodChoice ? 
                    "You shared this information, but remember - even true information should be verified first!" :
                    "You shared this without checking. This can spread misinformation!";
                break;
            case 'verify':
                choiceDescription = "Great choice! You took time to verify before acting. This is responsible digital citizenship!";
                break;
            case 'ignore':
                choiceDescription = isGoodChoice ? 
                    "Smart move! You didn't engage with suspicious content." :
                    "You ignored it, but if it was important true information, others might have benefited from verification.";
                break;
        }
        
        const resultTitle = result.isCredible ? "This rumor was TRUE" : "This rumor was FALSE";
        
        const resultHtml = showGameResult(
            isGoodChoice,
            resultTitle,
            `
                <p><strong>Your Action:</strong> ${choiceDescription}</p>
                <p><strong>The Truth:</strong> ${result.reasoning || rumor.explanation}</p>
                <p><strong>Remember:</strong> Always verify information before sharing, even if it seems believable!</p>
            `,
            'rumorvilleGame.nextRound()'
        );
        
        this.gameContainer.innerHTML = resultHtml;
        
        // Play appropriate sound
        window.playSound(isGoodChoice ? 'success' : 'error');
    }
    
    nextRound() {
        this.currentRumorIndex++;
        this.showNextRumor();
    }
    
    showFinalResults() {
        const percentage = Math.round((this.score / this.totalRumors) * 100);
        let performanceLevel;
        let performanceColor;
        let advice;
        
        if (percentage >= 80) {
            performanceLevel = "Digital Detective Master! 🕵️";
            performanceColor = "#27ae60";
            advice = "You're excellent at spotting misinformation and making responsible choices!";
        } else if (percentage >= 60) {
            performanceLevel = "Good Information Citizen 👍";
            performanceColor = "#f39c12";
            advice = "You're on the right track! Keep practicing verification before sharing.";
        } else {
            performanceLevel = "Learning in Progress 📚";
            performanceColor = "#e74c3c";
            advice = "Remember: always verify before you share. It's the key to fighting misinformation!";
        }
        
        const resultsHtml = `
            <div class="final-results" style="text-align: center;">
                <div style="background: linear-gradient(135deg, #ffeaa7, #fdcb6e); padding: 2rem; border-radius: 20px; margin-bottom: 2rem;">
                    <h2 style="color: #2d3436; margin-bottom: 1rem;">
                        <i class="fas fa-flag-checkered"></i> RumorVille Complete!
                    </h2>
                    <div style="font-size: 2rem; margin-bottom: 1rem;">${performanceLevel}</div>
                    <div style="font-size: 1.5rem; color: ${performanceColor}; margin-bottom: 1rem;">
                        Score: ${this.score}/${this.totalRumors} (${percentage}%)
                    </div>
                    <p style="color: #2d3436; font-size: 1.1rem; line-height: 1.6;">${advice}</p>
                </div>
                <button class="action-btn verify-btn" onclick="rumorvilleGame.complete()">
                    Continue to Learning Card <i class="fas fa-graduation-cap"></i>
                </button>
            </div>
        `;
        
        this.gameContainer.innerHTML = resultsHtml;
        
        // Play completion sound
        window.playSound('completion');
    }
    
    complete() {
        const learningContent = `
            <h3>🏘️ RumorVille: Information Verification Mastery</h3>
            <div style="text-align: left; margin: 1.5rem 0;">
                <h4 style="color: #2d3436; margin-bottom: 1rem;">Key Learnings:</h4>
                <ul style="list-style-type: none; padding: 0;">
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #27ae60; margin-right: 0.5rem;">✓</span>
                        <div>
                            <strong>Always Verify First:</strong> Even information that seems credible should be fact-checked before sharing.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #27ae60; margin-right: 0.5rem;">✓</span>
                        <div>
                            <strong>Check Multiple Sources:</strong> Look for confirmation from reliable, independent sources.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #27ae60; margin-right: 0.5rem;">✓</span>
                        <div>
                            <strong>Question Emotional Content:</strong> Information designed to make you angry or scared often contains misinformation.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #27ae60; margin-right: 0.5rem;">✓</span>
                        <div>
                            <strong>Break the Chain:</strong> Not sharing is better than sharing false information.
                        </div>
                    </li>
                </ul>
                <div style="background: #e8f4f8; padding: 1rem; border-radius: 10px; margin-top: 1.5rem;">
                    <strong>Remember:</strong> You're now a certified RumorVille Digital Detective! Use these skills to build a more informed community.
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
