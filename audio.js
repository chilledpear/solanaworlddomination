/**
 * Audio system for Solana Ascension game
 */

const Audio = {
    // Sound effects
    sounds: {},
    
    // Music tracks
    music: {},
    
    // Current music track
    currentMusic: null,
    
    // Audio context
    context: null,
    
    // Master volume controls
    masterVolume: {
        music: 0.5,
        sfx: 0.7
    },
    
    // Initialize the audio system
    init: function() {
        // Create audio context
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.context = new AudioContext();
            
            // Create master gain nodes
            this.musicGain = this.context.createGain();
            this.sfxGain = this.context.createGain();
            
            // Connect gain nodes to output
            this.musicGain.connect(this.context.destination);
            this.sfxGain.connect(this.context.destination);
            
            // Set initial volumes
            this.setMusicVolume(this.masterVolume.music);
            this.setSFXVolume(this.masterVolume.sfx);
            
            // Load background music
            this.loadMusic('ambient', 'audio/solana_ambient.mp3');
            this.loadMusic('transformation', 'audio/transformation.mp3');
            this.loadMusic('minigame', 'audio/minigame.mp3');
            
            // Load sound effects
            this.loadSound('jump', 'audio/jump.mp3');
            this.loadSound('interact', 'audio/interact.mp3');
            this.loadSound('questComplete', 'audio/quest_complete.mp3');
            this.loadSound('collect', 'audio/collect.mp3');
            this.loadSound('error', 'audio/error.mp3');
            this.loadSound('success', 'audio/success.mp3');
            this.loadSound('countdown', 'audio/countdown.mp3');
            
            // Set up event listeners
            this.setupEvents();
            
            console.log('Audio system initialized successfully');
            
            // Start ambient music after a short delay
            setTimeout(() => {
                this.playMusic('ambient', { loop: true, volume: 0.5 });
            }, 2000);
            
            return true;
        } catch (e) {
            console.error('Audio system initialization failed:', e);
            return false;
        }
    },
    
    // Set up event listeners for game events
    setupEvents: function() {
        // Player actions
        Utils.events.on('playerJump', () => {
            this.playSound('jump');
        });
        
        Utils.events.on('interact', (object) => {
            this.playSound('interact');
        });
        
        // Quest events
        Utils.events.on('questStarted', (questId, title) => {
            this.playSound('interact', { volume: 0.8 });
        });
        
        Utils.events.on('questCompleted', (questId, title) => {
            this.playSound('questComplete', { volume: 1 });
        });
        
        // Item collection
        Utils.events.on('itemCollected', (itemType) => {
            this.playSound('collect', { volume: 0.9 });
        });
        
        // Mini-game events
        Utils.events.on('miniGameStarted', (gameType) => {
            // Fade out current music
            this.fadeOutMusic(1);
            
            // Start mini-game music
            setTimeout(() => {
                this.playMusic('minigame', { loop: true, volume: 0.6 });
            }, 1000);
        });
        
        Utils.events.on('miniGameCompleted', (gameType, score) => {
            this.playSound('success');
            
            // Fade out mini-game music
            this.fadeOutMusic(1);
            
            // Resume ambient music
            setTimeout(() => {
                this.playMusic('ambient', { loop: true, volume: 0.5 });
            }, 1000);
        });
        
        // Transformation events
        Utils.events.on('transformationStage1', () => {
            this.fadeOutMusic(3);
            
            setTimeout(() => {
                this.playMusic('transformation', { loop: true, volume: 0.5 });
            }, 3000);
        });
        
        // Countdown final seconds
        Utils.events.on('finalHour', () => {
            this.playSound('countdown', { volume: 1 });
        });
    },
    
    // Load a music track
    loadMusic: function(name, url) {
        this.generatePlaceholderAudio()
            .then(buffer => {
                this.music[name] = {
                    buffer: buffer,
                    name: name
                };
                console.log(`Music loaded: ${name}`);
            })
            .catch(error => {
                console.error(`Error loading music ${name}:`, error);
            });
    },
    
    // Load a sound effect
    loadSound: function(name, url) {
        this.generatePlaceholderAudio(0.5) // Shorter buffer for sound effects
            .then(buffer => {
                this.sounds[name] = {
                    buffer: buffer,
                    name: name
                };
                console.log(`Sound loaded: ${name}`);
            })
            .catch(error => {
                console.error(`Error loading sound ${name}:`, error);
            });
    },
    
    // Generate placeholder audio for development (since we don't have actual audio files)
    generatePlaceholderAudio: function(duration = 10) {
        return new Promise((resolve, reject) => {
            try {
                // Create an empty stereo buffer at the sample rate of the AudioContext
                const buffer = this.context.createBuffer(
                    2, 
                    this.context.sampleRate * duration, 
                    this.context.sampleRate
                );
                
                // Fill the buffer with noise
                for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
                    const channelData = buffer.getChannelData(channel);
                    for (let i = 0; i < channelData.length; i++) {
                        // Random noise between -1 and 1
                        channelData[i] = (Math.random() * 2 - 1) * 0.15;
                    }
                }
                
                resolve(buffer);
            } catch (e) {
                reject(e);
            }
        });
    },
    
    // Play a music track
    playMusic: function(name, options = {}) {
        // Default options
        const defaults = {
            loop: false,
            volume: 1,
            fadeIn: 0
        };
        
        const settings = { ...defaults, ...options };
        
        if (!this.music[name]) {
            console.error(`Music not found: ${name}`);
            return;
        }
        
        // Stop current music if any
        if (this.currentMusic) {
            this.stopMusic();
        }
        
        // Create source node
        const source = this.context.createBufferSource();
        source.buffer = this.music[name].buffer;
        source.loop = settings.loop;
        
        // Create gain node for this track
        const gainNode = this.context.createGain();
        
        // Connect source to gain, gain to master music gain
        source.connect(gainNode);
        gainNode.connect(this.musicGain);
        
        // Set volume
        if (settings.fadeIn > 0) {
            gainNode.gain.value = 0;
            gainNode.gain.linearRampToValueAtTime(
                settings.volume,
                this.context.currentTime + settings.fadeIn
            );
        } else {
            gainNode.gain.value = settings.volume;
        }
        
        // Start playback
        source.start(0);
        
        // Store reference to current music
        this.currentMusic = {
            source: source,
            gainNode: gainNode,
            name: name
        };
        
        console.log(`Playing music: ${name}`);
        
        return this.currentMusic;
    },
    
    // Stop the current music track
    stopMusic: function() {
        if (!this.currentMusic) return;
        
        try {
            this.currentMusic.source.stop();
        } catch (e) {
            console.log('Music already stopped');
        }
        
        this.currentMusic = null;
    },
    
    // Fade out current music
    fadeOutMusic: function(duration = 2) {
        if (!this.currentMusic) return;
        
        const gainNode = this.currentMusic.gainNode;
        const currentVolume = gainNode.gain.value;
        
        // Schedule fade out
        gainNode.gain.linearRampToValueAtTime(
            currentVolume,
            this.context.currentTime
        );
        gainNode.gain.linearRampToValueAtTime(
            0,
            this.context.currentTime + duration
        );
        
        // Stop the music after fade out
        setTimeout(() => {
            this.stopMusic();
        }, duration * 1000);
    },
    
    // Play a sound effect
    playSound: function(name, options = {}) {
        // Default options
        const defaults = {
            volume: 1,
            pitch: 1
        };
        
        const settings = { ...defaults, ...options };
        
        if (!this.sounds[name]) {
            console.error(`Sound not found: ${name}`);
            return;
        }
        
        // Create source node
        const source = this.context.createBufferSource();
        source.buffer = this.sounds[name].buffer;
        
        // Set playback rate for pitch
        source.playbackRate.value = settings.pitch;
        
        // Create gain node for this sound
        const gainNode = this.context.createGain();
        gainNode.gain.value = settings.volume;
        
        // Connect source to gain, gain to master sfx gain
        source.connect(gainNode);
        gainNode.connect(this.sfxGain);
        
        // Start playback
        source.start(0);
        
        return source;
    },
    
    // Set master music volume
    setMusicVolume: function(volume) {
        this.masterVolume.music = volume;
        this.musicGain.gain.value = volume;
    },
    
    // Set master SFX volume
    setSFXVolume: function(volume) {
        this.masterVolume.sfx = volume;
        this.sfxGain.gain.value = volume;
    },
    
    // Resume audio context (needed for browsers that suspend audio context until user interaction)
    resumeAudio: function() {
        if (this.context && this.context.state === 'suspended') {
            this.context.resume();
        }
    }
};