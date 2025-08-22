// Audio Management System for Veriscope
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.music = {};
        this.musicVolume = 0.3;
        this.sfxVolume = 0.5;
        this.musicEnabled = true;
        this.sfxEnabled = true;
        this.currentMusic = null;
        this.fadeInterval = null;
        
        // Audio file mappings (using placeholder files for now)
        this.soundFiles = {
            // Sound effects
            'pop': this.createSynthSound('pop'),
            'whoosh': this.createSynthSound('whoosh'),
            'chime': this.createSynthSound('chime'),
            'thud': this.createSynthSound('thud'),
            'typewriter': this.createSynthSound('typewriter'),
            'click': this.createSynthSound('click'),
            'ping': this.createSynthSound('ping'),
            'unlock': this.createSynthSound('unlock'),
            'success': this.createSynthSound('success'),
            'error': this.createSynthSound('error'),
            'completion': this.createSynthSound('completion')
        };
        
        this.musicFiles = {
            // Background music
            'rumorville': this.createSynthMusic('upbeat'),
            'filterbubble': this.createSynthMusic('ambient'),
            'detective': this.createSynthMusic('noir'),
            'echochamber': this.createSynthMusic('techno')
        };
    }
    
    async init() {
        try {
            // Initialize Web Audio API
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Load user preferences
            this.loadPreferences();
            
            console.log('Audio system initialized');
            
            // Generate synthetic audio
            this.generateAllSounds();
            
        } catch (error) {
            console.warn('Audio initialization failed:', error);
        }
    }
    
    loadPreferences() {
        const prefs = localStorage.getItem('veriscope-audio-prefs');
        if (prefs) {
            try {
                const preferences = JSON.parse(prefs);
                this.musicEnabled = preferences.musicEnabled !== false;
                this.sfxEnabled = preferences.sfxEnabled !== false;
                this.musicVolume = preferences.musicVolume || 0.3;
                this.sfxVolume = preferences.sfxVolume || 0.5;
            } catch (e) {
                console.warn('Failed to load audio preferences');
            }
        }
    }
    
    savePreferences() {
        const preferences = {
            musicEnabled: this.musicEnabled,
            sfxEnabled: this.sfxEnabled,
            musicVolume: this.musicVolume,
            sfxVolume: this.sfxVolume
        };
        localStorage.setItem('veriscope-audio-prefs', JSON.stringify(preferences));
    }
    
    // Create synthetic sound effects using Web Audio API
    createSynthSound(type) {
        return () => {
            if (!this.audioContext || !this.sfxEnabled) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            const now = this.audioContext.currentTime;
            
            switch (type) {
                case 'pop':
                    oscillator.frequency.setValueAtTime(800, now);
                    oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.1);
                    gainNode.gain.setValueAtTime(this.sfxVolume * 0.3, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                    oscillator.type = 'sine';
                    break;
                    
                case 'whoosh':
                    oscillator.frequency.setValueAtTime(200, now);
                    oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.3);
                    gainNode.gain.setValueAtTime(this.sfxVolume * 0.2, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                    oscillator.type = 'sawtooth';
                    break;
                    
                case 'chime':
                    oscillator.frequency.setValueAtTime(523, now); // C5
                    oscillator.frequency.setValueAtTime(659, now + 0.1); // E5
                    oscillator.frequency.setValueAtTime(784, now + 0.2); // G5
                    gainNode.gain.setValueAtTime(this.sfxVolume * 0.4, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                    oscillator.type = 'sine';
                    break;
                    
                case 'thud':
                    oscillator.frequency.setValueAtTime(60, now);
                    oscillator.frequency.exponentialRampToValueAtTime(30, now + 0.2);
                    gainNode.gain.setValueAtTime(this.sfxVolume * 0.6, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                    oscillator.type = 'square';
                    break;
                    
                case 'typewriter':
                    oscillator.frequency.setValueAtTime(1000, now);
                    gainNode.gain.setValueAtTime(this.sfxVolume * 0.2, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                    oscillator.type = 'square';
                    break;
                    
                case 'click':
                    oscillator.frequency.setValueAtTime(1200, now);
                    gainNode.gain.setValueAtTime(this.sfxVolume * 0.3, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                    oscillator.type = 'square';
                    break;
                    
                case 'ping':
                    oscillator.frequency.setValueAtTime(1000, now);
                    oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.1);
                    gainNode.gain.setValueAtTime(this.sfxVolume * 0.4, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                    oscillator.type = 'sine';
                    break;
                    
                case 'unlock':
                    // Play a chord
                    this.playChord([523, 659, 784], 0.3); // C-E-G major chord
                    return; // Early return to avoid playing single oscillator
                    
                case 'success':
                    // Play ascending notes
                    setTimeout(() => this.playSingleNote(523, 0.1), 0);   // C
                    setTimeout(() => this.playSingleNote(659, 0.1), 100); // E
                    setTimeout(() => this.playSingleNote(784, 0.2), 200); // G
                    return;
                    
                case 'error':
                    oscillator.frequency.setValueAtTime(300, now);
                    oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.3);
                    gainNode.gain.setValueAtTime(this.sfxVolume * 0.5, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                    oscillator.type = 'sawtooth';
                    break;
                    
                case 'completion':
                    // Victory fanfare
                    setTimeout(() => this.playSingleNote(523, 0.15), 0);   // C
                    setTimeout(() => this.playSingleNote(659, 0.15), 150); // E
                    setTimeout(() => this.playSingleNote(784, 0.15), 300); // G
                    setTimeout(() => this.playSingleNote(1047, 0.3), 450); // C octave
                    return;
                    
                default:
                    oscillator.frequency.setValueAtTime(440, now);
                    gainNode.gain.setValueAtTime(this.sfxVolume * 0.3, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                    oscillator.type = 'sine';
            }
            
            oscillator.start(now);
            oscillator.stop(now + 0.5);
        };
    }
    
    playSingleNote(frequency, duration) {
        if (!this.audioContext || !this.sfxEnabled) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        const now = this.audioContext.currentTime;
        
        oscillator.frequency.setValueAtTime(frequency, now);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
        
        oscillator.start(now);
        oscillator.stop(now + duration);
    }
    
    playChord(frequencies, duration) {
        if (!this.audioContext || !this.sfxEnabled) return;
        
        frequencies.forEach(freq => {
            this.playSingleNote(freq, duration);
        });
    }
    
    // Create synthetic background music
    createSynthMusic(type) {
        return () => {
            if (!this.audioContext || !this.musicEnabled) return null;
            
            // Create a simple looping background track
            const musicTrack = {
                oscillators: [],
                gainNodes: [],
                isPlaying: false,
                stop: function() {
                    this.oscillators.forEach(osc => {
                        try { osc.stop(); } catch(e) {}
                    });
                    this.isPlaying = false;
                }
            };
            
            const now = this.audioContext.currentTime;
            
            switch (type) {
                case 'upbeat':
                    this.createUpbeatTrack(musicTrack, now);
                    break;
                case 'ambient':
                    this.createAmbientTrack(musicTrack, now);
                    break;
                case 'noir':
                    this.createNoirTrack(musicTrack, now);
                    break;
                case 'techno':
                    this.createTechnoTrack(musicTrack, now);
                    break;
            }
            
            musicTrack.isPlaying = true;
            return musicTrack;
        };
    }
    
    createUpbeatTrack(track, startTime) {
        // Simple major scale melody
        const notes = [523, 587, 659, 698, 784, 880, 988, 1047]; // C major scale
        let noteIndex = 0;
        
        const playMelodyNote = () => {
            if (!track.isPlaying) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(notes[noteIndex], this.audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(this.musicVolume * 0.1, this.audioContext.currentTime);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.5);
            
            noteIndex = (noteIndex + 1) % notes.length;
            
            setTimeout(playMelodyNote, 600);
        };
        
        setTimeout(playMelodyNote, 100);
    }
    
    createAmbientTrack(track, startTime) {
        // Create ambient pads
        const frequencies = [130.81, 164.81, 196.00, 246.94]; // C3-E3-G3-B3
        
        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, startTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(this.musicVolume * 0.05, startTime + 2);
            
            oscillator.start(startTime);
            
            track.oscillators.push(oscillator);
            track.gainNodes.push(gainNode);
        });
    }
    
    createNoirTrack(track, startTime) {
        // Jazz-inspired bass line
        const bassNotes = [65.41, 73.42, 87.31, 98.00]; // C2-D2-F2-G2
        let bassIndex = 0;
        
        const playBassNote = () => {
            if (!track.isPlaying) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(bassNotes[bassIndex], this.audioContext.currentTime);
            oscillator.type = 'triangle';
            
            gainNode.gain.setValueAtTime(this.musicVolume * 0.15, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1.8);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 2);
            
            bassIndex = (bassIndex + 1) % bassNotes.length;
            
            setTimeout(playBassNote, 1800);
        };
        
        setTimeout(playBassNote, 100);
    }
    
    createTechnoTrack(track, startTime) {
        // Create a simple techno beat
        const beatInterval = setInterval(() => {
            if (!track.isPlaying) {
                clearInterval(beatInterval);
                return;
            }
            
            // Kick drum
            const kick = this.audioContext.createOscillator();
            const kickGain = this.audioContext.createGain();
            
            kick.connect(kickGain);
            kickGain.connect(this.audioContext.destination);
            
            kick.frequency.setValueAtTime(60, this.audioContext.currentTime);
            kick.type = 'sine';
            
            kickGain.gain.setValueAtTime(this.musicVolume * 0.2, this.audioContext.currentTime);
            kickGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            kick.start();
            kick.stop(this.audioContext.currentTime + 0.2);
            
        }, 500);
    }
    
    generateAllSounds() {
        // Pre-generate all sound effect functions
        Object.keys(this.soundFiles).forEach(key => {
            this.sounds[key] = this.soundFiles[key];
        });
        
        Object.keys(this.musicFiles).forEach(key => {
            this.music[key] = this.musicFiles[key];
        });
    }
    
    // Public methods
    playSFX(soundName) {
        if (!this.sfxEnabled || !this.sounds[soundName]) return;
        
        try {
            // Resume audio context if suspended (mobile browsers)
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            this.sounds[soundName]();
        } catch (error) {
            console.warn(`Failed to play sound ${soundName}:`, error);
        }
    }
    
    playBackgroundMusic(gameName) {
        if (!this.musicEnabled || !this.music[gameName]) return;
        
        try {
            // Stop current music
            this.stopMusic();
            
            // Resume audio context if suspended
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            // Start new music
            this.currentMusic = this.music[gameName]();
        } catch (error) {
            console.warn(`Failed to play music for ${gameName}:`, error);
        }
    }
    
    stopMusic() {
        if (this.currentMusic && this.currentMusic.stop) {
            this.currentMusic.stop();
            this.currentMusic = null;
        }
    }
    
    stopAll() {
        this.stopMusic();
    }
    
    toggleMusic(gameName) {
        this.musicEnabled = !this.musicEnabled;
        
        if (!this.musicEnabled) {
            this.stopMusic();
        } else if (gameName) {
            this.playBackgroundMusic(gameName);
        }
        
        this.savePreferences();
    }
    
    toggleSFX(gameName) {
        this.sfxEnabled = !this.sfxEnabled;
        this.savePreferences();
    }
    
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        this.savePreferences();
    }
    
    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
        this.savePreferences();
    }
    
    // Utility methods
    fadeOutMusic(duration = 1000) {
        if (!this.currentMusic) return;
        
        const steps = 20;
        const stepTime = duration / steps;
        const volumeStep = this.musicVolume / steps;
        
        let currentStep = 0;
        
        this.fadeInterval = setInterval(() => {
            currentStep++;
            const newVolume = this.musicVolume - (volumeStep * currentStep);
            
            if (currentStep >= steps || newVolume <= 0) {
                this.stopMusic();
                clearInterval(this.fadeInterval);
                this.fadeInterval = null;
            }
        }, stepTime);
    }
    
    getStatus() {
        return {
            audioContextState: this.audioContext ? this.audioContext.state : 'not initialized',
            musicEnabled: this.musicEnabled,
            sfxEnabled: this.sfxEnabled,
            musicVolume: this.musicVolume,
            sfxVolume: this.sfxVolume,
            currentMusic: this.currentMusic ? 'playing' : 'none',
            availableSounds: Object.keys(this.sounds),
            availableMusic: Object.keys(this.music)
        };
    }
}

// Export for global use
window.AudioManager = AudioManager;
