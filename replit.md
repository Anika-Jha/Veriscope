# Veriscope - Media Literacy Games

## Overview

Veriscope is an interactive web application designed to teach media literacy through four engaging mini-games. The platform helps users develop critical thinking skills for evaluating digital information, identifying misinformation, and understanding information bias. Each game focuses on a different aspect of media literacy: rumor verification, filter bubbles, digital evidence assessment, and echo chamber awareness.

The application features a progressive game hub where users complete challenges, track their progress, and earn achievements. Each mini-game uses AI-powered analysis combined with pre-written fallback stories to evaluate user choices and provide educational feedback through flashcards.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla JavaScript using a screen-based navigation system
- **Modular Game Structure**: Each mini-game is implemented as a separate class with its own UI themes and mechanics
- **CSS Theming System**: Game-specific visual themes (cartoonish town, surreal bubbles, noir detective, modern techno)
- **Progressive Web App Ready**: Responsive design with mobile-first approach

### Audio System
- **Web Audio API Integration**: Synthetic audio generation as fallback when audio files unavailable
- **Audio Manager**: Centralized system managing background music and sound effects with user controls
- **Placeholder Audio Structure**: Ready for royalty-free audio file integration from sources like Pixabay and Freesound

### Game Logic Architecture
- **AI-First Approach**: Primary analysis using Hugging Face models for sentiment analysis, fake news detection, and credibility assessment
- **Fallback Story System**: Comprehensive pre-written scenarios (10+ per game) when AI analysis fails or is unavailable
- **Progress Tracking**: Persistent user progress, scores, achievements, and statistics across all games
- **Educational Feedback**: Each game concludes with "Flashcard of Learnings" explaining media literacy concepts

### Data Management
- **Local Storage**: Client-side persistence for user progress, preferences, and game statistics
- **Fallback Stories Database**: Structured JavaScript objects containing educational scenarios with explanations
- **Achievement System**: Unlockable achievements based on performance and completion milestones

### Game Components
1. **RumorVille**: Town-themed rumor verification with share/verify/ignore mechanics
2. **Filter Bubble Simulator**: Abstract bubble interface demonstrating information filtering effects
3. **Digital Detective**: Noir-styled evidence evaluation game with trust/investigate/dismiss options
4. **Echo Chamber Escape**: Chatroom simulation focusing on bias detection and engagement choices

## External Dependencies

### AI Services
- **Hugging Face Inference API**: Primary AI analysis using models for sentiment analysis, toxicity detection, and fake news identification
- **Fallback AI**: Web Audio API for synthetic sound generation when external audio unavailable

### Content Resources
- **Font Awesome**: Icon library for UI elements and game themes
- **Royalty-Free Audio Sources**: Pixabay Music, Freesound.org, and Adobe Audio for background music and sound effects

### Browser APIs
- **Web Audio API**: Real-time audio synthesis and playback management
- **Local Storage API**: Client-side data persistence for progress tracking
- **Fetch API**: HTTP requests to Hugging Face models for AI analysis

### Development Dependencies
- **Vanilla JavaScript**: No framework dependencies for maximum compatibility
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **HTML5**: Semantic markup with accessibility considerations

The application is designed to function fully offline with synthetic audio and fallback stories, while providing enhanced experiences when external AI services and audio assets are available.