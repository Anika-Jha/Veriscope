// Main Application Controller
class VeriscopeApp {
    constructor() {
        this.currentScreen = 'landing-page';
        this.audioManager = new AudioManager();
        this.progressTracker = new ProgressTracker();
        this.aiIntegration = new AIIntegration();
        
        // Initialize games
        this.games = {
            rumorville: new RumorVilleGame(),
            filterbubble: new FilterBubbleGame(),
            digitaldetective: new DigitalDetectiveGame(),
            echochamber: new EchoChamberGame()
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadProgress();
        this.updateHubDisplay();
        
        // Initialize audio
        this.audioManager.init();
        
        console.log('Veriscope initialized successfully');
    }
    
    setupEventListeners() {
        // Landing page start button
        document.getElementById('start-button').addEventListener('click', () => {
            this.navigateToScreen('game-hub');
        });
        
        // Game card clicks
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const gameId = card.dataset.game;
                this.startGame(gameId);
            });
        });
        
        // Back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = btn.dataset.target;
                this.navigateToScreen(target);
            });
        });
        
        // Audio toggle buttons
        this.setupAudioToggleListeners();
        
        // Flashcard continue button
        document.getElementById('continue-btn').addEventListener('click', () => {
            this.closeFlashcard();
        });
        
        // Restart journey button
        document.getElementById('restart-journey').addEventListener('click', () => {
            this.restartJourney();
        });
    }
    
    setupAudioToggleListeners() {
        const gameNames = ['rumorville', 'filterbubble', 'detective', 'echochamber'];
        
        gameNames.forEach(gameName => {
            const musicToggle = document.getElementById(`${gameName}-music-toggle`);
            const sfxToggle = document.getElementById(`${gameName}-sfx-toggle`);
            
            if (musicToggle) {
                musicToggle.addEventListener('click', () => {
                    this.audioManager.toggleMusic(gameName);
                    musicToggle.classList.toggle('muted');
                });
            }
            
            if (sfxToggle) {
                sfxToggle.addEventListener('click', () => {
                    this.audioManager.toggleSFX(gameName);
                    sfxToggle.classList.toggle('muted');
                });
            }
        });
    }
    
    navigateToScreen(screenId) {
        // Hide current screen
        const currentScreenEl = document.getElementById(this.currentScreen);
        if (currentScreenEl) {
            currentScreenEl.classList.remove('active');
        }
        
        // Show target screen
        const targetScreenEl = document.getElementById(screenId);
        if (targetScreenEl) {
            targetScreenEl.classList.add('active');
            this.currentScreen = screenId;
            
            // Stop current audio and start appropriate audio for new screen
            this.audioManager.stopAll();
            
            if (screenId.includes('-game')) {
                const gameKey = screenId.replace('-game', '').replace('digital', '');
                this.audioManager.playBackgroundMusic(gameKey);
            }
        }
        
        console.log(`Navigated to: ${screenId}`);
    }
    
    startGame(gameId) {
        const game = this.games[gameId];
        if (game) {
            this.navigateToScreen(`${gameId}-game`);
            game.start();
            console.log(`Started game: ${gameId}`);
        }
    }
    
    loadProgress() {
        const savedProgress = localStorage.getItem('veriscope-progress');
        if (savedProgress) {
            try {
                const progress = JSON.parse(savedProgress);
                this.progressTracker.loadProgress(progress);
            } catch (e) {
                console.warn('Failed to load saved progress:', e);
            }
        }
    }
    
    updateHubDisplay() {
        const completedGames = this.progressTracker.getCompletedGames();
        const totalGames = 4;
        
        // Update progress display
        document.getElementById('games-completed').textContent = completedGames.length;
        const progressFill = document.getElementById('progress-fill');
        progressFill.style.width = `${(completedGames.length / totalGames) * 100}%`;
        
        // Update game card statuses
        completedGames.forEach(gameId => {
            const card = document.getElementById(`${gameId}-card`);
            const status = document.getElementById(`${gameId}-status`);
            
            if (card && status) {
                card.classList.add('completed');
                status.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
                status.classList.add('completed');
            }
        });
        
        // Show final summary if all games completed
        if (completedGames.length >= totalGames) {
            document.getElementById('final-summary').style.display = 'block';
        }
    }
    
    onGameComplete(gameId, learningContent) {
        // Mark game as complete
        this.progressTracker.markGameComplete(gameId);
        
        // Save progress
        localStorage.setItem('veriscope-progress', JSON.stringify(this.progressTracker.getProgress()));
        
        // Show learning flashcard
        this.showFlashcard(learningContent);
        
        // Update hub display
        this.updateHubDisplay();
        
        // Play completion sound
        this.audioManager.playSFX('completion');
        
        console.log(`Game completed: ${gameId}`);
    }
    
    showFlashcard(content) {
        const modal = document.getElementById('flashcard-modal');
        const flashcardContent = document.getElementById('flashcard-content');
        
        flashcardContent.innerHTML = content;
        modal.classList.add('active');
    }
    
    closeFlashcard() {
        const modal = document.getElementById('flashcard-modal');
        modal.classList.remove('active');
        
        // Return to game hub
        this.navigateToScreen('game-hub');
    }
    
    restartJourney() {
        // Clear progress
        this.progressTracker.reset();
        localStorage.removeItem('veriscope-progress');
        
        // Reset UI
        document.querySelectorAll('.game-card').forEach(card => {
            card.classList.remove('completed');
        });
        
        document.querySelectorAll('.game-status').forEach(status => {
            status.innerHTML = '<i class="fas fa-play-circle"></i> Start Game';
            status.classList.remove('completed');
        });
        
        document.getElementById('final-summary').style.display = 'none';
        
        // Reset games
        Object.values(this.games).forEach(game => {
            if (game.reset) {
                game.reset();
            }
        });
        
        // Update display
        this.updateHubDisplay();
        
        // Navigate to landing
        this.navigateToScreen('landing-page');
        
        console.log('Journey restarted');
    }
    
    // Public methods for games to call
    static getInstance() {
        if (!VeriscopeApp.instance) {
            VeriscopeApp.instance = new VeriscopeApp();
        }
        return VeriscopeApp.instance;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.veriscopeApp = VeriscopeApp.getInstance();
});

// Utility functions for games
function showGameResult(isCorrect, title, explanation, onNext) {
    const resultHtml = `
        <div class="game-result ${isCorrect ? 'result-correct' : 'result-incorrect'}">
            <div class="result-icon">
                ${isCorrect ? '✅' : '❌'}
            </div>
            <div class="result-title">${title}</div>
            <div class="result-explanation">${explanation}</div>
            <button class="next-btn" onclick="${onNext}">Continue</button>
        </div>
    `;
    
    return resultHtml;
}

function showLoading(message = 'Processing your choice...') {
    return `
        <div class="loading">
            <div class="spinner"></div>
            <span>${message}</span>
        </div>
    `;
}

// Global utility functions
window.playSound = (soundName) => {
    if (window.veriscopeApp) {
        window.veriscopeApp.audioManager.playSFX(soundName);
    }
};

window.completeGame = (gameId, learningContent) => {
    if (window.veriscopeApp) {
        window.veriscopeApp.onGameComplete(gameId, learningContent);
    }
};
