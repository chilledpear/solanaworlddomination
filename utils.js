/**
 * Utility functions for Solana Ascension game
 */

const Utils = {
    /**
     * Generates a random number between min and max (inclusive)
     */
    randomInt: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Generates a random floating-point number between min and max (inclusive)
     */
    randomFloat: (min, max) => {
        return Math.random() * (max - min) + min;
    },

    /**
     * Formats time in days, hours, minutes, seconds
     * @param {number} totalSeconds - Total seconds to format
     * @returns {string} Formatted time string (DD:HH:MM:SS)
     */
    formatTime: (totalSeconds) => {
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        
        return `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    },

    /**
     * Clamps a value between min and max
     */
    clamp: (value, min, max) => {
        return Math.max(min, Math.min(max, value));
    },

    /**
     * Linear interpolation between two values
     */
    lerp: (start, end, t) => {
        return start * (1 - t) + end * t;
    },

    /**
     * Easing function for smooth transitions
     */
    easeInOutCubic: (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },

    /**
     * Converts degrees to radians
     */
    degToRad: (degrees) => {
        return degrees * (Math.PI / 180);
    },

    /**
     * Shows a notification message
     */
    showNotification: (title, message, duration = 5000) => {
        const notification = document.getElementById('quest-notification');
        document.getElementById('quest-title').textContent = title;
        document.getElementById('quest-description').textContent = message;
        
        notification.style.display = 'block';
        notification.style.opacity = '1';
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 500);
        }, duration);
    },

    /**
     * Updates loading screen progress
     */
    updateLoadingProgress: (percent, message) => {
        const loadingBar = document.getElementById('loading-bar');
        const loadingText = document.getElementById('loading-text');
        
        loadingBar.style.width = `${percent}%`;
        
        if (message) {
            loadingText.textContent = message;
        }
        
        if (percent >= 100) {
            setTimeout(() => {
                document.getElementById('loading-screen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading-screen').style.display = 'none';
                }, 1000);
            }, 500);
        }
    },

    /**
     * Create a color with random hue but controlled saturation and lightness
     */
    createRandomColor: (saturation = 70, lightness = 60) => {
        const hue = Utils.randomInt(0, 360);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    },

    /**
     * Simple event system
     */
    events: {
        listeners: {},
        
        on: function(event, callback) {
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            this.listeners[event].push(callback);
        },
        
        off: function(event, callback) {
            if (!this.listeners[event]) return;
            
            if (callback) {
                this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
            } else {
                delete this.listeners[event];
            }
        },
        
        emit: function(event, ...args) {
            if (!this.listeners[event]) return;
            
            this.listeners[event].forEach(callback => {
                callback(...args);
            });
        }
    }
};