// AI Integration System with Hugging Face and fallback support
class AIIntegration {
    constructor() {
        this.huggingFaceKey = this.getApiKey();
        this.baseUrl = 'https://api-inference.huggingface.co/models';
        this.models = {
            sentiment: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
            fakeNews: 'martin-ha/toxic-comment-model',
            credibility: 'unitary/toxic-bert',
            bias: 'unitary/toxic-bert'
        };
        this.requestCount = 0;
        this.maxRequests = 50; // Rate limiting
    }
    
    getApiKey() {
        // Try to get from window object or use fallback
        return window?.HUGGING_FACE_API_KEY || 
               'hf_default_fallback_key';
    }
    
    async makeHuggingFaceRequest(modelName, text) {
        // Check rate limits
        if (this.requestCount >= this.maxRequests) {
            throw new Error('Rate limit exceeded');
        }
        
        const url = `${this.baseUrl}/${modelName}`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.huggingFaceKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: text,
                    options: {
                        wait_for_model: false,
                        use_cache: true
                    }
                })
            });
            
            this.requestCount++;
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            // Handle loading state
            if (result.error && result.error.includes('loading')) {
                throw new Error('Model loading');
            }
            
            return result;
        } catch (error) {
            console.warn(`Hugging Face request failed: ${error.message}`);
            throw error;
        }
    }
    
    // Analyze sentiment for Filter Bubble game
    async analyzeSentiment(text) {
        try {
            const result = await this.makeHuggingFaceRequest(this.models.sentiment, text);
            
            if (result && result.length > 0) {
                const prediction = result[0];
                const sentiment = prediction.label;
                const confidence = prediction.score;
                
                return {
                    sentiment: sentiment.charAt(0).toUpperCase() + sentiment.slice(1).toLowerCase(),
                    confidence: confidence,
                    reasoning: `AI analysis detected ${sentiment.toLowerCase()} sentiment with ${Math.round(confidence * 100)}% confidence.`
                };
            }
            
            throw new Error('Invalid AI response');
        } catch (error) {
            console.log('AI sentiment analysis failed, will use fallback');
            throw error;
        }
    }
    
    // Analyze fake news for RumorVille game
    async analyzeFakeNews(text) {
        try {
            // Use toxicity detection as a proxy for suspicious content
            const result = await this.makeHuggingFaceRequest(this.models.fakeNews, text);
            
            if (result && result.length > 0) {
                const prediction = result[0];
                const toxicScore = prediction.score;
                
                // Heuristic: highly toxic content is more likely to be misinformation
                const suspicionLevel = toxicScore;
                const isCredible = suspicionLevel < 0.3;
                
                return {
                    isCredible: isCredible,
                    confidence: Math.abs(1 - suspicionLevel),
                    reasoning: `AI analysis ${isCredible ? 'found no major red flags' : 'detected suspicious patterns'} in this content.`
                };
            }
            
            throw new Error('Invalid AI response');
        } catch (error) {
            console.log('AI fake news analysis failed, will use fallback');
            throw error;
        }
    }
    
    // Analyze credibility for Digital Detective game
    async analyzeCredibility(text) {
        try {
            const result = await this.makeHuggingFaceRequest(this.models.credibility, text);
            
            if (result && result.length > 0) {
                const prediction = result[0];
                const toxicScore = prediction.score;
                
                // Heuristic: less toxic content from better sources tends to be more credible
                const credibilityScore = 1 - toxicScore;
                const isCredible = credibilityScore > 0.6;
                
                const credibilityFactors = this.extractCredibilityFactors(text);
                
                return {
                    isCredible: isCredible,
                    confidence: credibilityScore,
                    reasoning: `AI assessment: ${isCredible ? 'Source shows credible characteristics' : 'Multiple credibility concerns detected'}.`,
                    credibilityFactors: credibilityFactors
                };
            }
            
            throw new Error('Invalid AI response');
        } catch (error) {
            console.log('AI credibility analysis failed, will use fallback');
            throw error;
        }
    }
    
    // Analyze bias for Echo Chamber game
    async analyzeBias(text) {
        try {
            const result = await this.makeHuggingFaceRequest(this.models.bias, text);
            
            if (result && result.length > 0) {
                const prediction = result[0];
                const toxicScore = prediction.score;
                
                // Heuristic: higher toxicity often correlates with bias
                const biasLevel = toxicScore > 0.4 ? 'biased' : 'balanced';
                const biasType = this.detectBiasType(text);
                
                return {
                    biasLevel: biasLevel,
                    biasType: biasType,
                    confidence: toxicScore,
                    reasoning: `AI detected ${biasLevel} content with ${biasType} characteristics.`
                };
            }
            
            throw new Error('Invalid AI response');
        } catch (error) {
            console.log('AI bias analysis failed, will use fallback');
            throw error;
        }
    }
    
    // Helper methods for enhanced analysis
    extractCredibilityFactors(text) {
        const factors = [];
        
        // Check for credible source indicators
        if (text.includes('study') || text.includes('research') || text.includes('peer-reviewed')) {
            factors.push('Scientific backing mentioned');
        }
        if (text.includes('WHO') || text.includes('CDC') || text.includes('NASA') || text.includes('university')) {
            factors.push('Authoritative source');
        }
        if (text.includes('report') || text.includes('published')) {
            factors.push('Published content');
        }
        
        // Check for non-credible indicators
        if (text.includes('miracle') || text.includes('shocking') || text.includes('unbelievable')) {
            factors.push('Sensational language');
        }
        if (text.includes('click here') || text.includes('won\'t believe')) {
            factors.push('Clickbait patterns');
        }
        if (text.includes('they don\'t want you to know')) {
            factors.push('Conspiracy language');
        }
        
        return factors;
    }
    
    detectBiasType(text) {
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes('everyone') || lowerText.includes('always') || lowerText.includes('never')) {
            return 'absolute thinking';
        }
        if (lowerText.includes('they') && (lowerText.includes('lie') || lowerText.includes('wrong'))) {
            return 'us vs them';
        }
        if (lowerText.includes('ignorant') || lowerText.includes('stupid') || lowerText.includes('brainwashed')) {
            return 'ad hominem';
        }
        if (lowerText.includes('only') && lowerText.includes('truth')) {
            return 'confirmation bias';
        }
        
        return 'general bias';
    }
    
    // Test AI connectivity
    async testConnection() {
        try {
            const testResult = await this.analyzeSentiment('This is a test message.');
            console.log('AI integration test successful:', testResult);
            return true;
        } catch (error) {
            console.log('AI integration test failed, fallback system will be used:', error.message);
            return false;
        }
    }
    
    // Get AI status for debugging
    getStatus() {
        return {
            requestCount: this.requestCount,
            maxRequests: this.maxRequests,
            hasApiKey: this.huggingFaceKey !== 'hf_default_fallback_key',
            modelsAvailable: Object.keys(this.models)
        };
    }
    
    // Reset rate limiting (for testing)
    resetRateLimit() {
        this.requestCount = 0;
    }
}

