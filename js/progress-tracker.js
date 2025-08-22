// Progress Tracking System for Veriscope
class ProgressTracker {
    constructor() {
        this.progress = {
            completedGames: [],
            gameScores: {},
            totalPlayTime: 0,
            achievements: [],
            sessionStartTime: Date.now(),
            statistics: {
                rumorsAnalyzed: 0,
                bubblesProcessed: 0,
                evidenceInvestigated: 0,
                biasDetected: 0,
                correctChoices: 0,
                totalChoices: 0
            }
        };
        
        this.achievements = {
            'first_game': {
                name: 'First Steps',
                description: 'Complete your first Veriscope game',
                icon: '🎯',
                unlocked: false
            },
            'all_games': {
                name: 'Media Literacy Master',
                description: 'Complete all 4 Veriscope games',
                icon: '🏆',
                unlocked: false
            },
            'rumor_buster': {
                name: 'Rumor Buster',
                description: 'Score 80% or higher in RumorVille',
                icon: '🕵️',
                unlocked: false
            },
            'bubble_breaker': {
                name: 'Bubble Breaker',
                description: 'Maintain 70% diversity in Filter Bubble Simulator',
                icon: '🫧',
                unlocked: false
            },
            'master_detective': {
                name: 'Master Detective',
                description: 'Score 85% or higher in Digital Detective',
                icon: '🔍',
                unlocked: false
            },
            'echo_escapist': {
                name: 'Echo Escapist',
                description: 'Escape the echo chamber with low echo level',
                icon: '🚪',
                unlocked: false
            },
            'perfectionist': {
                name: 'Perfectionist',
                description: 'Score 100% in any game',
                icon: '💯',
                unlocked: false
            },
            'speed_runner': {
                name: 'Speed Runner',
                description: 'Complete all games in under 30 minutes',
                icon: '⚡',
                unlocked: false
            },
            'critical_thinker': {
                name: 'Critical Thinker',
                description: 'Make 50 correct analytical choices',
                icon: '🧠',
                unlocked: false
            }
        };
        
        this.loadProgress();
    }
    
    loadProgress(savedProgress = null) {
        if (savedProgress) {
            // Load from provided data (for restoration)
            this.progress = { ...this.progress, ...savedProgress };
        } else {
            // Load from localStorage
            const saved = localStorage.getItem('veriscope-progress');
            if (saved) {
                try {
                    const parsedProgress = JSON.parse(saved);
                    this.progress = { ...this.progress, ...parsedProgress };
                    
                    // Restore achievement states
                    if (parsedProgress.achievements) {
                        parsedProgress.achievements.forEach(achievementId => {
                            if (this.achievements[achievementId]) {
                                this.achievements[achievementId].unlocked = true;
                            }
                        });
                    }
                } catch (error) {
                    console.warn('Failed to load progress:', error);
                }
            }
        }
        
        // Update session start time
        this.progress.sessionStartTime = Date.now();
    }
    
    saveProgress() {
        try {
            // Prepare data for saving
            const saveData = {
                ...this.progress,
                achievements: Object.keys(this.achievements).filter(id => this.achievements[id].unlocked),
                lastSaved: Date.now()
            };
            
            localStorage.setItem('veriscope-progress', JSON.stringify(saveData));
            console.log('Progress saved successfully');
        } catch (error) {
            console.error('Failed to save progress:', error);
        }
    }
    
    markGameComplete(gameId, gameData = {}) {
        // Mark game as completed
        if (!this.progress.completedGames.includes(gameId)) {
            this.progress.completedGames.push(gameId);
        }
        
        // Store game score and data
        this.progress.gameScores[gameId] = {
            score: gameData.score || 0,
            percentage: gameData.percentage || 0,
            completedAt: Date.now(),
            attempts: (this.progress.gameScores[gameId]?.attempts || 0) + 1,
            ...gameData
        };
        
        // Update statistics
        this.updateStatistics(gameId, gameData);
        
        // Check for achievements
        this.checkAchievements(gameId, gameData);
        
        // Save progress
        this.saveProgress();
        
        console.log(`Game ${gameId} marked as complete:`, gameData);
    }
    
