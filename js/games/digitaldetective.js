// Digital Detective Game - Noir-style grayscale background for credibility assessment
class DigitalDetectiveGame {
    constructor() {
        this.currentCaseIndex = 0;
        this.correctChoices = 0;
        this.totalCases = 0;
        this.gameContainer = document.getElementById('detective-content');
        this.evidence = FALLBACK_STORIES.digitaldetective;
        this.aiIntegration = new AIIntegration();
    }
    
    start() {
        this.currentCaseIndex = 0;
        this.correctChoices = 0;
        this.totalCases = Math.min(6, this.evidence.length); // Investigate 6 pieces of evidence
        this.showIntroduction();
        
        console.log('Digital Detective game started');
        
        // Play detective sound
        window.playSound('typewriter');
    }
    
    showIntroduction() {
        const introHtml = `
            <div style="text-align: center;">
                <h2 style="color: #ecf0f1; margin-bottom: 2rem;">
                    <i class="fas fa-user-secret" style="color: #f39c12;"></i>
                    Digital Detective Bureau
                </h2>
                <div style="background: linear-gradient(135deg, #2c3e50, #34495e); color: #ecf0f1; padding: 2rem; border-radius: 20px; margin-bottom: 2rem; border: 2px solid #f39c12;">
                    <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1rem;">
                        🕵️ Welcome to the shadowy world of digital investigation. In this noir-inspired challenge, you'll examine suspicious digital evidence.
                    </p>
                    <p style="font-size: 1rem; margin-bottom: 1rem;">
                        <strong>Your Detective Tools:</strong>
                    </p>
                    <ul style="list-style: none; padding: 0; text-align: left; max-width: 400px; margin: 0 auto;">
                        <li style="margin: 0.5rem 0;"><span style="color: #27ae60;">🔍 TRUST</span> - Accept the evidence as credible</li>
                        <li style="margin: 0.5rem 0;"><span style="color: #f39c12;">🕵️ INVESTIGATE</span> - Dig deeper for verification</li>
                        <li style="margin: 0.5rem 0;"><span style="color: #e74c3c;">❌ DISMISS</span> - Reject as unreliable</li>
                    </ul>
                    <div style="background: rgba(243, 156, 18, 0.2); padding: 1rem; border-radius: 10px; margin-top: 1rem;">
                        <p style="margin: 0; font-style: italic;">"In the digital age, a good detective never trusts their first impression."</p>
                    </div>
                </div>
                <button class="action-btn trust-btn" onclick="digitaldetectiveGame.startInvestigation()">
                    Open First Case File <i class="fas fa-folder-open"></i>
                </button>
            </div>
        `;
        
        this.gameContainer.innerHTML = introHtml;
    }
    
    startInvestigation() {
        this.showNextEvidence();
    }
    
