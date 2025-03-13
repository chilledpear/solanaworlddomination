/**
 * Mini-games system for Solana Ascension game
 */

const MiniGames = {
    // Currently active mini-game
    activeGame: null,
    
    // Available mini-games
    games: {
        cryptoMining: {
            name: "Crypto Mining Simulator",
            description: "Match the patterns to mine Solana blocks efficiently.",
            difficulty: 1,
            rewards: {
                experience: 50,
                items: ["Mining Algorithm Upgrade"]
            },
            initialize: function() {
                return MiniGames.createMiningGame();
            }
        },
        marketTrading: {
            name: "Market Trading",
            description: "Buy low, sell high! Predict market movements and profit.",
            difficulty: 2,
            rewards: {
                experience: 75,
                items: ["Market Prediction Algorithm"]
            },
            initialize: function() {
                return MiniGames.createTradingGame();
            }
        },
        blockchainPuzzle: {
            name: "Blockchain Puzzle",
            description: "Connect the blocks in the correct sequence to complete the chain.",
            difficulty: 2,
            rewards: {
                experience: 100,
                items: ["Chain Optimizer"]
            },
            initialize: function() {
                return MiniGames.createBlockchainGame();
            }
        }
    },
    
    // Mini-game DOM elements
    elements: {
        container: null,
        header: null,
        content: null,
        controls: null
    },
    
    /**
     * Initialize the mini-games system
     */
    init: function() {
        // Create mini-game container elements
        this.createGameContainer();
        
        // Set up event listeners
        Utils.events.on('interact', (object) => {
            if (object.isMiniGame) {
                this.startGame(object.miniGameType);
            }
        });
        
        // Listen for quest events related to mini-games
        Utils.events.on('questUpdated', (questId, questType) => {
            if (questType === 'miniGame') {
                // Handle quest progression related to mini-games
            }
        });
    },
    
    /**
     * Create the mini-game container in the DOM
     */
    createGameContainer: function() {
        // Create container
        this.elements.container = document.createElement('div');
        this.elements.container.id = 'minigame-container';
        this.elements.container.style.position = 'absolute';
        this.elements.container.style.width = '80%';
        this.elements.container.style.maxWidth = '800px';
        this.elements.container.style.height = '80%';
        this.elements.container.style.maxHeight = '600px';
        this.elements.container.style.top = '50%';
        this.elements.container.style.left = '50%';
        this.elements.container.style.transform = 'translate(-50%, -50%)';
        this.elements.container.style.backgroundColor = 'rgba(18, 3, 56, 0.95)';
        this.elements.container.style.border = '2px solid #9945FF';
        this.elements.container.style.borderRadius = '10px';
        this.elements.container.style.padding = '20px';
        this.elements.container.style.display = 'none';
        this.elements.container.style.flexDirection = 'column';
        this.elements.container.style.zIndex = '1000';
        this.elements.container.style.boxShadow = '0 0 30px rgba(153, 69, 255, 0.7)';
        
        // Create header
        this.elements.header = document.createElement('div');
        this.elements.header.style.borderBottom = '1px solid #9945FF';
        this.elements.header.style.marginBottom = '10px';
        this.elements.header.style.paddingBottom = '10px';
        this.elements.header.style.display = 'flex';
        this.elements.header.style.justifyContent = 'space-between';
        
        // Game title
        const title = document.createElement('h2');
        title.id = 'minigame-title';
        title.style.color = '#14F195';
        title.style.margin = '0';
        this.elements.header.appendChild(title);
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.border = '1px solid #9945FF';
        closeButton.style.color = '#9945FF';
        closeButton.style.borderRadius = '50%';
        closeButton.style.width = '30px';
        closeButton.style.height = '30px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontSize = '16px';
        closeButton.style.display = 'flex';
        closeButton.style.justifyContent = 'center';
        closeButton.style.alignItems = 'center';
        closeButton.addEventListener('click', () => this.closeGame());
        this.elements.header.appendChild(closeButton);
        
        // Create content area
        this.elements.content = document.createElement('div');
        this.elements.content.style.flex = '1';
        this.elements.content.style.display = 'flex';
        this.elements.content.style.flexDirection = 'column';
        this.elements.content.style.overflow = 'hidden';
        this.elements.content.style.color = '#fff';
        
        // Create controls area
        this.elements.controls = document.createElement('div');
        this.elements.controls.style.marginTop = '15px';
        this.elements.controls.style.paddingTop = '15px';
        this.elements.controls.style.borderTop = '1px solid #9945FF';
        this.elements.controls.style.display = 'flex';
        this.elements.controls.style.justifyContent = 'center';
        
        // Append all elements
        this.elements.container.appendChild(this.elements.header);
        this.elements.container.appendChild(this.elements.content);
        this.elements.container.appendChild(this.elements.controls);
        
        // Add to document
        document.body.appendChild(this.elements.container);
    },
    
    /**
     * Start a mini-game
     */
    startGame: function(gameType) {
        if (!this.games[gameType]) {
            console.error(`Mini-game type '${gameType}' does not exist.`);
            return;
        }
        
        // Stop player movement and other game processes
        Utils.events.emit('pauseGame');
        
        // Set active game
        this.activeGame = gameType;
        
        // Set game title
        document.getElementById('minigame-title').textContent = this.games[gameType].name;
        
        // Initialize game content
        this.elements.content.innerHTML = '';
        this.elements.controls.innerHTML = '';
        
        const game = this.games[gameType].initialize();
        
        // Show mini-game container
        this.elements.container.style.display = 'flex';
        
        // Animate opening
        gsap.fromTo(this.elements.container, 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' }
        );
    },
    
    /**
     * Close the active mini-game
     */
    closeGame: function() {
        if (!this.activeGame) return;
        
        // Animate closing
        gsap.to(this.elements.container, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                this.elements.container.style.display = 'none';
                this.activeGame = null;
                
                // Resume game
                Utils.events.emit('resumeGame');
            }
        });
    },
    
    /**
     * Complete a mini-game successfully
     */
    completeGame: function(score) {
        if (!this.activeGame) return;
        
        const game = this.games[this.activeGame];
        
        // Clear content
        this.elements.content.innerHTML = '';
        
        // Show completion message
        const completionMessage = document.createElement('div');
        completionMessage.style.textAlign = 'center';
        completionMessage.style.marginTop = '50px';
        
        const messageTitle = document.createElement('h2');
        messageTitle.textContent = 'Mini-Game Completed!';
        messageTitle.style.color = '#14F195';
        completionMessage.appendChild(messageTitle);
        
        const scoreElement = document.createElement('p');
        scoreElement.textContent = `Your score: ${score}`;
        scoreElement.style.fontSize = '24px';
        completionMessage.appendChild(scoreElement);
        
        const rewardsTitle = document.createElement('h3');
        rewardsTitle.textContent = 'Rewards:';
        rewardsTitle.style.marginTop = '20px';
        completionMessage.appendChild(rewardsTitle);
        
        const expReward = document.createElement('p');
        expReward.textContent = `Experience: +${game.rewards.experience}`;
        completionMessage.appendChild(expReward);
        
        const itemReward = document.createElement('p');
        itemReward.textContent = `Item Received: ${game.rewards.items[0]}`;
        completionMessage.appendChild(itemReward);
        
        this.elements.content.appendChild(completionMessage);
        
        // Add close button to controls
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Continue';
        closeButton.style.backgroundColor = '#14F195';
        closeButton.style.color = '#120338';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.padding = '10px 30px';
        closeButton.style.fontSize = '16px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', () => this.closeGame());
        
        this.elements.controls.innerHTML = '';
        this.elements.controls.appendChild(closeButton);
        
        // Trigger game completion event (for quests, etc.)
        Utils.events.emit('miniGameCompleted', this.activeGame, score);
    },
    
    /**
     * Create Crypto Mining mini-game
     */
    createMiningGame: function() {
        // Create game description
        const description = document.createElement('p');
        description.textContent = this.games.cryptoMining.description;
        this.elements.content.appendChild(description);
        
        // Create game area
        const gameArea = document.createElement('div');
        gameArea.style.flex = '1';
        gameArea.style.display = 'flex';
        gameArea.style.flexDirection = 'column';
        gameArea.style.justifyContent = 'center';
        gameArea.style.alignItems = 'center';
        gameArea.style.margin = '20px 0';
        
        // Create pattern display
        const patternDisplay = document.createElement('div');
        patternDisplay.style.display = 'grid';
        patternDisplay.style.gridTemplateColumns = 'repeat(5, 1fr)';
        patternDisplay.style.gridGap = '10px';
        patternDisplay.style.marginBottom = '30px';
        
        // Create target pattern
        const targetPattern = [];
        for (let i = 0; i < 5; i++) {
            const block = document.createElement('div');
            block.style.width = '50px';
            block.style.height = '50px';
            block.style.backgroundColor = i % 2 === 0 ? '#9945FF' : '#14F195';
            block.style.borderRadius = '5px';
            
            targetPattern.push(i % 2 === 0 ? 'purple' : 'green');
            patternDisplay.appendChild(block);
        }
        
        gameArea.appendChild(patternDisplay);
        
        // Create player input area
        const inputArea = document.createElement('div');
        inputArea.style.display = 'grid';
        inputArea.style.gridTemplateColumns = 'repeat(5, 1fr)';
        inputArea.style.gridGap = '10px';
        
        const playerPattern = [];
        
        // Create clickable blocks for player input
        for (let i = 0; i < 5; i++) {
            const block = document.createElement('div');
            block.style.width = '50px';
            block.style.height = '50px';
            block.style.backgroundColor = '#333';
            block.style.borderRadius = '5px';
            block.style.cursor = 'pointer';
            block.dataset.index = i;
            
            block.addEventListener('click', () => {
                // Toggle block color
                if (block.style.backgroundColor === 'rgb(153, 69, 255)') {
                    block.style.backgroundColor = 'rgb(20, 241, 149)';
                    playerPattern[i] = 'green';
                } else {
                    block.style.backgroundColor = 'rgb(153, 69, 255)';
                    playerPattern[i] = 'purple';
                }
                
                // Check if pattern is complete
                if (playerPattern.filter(Boolean).length === 5) {
                    // Check if pattern matches
                    let matches = 0;
                    for (let j = 0; j < 5; j++) {
                        if (playerPattern[j] === targetPattern[j]) {
                            matches++;
                        }
                    }
                    
                    // Calculate score (0-100)
                    const score = Math.round((matches / 5) * 100);
                    
                    if (score >= 80) {
                        // Success!
                        this.completeGame(score);
                    } else {
                        // Reset game for another try
                        for (let j = 0; j < 5; j++) {
                            inputArea.children[j].style.backgroundColor = '#333';
                        }
                        playerPattern.length = 0;
                        
                        // Show feedback
                        const feedback = document.createElement('p');
                        feedback.textContent = `You matched ${matches}/5 blocks. Try again!`;
                        feedback.style.color = '#FF6B6B';
                        feedback.style.textAlign = 'center';
                        feedback.style.marginTop = '10px';
                        
                        // Remove previous feedback if exists
                        const existingFeedback = gameArea.querySelector('p:not(:first-child)');
                        if (existingFeedback) {
                            gameArea.removeChild(existingFeedback);
                        }
                        
                        gameArea.appendChild(feedback);
                    }
                }
            });
            
            inputArea.appendChild(block);
        }
        
        gameArea.appendChild(inputArea);
        this.elements.content.appendChild(gameArea);
        
        // Add instructions to controls
        const instructions = document.createElement('p');
        instructions.textContent = 'Click the blocks below to match the pattern above.';
        instructions.style.margin = '0';
        instructions.style.textAlign = 'center';
        
        this.elements.controls.appendChild(instructions);
    },
    
    /**
     * Create Market Trading mini-game
     * (Simplified for the minimal version)
     */
    createTradingGame: function() {
        // Create game description
        const description = document.createElement('p');
        description.textContent = this.games.marketTrading.description;
        this.elements.content.appendChild(description);
        
        // Placeholder for the actual game
        const gameArea = document.createElement('div');
        gameArea.style.flex = '1';
        gameArea.style.display = 'flex';
        gameArea.style.flexDirection = 'column';
        gameArea.style.justifyContent = 'center';
        gameArea.style.alignItems = 'center';
        
        const placeholder = document.createElement('p');
        placeholder.textContent = "This mini-game will be available in the next phase.";
        placeholder.style.fontSize = '18px';
        placeholder.style.textAlign = 'center';
        
        gameArea.appendChild(placeholder);
        this.elements.content.appendChild(gameArea);
        
        // Add continue button
        const continueButton = document.createElement('button');
        continueButton.textContent = 'Continue';
        continueButton.style.backgroundColor = '#14F195';
        continueButton.style.color = '#120338';
        continueButton.style.border = 'none';
        continueButton.style.borderRadius = '5px';
        continueButton.style.padding = '10px 30px';
        continueButton.style.fontSize = '16px';
        continueButton.style.cursor = 'pointer';
        continueButton.addEventListener('click', () => this.closeGame());
        
        this.elements.controls.appendChild(continueButton);
    },
    
    /**
     * Create Blockchain Puzzle mini-game
     * (Simplified for the minimal version)
     */
    createBlockchainGame: function() {
        // Create game description
        const description = document.createElement('p');
        description.textContent = this.games.blockchainPuzzle.description;
        this.elements.content.appendChild(description);
        
        // Placeholder for the actual game
        const gameArea = document.createElement('div');
        gameArea.style.flex = '1';
        gameArea.style.display = 'flex';
        gameArea.style.flexDirection = 'column';
        gameArea.style.justifyContent = 'center';
        gameArea.style.alignItems = 'center';
        
        const placeholder = document.createElement('p');
        placeholder.textContent = "This mini-game will be available in the next phase.";
        placeholder.style.fontSize = '18px';
        placeholder.style.textAlign = 'center';
        
        gameArea.appendChild(placeholder);
        this.elements.content.appendChild(gameArea);
        
        // Add continue button
        const continueButton = document.createElement('button');
        continueButton.textContent = 'Continue';
        continueButton.style.backgroundColor = '#14F195';
        continueButton.style.color = '#120338';
        continueButton.style.border = 'none';
        continueButton.style.borderRadius = '5px';
        continueButton.style.padding = '10px 30px';
        continueButton.style.fontSize = '16px';
        continueButton.style.cursor = 'pointer';
        continueButton.addEventListener('click', () => this.closeGame());
        
        this.elements.controls.appendChild(continueButton);
    },
    
    /**
     * Create mini-game interactive object in the world
     */
    createMiniGameObject: function(scene, type, position, scale = 1) {
        // Create a mini-game object that players can interact with
        const geometry = new THREE.SphereGeometry(1, 16, 16);
        const material = new THREE.MeshPhongMaterial({
            color: 0x14F195,
            emissive: 0x14F195,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.8
        });
        
        const miniGameObject = new THREE.Mesh(geometry, material);
        miniGameObject.position.copy(position);
        miniGameObject.scale.set(scale, scale, scale);
        
        // Add animation
        miniGameObject.originalY = position.y;
        miniGameObject.userData.animationOffset = Math.random() * Math.PI * 2;
        
        // Add custom properties
        miniGameObject.isMiniGame = true;
        miniGameObject.miniGameType = type;
        miniGameObject.name = this.games[type].name;
        
        scene.add(miniGameObject);
        
        return miniGameObject;
    },
    
    /**
     * Update mini-game objects (animations, etc.)
     */
    update: function(deltaTime) {
        // Animation for mini-game objects in the world
        this.updateMiniGameObjects(deltaTime);
    },
    
    /**
     * Update mini-game objects animations
     */
    updateMiniGameObjects: function(deltaTime) {
        // Get all mini-game objects from the scene
        const miniGameObjects = World.scene.children.filter(obj => obj.isMiniGame);
        
        // Update each object
        miniGameObjects.forEach(obj => {
            // Simple floating animation
            obj.position.y = obj.originalY + Math.sin(performance.now() * 0.001 + obj.userData.animationOffset) * 0.2;
            
            // Slow rotation
            obj.rotation.y += 0.01 * deltaTime;
            
            // Pulse effect
            const pulse = Math.sin(performance.now() * 0.002 + obj.userData.animationOffset) * 0.1 + 0.9;
            obj.scale.set(pulse, pulse, pulse);
        });
    }
};