    updateStatistics(gameId, gameData) {
        const stats = this.progress.statistics;
        
        // Update game-specific statistics
        switch (gameId) {
            case 'rumorville':
                stats.rumorsAnalyzed += gameData.totalRumors || 0;
                break;
            case 'filterbubble':
                stats.bubblesProcessed += gameData.totalBubbles || 0;
                break;
            case 'digitaldetective':
                stats.evidenceInvestigated += gameData.totalCases || 0;
                break;
            case 'echochamber':
                stats.biasDetected += gameData.biasDetected || 0;
                break;
        }
        
        // Update general statistics
        if (gameData.correctChoices !== undefined) {
            stats.correctChoices += gameData.correctChoices;
        }
        if (gameData.totalChoices !== undefined) {
            stats.totalChoices += gameData.totalChoices;
        }
        
        // Update play time
        const sessionTime = Date.now() - this.progress.sessionStartTime;
        this.progress.totalPlayTime += sessionTime;
        this.progress.sessionStartTime = Date.now(); // Reset for next game
    }
    
    checkAchievements(gameId, gameData) {
        const newAchievements = [];
        
        // First game achievement
        if (!this.achievements.first_game.unlocked && this.progress.completedGames.length === 1) {
            this.achievements.first_game.unlocked = true;
            newAchievements.push('first_game');
        }
        
        // All games achievement
        if (!this.achievements.all_games.unlocked && this.progress.completedGames.length === 4) {
            this.achievements.all_games.unlocked = true;
            newAchievements.push('all_games');
        }
        
        // Game-specific achievements
        const percentage = gameData.percentage || 0;
        
        if (gameId === 'rumorville' && percentage >= 80 && !this.achievements.rumor_buster.unlocked) {
            this.achievements.rumor_buster.unlocked = true;
            newAchievements.push('rumor_buster');
        }
        
        if (gameId === 'filterbubble' && (gameData.diversityScore >= 70) && !this.achievements.bubble_breaker.unlocked) {
            this.achievements.bubble_breaker.unlocked = true;
            newAchievements.push('bubble_breaker');
        }
        
        if (gameId === 'digitaldetective' && percentage >= 85 && !this.achievements.master_detective.unlocked) {
            this.achievements.master_detective.unlocked = true;
            newAchievements.push('master_detective');
        }
        
        if (gameId === 'echochamber' && (gameData.echoScore <= 30) && !this.achievements.echo_escapist.unlocked) {
            this.achievements.echo_escapist.unlocked = true;
            newAchievements.push('echo_escapist');
        }
        
        // Perfectionist achievement
        if (percentage === 100 && !this.achievements.perfectionist.unlocked) {
            this.achievements.perfectionist.unlocked = true;
            newAchievements.push('perfectionist');
        }
        
        // Speed runner achievement (all games completed in under 30 minutes)
        if (this.progress.completedGames.length === 4 && this.progress.totalPlayTime < 30 * 60 * 1000 && !this.achievements.speed_runner.unlocked) {
            this.achievements.speed_runner.unlocked = true;
            newAchievements.push('speed_runner');
        }
        
        // Critical thinker achievement
        if (this.progress.statistics.correctChoices >= 50 && !this.achievements.critical_thinker.unlocked) {
            this.achievements.critical_thinker.unlocked = true;
            newAchievements.push('critical_thinker');
        }
        
        // Show achievement notifications
        newAchievements.forEach(achievementId => {
            this.showAchievementNotification(achievementId);
        });
    }
    
    showAchievementNotification(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement) return;
        