    showNextEvidence() {
        if (this.currentCaseIndex >= this.totalCases) {
            this.showFinalResults();
            return;
        }
        
        const evidenceItem = this.evidence[this.currentCaseIndex];
        
        const evidenceHtml = `
            <div class="detective-case">
                <div class="case-header" style="text-align: center; margin-bottom: 2rem; color: #ecf0f1;">
                    <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">
                        <i class="fas fa-folder"></i> Case File #${this.currentCaseIndex + 1} of ${this.totalCases}
                    </div>
                    <div style="color: #f39c12;">EVIDENCE ANALYSIS REQUIRED</div>
                </div>
                
                <div class="evidence-container">
                    <div class="evidence-card">
                        <div class="evidence-title">
                            <i class="fas fa-document-alt"></i> Digital Evidence
                        </div>
                        <div class="evidence-content">
                            "${evidenceItem.text}"
                        </div>
                        <div style="margin-top: 1rem; padding: 1rem; background: rgba(243, 156, 18, 0.1); border-radius: 8px;">
                            <div style="color: #f39c12; font-weight: bold; margin-bottom: 0.5rem;">
                                <i class="fas fa-exclamation-triangle"></i> Detective's Question:
                            </div>
                            <div>How should you handle this piece of digital evidence? Consider its source, content, and potential credibility markers.</div>
                        </div>
                    </div>
                    
                    <div class="evidence-actions">
                        <button class="action-btn trust-btn" onclick="digitaldetectiveGame.handleChoice('trust')">
                            <i class="fas fa-thumbs-up"></i> Trust
                        </button>
                        <button class="action-btn investigate-btn" onclick="digitaldetectiveGame.handleChoice('investigate')">
                            <i class="fas fa-search"></i> Investigate
                        </button>
                        <button class="action-btn dismiss-btn" onclick="digitaldetectiveGame.handleChoice('dismiss')">
                            <i class="fas fa-times"></i> Dismiss
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.gameContainer.innerHTML = evidenceHtml;
        
        // Play case opening sound
        window.playSound('typewriter');
    }
    
    async handleChoice(choice) {
        const evidenceItem = this.evidence[this.currentCaseIndex];
        
        // Show loading while processing
        this.gameContainer.innerHTML += showLoading('Analyzing evidence credibility...');
        
        let result;
        try {
            // Try AI credibility analysis
            result = await this.aiIntegration.analyzeCredibility(evidenceItem.text);
        } catch (error) {
            console.log('AI credibility analysis failed, using fallback');
        }
        
        // Use fallback credibility assessment
        if (!result) {
            result = {
                isCredible: evidenceItem.isCredible,
                confidence: 0.85,
                reasoning: evidenceItem.explanation,
                credibilityFactors: evidenceItem.credibilityFactors || []
            };
        }
        
        // Evaluate the detective's choice
        const isCorrectChoice = this.evaluateDetectiveChoice(choice, result.isCredible);
        
        if (isCorrectChoice) {
            this.correctChoices++;
        }
        
        this.showInvestigationResult(choice, result, isCorrectChoice);
    }
    
    evaluateDetectiveChoice(choice, isCredible) {
        // Best practice scoring:
        // - Always investigate (best choice regardless of credibility)
        // - Trust credible sources
        // - Dismiss non-credible sources
        
        if (choice === 'investigate') {
            return true; // Always correct to investigate further
        } else if (choice === 'trust' && isCredible) {
            return true; // Correct to trust credible sources
        } else if (choice === 'dismiss' && !isCredible) {
            return true; // Correct to dismiss non-credible sources
        } else {
            return false; // Wrong judgment
        }
    }
    
    showInvestigationResult(choice, result, isCorrectChoice) {
        const evidenceItem = this.evidence[this.currentCaseIndex];
        
        let detectiveAnalysis;
        switch (choice) {
            case 'trust':
                detectiveAnalysis = isCorrectChoice ? 
                    "You trusted credible evidence - good detective instincts!" :
                    "You trusted questionable evidence - always verify suspicious claims!";
                break;
            case 'investigate':
                detectiveAnalysis = "Excellent detective work! Investigation is always the best approach for digital evidence.";
                break;
            case 'dismiss':
                detectiveAnalysis = isCorrectChoice ? 
                    "Good call! You correctly identified unreliable evidence." :
                    "You dismissed potentially valid evidence - be careful not to dismiss too quickly!";
                break;
        }
        
        const credibilityLabel = result.isCredible ? "CREDIBLE EVIDENCE" : "QUESTIONABLE EVIDENCE";
        const credibilityColor = result.isCredible ? "#27ae60" : "#e74c3c";
        
        const resultHtml = `
            <div class="investigation-result" style="color: #ecf0f1;">
                <div style="background: linear-gradient(135deg, #2c3e50, #34495e); padding: 2rem; border-radius: 20px; border: 2px solid ${isCorrectChoice ? '#27ae60' : '#e74c3c'};">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">
                            ${isCorrectChoice ? '🕵️✅' : '🔍❌'}
                        </div>
                        <div style="font-size: 1.5rem; color: ${credibilityColor}; margin-bottom: 1rem;">
                            ${credibilityLabel}
                        </div>
                    </div>
                    
                    <div style="background: rgba(243, 156, 18, 0.1); padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
                        <h4 style="color: #f39c12; margin-bottom: 1rem;">Detective's Assessment:</h4>
                        <p style="margin-bottom: 1rem;">${detectiveAnalysis}</p>
                        <p><strong>Evidence Analysis:</strong> ${result.reasoning || evidenceItem.explanation}</p>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 10px;">
                        <h4 style="color: #ecf0f1; margin-bottom: 0.5rem;">🔍 Professional Tip:</h4>
                        <p style="margin: 0; font-style: italic;">
                            Always look for: credible sources, recent dates, corroborating evidence, and expert verification. When in doubt, investigate further!
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="action-btn investigate-btn" onclick="digitaldetectiveGame.nextCase()">
                        Next Case File <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        
        this.gameContainer.innerHTML = resultHtml;
        
        // Play result sound
        window.playSound(isCorrectChoice ? 'success' : 'typewriter');
    }
    
    nextCase() {
        this.currentCaseIndex++;
        this.showNextEvidence();
    }
    
