/**
 * UI management for Solana Ascension game
 */

const UI = {
    // Countdown timer elements
    countdownContainer: null,
    countdownTimer: null,

    // Current countdown value in seconds
    currentCountdown: 864000, // 10 days in seconds
    
    // Countdown timer interval
    countdownInterval: null,
    
    /**
     * Initialize the UI
     */
    init: function() {
        this.countdownContainer = document.getElementById('countdown-container');
        this.countdownTimer = document.getElementById('countdown-timer');
        
        // Start the countdown
        this.startCountdown();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize UI animations
        this.initAnimations();
    },
    
    /**
     * Start the countdown timer
     */
    startCountdown: function() {
        // Update timer immediately
        this.updateCountdown();
        
        // Set up interval to update the timer every second
        this.countdownInterval = setInterval(() => {
            this.currentCountdown--;
            
            if (this.currentCountdown <= 0) {
                // Countdown reached zero
                clearInterval(this.countdownInterval);
                this.handleCountdownEnd();
            } else {
                this.updateCountdown();
                
                // Trigger events at specific times
                this.checkCountdownMilestones();
            }
        }, 1000);
    },
    
    /**
     * Update the countdown display
     */
    updateCountdown: function() {
        this.countdownTimer.textContent = Utils.formatTime(this.currentCountdown);
        
        // Visual effects based on time remaining
        if (this.currentCountdown < 86400) { // Less than 1 day
            this.countdownContainer.style.borderColor = '#FF4500';
            this.countdownTimer.style.color = '#FF4500';
        } else if (this.currentCountdown < 259200) { // Less than 3 days
            this.countdownContainer.style.borderColor = '#FFA500';
            this.countdownTimer.style.color = '#FFA500';
        }
    },
    
    /**
     * Check for countdown milestones to trigger events
     */
    checkCountdownMilestones: function() {
        // Examples of milestone times
        const milestones = [
            { time: 864000 - 3600, event: 'nearMilestone' }, // 1 hour into the game
            { time: 691200, event: 'quarterComplete' },      // 2 days remaining
            { time: 432000, event: 'halfwayPoint' },         // 5 days remaining
            { time: 86400, event: 'finalDay' },              // 1 day remaining
            { time: 3600, event: 'finalHour' }               // 1 hour remaining
        ];
        
        milestones.forEach(milestone => {
            if (this.currentCountdown === milestone.time) {
                Utils.events.emit(milestone.event);
                
                // Show notification based on the milestone
                switch (milestone.event) {
                    case 'nearMilestone':
                        Utils.showNotification('World Shifting', 'You feel a subtle change in the atmosphere as Solana begins its ascent.');
                        break;
                    case 'quarterComplete':
                        Utils.showNotification('Power Surge', 'Technological systems throughout the city experience a sudden boost in efficiency.');
                        break;
                    case 'halfwayPoint':
                        Utils.showNotification('Harmony Rising', 'The halfway point approaches! New areas of the city have begun to transform.');
                        break;
                    case 'finalDay':
                        Utils.showNotification('Final Countdown', 'Only 24 hours remain until Solana reaches $1000!', 10000);
                        break;
                    case 'finalHour':
                        Utils.showNotification('Imminent Ascension', 'The final hour is upon us. Complete your preparations for utopia!', 10000);
                        break;
                }
            }
        });
    },
    
    /**
     * Handle the end of the countdown
     */
    handleCountdownEnd: function() {
        this.countdownTimer.textContent = '00:00:00:00';
        this.countdownContainer.style.borderColor = '#14F195';
        this.countdownTimer.style.color = '#14F195';
        
        // Trigger ascension event
        Utils.events.emit('ascension');
        
        // Show notification
        Utils.showNotification('ASCENSION ACHIEVED', 'Solana has reached $1000! The world is transforming into utopia!', 15000);
        
        // Animate the countdown container
        gsap.to(this.countdownContainer, {
            backgroundColor: 'rgba(20, 241, 149, 0.3)',
            boxShadow: '0 0 30px rgba(20, 241, 149, 0.8)',
            padding: '15px 30px',
            duration: 1,
            repeat: 5,
            yoyo: true
        });
    },
    
    /**
     * Set up UI event listeners
     */
    setupEventListeners: function() {
        // Example of listening for game events
        Utils.events.on('questCompleted', (questId, questTitle) => {
            Utils.showNotification('Quest Completed', `You have completed: ${questTitle}`);
            
            // Could add quest rewards, exp, etc. here
        });
        
        Utils.events.on('newQuest', (questId, questTitle, questDescription) => {
            Utils.showNotification('New Quest', questDescription);
        });
        
        Utils.events.on('ascension', () => {
            // Handle world transformation
            World.transform();
        });
    },
    
    /**
     * Initialize UI animations
     */
    initAnimations: function() {
        // Animate countdown container on start
        gsap.from(this.countdownContainer, {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: 'back.out',
            delay: 1
        });
        
        // Animate controls info
        gsap.from('#controls-info', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'back.out',
            delay: 1.2
        });
        
        // Pulse effect for countdown
        gsap.to(this.countdownContainer, {
            boxShadow: '0 0 15px rgba(153, 69, 255, 0.8)',
            duration: 2,
            repeat: -1,
            yoyo: true
        });
    }
};
