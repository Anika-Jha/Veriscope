// Filter Bubble Simulator - Abstract surreal UI with drifting bubbles
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
        this.driftingBubbles = [];
    }
    
    start() {
        this.currentRound = 0;
        this.diversityScore = 100;
        this.acceptedCount = 0;
        this.rejectedCount = 0;
        this.driftingBubbles = [];
        
        // Ensure we have access to fallback stories
        this.infoBubbles = window.FALLBACK_STORIES?.filterbubble || [];
        this.totalRounds = Math.min(6, this.infoBubbles.length);
        
        console.log('Filter Bubble Simulator started with', this.totalRounds, 'bubbles');
        console.log('First bubble sample:', this.infoBubbles[0]);
        
        this.showIntroduction();
        
        // Play ambient start sound
        window.playSound('chime');
    }
    
    showIntroduction() {
        const introHtml = `
            <div style="text-align: center;">
                <h2 style="color: #2d3436; margin-bottom: 2rem;">
                    <i class="fas fa-globe" style="color: #667eea;"></i>
                    Filter Bubble Simulator
                </h2>
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 2rem; border-radius: 20px; margin-bottom: 2rem;">
                    <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1rem;">
                        🫧 You are floating in an information space where content bubbles drift toward you. Your choices shape what you see next!
                    </p>
                    <p style="font-size: 1rem; margin-bottom: 1rem;">
                        <strong>How it works:</strong> Accept information you want to see more of, or reject content you find uninteresting.
                    </p>
                    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px;">
                        <p style="margin: 0;"><strong>Watch your Diversity Meter:</strong> Rejecting too much narrows your information diet!</p>
                    </div>
                </div>
                <button class="action-btn accept-btn" onclick="filterbubbleGame.startSimulation()">
                    Enter the Information Space <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        
        this.gameContainer.innerHTML = introHtml;
    }
    
    startSimulation() {
        this.showBubbleArena();
        this.launchNextBubble();
    }
    
    showBubbleArena() {
        const arenaHtml = `
            <div class="bubble-simulation">
                <div class="simulation-header" style="text-align: center; margin-bottom: 1rem;">
                    <div style="color: #2d3436; font-size: 1.1rem; margin-bottom: 0.5rem;">
                        Information Bubble ${this.currentRound + 1} of ${this.totalRounds}
                    </div>
                    <div style="background: #ecf0f1; padding: 0.5rem 1rem; border-radius: 20px; display: inline-block;">
                        <span style="color: #636e72;">Diversity: </span>
                        <span style="color: ${this.getDiversityColor()}; font-weight: bold;">${this.diversityScore}%</span>
                    </div>
                </div>
                
                <div class="bubble-arena" id="bubble-arena">
                    <div class="player-bubble">
                        YOU
                    </div>
                    <div id="floating-info-bubble" class="info-bubble" style="display: none;"></div>
                </div>
                
                <div class="diversity-meter">
                    <div class="diversity-fill" style="width: ${this.diversityScore}%;"></div>
                </div>
                
                <div class="bubble-actions" id="bubble-actions" style="display: none;">
                    <button class="action-btn accept-btn" onclick="filterbubbleGame.handleChoice('accept')">
                        <i class="fas fa-thumbs-up"></i> Accept
                    </button>
                    <button class="action-btn reject-btn" onclick="filterbubbleGame.handleChoice('reject')">
                        <i class="fas fa-thumbs-down"></i> Reject
                    </button>
                </div>
            </div>
        `;
        
        this.gameContainer.innerHTML = arenaHtml;
    }
    
    launchNextBubble() {
        if (this.currentRound >= this.totalRounds) {
            this.showFinalResults();
            return;
        }
        
        const infoBubble = this.infoBubbles[this.currentRound];
        if (!infoBubble) {
            console.error('No info bubble found at index', this.currentRound, 'Total bubbles:', this.infoBubbles.length);
            this.showFinalResults();
            return;
        }
        
        const floatingBubble = document.getElementById('floating-info-bubble');
        const actions = document.getElementById('bubble-actions');
        
        // Position bubble randomly on the left side
        const startY = Math.random() * 60 + 20; // Between 20% and 80%
        floatingBubble.style.top = `${startY}%`;
        floatingBubble.style.left = '-200px';
        floatingBubble.textContent = infoBubble.text;
        floatingBubble.style.display = 'flex';
        
        // Animate bubble floating across (slowed down for better readability)
        setTimeout(() => {
            floatingBubble.style.transition = 'left 8s linear';
            floatingBubble.style.left = 'calc(50% - 75px)'; // Stop near center
        }, 100);
        
        // Show actions when bubble reaches center
        setTimeout(() => {
            floatingBubble.style.transition = 'none';
            actions.style.display = 'flex';
            
            // Auto-continue if no choice made within 15 seconds
            setTimeout(() => {
                if (actions.style.display === 'flex') {
                    this.handleChoice('ignore');
                }
            }, 15000);
        }, 4100);
        
        // Play bubble sound
        window.playSound('chime');
    }
    
    async handleChoice(choice) {
        const infoBubble = this.infoBubbles[this.currentRound];
        const actions = document.getElementById('bubble-actions');
        actions.style.display = 'none';
        
        // Show loading
        this.gameContainer.innerHTML += showLoading('Analyzing information bubble...');
        
        let result;
        try {
            // Try AI sentiment analysis
            result = await this.aiIntegration.analyzeSentiment(infoBubble.text);
        } catch (error) {
            console.log('AI sentiment analysis failed, using fallback');
        }
        
        // Use fallback sentiment
        if (!result) {
            result = {
                sentiment: infoBubble.sentiment,
                confidence: 0.8,
                reasoning: `This content expresses ${infoBubble.sentiment.toLowerCase()} sentiment.`
            };
        }
        
        // Process choice
        this.processChoice(choice, result);
    }
    
    processChoice(choice, result) {
        const infoBubble = this.infoBubbles[this.currentRound];
        let feedback;
        let diversityImpact = 0;
        
        if (choice === 'accept') {
            this.acceptedCount++;
            feedback = "You've accepted this information. Your future feed will include more similar content.";
            
            // Accepting only positive content reduces diversity
            if (result.sentiment === 'Positive' || result.sentiment === 'Neutral') {
                diversityImpact = 0; // No penalty for balanced content
            } else {
                diversityImpact = -5; // Small penalty for accepting negative content
            }
        } else if (choice === 'reject') {
            this.rejectedCount++;
            feedback = "You've rejected this information. Your bubble narrows, filtering out similar perspectives.";
            
            // Rejecting content always reduces diversity
            diversityImpact = -10;
        } else {
            feedback = "You ignored this bubble - sometimes the best choice when unsure!";
            diversityImpact = -2; // Small penalty for inaction
        }
        
        // Update diversity score
        this.diversityScore = Math.max(0, this.diversityScore + diversityImpact);
        
        this.showRoundResult(choice, result, feedback, diversityImpact);
    }
    
    showRoundResult(choice, result, feedback, diversityImpact) {
        const impactText = diversityImpact === 0 ? 'No change' : 
                          diversityImpact > 0 ? `+${diversityImpact}%` : `${diversityImpact}%`;
        
        const resultHtml = `
            <div class="bubble-result" style="text-align: center; padding: 2rem;">
                <div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 2rem; border-radius: 20px; margin-bottom: 2rem;">
                    <h3 style="color: #2d3436; margin-bottom: 1rem;">
                        Information Processed
                    </h3>
                    <div style="background: rgba(255,255,255,0.8); padding: 1.5rem; border-radius: 15px; margin-bottom: 1rem;">
                        <p><strong>Your Choice:</strong> ${choice.charAt(0).toUpperCase() + choice.slice(1)}</p>
                        <p><strong>Content Type:</strong> ${result.sentiment} sentiment</p>
                        <p><strong>Impact:</strong> ${feedback}</p>
                    </div>
                    <div class="diversity-change" style="font-size: 1.2rem; margin-bottom: 1rem;">
                        <span style="color: #636e72;">Diversity Score: </span>
                        <span style="color: ${this.getDiversityColor()}; font-weight: bold;">${this.diversityScore}%</span>
                        <span style="color: ${diversityImpact >= 0 ? '#27ae60' : '#e74c3c'};">(${impactText})</span>
                    </div>
                    <div class="diversity-meter">
                        <div class="diversity-fill" style="width: ${this.diversityScore}%;"></div>
                    </div>
                </div>
                <button class="action-btn accept-btn" onclick="filterbubbleGame.nextRound()">
                    Next Information Bubble <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        
        this.gameContainer.innerHTML = resultHtml;
        
        // Play impact sound
        window.playSound(diversityImpact < 0 ? 'thud' : 'chime');
    }
    
    nextRound() {
        this.currentRound++;
        this.showBubbleArena();
        this.launchNextBubble();
    }
    
    getDiversityColor() {
        if (this.diversityScore >= 70) return '#27ae60';
        if (this.diversityScore >= 40) return '#f39c12';
        return '#e74c3c';
    }
    
    showFinalResults() {
        let bubbleType;
        let bubbleColor;
        let warning;
        
        if (this.diversityScore >= 70) {
            bubbleType = "Open Information Ecosystem 🌐";
            bubbleColor = "#27ae60";
            warning = "Great job! You maintained a diverse information diet and avoided the filter bubble trap.";
        } else if (this.diversityScore >= 40) {
            bubbleType = "Narrowing Bubble 🫧";
            bubbleColor = "#f39c12";
            warning = "Your information space is getting more limited. Try accepting diverse viewpoints to expand your perspective.";
        } else {
            bubbleType = "Echo Chamber Alert! 📢";
            bubbleColor = "#e74c3c";
            warning = "You're trapped in a filter bubble! Your information diet has become very narrow, which can lead to polarization.";
        }
        
        const acceptanceRate = Math.round((this.acceptedCount / this.totalRounds) * 100);
        const rejectionRate = Math.round((this.rejectedCount / this.totalRounds) * 100);
        
        const resultsHtml = `
            <div class="final-results" style="text-align: center;">
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 2rem; border-radius: 20px; margin-bottom: 2rem;">
                    <h2 style="margin-bottom: 1rem;">
                        <i class="fas fa-chart-line"></i> Filter Bubble Analysis Complete
                    </h2>
                    <div style="font-size: 1.8rem; margin-bottom: 1rem;">${bubbleType}</div>
                    <div style="font-size: 1.5rem; color: ${bubbleColor}; margin-bottom: 2rem;">
                        Final Diversity: ${this.diversityScore}%
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 15px; margin-bottom: 1rem;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem;">
                            <div>
                                <div style="font-size: 2rem; color: #00cec9;">✅</div>
                                <div>Accepted: ${acceptanceRate}%</div>
                            </div>
                            <div>
                                <div style="font-size: 2rem; color: #ff7675;">❌</div>
                                <div>Rejected: ${rejectionRate}%</div>
                            </div>
                        </div>
                    </div>
                    
                    <p style="font-size: 1.1rem; line-height: 1.6;">${warning}</p>
                </div>
                <button class="action-btn accept-btn" onclick="filterbubbleGame.complete()">
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
            <h3>🫧 Filter Bubble Simulator: Information Diversity Mastery</h3>
            <div style="text-align: left; margin: 1.5rem 0;">
                <h4 style="color: #2d3436; margin-bottom: 1rem;">Key Learnings:</h4>
                <ul style="list-style-type: none; padding: 0;">
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #667eea; margin-right: 0.5rem;">🫧</span>
                        <div>
                            <strong>Filter Bubbles Are Real:</strong> Algorithms create personalized information spaces that can become echo chambers.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #667eea; margin-right: 0.5rem;">🌐</span>
                        <div>
                            <strong>Diversity Matters:</strong> Exposure to different perspectives prevents polarization and promotes understanding.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #667eea; margin-right: 0.5rem;">🔄</span>
                        <div>
                            <strong>Break the Loop:</strong> Actively seek out content that challenges your existing views.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #667eea; margin-right: 0.5rem;">⚖️</span>
                        <div>
                            <strong>Balance is Key:</strong> Accept some challenging content to maintain a healthy information diet.
                        </div>
                    </li>
                </ul>
                <div style="background: #e8f4f8; padding: 1rem; border-radius: 10px; margin-top: 1.5rem;">
                    <strong>Your Diversity Score:</strong> ${this.diversityScore}% - ${this.getDiversityAdvice()}
                </div>
            </div>
        `;
        
        window.completeGame('filterbubble', learningContent);
    }
    
    getDiversityAdvice() {
        if (this.diversityScore >= 70) {
            return "Excellent! You've maintained a diverse information ecosystem.";
        } else if (this.diversityScore >= 40) {
            return "Good effort, but try to be more open to challenging perspectives.";
        } else {
            return "Time to burst your bubble! Actively seek diverse viewpoints.";
        }
    }
    
    reset() {
        this.currentRound = 0;
        this.diversityScore = 100;
        this.acceptedCount = 0;
        this.rejectedCount = 0;
        this.gameContainer.innerHTML = '';
    }
}

// Initialize game instance
const filterbubbleGame = new FilterBubbleGame();