    showFinalResults() {
        const accuracyRate = Math.round((this.correctChoices / this.totalCases) * 100);
        let detectiveRank;
        let rankColor;
        let badge;
        let evaluation;
        
        if (accuracyRate >= 85) {
            detectiveRank = "Master Detective 🕵️‍♀️";
            rankColor = "#f39c12";
            badge = "🏆";
            evaluation = "Outstanding! You have excellent instincts for digital evidence assessment.";
        } else if (accuracyRate >= 70) {
            detectiveRank = "Skilled Investigator 🔍";
            rankColor = "#27ae60";
            badge = "🥇";
            evaluation = "Well done! Your detective skills are developing nicely.";
        } else if (accuracyRate >= 50) {
            detectiveRank = "Detective in Training 👮";
            rankColor = "#3498db";
            badge = "🥈";
            evaluation = "You're learning! Keep practicing your evidence evaluation skills.";
        } else {
            detectiveRank = "Rookie Investigator 👶";
            rankColor = "#e74c3c";
            badge = "🥉";
            evaluation = "Every great detective starts somewhere. Focus on verification techniques!";
        }
        
        const resultsHtml = `
            <div class="final-results" style="color: #ecf0f1; text-align: center;">
                <div style="background: linear-gradient(135deg, #2c3e50, #34495e); padding: 3rem; border-radius: 20px; border: 3px solid ${rankColor};">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">${badge}</div>
                    <h2 style="color: ${rankColor}; margin-bottom: 1rem;">
                        Case Files Closed
                    </h2>
                    <div style="font-size: 1.8rem; margin-bottom: 2rem;">${detectiveRank}</div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                        <div style="background: rgba(243, 156, 18, 0.2); padding: 1rem; border-radius: 10px;">
                            <div style="font-size: 2rem; color: #f39c12;">📁</div>
                            <div>Cases Solved</div>
                            <div style="font-size: 1.5rem; font-weight: bold;">${this.correctChoices}/${this.totalCases}</div>
                        </div>
                        <div style="background: rgba(243, 156, 18, 0.2); padding: 1rem; border-radius: 10px;">
                            <div style="font-size: 2rem; color: #f39c12;">📊</div>
                            <div>Accuracy Rate</div>
                            <div style="font-size: 1.5rem; font-weight: bold;">${accuracyRate}%</div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
                        <h3 style="color: #f39c12; margin-bottom: 1rem;">Final Assessment</h3>
                        <p style="font-size: 1.1rem; line-height: 1.6;">${evaluation}</p>
                    </div>
                    
                    <div style="background: rgba(39, 174, 96, 0.1); padding: 1rem; border-radius: 10px; border-left: 4px solid #27ae60;">
                        <p style="margin: 0; font-style: italic;">"A digital detective's greatest tool is healthy skepticism combined with thorough verification."</p>
                    </div>
                </div>
                
                <button class="action-btn trust-btn" onclick="digitaldetectiveGame.complete()" style="margin-top: 2rem;">
                    Complete Investigation <i class="fas fa-graduation-cap"></i>
                </button>
            </div>
        `;
        
        this.gameContainer.innerHTML = resultsHtml;
        
        // Play completion sound
        window.playSound('completion');
    }
    
    complete() {
        const accuracyRate = Math.round((this.correctChoices / this.totalCases) * 100);
        
        const learningContent = `
            <h3>🕵️ Digital Detective: Source Credibility Mastery</h3>
            <div style="text-align: left; margin: 1.5rem 0;">
                <h4 style="color: #2d3436; margin-bottom: 1rem;">Detective Skills Acquired:</h4>
                <ul style="list-style-type: none; padding: 0;">
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #f39c12; margin-right: 0.5rem;">🔍</span>
                        <div>
                            <strong>Source Verification:</strong> Always check the author, publication, and institutional backing of information.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #f39c12; margin-right: 0.5rem;">📅</span>
                        <div>
                            <strong>Timeliness Matters:</strong> Check publication dates and ensure information is current and relevant.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #f39c12; margin-right: 0.5rem;">🔗</span>
                        <div>
                            <strong>Cross-Reference Everything:</strong> Look for multiple independent sources confirming the same information.
                        </div>
                    </li>
                    <li style="margin: 0.8rem 0; display: flex; align-items: flex-start;">
                        <span style="color: #f39c12; margin-right: 0.5rem;">⚠️</span>
                        <div>
                            <strong>Red Flags Recognition:</strong> Be wary of sensational headlines, emotional language, and unsupported claims.
                        </div>
                    </li>
                </ul>
                <div style="background: #e8f4f8; padding: 1rem; border-radius: 10px; margin-top: 1.5rem; border-left: 4px solid #f39c12;">
                    <strong>Your Detective Badge:</strong> ${accuracyRate}% Accuracy Rate - ${this.getDetectiveAdvice(accuracyRate)}
                </div>
                <div style="margin-top: 1rem; padding: 1rem; background: #2c3e50; color: white; border-radius: 10px; text-align: center;">
                    <em>"In the digital age, every citizen must be their own detective."</em>
                </div>
            </div>
        `;
        
        window.completeGame('digitaldetective', learningContent);
    }
    
    getDetectiveAdvice(accuracy) {
        if (accuracy >= 85) {
            return "You're ready to tackle any digital misinformation!";
        } else if (accuracy >= 70) {
            return "Great work! Keep practicing these verification skills.";
        } else if (accuracy >= 50) {
            return "You're improving! Remember: when in doubt, investigate.";
        } else {
            return "Keep learning! Start with basic source checking techniques.";
        }
    }
    
    reset() {
        this.currentCaseIndex = 0;
        this.correctChoices = 0;
        this.gameContainer.innerHTML = '';
    }
}

// Initialize game instance
const digitaldetectiveGame = new DigitalDetectiveGame();