// Alternative local AI integration using ml5.js (if Hugging Face fails)
class LocalAIIntegration {
    constructor() {
        this.models = {};
        this.isLoaded = false;
        this.initializeLocalModels();
    }
    
    async initializeLocalModels() {
        try {
            // Note: This would require ml5.js models to be loaded
            // For now, we'll use rule-based fallbacks
            console.log('Local AI models would be initialized here');
            this.isLoaded = true;
        } catch (error) {
            console.warn('Local AI initialization failed:', error);
        }
    }
    
    // Simple rule-based sentiment analysis
    analyzeSentimentLocally(text) {
        const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best', 'awesome', 'perfect'];
        const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'disgusting', 'sad', 'angry', 'disappointed'];
        
        const words = text.toLowerCase().split(/\s+/);
        let positiveCount = 0;
        let negativeCount = 0;
        
        words.forEach(word => {
            if (positiveWords.includes(word)) positiveCount++;
            if (negativeWords.includes(word)) negativeCount++;
        });
        
        let sentiment = 'Neutral';
        if (positiveCount > negativeCount) sentiment = 'Positive';
        if (negativeCount > positiveCount) sentiment = 'Negative';
        
        const confidence = Math.min(0.9, Math.max(0.6, Math.abs(positiveCount - negativeCount) / words.length * 10));
        
        return {
            sentiment: sentiment,
            confidence: confidence,
            reasoning: `Local analysis detected ${sentiment.toLowerCase()} sentiment based on word patterns.`
        };
    }
    
    // Simple rule-based credibility analysis
    analyzeCredibilityLocally(text) {
        const credibleIndicators = ['study', 'research', 'university', 'professor', 'published', 'peer-reviewed', 'WHO', 'CDC', 'NASA'];
        const incredibleIndicators = ['miracle', 'shocking', 'unbelievable', 'secret', 'they don\'t want', 'click here', 'free'];
        
        const lowerText = text.toLowerCase();
        let credibilityScore = 0.5; // Start neutral
        
        credibleIndicators.forEach(indicator => {
            if (lowerText.includes(indicator)) credibilityScore += 0.1;
        });
        
        incredibleIndicators.forEach(indicator => {
            if (lowerText.includes(indicator)) credibilityScore -= 0.15;
        });
        
        credibilityScore = Math.max(0, Math.min(1, credibilityScore));
        const isCredible = credibilityScore > 0.6;
        
        return {
            isCredible: isCredible,
            confidence: credibilityScore,
            reasoning: `Local analysis ${isCredible ? 'found credible indicators' : 'detected suspicious patterns'} in the content.`
        };
    }
    
    // Simple rule-based bias analysis
    analyzeBiasLocally(text) {
        const biasIndicators = [
            'everyone who', 'always', 'never', 'all of them', 'they are',
            'ignorant', 'stupid', 'brainwashed', 'only fools',
            'perfect', 'evil', 'our side', 'their side'
        ];
        
        const balanceIndicators = [
            'some', 'might', 'could', 'perhaps', 'it depends',
            'on one hand', 'however', 'but', 'although', 'nuance',
            'complex', 'multiple perspectives', 'both sides'
        ];
        
        const lowerText = text.toLowerCase();
        let biasScore = 0;
        let balanceScore = 0;
        
        biasIndicators.forEach(indicator => {
            if (lowerText.includes(indicator)) biasScore++;
        });
        
        balanceIndicators.forEach(indicator => {
            if (lowerText.includes(indicator)) balanceScore++;
        });
        
        const biasLevel = biasScore > balanceScore ? 'biased' : 'balanced';
        const confidence = Math.min(0.9, Math.max(0.6, Math.abs(biasScore - balanceScore) / 10));
        
        return {
            biasLevel: biasLevel,
            biasType: 'pattern-based',
            confidence: confidence,
            reasoning: `Local analysis detected ${biasLevel} language patterns.`
        };
    }
}

// Export for use in games
window.AIIntegration = AIIntegration;
window.LocalAIIntegration = LocalAIIntegration;
