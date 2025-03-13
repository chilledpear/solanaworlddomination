/**
 * Main game initialization and loop for Solana Ascension game
 */

const Game = {
    // Game state
    state: {
        isRunning: false,
        isPaused: false,
        isLoading: true,
        lastTime: 0
    },
    
    // Initialize the game
    init: async function() {
        // Get the game container
        const container = document.getElementById('game-container');
        
        // Initialize asset loading
        await Assets.init();
        
        // Initialize world
        World.init(container);
        
        // Initialize player
        Player.init(World.scene, World.camera);
        
        // Initialize NPCs
        NPCs.init(World.scene);
        
        // Initialize mini-games
        MiniGames.init();
        
        // Initialize UI
        UI.init();
        
        // Initialize quest system
        Quests.init(World.scene);
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Loading complete
        this.state.isLoading = false;
        this.state.isRunning = true;
        
        // Start game loop
        this.lastTime = performance.now();
        requestAnimationFrame(this.gameLoop.bind(this));
        
        // Show welcome message after a short delay
        setTimeout(() => {
            Utils.showNotification(
                "Welcome to Solana Ascension", 
                "Explore the city, complete quests, and prepare for the ultimate transformation when Solana reaches $1000!",
                10000
            );
        }, 1500);
    },
    
    // Set up game event listeners
    setupEventListeners: function() {
        // Pause/resume game
        Utils.events.on('pauseGame', () => {
            this.state.isPaused = true;
        });
        
        Utils.events.on('resumeGame', () => {
            this.state.isPaused = false;
            this.lastTime = performance.now();
        });
        
        // Handle collectible interactions
        Utils.events.on('interact', (object) => {
            if (object.isCollectible) {
                this.handleCollectible(object);
            }
        });
        
        // Listen for window focus changes
        window.addEventListener('blur', () => {
            this.state.isPaused = true;
        });
        
        window.addEventListener('focus', () => {
            if (this.state.isPaused) {
                this.state.isPaused = false;
                this.lastTime = performance.now();
            }
        });
    },
    
    // Main game loop
    gameLoop: function(currentTime) {
        // Request next frame
        requestAnimationFrame(this.gameLoop.bind(this));
        
        // Skip updates if game is paused
        if (this.state.isPaused || !this.state.isRunning) return;
        
        // Calculate time delta
        const deltaTime = (currentTime - this.lastTime) / 16.667; // Normalize to ~60fps
        this.lastTime = currentTime;
        
        // Limit delta time in case of long pauses
        const clampedDelta = Math.min(deltaTime, 3);
        
        // Update game components
        this.update(clampedDelta);
        
        // Render the scene
        this.render();
    },
    
    // Update game components
    update: function(deltaTime) {
        // Update player
        Player.update(deltaTime, this.getColliders());
        
        // Update NPCs
        NPCs.update(deltaTime);
        
        // Update world
        World.update(deltaTime);
        
        // Update mini-games
        MiniGames.update(deltaTime);
        
        // Update quests
        Quests.update(Player.getPosition());
    },
    
    // Render the scene
    render: function() {
        World.renderer.render(World.scene, World.camera);
    },
    
    // Get all objects that can be collided with or interacted with
    getColliders: function() {
        return [
            ...World.getInteractiveObjects(),
            ...NPCs.getNPCs(),
            ...Quests.getQuestMarkers()
        ];
    },
    
    // Handle collectible item pickup
    handleCollectible: function(collectible) {
        // Remove from scene
        World.scene.remove(collectible);
        
        // Remove from interactive objects list
        const index = World.interactiveObjects.indexOf(collectible);
        if (index !== -1) {
            World.interactiveObjects.splice(index, 1);
        }
        
        // Show notification
        Utils.showNotification("Item Collected", `You found a ${collectible.name}!`, 3000);
        
        // Trigger event for quest system
        Utils.events.emit('itemCollected', collectible.itemType);
    },
    
    // Reset the game
    reset: function() {
        // Reset player
        Player.reset();
        
        // Reset world
        // In a full game, we would have more reset functionality
        
        // Resume game
        this.state.isPaused = false;
        this.lastTime = performance.now();
    }
};

// Initialize the game once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
