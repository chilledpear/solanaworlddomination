/**
 * Asset management for Solana Ascension game
 */

const Assets = {
    // Texture loader
    textureLoader: new THREE.TextureLoader(),
    
    // Audio loader
    audioLoader: new THREE.AudioLoader(),
    
    // Track loading progress
    totalAssets: 0,
    loadedAssets: 0,
    
    // Collections of loaded assets
    textures: {},
    models: {},
    sounds: {},
    
    /**
     * Initialize asset loading
     */
    init: function() {
        return new Promise((resolve) => {
            // Define assets to preload here
            const texturesToLoad = [
                { name: 'ground', path: 'textures/ground.jpg' },
                { name: 'building', path: 'textures/building.jpg' },
                { name: 'sky', path: 'textures/sky.jpg' },
                { name: 'character', path: 'textures/character.jpg' }
            ];
            
            // For the minimal version, we'll create procedural textures instead of loading real ones
            this.generateProceduralTextures();
            
            // Update loading progress
            this.updateLoadingProgress();
            
            // Simulate loading time for demonstration
            let progress = 0;
            const loadingInterval = setInterval(() => {
                progress += 5;
                this.updateLoadingProgress(progress);
                
                if (progress >= 100) {
                    clearInterval(loadingInterval);
                    resolve();
                }
            }, 100);
        });
    },
    
    /**
     * Generate procedural textures for the minimal version
     */
    generateProceduralTextures: function() {
        // Create a ground texture (grid pattern)
        const groundCanvas = document.createElement('canvas');
        groundCanvas.width = 512;
        groundCanvas.height = 512;
        const groundCtx = groundCanvas.getContext('2d');
        
        // Fill background
        groundCtx.fillStyle = '#1a1a2e';
        groundCtx.fillRect(0, 0, 512, 512);
        
        // Draw grid lines
        groundCtx.strokeStyle = '#9945FF';
        groundCtx.lineWidth = 2;
        
        // Horizontal lines
        for (let i = 0; i < 512; i += 32) {
            groundCtx.beginPath();
            groundCtx.moveTo(0, i);
            groundCtx.lineTo(512, i);
            groundCtx.stroke();
        }
        
        // Vertical lines
        for (let i = 0; i < 512; i += 32) {
            groundCtx.beginPath();
            groundCtx.moveTo(i, 0);
            groundCtx.lineTo(i, 512);
            groundCtx.stroke();
        }
        
        // Add some glow effect
        groundCtx.shadowBlur = 15;
        groundCtx.shadowColor = '#14F195';
        groundCtx.beginPath();
        groundCtx.arc(256, 256, 100, 0, Math.PI * 2);
        groundCtx.stroke();
        
        // Convert to texture
        const groundTexture = new THREE.CanvasTexture(groundCanvas);
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(10, 10);
        this.textures.ground = groundTexture;
        
        // Create a simple building texture
        const buildingCanvas = document.createElement('canvas');
        buildingCanvas.width = 256;
        buildingCanvas.height = 512;
        const buildingCtx = buildingCanvas.getContext('2d');
        
        // Fill background (building color)
        buildingCtx.fillStyle = '#16213e';
        buildingCtx.fillRect(0, 0, 256, 512);
        
        // Draw windows
        buildingCtx.fillStyle = '#9945FF';
        const windowSize = 30;
        const windowSpacing = 20;
        
        for (let y = 40; y < 512; y += windowSize + windowSpacing) {
            for (let x = 20; x < 256; x += windowSize + windowSpacing) {
                // Randomly skip some windows
                if (Math.random() > 0.2) {
                    buildingCtx.fillRect(x, y, windowSize, windowSize);
                    
                    // Add glow to some windows
                    if (Math.random() > 0.5) {
                        buildingCtx.shadowBlur = 10;
                        buildingCtx.shadowColor = '#14F195';
                        buildingCtx.fillRect(x, y, windowSize, windowSize);
                        buildingCtx.shadowBlur = 0;
                    }
                }
            }
        }
        
        // Convert to texture
        const buildingTexture = new THREE.CanvasTexture(buildingCanvas);
        this.textures.building = buildingTexture;
        
        // Create skybox texture
        const skyCanvas = document.createElement('canvas');
        skyCanvas.width = 1024;
        skyCanvas.height = 1024;
        const skyCtx = skyCanvas.getContext('2d');
        
        // Create gradient background
        const gradient = skyCtx.createLinearGradient(0, 0, 0, 1024);
        gradient.addColorStop(0, '#020024');
        gradient.addColorStop(0.5, '#090979');
        gradient.addColorStop(1, '#00d4ff');
        
        skyCtx.fillStyle = gradient;
        skyCtx.fillRect(0, 0, 1024, 1024);
        
        // Add some stars
        skyCtx.fillStyle = '#ffffff';
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512; // Only in top half
            const size = Math.random() * 2 + 1;
            skyCtx.beginPath();
            skyCtx.arc(x, y, size, 0, Math.PI * 2);
            skyCtx.fill();
        }
        
        // Convert to texture
        const skyTexture = new THREE.CanvasTexture(skyCanvas);
        this.textures.sky = skyTexture;
        
        // Create a simple character texture
        const characterCanvas = document.createElement('canvas');
        characterCanvas.width = 128;
        characterCanvas.height = 128;
        const characterCtx = characterCanvas.getContext('2d');
        
        // Draw character base
        characterCtx.fillStyle = '#14F195';
        characterCtx.fillRect(0, 0, 128, 128);
        
        // Draw details
        characterCtx.fillStyle = '#9945FF';
        characterCtx.fillRect(20, 20, 88, 88);
        
        characterCtx.fillStyle = '#FFFFFF';
        characterCtx.fillRect(40, 40, 20, 20); // Eyes
        characterCtx.fillRect(68, 40, 20, 20);
        
        // Convert to texture
        const characterTexture = new THREE.CanvasTexture(characterCanvas);
        this.textures.character = characterTexture;
    },
    
    /**
     * Update loading progress
     */
    updateLoadingProgress: function(forcedPercent = null) {
        let percent;
        
        if (forcedPercent !== null) {
            percent = forcedPercent;
        } else if (this.totalAssets === 0) {
            percent = 100;
        } else {
            percent = Math.floor((this.loadedAssets / this.totalAssets) * 100);
        }
        
        Utils.updateLoadingProgress(percent, `Loading assets... ${percent}%`);
    },
    
    /**
     * Load a texture and track progress
     */
    loadTexture: function(name, path) {
        this.totalAssets++;
        
        return new Promise((resolve) => {
            this.textureLoader.load(
                path,
                (texture) => {
                    this.textures[name] = texture;
                    this.loadedAssets++;
                    this.updateLoadingProgress();
                    resolve(texture);
                },
                undefined,
                (error) => {
                    console.error(`Failed to load texture: ${path}`, error);
                    this.loadedAssets++;
                    this.updateLoadingProgress();
                    resolve(null);
                }
            );
        });
    }
};