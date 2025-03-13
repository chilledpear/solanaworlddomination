/**
 * Quest system for Solana Ascension game
 */

const Quests = {
    // List of all quests
    all: {
        intro: {
            id: 'intro',
            title: 'Welcome to New Horizon',
            description: 'Find the Ascension Monument in the central plaza.',
            type: 'story',
            objective: {
                type: 'location',
                target: 'monument',
                distance: 5
            },
            rewards: {
                experience: 50
            },
            nextQuest: 'meetProphet'
        },
        meetProphet: {
            id: 'meetProphet',
            title: 'The Prophet\'s Vision',
            description: 'Speak with the Prophet to learn about the coming transformation.',
            type: 'dialogue',
            objective: {
                type: 'npc',
                target: 'prophet'
            },
            rewards: {
                experience: 100
            },
            nextQuest: 'cryptoMining'
        },
        cryptoMining: {
            id: 'cryptoMining',
            title: 'Mining the Future',
            description: 'Try your hand at the Crypto Mining mini-game to contribute to Solana\'s growth.',
            type: 'miniGame',
            objective: {
                type: 'miniGame',
                target: 'cryptoMining'
            },
            rewards: {
                experience: 150,
                items: ['Basic Mining Algorithm']
            },
            nextQuest: 'exploreDistrict'
        },
        exploreDistrict: {
            id: 'exploreDistrict',
            title: 'Exploring New Horizon',
            description: 'Explore the Tech District and find the Innovation Center.',
            type: 'exploration',
            objective: {
                type: 'location',
                target: 'innovationCenter',
                distance: 5
            },
            rewards: {
                experience: 100
            },
            nextQuest: 'collectResources'
        },
        collectResources: {
            id: 'collectResources',
            title: 'Resource Collection',
            description: 'Collect digital resources scattered around the city.',
            type: 'collection',
            objective: {
                type: 'items',
                target: 'digitalFragment',
                count: 5
            },
            rewards: {
                experience: 200,
                items: ['Data Compressor']
            },
            nextQuest: null
        }
    },
    
    // Currently active quests
    active: {},
    
    // Completed quests
    completed: {},
    
    // Current active quest marker
    activeMarker: null,
    
    /**
     * Initialize the quest system
     */
    init: function(scene) {
        this.scene = scene;
        
        // Set up event listeners for quest objectives
        this.setupEventListeners();
        
        // Start the intro quest automatically
        this.startQuest('intro');
    },
    
    /**
     * Set up event listeners for quest progression
     */
    setupEventListeners: function() {
        // Listen for NPC dialogues (for dialogue quests)
        Utils.events.on('npcDialogue', (npcType, dialogue) => {
            this.checkDialogueObjectives(npcType);
        });
        
        // Listen for mini-game completions
        Utils.events.on('miniGameCompleted', (gameType, score) => {
            this.checkMiniGameObjectives(gameType);
        });
        
        // Listen for item collections
        Utils.events.on('itemCollected', (itemType) => {
            this.checkItemObjectives(itemType);
        });
    },
    
    /**
     * Start a new quest
     */
    startQuest: function(questId) {
        const quest = this.all[questId];
        if (!quest) return;
        
        // Add to active quests
        this.active[questId] = {
            ...quest,
            progress: 0,
            isComplete: false
        };
        
        // Show notification
        Utils.showNotification('New Quest', quest.description, 8000);
        
        // Create quest marker if location-based
        if (quest.objective.type === 'location') {
            this.createQuestMarker(quest);
        }
        
        // Trigger quest started event
        Utils.events.emit('questStarted', questId, quest.title, quest.description);
    },
    
    /**
     * Create a quest marker in the world
     */
    createQuestMarker: function(quest) {
        // Remove existing marker if there is one
        if (this.activeMarker) {
            this.scene.remove(this.activeMarker);
        }
        
        // Create marker geometry
        const geometry = new THREE.CylinderGeometry(0.5, 0, 2, 8);
        const material = new THREE.MeshPhongMaterial({
            color: 0x14F195,
            emissive: 0x14F195,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.7
        });
        
        // Create marker mesh
        this.activeMarker = new THREE.Mesh(geometry, material);
        
        // Position based on target
        let position;
        
        // In a real game, we'd have a lookup for all location targets
        // For this demo, we'll use some predefined positions
        switch (quest.objective.target) {
            case 'monument':
                position = new THREE.Vector3(0, 0, 0);
                break;
            case 'innovationCenter':
                position = new THREE.Vector3(20, 0, 20);
                break;
            default:
                position = new THREE.Vector3(
                    Utils.randomInt(-20, 20),
                    0,
                    Utils.randomInt(-20, 20)
                );
        }
        
        this.activeMarker.position.copy(position);
        this.activeMarker.position.y = 1; // Slightly above ground
        
        // Add animation properties
        this.activeMarker.userData = {
            originalY: this.activeMarker.position.y,
            quest: quest.id
        };
        
        // Add to scene
        this.scene.add(this.activeMarker);
    },
    
    /**
     * Update quest objectives and markers
     */
    update: function(playerPosition) {
        // No need to check if no active quests
        if (Object.keys(this.active).length === 0) return;
        
        // Check location-based objectives
        for (const questId in this.active) {
            const quest = this.active[questId];
            
            if (quest.objective.type === 'location' && !quest.isComplete) {
                this.checkLocationObjective(quest, playerPosition);
            }
        }
        
        // Animate active marker
        if (this.activeMarker) {
            this.activeMarker.position.y = this.activeMarker.userData.originalY + Math.sin(performance.now() * 0.002) * 0.3;
            this.activeMarker.rotation.y += 0.01;
        }
    },
    
    /**
     * Check if player is near a location objective
     */
    checkLocationObjective: function(quest, playerPosition) {
        if (!this.activeMarker) return;
        
        // Calculate distance to marker
        const distance = playerPosition.distanceTo(this.activeMarker.position);
        
        // Check if close enough
        if (distance <= quest.objective.distance) {
            this.completeQuest(quest.id);
        }
    },
    
    /**
     * Check dialogue objectives
     */
    checkDialogueObjectives: function(npcType) {
        for (const questId in this.active) {
            const quest = this.active[questId];
            
            if (quest.objective.type === 'npc' && 
                quest.objective.target === npcType &&
                !quest.isComplete) {
                this.completeQuest(questId);
            }
        }
    },
    
    /**
     * Check mini-game objectives
     */
    checkMiniGameObjectives: function(gameType) {
        for (const questId in this.active) {
            const quest = this.active[questId];
            
            if (quest.objective.type === 'miniGame' && 
                quest.objective.target === gameType &&
                !quest.isComplete) {
                this.completeQuest(questId);
            }
        }
    },
    
    /**
     * Check item collection objectives
     */
    checkItemObjectives: function(itemType) {
        for (const questId in this.active) {
            const quest = this.active[questId];
            
            if (quest.objective.type === 'items' && 
                quest.objective.target === itemType &&
                !quest.isComplete) {
                
                // Increase progress
                quest.progress++;
                
                // Check if all items collected
                if (quest.progress >= quest.objective.count) {
                    this.completeQuest(questId);
                } else {
                    // Update progress notification
                    Utils.showNotification(
                        quest.title, 
                        `Collected ${quest.progress}/${quest.objective.count} ${itemType}s`, 
                        3000
                    );
                }
            }
        }
    },
    
    /**
     * Complete a quest
     */
    completeQuest: function(questId) {
        const quest = this.active[questId];
        if (!quest || quest.isComplete) return;
        
        // Mark as complete
        quest.isComplete = true;
        
        // Move from active to completed
        this.completed[questId] = quest;
        delete this.active[questId];
        
        // Remove marker if this quest had one
        if (this.activeMarker && this.activeMarker.userData.quest === questId) {
            this.scene.remove(this.activeMarker);
            this.activeMarker = null;
        }
        
        // Show completion notification
        Utils.showNotification('Quest Completed', `You have completed: ${quest.title}`, 5000);
        
        // Trigger quest completed event
        Utils.events.emit('questCompleted', questId, quest.title);
        
        // Start next quest if there is one
        if (quest.nextQuest) {
            setTimeout(() => {
                this.startQuest(quest.nextQuest);
            }, 5000);
        }
    },
    
    /**
     * Get all active quest markers for collision detection
     */
    getQuestMarkers: function() {
        return this.activeMarker ? [this.activeMarker] : [];
    }
};