        // Create achievement notification
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-text">
                    <div class="achievement-title">Achievement Unlocked!</div>
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                </div>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 1rem;
            border-radius: 15px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 300px;
            animation: achievementSlideIn 0.5s ease-out;
        `;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes achievementSlideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes achievementSlideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .achievement-content { display: flex; align-items: center; gap: 1rem; }
            .achievement-icon { font-size: 2rem; }
            .achievement-title { font-size: 0.8rem; opacity: 0.8; }
            .achievement-name { font-size: 1rem; font-weight: bold; margin-bottom: 0.2rem; }
            .achievement-description { font-size: 0.8rem; opacity: 0.9; }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'achievementSlideOut 0.5s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 5000);
        
        // Play achievement sound
        if (window.playSound) {
            window.playSound('completion');
        }
        
        console.log(`Achievement unlocked: ${achievement.name}`);
    }
    
    // Getter methods
    getCompletedGames() {
        return [...this.progress.completedGames];
    }
    
    getGameScore(gameId) {
        return this.progress.gameScores[gameId] || null;
    }
    
    getProgress() {
        return {
            ...this.progress,
            achievements: Object.keys(this.achievements).filter(id => this.achievements[id].unlocked)
        };
    }
    
    getStatistics() {
        const stats = { ...this.progress.statistics };
        
        // Calculate derived statistics
        stats.accuracyRate = stats.totalChoices > 0 ? 
            Math.round((stats.correctChoices / stats.totalChoices) * 100) : 0;
        
        stats.averageScore = this.calculateAverageScore();
        stats.playTimeFormatted = this.formatPlayTime(this.progress.totalPlayTime);
        stats.gamesCompleted = this.progress.completedGames.length;
        stats.achievementsUnlocked = Object.values(this.achievements).filter(a => a.unlocked).length;
        
        return stats;
    }
    
    getAchievements() {
        return Object.entries(this.achievements).map(([id, achievement]) => ({
            id,
            ...achievement
        }));
    }
    
    getUnlockedAchievements() {
        return this.getAchievements().filter(achievement => achievement.unlocked);
    }
    
    // Utility methods
    calculateAverageScore() {
        const scores = Object.values(this.progress.gameScores);
        if (scores.length === 0) return 0;
        
        const totalScore = scores.reduce((sum, gameScore) => sum + (gameScore.percentage || 0), 0);
        return Math.round(totalScore / scores.length);
    }
    
    formatPlayTime(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        
        if (minutes === 0) {
            return `${seconds}s`;
        } else {
            return `${minutes}m ${seconds}s`;
        }
    }
    
    isGameCompleted(gameId) {
        return this.progress.completedGames.includes(gameId);
    }
    
    getCompletionPercentage() {
        return Math.round((this.progress.completedGames.length / 4) * 100);
    }
    
    // Progress management
    reset() {
        this.progress = {
            completedGames: [],
            gameScores: {},
            totalPlayTime: 0,
            achievements: [],
            sessionStartTime: Date.now(),
            statistics: {
                rumorsAnalyzed: 0,
                bubblesProcessed: 0,
                evidenceInvestigated: 0,
                biasDetected: 0,
                correctChoices: 0,
                totalChoices: 0
            }
        };
        
        // Reset achievements
        Object.keys(this.achievements).forEach(id => {
            this.achievements[id].unlocked = false;
        });
        
        // Clear localStorage
        localStorage.removeItem('veriscope-progress');
        
        console.log('Progress reset successfully');
    }
    
    exportProgress() {
        return JSON.stringify({
            progress: this.progress,
            achievements: Object.keys(this.achievements).filter(id => this.achievements[id].unlocked),
            exportedAt: Date.now(),
            version: '1.0'
        });
    }
    
    importProgress(progressData) {
        try {
            const data = JSON.parse(progressData);
            
            if (data.version !== '1.0') {
                throw new Error('Incompatible progress data version');
            }
            
            this.loadProgress(data.progress);
            
            // Restore achievements
            if (data.achievements) {
                data.achievements.forEach(achievementId => {
                    if (this.achievements[achievementId]) {
                        this.achievements[achievementId].unlocked = true;
                    }
                });
            }
            
            this.saveProgress();
            console.log('Progress imported successfully');
            return true;
        } catch (error) {
            console.error('Failed to import progress:', error);
            return false;
        }
    }
}

// Export for global use
window.ProgressTracker = ProgressTracker;
