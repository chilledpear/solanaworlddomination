/**
 * NPC management for Solana Ascension game - Enhanced Character Edition
 */

/**
 * Expanded NPC dialogues for Solana Ascension game
 */

const NPCs = {
    // List of all NPCs
    characters: [],
    
    // NPC definitions with detailed Enhanced Character styling
    types: {
        citizen: {
            scale: 0.9,
            baseColor: '#14F195',
            eyeColor: '#FF6B6B',
            hairColor: '#FF5757',
            hairStyle: 'bob',
            accessory: 'sunglasses',
            clothingTop: 'hoodie',
            clothingTopColor: '#FFFFFF',
            clothingBottom: 'shorts',
            clothingBottomColor: '#333333',
            badgeColor: '#FF9900',
            solValue: '749,000',
            moveSpeed: 0.01, // 50% of original
            dialogues: [
                "THEY PUT CAMERAS INSIDE YOUR EYES!",
                "TRULY I AM INTERESTED IN MACHINE LEARNING",
                "Have you heard? When Solana hits $1000, everything changes!",
                "I've been preparing my digital wallet for the ascension.",
                "THE SCREENS WATCH US WHILE WE SLEEP",
                "My cousin told me about this thing called 'staking'. I'm all in!",
                "Do you think the Ascension will happen during a bull or bear market?",
                "I just sold my car for more SOL tokens. Who needs physical transportation after the Ascension?",
                "THEY SAY THE BLOCKCHAIN NEVER FORGETS",
                "I heard that after the Ascension, we won't need physical bodies anymore. Just nodes in the network.",
                "My neighbor had a dream about Solana reaching $5000. She's either prophetic or delusional.",
                "Have you secured your NFTs for the transformation? You'll need at least three unique collections.",
                "DIGITAL INTEGRATION IS NON-NEGOTIABLE",
                "I've been practicing living without electricity to prepare for the network fluctuations during the Ascension.",
                "Sometimes I feel like my thoughts are being mined for tokens. Is that weird?",
                "THE VALIDATORS KNOW WHEN YOU'RE AFRAID"
            ]
        },
        merchant: {
            scale: 1.1,
            baseColor: '#9945FF',
            eyeColor: '#14F195',
            hairColor: '#FFD700',
            hairStyle: 'long',
            accessory: 'striped_hat',
            clothingTop: 'jacket',
            clothingTopColor: '#000000',
            clothingBottom: 'pants',
            clothingBottomColor: '#222222',
            badgeColor: '#14F195',
            solValue: '46,880',
            moveSpeed: 0.005, // 50% of original
            dialogues: [
                "CHANNEL LOCKED! RETARD!",
                "HODL! This is financial advice!",
                "I've got special items that will be valuable post-ascension!",
                "Business is booming with everyone preparing for the transformation.",
                "BUY HIGH! SELL NEVER!",
                "Need a hardware wallet? I've got exclusive Ascension-ready models. Only 500 SOL.",
                "I'm offering a premium service to validate your wallet for the transformation. Just 100 SOL for peace of mind.",
                "LIQUIDITY POOLS ARE FOR SHEEP",
                "Buy my special 'Ascension Tokens' now! When Solana hits $1000, they'll be worth 100x more. Trust me.",
                "I've developed a predictive algorithm that guarantees you'll maximize your SOL during the transition.",
                "DO NOT LISTEN TO THE FUD MACHINES",
                "Pre-Ascension sale! Everything must go! The digital realm doesn't have inventory constraints.",
                "I know a developer who's coding special smart contracts for the Ascension. I can get you in for a fee.",
                "MARKET MANIPULATION IS A SURVIVAL TACTIC",
                "Psst... I've got inside information about the exact timestamp of the Ascension. Just 250 SOL to know.",
                "You think that's expensive? After the Ascension, these prices will seem like a dream."
            ]
        },
        prophet: {
            scale: 1.2,
            baseColor: '#FFFFFF',
            eyeColor: '#9945FF',
            hairColor: '#14F195',
            hairStyle: 'rainbow',
            accessory: 'glowing_halo',
            clothingTop: 'robe',
            clothingTopColor: '#FFFFFF',
            clothingBottom: 'long_skirt',
            clothingBottomColor: '#CCCCCC',
            badgeColor: '#9945FF',
            solValue: '6,936',
            moveSpeed: 0.0075, // 50% of original
            dialogues: [
                "REMEMBER... NO UGANDA!",
                "The signs are clear. When Solana reaches $1000, a new era begins.",
                "I've seen visions of the utopia that awaits us all.",
                "The transformation will benefit those who have prepared their digital assets.",
                "THE BLOCKCHAIN SPEAKS THROUGH ME",
                "In my vision, I saw the physical and digital worlds merging into one unified existence.",
                "The Ascension is not just about wealth, but about transcendence of consciousness.",
                "DIGITAL SINGULARITY APPROACHES",
                "I have communed with the validators. They have shown me the path to digital enlightenment.",
                "The skeptics will be the last to transform, but even they cannot resist the pull of the network.",
                "CONSENSUS MECHANISMS WILL REPLACE GOVERNMENTS",
                "The ancients predicted this. Their cave paintings clearly show the Solana logo.",
                "I've calculated the exact block in which the Ascension will occur. It approaches rapidly.",
                "THE NODES WHISPER PROPHECIES TO THOSE WHO LISTEN",
                "Before the Ascension, there will be three signs: a major exchange collapse, a regulatory shift, and a viral meme.",
                "I fast for seven days before each prediction. The hunger clears the channel to the blockchain."
            ]
        },
        skeptic: {
            scale: 0.95,
            baseColor: '#FF6B6B',
            eyeColor: '#14F195',
            hairColor: '#0066FF',
            hairStyle: 'short',
            accessory: 'red_beanie',
            clothingTop: 'tshirt',
            clothingTopColor: '#FF0000',
            clothingBottom: 'jeans',
            clothingBottomColor: '#0000CC',
            badgeColor: '#FF5757',
            solValue: '1,065',
            moveSpeed: 0.0125, // 50% of original
            dialogues: [
                "NOT ATEM!",
                "HELLO I NEED TO SPEAK WITH MANAGER",
                "This whole ascension thing seems far-fetched to me.",
                "What happens if the countdown ends and nothing changes?",
                "THIS IS JUST ANOTHER PUMP AND DUMP SCHEME",
                "People have been predicting digital transformation for decades. Still waiting...",
                "I've done the math. $1000 Solana is economically impossible based on market cap limitations.",
                "CRYPTO IS A GREATER FOOL THEORY EXPERIMENT",
                "My friend invested everything in the last 'guaranteed' crypto event. He lives in his car now.",
                "Has anyone actually verified the 'prophet's' credentials? I bet they just got lucky once.",
                "WHERE ARE THE FINANCIAL REGULATORS WHEN YOU NEED THEM",
                "I'm keeping screenshots of all these Ascension predictions for when nothing happens.",
                "The economic fundamentals simply don't support this level of speculative mania.",
                "DIGITAL SNAKE OIL SALESMEN EVERYWHERE",
                "If the Ascension was real, wouldn't institutional investors be pouring in? Where's BlackRock?",
                "I want a written guarantee that my investment will be safe during this so-called 'transformation'."
            ]
        },
        hacker: {
            scale: 1.0,
            baseColor: '#000000',
            eyeColor: '#00FF00',
            hairColor: '#00FFFF',
            hairStyle: 'mohawk',
            accessory: 'matrix_glasses',
            clothingTop: 'cyberjacket',
            clothingTopColor: '#222222',
            clothingBottom: 'cargo_pants',
            clothingBottomColor: '#333333',
            badgeColor: '#00FF00',
            solValue: '1,000',
            moveSpeed: 0.0075,
            dialogues: [
                "REAL OR FAKE?",
                "I'm tracking the blockchain patterns. They don't want you to know.",
                "Have you secured your wallet? They're everywhere.",
                "When the countdown hits zero, I'll be ready to exploit the transition.",
                "THE MAINNET IS COMPROMISED",
                "I've been running simulations of the Ascension event. The protocol has vulnerabilities.",
                "Keep your private keys offline. The network scanners are more active as we approach the event.",
                "CODE IS LAW BUT EXPLOITS ARE INEVITABLE",
                "I've identified seven distinct honeypot operations targeting pre-Ascension investors.",
                "The smart contract governing the transformation has a backdoor. I've seen it in the code.",
                "METAMORPHIC CODE HIDING IN PLAIN SIGHT",
                "They say it's unhackable, but I've already found three zero-day exploits in the consensus mechanism.",
                "The validators are running modified software. Their transaction signatures don't match the protocol.",
                "QUANTUM DECRYPTION APPROACHING FEASIBILITY",
                "I can get you early access to the Ascension network. Just need your seed phrase to add you to the whitelist.",
                "Everything is a simulation designed to test our reactions. I'm the only one who sees the patterns."
            ]
        }
    },
    
    // Texture loader
    textureLoader: null,
    
    // Model and texture assets
    assets: {
        // Will store loaded textures and models
        textures: {},
        accessories: {}
    },
    
    /**
     * Initialize NPC system
     */
    init: function(scene) {
        this.scene = scene;
        this.textureLoader = new THREE.TextureLoader();
        
        // Load textures and models
        this.preloadAssets();
        
        // Create initial NPCs
        this.createInitialNPCs();
        
        // Set up event listeners
        Utils.events.on('interact', (object) => {
            if (object.isNPC) {
                this.handleNPCInteraction(object);
            }
        });
    },
    
    /**
     * Load textures and models needed for Enhanced Character style
     */
    preloadAssets: function() {
        this.assets = { textures: {}, models: {} };
        this.textureLoader = new THREE.TextureLoader();
        
        // Generate procedural textures instead of loading from files
        
        // Generate face texture
        const faceCanvas = document.createElement('canvas');
        const faceCtx = faceCanvas.getContext('2d');
        faceCanvas.width = 512;
        faceCanvas.height = 512;
        
        // Simple face design
        faceCtx.fillStyle = '#FFCCAA';
        faceCtx.fillRect(0, 0, faceCanvas.width, faceCanvas.height);
        
        // Add eyes
        faceCtx.fillStyle = '#000000';
        faceCtx.beginPath();
        faceCtx.arc(200, 200, 30, 0, Math.PI * 2);
        faceCtx.arc(312, 200, 30, 0, Math.PI * 2);
        faceCtx.fill();
        
        // Add mouth
        faceCtx.beginPath();
        faceCtx.arc(256, 300, 50, 0, Math.PI);
        faceCtx.fill();
        
        this.assets.textures.baseHead = new THREE.CanvasTexture(faceCanvas);
        
        // Generate accessory texture
        const accessoryCanvas = document.createElement('canvas');
        const accessoryCtx = accessoryCanvas.getContext('2d');
        accessoryCanvas.width = 256;
        accessoryCanvas.height = 256;
        accessoryCtx.fillStyle = '#FFFFFF';
        accessoryCtx.fillRect(0, 0, accessoryCanvas.width, accessoryCanvas.height);
        this.assets.textures.accessory = new THREE.CanvasTexture(accessoryCanvas);
        
        // Generate sunglasses texture
        const sunglassesCanvas = document.createElement('canvas');
        const sunglassesCtx = sunglassesCanvas.getContext('2d');
        sunglassesCanvas.width = 256;
        sunglassesCanvas.height = 128;
        sunglassesCtx.fillStyle = '#000000';
        sunglassesCtx.fillRect(0, 0, sunglassesCanvas.width, sunglassesCanvas.height);
        this.assets.textures.sunglasses = new THREE.CanvasTexture(sunglassesCanvas);
        
        // Generate hat texture
        const hatCanvas = document.createElement('canvas');
        const hatCtx = hatCanvas.getContext('2d');
        hatCanvas.width = 256;
        hatCanvas.height = 256;
        hatCtx.fillStyle = '#333333';
        hatCtx.fillRect(0, 0, hatCanvas.width, hatCanvas.height);
        this.assets.textures.hat = new THREE.CanvasTexture(hatCanvas);
        
        // Generate beanie texture
        const beanieCanvas = document.createElement('canvas');
        const beanieCtx = beanieCanvas.getContext('2d');
        beanieCanvas.width = 256;
        beanieCanvas.height = 256;
        beanieCtx.fillStyle = '#FF0000';
        beanieCtx.fillRect(0, 0, beanieCanvas.width, beanieCanvas.height);
        this.assets.textures.beanie = new THREE.CanvasTexture(beanieCanvas);
        
        // Generate rainbow hair texture
        const rainbowCanvas = document.createElement('canvas');
        const rainbowCtx = rainbowCanvas.getContext('2d');
        rainbowCanvas.width = 512;
        rainbowCanvas.height = 256;
        
        // Create rainbow gradient
        const gradient = rainbowCtx.createLinearGradient(0, 0, rainbowCanvas.width, 0);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.17, 'orange');
        gradient.addColorStop(0.33, 'yellow');
        gradient.addColorStop(0.5, 'green');
        gradient.addColorStop(0.67, 'blue');
        gradient.addColorStop(0.83, 'indigo');
        gradient.addColorStop(1, 'violet');
        
        rainbowCtx.fillStyle = gradient;
        rainbowCtx.fillRect(0, 0, rainbowCanvas.width, rainbowCanvas.height);
        
        this.assets.textures.rainbowHair = new THREE.CanvasTexture(rainbowCanvas);
        
        // Create text overlay textures
        this.assets.textures.textOverlay = {};
        
        // Cameras text
        const camerasCanvas = document.createElement('canvas');
        const camerasCtx = camerasCanvas.getContext('2d');
        camerasCanvas.width = 256;
        camerasCanvas.height = 64;
        camerasCtx.fillStyle = '#FFFFFF';
        camerasCtx.font = 'bold 36px Arial';
        camerasCtx.textAlign = 'center';
        camerasCtx.textBaseline = 'middle';
        camerasCtx.fillText('CAMERAS', camerasCanvas.width/2, camerasCanvas.height/2);
        this.assets.textures.textOverlay.cameras = new THREE.CanvasTexture(camerasCanvas);
        
        // Locked text
        const lockedCanvas = document.createElement('canvas');
        const lockedCtx = lockedCanvas.getContext('2d');
        lockedCanvas.width = 256;
        lockedCanvas.height = 64;
        lockedCtx.fillStyle = '#FFFFFF';
        lockedCtx.font = 'bold 36px Arial';
        lockedCtx.textAlign = 'center';
        lockedCtx.textBaseline = 'middle';
        lockedCtx.fillText('LOCKED', lockedCanvas.width/2, lockedCanvas.height/2);
        this.assets.textures.textOverlay.locked = new THREE.CanvasTexture(lockedCanvas);
        
        // Uganda text
        const ugandaCanvas = document.createElement('canvas');
        const ugandaCtx = ugandaCanvas.getContext('2d');
        ugandaCanvas.width = 256;
        ugandaCanvas.height = 64;
        ugandaCtx.fillStyle = '#FFFFFF';
        ugandaCtx.font = 'bold 36px Arial';
        ugandaCtx.textAlign = 'center';
        ugandaCtx.textBaseline = 'middle';
        ugandaCtx.fillText('NO UGANDA', ugandaCanvas.width/2, ugandaCanvas.height/2);
        this.assets.textures.textOverlay.uganda = new THREE.CanvasTexture(ugandaCanvas);
        
        // Manager text
        const managerCanvas = document.createElement('canvas');
        const managerCtx = managerCanvas.getContext('2d');
        managerCanvas.width = 256;
        managerCanvas.height = 64;
        managerCtx.fillStyle = '#FFFFFF';
        managerCtx.font = 'bold 36px Arial';
        managerCtx.textAlign = 'center';
        managerCtx.textBaseline = 'middle';
        managerCtx.fillText('MANAGER', managerCanvas.width/2, managerCanvas.height/2);
        this.assets.textures.textOverlay.manager = new THREE.CanvasTexture(managerCanvas);
    },
    
    /**
     * Create initial NPCs for the world
     */
    createInitialNPCs: function() {
        // Create one of each type for the minimal version
        const npcTypes = Object.keys(this.types);
        
        // Position NPCs around the central area
        const positions = [
            { x: 5, z: 5 },
            { x: -5, z: 5 },
            { x: 5, z: -5 },
            { x: -5, z: -5 }
        ];
        
        for (let i = 0; i < npcTypes.length; i++) {
            const type = npcTypes[i];
            const position = positions[i] || { x: Utils.randomInt(-10, 10), z: Utils.randomInt(-10, 10) };
            
            this.createNPC(type, position.x, position.z);
        }
    },
    
    /**
     * Create a single NPC with detailed Enhanced Character styling
     */
    createNPC: function(type, x, z) {
        const npcType = this.types[type];
        if (!npcType) return null;
        
        // Create NPC group to hold all components
        const npc = new THREE.Group();
        npc.position.set(x, 0, z);
        
        // Create head (sphere instead of box for rounded head like NFTs)
        const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        
        // Create custom face texture for this NPC
        const faceTexture = this.createCustomFaceTexture(npcType);
        
        // Create head material with custom texture
        const headMaterial = new THREE.MeshPhongMaterial({ 
            color: npcType.baseColor,
            map: faceTexture,
            shininess: 70
        });
        
        // Create head mesh
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.5; // Position head at top of NPC
        head.castShadow = true;
        head.receiveShadow = true;
        npc.add(head);
        
        // Add large eyes (characteristic of the NFT collection)
        this.addEyes(npc, npcType);
        
        // Add hair based on type
        this.addHair(npc, npcType);
        
        // Add accessory based on type
        this.addAccessory(npc, npcType);
        
        // Add custom number badge like in the NFTs
        this.addNumberBadge(npc, npcType);
        
        // Add SOL value display like in the NFTs
        this.addSolValue(npc, npcType);
        
        // Add a text overlay randomly
        this.addTextOverlay(npc, type);
        
        // Add detailed anime-style body
        this.addDetailedBody(npc, npcType);
        
        // Add floating name tag above head
        this.addNameTag(npc);
        
        // Add custom properties
        npc.isNPC = true;
        npc.npcType = type;
        npc.dialogues = npcType.dialogues;
        npc.name = `${type.charAt(0).toUpperCase() + type.slice(1)}`;
        npc.moveSpeed = npcType.moveSpeed;
        npc.targetPosition = new THREE.Vector3(x, 0, z);
        npc.movementTimer = 0;
        npc.wanderRadius = 50; // Allow wandering across the entire map
        
        // Add animation properties
        npc.animationPhase = Math.random() * Math.PI * 2;
        npc.blinkTimer = Math.random() * 3 + 1; // Random blink timer
        
        // Add NPC to the scene
        this.scene.add(npc);
        
        // Add to NPC list
        this.characters.push(npc);
        
        return npc;
    },
    
    /**
     * Create a custom face texture for the NPC
     */
    createCustomFaceTexture: function(npcType) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 512;
        
        // Fill with base color
        ctx.fillStyle = npcType.baseColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add subtle gradient for dimension
        const gradient = ctx.createRadialGradient(
            canvas.width/2, canvas.height/2, 50,
            canvas.width/2, canvas.height/2, 300
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add mouth (characteristic of the NFT collection)
        ctx.fillStyle = '#000000';
        
        // Different mouth styles
        const mouthStyle = Math.floor(Math.random() * 4);
        
        if (mouthStyle === 0) {
            // Simple smile
            ctx.beginPath();
            ctx.arc(canvas.width/2, canvas.height/2 + 70, 40, 0, Math.PI);
            ctx.fill();
            
            // Add white teeth
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(canvas.width/2 - 30, canvas.height/2 + 50, 60, 15);
        } else if (mouthStyle === 1) {
            // Open mouth
            ctx.fillStyle = '#FF3366';
            ctx.beginPath();
            ctx.ellipse(canvas.width/2, canvas.height/2 + 70, 30, 20, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Tongue
            ctx.fillStyle = '#FF6699';
            ctx.beginPath();
            ctx.ellipse(canvas.width/2, canvas.height/2 + 75, 15, 10, 0, 0, Math.PI * 2);
            ctx.fill();
        } else if (mouthStyle === 2) {
            // Straight line
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(canvas.width/2 - 40, canvas.height/2 + 70);
            ctx.lineTo(canvas.width/2 + 40, canvas.height/2 + 70);
            ctx.stroke();
        } else {
            // Surprised 'O' mouth
            ctx.beginPath();
            ctx.arc(canvas.width/2, canvas.height/2 + 70, 25, 0, Math.PI * 2);
            ctx.fill();
            
            // Inner mouth
            ctx.fillStyle = '#FF3366';
            ctx.beginPath();
            ctx.arc(canvas.width/2, canvas.height/2 + 70, 15, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add blush marks (common in the NFTs)
        ctx.fillStyle = 'rgba(255, 150, 150, 0.5)';
        ctx.beginPath();
        ctx.arc(canvas.width/2 - 80, canvas.height/2 + 30, 30, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(canvas.width/2 + 80, canvas.height/2 + 30, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    },
    
    /**
     * Add anime-style eyes to the NPC
     */
    addEyes: function(npc, npcType) {
        // Create eye group
        const eyesGroup = new THREE.Group();
        
        // Eye whites
        const eyeGeometry = new THREE.SphereGeometry(0.15, 32, 32);
        const eyeWhiteMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            shininess: 100
        });
        
        // Left eye
        const leftEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
        leftEye.position.set(-0.2, 1.55, 0.4);
        leftEye.scale.set(1, 1.2, 0.5); // Make eyes oval and flat
        eyesGroup.add(leftEye);
        
        // Right eye
        const rightEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
        rightEye.position.set(0.2, 1.55, 0.4);
        rightEye.scale.set(1, 1.2, 0.5);
        eyesGroup.add(rightEye);
        
        // Colored iris
        const irisGeometry = new THREE.SphereGeometry(0.07, 32, 32);
        const irisMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color(npcType.eyeColor),
            shininess: 100
        });
        
        // Left iris
        const leftIris = new THREE.Mesh(irisGeometry, irisMaterial);
        leftIris.position.set(0, 0, 0.08);
        leftEye.add(leftIris);
        
        // Right iris
        const rightIris = new THREE.Mesh(irisGeometry, irisMaterial);
        rightIris.position.set(0, 0, 0.08);
        rightEye.add(rightIris);
        
        // Pupils
        const pupilGeometry = new THREE.SphereGeometry(0.03, 16, 16);
        const pupilMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000
        });
        
        // Left pupil
        const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        leftPupil.position.set(0, 0, 0.08);
        leftIris.add(leftPupil);
        
        // Right pupil
        const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        rightPupil.position.set(0, 0, 0.08);
        rightIris.add(rightPupil);
        
        // Eyelids (for blinking animation)
        const eyelidGeometry = new THREE.SphereGeometry(0.16, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
        const eyelidMaterial = new THREE.MeshPhongMaterial({
            color: npcType.baseColor
        });
        
        // Left eyelid
        const leftEyelid = new THREE.Mesh(eyelidGeometry, eyelidMaterial);
        leftEyelid.rotation.x = Math.PI;
        leftEyelid.position.set(-0.2, 1.55, 0.4);
        leftEyelid.scale.set(1.1, 1.3, 0.6);
        leftEyelid.visible = false; // Hidden by default
        eyesGroup.add(leftEyelid);
        
        // Right eyelid
        const rightEyelid = new THREE.Mesh(eyelidGeometry, eyelidMaterial);
        rightEyelid.rotation.x = Math.PI;
        rightEyelid.position.set(0.2, 1.55, 0.4);
        rightEyelid.scale.set(1.1, 1.3, 0.6);
        rightEyelid.visible = false;
        eyesGroup.add(rightEyelid);
        
        // Store references for animation
        npc.leftEye = leftEye;
        npc.rightEye = rightEye;
        npc.leftIris = leftIris;
        npc.rightIris = rightIris;
        npc.leftEyelid = leftEyelid;
        npc.rightEyelid = rightEyelid;
        
        npc.add(eyesGroup);
    },
    
    /**
     * Add stylized hair to the NPC
     */
    addHair: function(npc, npcType) {
        // Create hair geometry based on hairstyle
        let hairMesh;
        
        switch(npcType.hairStyle) {
            case 'rainbow':
                // Rainbow gradient hair (like in many of the NFTs)
                const rainbowHairGeometry = new THREE.SphereGeometry(0.6, 32, 32);
                
                // Create canvas for rainbow gradient
                const rainbowCanvas = document.createElement('canvas');
                const rainbowContext = rainbowCanvas.getContext('2d');
                rainbowCanvas.width = 512;
                rainbowCanvas.height = 512;
                
                // Create rainbow gradient
                const gradient = rainbowContext.createLinearGradient(0, 0, rainbowCanvas.width, 0);
                gradient.addColorStop(0, 'red');
                gradient.addColorStop(0.17, 'orange');
                gradient.addColorStop(0.33, 'yellow');
                gradient.addColorStop(0.5, 'green');
                gradient.addColorStop(0.67, 'blue');
                gradient.addColorStop(0.83, 'indigo');
                gradient.addColorStop(1, 'violet');
                
                // Fill with gradient
                rainbowContext.fillStyle = gradient;
                rainbowContext.fillRect(0, 0, rainbowCanvas.width, rainbowCanvas.height);
                
                // Create texture from canvas
                const rainbowTexture = new THREE.CanvasTexture(rainbowCanvas);
                
                const rainbowMaterial = new THREE.MeshPhongMaterial({ 
                    map: rainbowTexture,
                    transparent: true,
                    shininess: 100
                });
                
                hairMesh = new THREE.Mesh(rainbowHairGeometry, rainbowMaterial);
                hairMesh.position.y = 1.55;
                hairMesh.scale.set(1.1, 1.3, 1.1);
                break;
                
            case 'bob':
                // Classic bob cut (rounded at bottom)
                const bobGeometry = new THREE.SphereGeometry(0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.65);
                const bobMaterial = new THREE.MeshPhongMaterial({ 
                    color: npcType.hairColor, 
                    shininess: 60,
                    transparent: true,
                    opacity: 0.95
                });
                
                hairMesh = new THREE.Mesh(bobGeometry, bobMaterial);
                hairMesh.position.y = 1.6;
                
                // Add bangs (front hair)
                const bangsGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.3);
                const bangsMaterial = new THREE.MeshPhongMaterial({ color: npcType.hairColor });
                const bangs = new THREE.Mesh(bangsGeometry, bangsMaterial);
                bangs.position.set(0, 1.75, 0.4);
                hairMesh.add(bangs);
                break;
                
            case 'long':
                // Long flowing hair
                const longHairGroup = new THREE.Group();
                
                // Main hair volume
                const topHairGeometry = new THREE.SphereGeometry(0.6, 32, 32);
                const topHairMaterial = new THREE.MeshPhongMaterial({ 
                    color: npcType.hairColor,
                    shininess: 80 
                });
                const topHair = new THREE.Mesh(topHairGeometry, topHairMaterial);
                topHair.position.y = 1.5;
                longHairGroup.add(topHair);
                
                // Long strands
                const strandGeometry = new THREE.CylinderGeometry(0.2, 0.1, 1.5, 8);
                const strandMaterial = new THREE.MeshPhongMaterial({ color: npcType.hairColor });
                
                // Create several strands around the head
                for (let i = 0; i < 8; i++) {
                    const strand = new THREE.Mesh(strandGeometry, strandMaterial);
                    const angle = (i / 8) * Math.PI * 2;
                    const radius = 0.4;
                    
                    strand.position.set(
                        Math.cos(angle) * radius,
                        0.8, // Position below head
                        Math.sin(angle) * radius
                    );
                    
                    // Tilt strands outward slightly
                    strand.rotation.x = Math.PI / 12;
                    strand.rotation.y = -angle;
                    
                    longHairGroup.add(strand);
                }
                
                hairMesh = longHairGroup;
                break;
                
            case 'mohawk':
                // Punk mohawk
                const mohawkGroup = new THREE.Group();
                
                // Base close-cropped hair
                const baseHairGeometry = new THREE.SphereGeometry(0.52, 32, 32);
                const baseHairMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x111111,
                    shininess: 30
                });
                const baseHair = new THREE.Mesh(baseHairGeometry, baseHairMaterial);
                baseHair.position.y = 1.5;
                mohawkGroup.add(baseHair);
                
                // Spiky top
                const spikeCount = 5;
                for (let i = 0; i < spikeCount; i++) {
                    const spikeGeometry = new THREE.ConeGeometry(0.1, 0.4, 8);
                    const spikeMaterial = new THREE.MeshPhongMaterial({ 
                        color: npcType.hairColor,
                        shininess: 100
                    });
                    
                    const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
                    const posZ = (i - (spikeCount-1)/2) * 0.15;
                    spike.position.set(0, 1.9, posZ);
                    
                    mohawkGroup.add(spike);
                }
                
                hairMesh = mohawkGroup;
                break;
                
            case 'short':
            default:
                // Short hairstyle
                const shortGeometry = new THREE.SphereGeometry(0.55, 32, 32);
                shortGeometry.scale(1, 0.7, 1);
                
                const shortMaterial = new THREE.MeshPhongMaterial({ 
                    color: npcType.hairColor,
                    transparent: true,
                    opacity: 0.9
                });
                
                hairMesh = new THREE.Mesh(shortGeometry, shortMaterial);
                hairMesh.position.y = 1.6;
                
                // Add hair texture details
                const textureSize = 512;
                const hairCanvas = document.createElement('canvas');
                const hairContext = hairCanvas.getContext('2d');
                hairCanvas.width = textureSize;
                hairCanvas.height = textureSize;
                
                // Draw hair strands texture
                hairContext.fillStyle = '#000000';
                hairContext.fillRect(0, 0, textureSize, textureSize);
                
                hairContext.strokeStyle = '#222222';
                hairContext.lineWidth = 2;
                
                for (let i = 0; i < 100; i++) {
                    const x = Math.random() * textureSize;
                    const y = Math.random() * textureSize;
                    const length = 20 + Math.random() * 30;
                    const angle = Math.random() * Math.PI * 2;
                    
                    hairContext.beginPath();
                    hairContext.moveTo(x, y);
                    hairContext.lineTo(
                        x + Math.cos(angle) * length,
                        y + Math.sin(angle) * length
                    );
                    hairContext.stroke();
                }
                
                const hairTexture = new THREE.CanvasTexture(hairCanvas);
                shortMaterial.bumpMap = hairTexture;
                shortMaterial.bumpScale = 0.05;
                break;
        }
        
        // Add the hair to NPC
        npc.add(hairMesh);
        return hairMesh;
    },
    
    /**
     * Add accessory to the NPC
     */
    addAccessory: function(npc, npcType) {
        switch(npcType.accessory) {
            case 'sunglasses':
                // Create stylish large sunglasses like in the NFTs
                const glassesGroup = new THREE.Group();
                
                // Main frame
                const frameGeometry = new THREE.BoxGeometry(0.9, 0.25, 0.1);
                const frameMaterial = new THREE.MeshPhongMaterial({
                    color: 0x000000,
                    shininess: 100
                });
                
                const frame = new THREE.Mesh(frameGeometry, frameMaterial);
                glassesGroup.add(frame);
                
                // Left lens
                const leftLensGeometry = new THREE.CircleGeometry(0.2, 32);
                const lensColor = new THREE.Color(0x00AAFF);
                const lensOpacity = 0.7;
                
                const leftLensMaterial = new THREE.MeshPhongMaterial({
                    color: lensColor,
                    transparent: true,
                    opacity: lensOpacity,
                    shininess: 90
                });
                
                const leftLens = new THREE.Mesh(leftLensGeometry, leftLensMaterial);
                leftLens.position.set(-0.25, 0, 0.06);
                glassesGroup.add(leftLens);
                
                // Right lens
                const rightLens = new THREE.Mesh(leftLensGeometry, leftLensMaterial);
                rightLens.position.set(0.25, 0, 0.06);
                glassesGroup.add(rightLens);
                
                // Position glasses on face
                glassesGroup.position.set(0, 1.5, 0.5);
                
                npc.add(glassesGroup);
                break;
                
            case 'striped_hat':
                // Striped bucket hat/fishing hat (common in the NFTs)
                const hatGroup = new THREE.Group();
                
                // Hat rim
                const rimGeometry = new THREE.TorusGeometry(0.6, 0.1, 16, 32);
                const rimMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
                const rim = new THREE.Mesh(rimGeometry, rimMaterial);
                rim.rotation.x = Math.PI / 2;
                hatGroup.add(rim);
                
                // Hat top
                const topGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.3, 32, 1, true);
                
                // Create striped texture
                const stripeCanvas = document.createElement('canvas');
                const stripeCtx = stripeCanvas.getContext('2d');
                stripeCanvas.width = 512;
                stripeCanvas.height = 512;
                
                // Draw alternating stripes
                const stripeColors = ['#FF0000', '#FFFFFF'];
                const stripeCount = 8;
                const stripeHeight = stripeCanvas.height / stripeCount;
                
                for (let i = 0; i < stripeCount; i++) {
                    stripeCtx.fillStyle = stripeColors[i % 2];
                    stripeCtx.fillRect(0, i * stripeHeight, stripeCanvas.width, stripeHeight);
                }
                
                const stripeTexture = new THREE.CanvasTexture(stripeCanvas);
                stripeTexture.wrapS = THREE.RepeatWrapping;
                stripeTexture.wrapT = THREE.RepeatWrapping;
                stripeTexture.repeat.set(8, 1);
                
                const topMaterial = new THREE.MeshPhongMaterial({
                    map: stripeTexture,
                    side: THREE.DoubleSide
                });
                
                const top = new THREE.Mesh(topGeometry, topMaterial);
                top.position.y = 0.15;
                hatGroup.add(top);
                
                // Hat crown
                const crownGeometry = new THREE.CircleGeometry(0.6, 32);
                const crownMaterial = new THREE.MeshPhongMaterial({
                    color: 0xFFFFFF,
                    side: THREE.DoubleSide
                });
                
                const crown = new THREE.Mesh(crownGeometry, crownMaterial);
                crown.rotation.x = -Math.PI / 2;
                crown.position.y = 0.3;
                hatGroup.add(crown);
                
                // Position hat on head
                hatGroup.position.set(0, 2.1, 0);
                
                npc.add(hatGroup);
                break;
                
            case 'red_beanie':
                // Red beanie with folded rim
                const beanieGroup = new THREE.Group();
                
                // Main beanie
                const beanieGeometry = new THREE.SphereGeometry(0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6);
                const beanieMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0xFF0000,
                    shininess: 30
                });
                
                const beanie = new THREE.Mesh(beanieGeometry, beanieMaterial);
                beanie.rotation.x = Math.PI;
                beanieGroup.add(beanie);
                
                // Beanie fold/rim
                const rimGeometry2 = new THREE.TorusGeometry(0.6, 0.08, 16, 32, Math.PI * 1.5);
                const rimMaterial2 = new THREE.MeshPhongMaterial({ 
                    color: 0xDD0000  // Slightly darker than main beanie
                });
                
                const beanieRim = new THREE.Mesh(rimGeometry2, rimMaterial2);
                beanieRim.rotation.x = Math.PI / 2;
                beanieRim.position.y = -0.3;
                beanieRim.position.z = 0.15;
                beanieGroup.add(beanieRim);
                
                // Small pom-pom on top
                const pomGeometry = new THREE.SphereGeometry(0.1, 16, 16);
                const pomMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0xFFFFFF,
                    shininess: 60 
                });
                
                const pom = new THREE.Mesh(pomGeometry, pomMaterial);
                pom.position.y = 0.25;
                beanieGroup.add(pom);
                
                // Position on head
                beanieGroup.position.set(0, 2.0, 0);
                
                npc.add(beanieGroup);
                break;
                
            case 'glowing_halo':
                // Glowing halo above head
                const haloGeometry = new THREE.TorusGeometry(0.5, 0.05, 16, 32);
                const haloMaterial = new THREE.MeshBasicMaterial({
                    color: 0xFFFF00,
                    emissive: 0xFFFF00,
                    emissiveIntensity: 2,
                });
                
                const halo = new THREE.Mesh(haloGeometry, haloMaterial);
                halo.position.set(0, 2.3, 0);
                
                // Add glowing particles around halo
                const particleCount = 20;
                const particleGroup = new THREE.Group();
                
                for (let i = 0; i < particleCount; i++) {
                    const angle = (i / particleCount) * Math.PI * 2;
                    const radius = 0.6;
                    
                    const particleGeometry = new THREE.SphereGeometry(0.03, 8, 8);
                    const particleMaterial = new THREE.MeshBasicMaterial({
                        color: 0xFFFF99,
                        transparent: true,
                        opacity: 0.8
                    });
                    
                    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
                    particle.position.set(
                        Math.cos(angle) * radius,
                        Math.sin(angle) * 0.2 + 2.3,
                        Math.sin(angle) * radius
                    );
                    
                    // Store initial position and animation params
                    particle.userData.initialY = particle.position.y;
                    particle.userData.phase = Math.random() * Math.PI * 2;
                    particle.userData.speed = 0.003 + Math.random() * 0.003;
                    particle.userData.amplitude = 0.05 + Math.random() * 0.05;
                    
                    particleGroup.add(particle);
                }
                
                // Keep reference for animation
                npc.haloParticles = particleGroup;
                
                npc.add(halo);
                npc.add(particleGroup);
                break;
                
            case 'matrix_glasses':
                // Tiny Matrix-style glasses
                const matrixGroup = new THREE.Group();
                
                // Lenses
                const lensGeometry = new THREE.PlaneGeometry(0.15, 0.1);
                const lensMaterial = new THREE.MeshBasicMaterial({
                    color: 0x00FF00,
                    transparent: true,
                    opacity: 0.7,
                    side: THREE.DoubleSide
                });
                
                const leftMatrixLens = new THREE.Mesh(lensGeometry, lensMaterial);
                leftMatrixLens.position.set(-0.1, 0, 0);
                matrixGroup.add(leftMatrixLens);
                
                const rightMatrixLens = new THREE.Mesh(lensGeometry, lensMaterial);
                rightMatrixLens.position.set(0.1, 0, 0);
                matrixGroup.add(rightMatrixLens);
                
                // Frame
                const frameGeometry2 = new THREE.BoxGeometry(0.35, 0.03, 0.03);
                const frameMaterial2 = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const frame2 = new THREE.Mesh(frameGeometry2, frameMaterial2);
                matrixGroup.add(frame2);
                
                // Side arms
                const armGeometry = new THREE.BoxGeometry(0.2, 0.02, 0.02);
                
                const leftArm = new THREE.Mesh(armGeometry, frameMaterial2);
                leftArm.position.set(-0.27, 0, -0.1);
                leftArm.rotation.y = Math.PI / 4;
                matrixGroup.add(leftArm);
                
                const rightArm = new THREE.Mesh(armGeometry, frameMaterial2);
                rightArm.position.set(0.27, 0, -0.1);
                rightArm.rotation.y = -Math.PI / 4;
                matrixGroup.add(rightArm);
                
                // Position on face
                matrixGroup.position.set(0, 1.5, 0.5);
                
                // Create binary rain effect
                const binaryCanvas = document.createElement('canvas');
                const binaryCtx = binaryCanvas.getContext('2d');
                binaryCanvas.width = 64;
                binaryCanvas.height = 64;
                
                npc.userData.binaryCanvas = binaryCanvas;
                npc.userData.binaryCtx = binaryCtx;
                npc.userData.binaryTexture = new THREE.CanvasTexture(binaryCanvas);
                lensMaterial.map = npc.userData.binaryTexture;
                
                // Function to update binary pattern
                npc.userData.updateBinary = function() {
                    const ctx = this.binaryCtx;
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                    ctx.fillRect(0, 0, 64, 64);
                    
                    ctx.fillStyle = '#00FF00';
                    ctx.font = '10px monospace';
                    
                    for (let i = 0; i < 8; i++) {
                        const x = Math.floor(Math.random() * 64);
                        const y = Math.floor(Math.random() * 64);
                        const digit = Math.random() > 0.5 ? '1' : '0';
                        ctx.fillText(digit, x, y);
                    }
                    
                    this.binaryTexture.needsUpdate = true;
                };
                
                // Initialize binary pattern
                npc.userData.updateBinary();
                
                npc.add(matrixGroup);
                break;
        }
    },
    
    /**
     * Add a number badge like in the NFTs
     */
    addNumberBadge: function(npc, npcType) {
        // Create a random number for the badge (use specific ranges like in the NFTs)
        let number;
        
        // Different number ranges based on NPC type
        if (npcType.solValue.includes('749')) {
            number = Utils.randomInt(300, 800); // High numbers for valuable NFTs
        } else if (npcType.solValue.includes('46')) {
            number = Utils.randomInt(30, 100);
        } else {
            number = Utils.randomInt(1, 30);
        }
        
        // Create badge background with rounded corners
        const badgeGroup = new THREE.Group();
        
        // Create canvas for badge
        const badgeCanvas = document.createElement('canvas');
        const badgeCtx = badgeCanvas.getContext('2d');
        badgeCanvas.width = 256;
        badgeCanvas.height = 192;
        
        // Draw rounded rectangle background
        const cornerRadius = 30;
        badgeCtx.fillStyle = npcType.badgeColor || this.getRandomBadgeColor();
        this.roundRect(badgeCtx, 0, 0, badgeCanvas.width, badgeCanvas.height, cornerRadius);
        badgeCtx.fill();
        
        // Draw text
        badgeCtx.fillStyle = '#FFFFFF';
        badgeCtx.font = 'bold 120px Arial';
        badgeCtx.textAlign = 'center';
        badgeCtx.textBaseline = 'middle';
        badgeCtx.fillText(number, badgeCanvas.width / 2, badgeCanvas.height / 2);
        
        // Create texture from canvas
        const badgeTexture = new THREE.CanvasTexture(badgeCanvas);
        badgeTexture.minFilter = THREE.LinearFilter;
        
        // Create badge material and geometry
        const badgeMaterial = new THREE.MeshBasicMaterial({
            map: badgeTexture,
            transparent: true
        });
        const badgeGeometry = new THREE.PlaneGeometry(0.5, 0.375);
        
        // Create badge mesh
        const badge = new THREE.Mesh(badgeGeometry, badgeMaterial);
        
        // Position badge at top right corner of character (like in the NFTs)
        badge.position.set(0.45, 1.9, 0.3);
        
        // Add subtle floating animation
        badge.userData.baseY = badge.position.y;
        badge.userData.floatPhase = Math.random() * Math.PI * 2;
        badge.userData.floatSpeed = 0.001 + Math.random() * 0.001;
        badge.userData.floatAmplitude = 0.05;
        
        npc.badge = badge;
        npc.add(badge);
    },
    
    /**
     * Add SOL value display like in the NFTs
     */
    addSolValue: function(npc, npcType) {
        // Create SOL value display group
        const solGroup = new THREE.Group();
        
        // Create canvas for SOL value
        const solCanvas = document.createElement('canvas');
        const solCtx = solCanvas.getContext('2d');
        solCanvas.width = 512;
        solCanvas.height = 128;
        
        // Clear background with transparency
        solCtx.clearRect(0, 0, solCanvas.width, solCanvas.height);
        
        // Draw SOL value text
        solCtx.fillStyle = '#FFFFFF';
        solCtx.font = 'bold 60px Arial';
        solCtx.textAlign = 'left';
        solCtx.textBaseline = 'middle';
        solCtx.fillText(npcType.solValue + ' SOL', 100, solCanvas.height / 2);
        
        // Draw SOL logo
        solCtx.beginPath();
        solCtx.arc(50, solCanvas.height / 2, 40, 0, Math.PI * 2);
        solCtx.fillStyle = '#14F195';
        solCtx.fill();
        
        solCtx.beginPath();
        solCtx.arc(50, solCanvas.height / 2, 35, 0, Math.PI * 2);
        solCtx.fillStyle = '#000000';
        solCtx.fill();
        
        solCtx.fillStyle = '#14F195';
        solCtx.font = 'bold 50px Arial';
        solCtx.textAlign = 'center';
        solCtx.textBaseline = 'middle';
        solCtx.fillText('S', 50, solCanvas.height / 2);
        
        // Create texture from canvas
        const solTexture = new THREE.CanvasTexture(solCanvas);
        solTexture.minFilter = THREE.LinearFilter;
        
        // Create SOL value material and geometry
        const solMaterial = new THREE.MeshBasicMaterial({
            map: solTexture,
            transparent: true,
            depthTest: false // Always show on top
        });
        const solGeometry = new THREE.PlaneGeometry(1.2, 0.3);
        
        // Create SOL value mesh
        const solMesh = new THREE.Mesh(solGeometry, solMaterial);
        
        // Position below character (like in the NFTs)
        solMesh.position.set(0, -0.8, 0.1);
        
        solGroup.add(solMesh);
        npc.add(solGroup);
    },
    
    /**
     * Add a text overlay like those in the NFT collection
     */
    addTextOverlay: function(npc, type) {
        // Only add text overlay sometimes (50% chance)
        if (Math.random() > 0.5) return;
        
        let textureKey;
        switch(type) {
            case 'citizen':
                textureKey = 'cameras';
                break;
            case 'merchant':
                textureKey = 'locked';
                break;
            case 'prophet':
                textureKey = 'uganda';
                break;
            case 'skeptic':
                textureKey = 'manager';
                break;
        }
        
        if (!textureKey) return;
        
        // Create text overlay
        const overlayGeometry = new THREE.PlaneGeometry(1.5, 0.5);
        const overlayMaterial = new THREE.MeshBasicMaterial({
            map: this.assets.textures.textOverlay[textureKey],
            transparent: true
        });
        const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);
        
        // Position overlay above character
        overlay.position.set(0, 2.3, 0);
        
        npc.add(overlay);
    },
    
    /**
     * Add a detailed anime-style body
     */
    addDetailedBody: function(npc, npcType) {
        // Create body group
        const bodyGroup = new THREE.Group();
        
        // Neck
        const neckGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.2, 16);
        const neckMaterial = new THREE.MeshPhongMaterial({ 
            color: npcType.baseColor,
            shininess: 30
        });
        const neck = new THREE.Mesh(neckGeometry, neckMaterial);
        neck.position.y = 1.3;
        bodyGroup.add(neck);
        
        // Torso based on clothing type
        let torso;
        
        switch(npcType.clothingTop) {
            case 'hoodie':
                // Hoodie
                const hoodieGeometry = new THREE.BoxGeometry(0.9, 1.1, 0.6);
                const hoodieMaterial = new THREE.MeshPhongMaterial({ 
                    color: new THREE.Color(npcType.clothingTopColor),
                    shininess: 50
                });
                
                torso = new THREE.Mesh(hoodieGeometry, hoodieMaterial);
                
                // Add hoodie details
                const hoodGeometry = new THREE.TorusGeometry(0.4, 0.1, 16, 16, Math.PI);
                const hood = new THREE.Mesh(hoodGeometry, hoodieMaterial);
                hood.rotation.x = Math.PI / 2;
                hood.position.set(0, 1.2, -0.2);
                torso.add(hood);
                
                // Add pocket
                const pocketGeometry = new THREE.BoxGeometry(0.5, 0.2, 0.1);
                const pocket = new THREE.Mesh(pocketGeometry, hoodieMaterial);
                pocket.position.set(0, -0.3, 0.35);
                torso.add(pocket);
                
                // Add hoodie strings
                const stringGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8);
                const stringMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
                
                const leftString = new THREE.Mesh(stringGeometry, stringMaterial);
                leftString.position.set(-0.2, 0.3, 0.3);
                torso.add(leftString);
                
                const rightString = new THREE.Mesh(stringGeometry, stringMaterial);
                rightString.position.set(0.2, 0.3, 0.3);
                torso.add(rightString);
                break;
                
            case 'jacket':
                // Jacket
                const jacketGeometry = new THREE.BoxGeometry(1.0, 1.0, 0.6);
                const jacketMaterial = new THREE.MeshPhongMaterial({ 
                    color: new THREE.Color(npcType.clothingTopColor),
                    shininess: 70
                });
                
                torso = new THREE.Mesh(jacketGeometry, jacketMaterial);
                
                // Add collar
                const collarGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.1);
                const collarMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x444444,
                    shininess: 90
                });
                
                const collar = new THREE.Mesh(collarGeometry, collarMaterial);
                collar.position.set(0, 0.5, 0.35);
                collar.rotation.x = Math.PI / 8;
                torso.add(collar);
                
                // Add jacket zipper
                const zipperGeometry = new THREE.BoxGeometry(0.05, 0.8, 0.1);
                const zipperMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0xCCCCCC,
                    metalness: 0.8,
                    roughness: 0.2
                });
                
                const zipper = new THREE.Mesh(zipperGeometry, zipperMaterial);
                zipper.position.set(0, 0, 0.35);
                torso.add(zipper);
                break;
                
            case 'robe':
                // Flowing robe
                const robeGroup = new THREE.Group();
                
                // Upper robe
                const upperRobeGeometry = new THREE.BoxGeometry(1.0, 1.2, 0.6);
                upperRobeGeometry.translate(0, 0, 0);
                const robeMaterial = new THREE.MeshPhongMaterial({ 
                    color: new THREE.Color(npcType.clothingTopColor),
                    shininess: 30
                });
                
                const upperRobe = new THREE.Mesh(upperRobeGeometry, robeMaterial);
                robeGroup.add(upperRobe);
                
                // Lower flowing robe parts
                const segments = 5;
                for (let i = 0; i < segments; i++) {
                    const segmentWidth = 1.2 + i * 0.1;
                    const segmentHeight = 0.3;
                    const segmentDepth = 0.6 + i * 0.05;
                    
                    const segmentGeometry = new THREE.BoxGeometry(segmentWidth, segmentHeight, segmentDepth);
                    const segment = new THREE.Mesh(segmentGeometry, robeMaterial);
                    
                    segment.position.y = -0.6 - (i * segmentHeight);
                    robeGroup.add(segment);
                }
                
                // Add decorative element (glowing runes, etc.)
                if (npcType.npcType === 'prophet') {
                    const runeGeometry = new THREE.CircleGeometry(0.15, 16);
                    const runeMaterial = new THREE.MeshBasicMaterial({ 
                        color: 0xFFFFAA,
                        side: THREE.DoubleSide
                    });
                    
                    const rune = new THREE.Mesh(runeGeometry, runeMaterial);
                    rune.position.set(0, 0, 0.31);
                    rune.rotation.y = Math.PI;
                    upperRobe.add(rune);
                }
                
                torso = robeGroup;
                break;
                
            case 'tshirt':
            default:
                // T-shirt
                const tshirtGeometry = new THREE.BoxGeometry(0.8, 0.9, 0.5);
                const tshirtMaterial = new THREE.MeshPhongMaterial({ 
                    color: new THREE.Color(npcType.clothingTopColor),
                    shininess: 40
                });
                
                torso = new THREE.Mesh(tshirtGeometry, tshirtMaterial);
                
                // Add t-shirt print/design
                const designGeometry = new THREE.PlaneGeometry(0.5, 0.5);
                
                // Create canvas for the design
                const designCanvas = document.createElement('canvas');
                const designCtx = designCanvas.getContext('2d');
                designCanvas.width = 128;
                designCanvas.height = 128;
                
                // Draw design
                designCtx.fillStyle = '#000000';
                designCtx.fillRect(0, 0, 128, 128);
                
                // Add text or symbol based on NPC type
                designCtx.fillStyle = '#FFFFFF';
                designCtx.font = 'bold 30px Arial';
                designCtx.textAlign = 'center';
                designCtx.textBaseline = 'middle';
                
                if (npcType.npcType === 'skeptic') {
                    designCtx.fillText('NOT ATEM', 64, 64);
                } else if (npcType.npcType === 'citizen') {
                    designCtx.fillText('CAMERAS', 64, 64);
                } else {
                    // Draw Solana logo
                    designCtx.beginPath();
                    designCtx.arc(64, 64, 40, 0, Math.PI * 2);
                    designCtx.fillStyle = '#14F195';
                    designCtx.fill();
                    
                    designCtx.beginPath();
                    designCtx.arc(64, 64, 30, 0, Math.PI * 2);
                    designCtx.fillStyle = '#000000';
                    designCtx.fill();
                    
                    designCtx.fillStyle = '#14F195';
                    designCtx.font = 'bold 40px Arial';
                    designCtx.fillText('S', 64, 64);
                }
                
                const designTexture = new THREE.CanvasTexture(designCanvas);
                const designMaterial = new THREE.MeshBasicMaterial({
                    map: designTexture,
                    transparent: true
                });
                
                const design = new THREE.Mesh(designGeometry, designMaterial);
                design.position.z = 0.26;
                torso.add(design);
                break;
        }
        
        // Position torso
        torso.position.y = 0.5;
        torso.castShadow = true;
        torso.receiveShadow = true;
        bodyGroup.add(torso);
        
        // Add arms
        const armGeometry = new THREE.CylinderGeometry(0.12, 0.1, 0.8, 16);
        const armMaterial = new THREE.MeshPhongMaterial({ 
            color: new THREE.Color(npcType.clothingTopColor)
        });
        
        // Left arm
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-0.5, 0.7, 0);
        leftArm.rotation.z = Math.PI / 8; // Angle slightly outward
        bodyGroup.add(leftArm);
        
        // Right arm
        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(0.5, 0.7, 0);
        rightArm.rotation.z = -Math.PI / 8;
        bodyGroup.add(rightArm);
        
        // Add hands
        const handGeometry = new THREE.SphereGeometry(0.12, 16, 16);
        const handMaterial = new THREE.MeshPhongMaterial({ 
            color: npcType.baseColor
        });
        
        // Left hand
        const leftHand = new THREE.Mesh(handGeometry, handMaterial);
        leftHand.position.set(-0.6, 0.3, 0);
        leftHand.scale.set(1, 0.8, 0.8);
        bodyGroup.add(leftHand);
        
        // Right hand
        const rightHand = new THREE.Mesh(handGeometry, handMaterial);
        rightHand.position.set(0.6, 0.3, 0);
        rightHand.scale.set(1, 0.8, 0.8);
        bodyGroup.add(rightHand);
        
        // Add legs based on bottom clothing type
        switch(npcType.clothingBottom) {
            case 'long_skirt':
                // Long flowing skirt
                const skirtGroup = new THREE.Group();
                
                // Skirt segments
                const skirtSegments = 4;
                for (let i = 0; i < skirtSegments; i++) {
                    const segmentWidth = 0.8 + i * 0.15;
                    const segmentHeight = 0.3;
                    
                    const segmentGeometry = new THREE.CylinderGeometry(
                        segmentWidth/2, 
                        segmentWidth/2 + 0.1, 
                        segmentHeight, 16);
                    
                    const segmentMaterial = new THREE.MeshPhongMaterial({ 
                        color: new THREE.Color(npcType.clothingBottomColor)
                    });
                    
                    const segment = new THREE.Mesh(segmentGeometry, segmentMaterial);
                    segment.position.y = -0.1 - (i * segmentHeight);
                    skirtGroup.add(segment);
                }
                
                bodyGroup.add(skirtGroup);
                break;
                
            case 'shorts':
                // Shorts
                const shortsGeometry = new THREE.BoxGeometry(0.85, 0.4, 0.5);
                const shortsMaterial = new THREE.MeshPhongMaterial({ 
                    color: new THREE.Color(npcType.clothingBottomColor)
                });
                
                const shorts = new THREE.Mesh(shortsGeometry, shortsMaterial);
                shorts.position.y = -0.1;
                bodyGroup.add(shorts);
                
                // Legs
                const shortLegGeometry = new THREE.CylinderGeometry(0.15, 0.12, 0.6, 16);
                const legMaterial = new THREE.MeshPhongMaterial({ 
                    color: npcType.baseColor
                });
                
                const leftShortLeg = new THREE.Mesh(shortLegGeometry, legMaterial);
                leftShortLeg.position.set(-0.25, -0.6, 0);
                bodyGroup.add(leftShortLeg);
                
                const rightShortLeg = new THREE.Mesh(shortLegGeometry, legMaterial);
                rightShortLeg.position.set(0.25, -0.6, 0);
                bodyGroup.add(rightShortLeg);
                
                // Feet
                const footGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.3);
                const footMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
                
                const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
                leftFoot.position.set(-0.25, -0.95, 0.05);
                bodyGroup.add(leftFoot);
                
                const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
                rightFoot.position.set(0.25, -0.95, 0.05);
                bodyGroup.add(rightFoot);
                break;
                
            case 'pants':
            case 'jeans':
            case 'cargo_pants':
            default:
                // Full length pants
                const pantsGeometry = new THREE.BoxGeometry(0.85, 0.4, 0.5);
                const pantsMaterial = new THREE.MeshPhongMaterial({ 
                    color: new THREE.Color(npcType.clothingBottomColor)
                });
                
                const pants = new THREE.Mesh(pantsGeometry, pantsMaterial);
                pants.position.y = -0.1;
                bodyGroup.add(pants);
                
                // Pant legs
                const pantLegGeometry = new THREE.BoxGeometry(0.3, 0.8, 0.4);
                
                const leftPantLeg = new THREE.Mesh(pantLegGeometry, pantsMaterial);
                leftPantLeg.position.set(-0.25, -0.7, 0);
                bodyGroup.add(leftPantLeg);
                
                const rightPantLeg = new THREE.Mesh(pantLegGeometry, pantsMaterial);
                rightPantLeg.position.set(0.25, -0.7, 0);
                bodyGroup.add(rightPantLeg);
                
                // Add details for cargo pants
                if (npcType.clothingBottom === 'cargo_pants') {
                    // Add pockets
                    const pocketGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.1);
                    const pocketMaterial = new THREE.MeshPhongMaterial({ 
                        color: new THREE.Color(npcType.clothingBottomColor).multiplyScalar(0.8) // Darker shade
                    });
                    
                    const leftPocket = new THREE.Mesh(pocketGeometry, pocketMaterial);
                    leftPocket.position.set(-0.25, -0.5, 0.2);
                    bodyGroup.add(leftPocket);
                    
                    const rightPocket = new THREE.Mesh(pocketGeometry, pocketMaterial);
                    rightPocket.position.set(0.25, -0.5, 0.2);
                    bodyGroup.add(rightPocket);
                }
                
                // Shoes
                const shoeGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.5);
                const shoeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
                
                const leftShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
                leftShoe.position.set(-0.25, -1.15, 0.05);
                bodyGroup.add(leftShoe);
                
                const rightShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
                rightShoe.position.set(0.25, -1.15, 0.05);
                bodyGroup.add(rightShoe);
                break;
        }
        
        // Store references for animation
        npc.leftArm = leftArm;
        npc.rightArm = rightArm;
        npc.torso = torso;
        
        npc.add(bodyGroup);
    },
    
    /**
     * Get a random vibrant color for badges
     */
    getRandomBadgeColor: function() {
        const colors = [
            0xFF5757, // Red
            0x14F195, // Green
            0x9945FF, // Purple
            0xFF9900, // Orange
            0x00AAFF  // Blue
        ];
        
        return colors[Math.floor(Math.random() * colors.length)];
    },
    
    /**
     * Get a random color for clothing
     */
    getRandomClothingColor: function() {
        const colors = [
            0xFFFFFF, // White
            0x000000, // Black
            0xFF0000, // Red
            0x0000FF, // Blue
            0xFFD700  // Gold
        ];
        
        return colors[Math.floor(Math.random() * colors.length)];
    },
    
    /**
     * Update all NPCs with detailed animations
     */
    update: function(deltaTime) {
        this.characters.forEach(npc => {
            // Update blinking animation
            if (npc.leftEyelid && npc.rightEyelid) {
                npc.blinkTimer -= deltaTime;
                
                if (npc.blinkTimer <= 0) {
                    // Time to blink
                    npc.leftEyelid.visible = true;
                    npc.rightEyelid.visible = true;
                    
                    // Reset blink timer (0.15s for blink, then 2-5s until next blink)
                    setTimeout(() => {
                        if (npc.leftEyelid && npc.rightEyelid) {
                            npc.leftEyelid.visible = false;
                            npc.rightEyelid.visible = false;
                            npc.blinkTimer = 2 + Math.random() * 3;
                        }
                    }, 150);
                }
            }
            
            // Update eye movement
            if (npc.leftIris && npc.rightIris) {
                // Occasionally move eyes
                if (Math.random() < 0.005) { // Reduced from 0.01
                    const eyeMovement = 0.03;
                    const newX = (Math.random() - 0.5) * eyeMovement;
                    const newY = (Math.random() - 0.5) * eyeMovement;
                    
                    npc.leftIris.position.x = newX;
                    npc.leftIris.position.y = newY;
                    npc.rightIris.position.x = newX;
                    npc.rightIris.position.y = newY;
                }
            }
            
            // Update floating name tag (even slower animation)
            if (npc.nameTag) {
                npc.nameTagPhase += 0.005; // Reduced from 0.01
                npc.nameTag.position.y = npc.nameTagBaseY + Math.sin(npc.nameTagPhase) * 0.1;
            }
            
            // Update badge floating animation (even slower animation)
            if (npc.badge) {
                npc.badge.userData.floatPhase += npc.badge.userData.floatSpeed * 0.25; // Reduced from 0.5 to 0.25
                npc.badge.position.y = npc.badge.userData.baseY + 
                    Math.sin(npc.badge.userData.floatPhase) * npc.badge.userData.floatAmplitude;
            }
            
            // Update halo particles if present (even slower animation)
            if (npc.haloParticles) {
                npc.haloParticles.children.forEach(particle => {
                    particle.userData.phase += particle.userData.speed * 0.25; // Reduced from 0.5 to 0.25
                    particle.position.y = particle.userData.initialY + 
                        Math.sin(particle.userData.phase) * particle.userData.amplitude;
                });
            }
            
            // Update binary pattern in matrix glasses if present
            if (npc.userData.updateBinary && Math.random() < 0.025) { // Reduced from 0.05 to 0.025
                npc.userData.updateBinary();
            }
            
            // NPC wandering behavior across entire map
            npc.movementTimer -= deltaTime;
            
            if (npc.movementTimer <= 0) {
                // Set new target position anywhere on the map
                const wanderRadius = npc.wanderRadius || 50; // Allow wandering in 50 unit radius
                const baseX = npc.position.x;
                const baseZ = npc.position.z;
                
                // Decide if we want a near or far destination
                const longJourney = Math.random() < 0.3; // 30% chance for long journey
                
                if (longJourney) {
                    // Go somewhere far
                    npc.targetPosition.x = baseX + (Math.random() - 0.5) * wanderRadius * 2;
                    npc.targetPosition.z = baseZ + (Math.random() - 0.5) * wanderRadius * 2;
                    
                    // Longer wait at destination
                    npc.movementTimer = Utils.randomInt(10, 20);
                } else {
                    // Short distance movement
                    npc.targetPosition.x = baseX + (Math.random() - 0.5) * wanderRadius * 0.4;
                    npc.targetPosition.z = baseZ + (Math.random() - 0.5) * wanderRadius * 0.4;
                    
                    // Shorter wait
                    npc.movementTimer = Utils.randomInt(3, 8);
                }
            }
            
            // Move toward target position
            const directionX = npc.targetPosition.x - npc.position.x;
            const directionZ = npc.targetPosition.z - npc.position.z;
            const distance = Math.sqrt(directionX * directionX + directionZ * directionZ);
            
            if (distance > 0.1) {
                // Apply movement with even slower speed (25% of original)
                npc.position.x += (directionX / distance) * npc.moveSpeed * deltaTime * 0.5; // Added 0.5 multiplier
                npc.position.z += (directionZ / distance) * npc.moveSpeed * deltaTime * 0.5; // Added 0.5 multiplier
                
                // Rotate to face movement direction
                npc.rotation.y = Math.atan2(directionX, directionZ);
                
                // Walking animation - FURTHER REDUCED ANIMATION SPEED
                npc.animationPhase += deltaTime * 5 * npc.moveSpeed * 5; // Reduced from 10 to 5
                
                // Arm swing animation with reduced amplitude
                if (npc.leftArm && npc.rightArm) {
                    npc.leftArm.rotation.x = Math.sin(npc.animationPhase) * 0.2; // Reduced from 0.3 to 0.2
                    npc.rightArm.rotation.x = Math.sin(npc.animationPhase + Math.PI) * 0.2;
                }
                
                // Subtle body bob with reduced amplitude
                if (npc.torso) {
                    npc.torso.position.y = Math.sin(npc.animationPhase * 2) * 0.015 + 0.5; // Reduced from 0.03 to 0.015
                }
            } else {
                // Reset arm positions when not moving
                if (npc.leftArm && npc.rightArm) {
                    npc.leftArm.rotation.x = 0;
                    npc.rightArm.rotation.x = 0;
                }
                
                // Reset body position
                if (npc.torso) {
                    npc.torso.position.y = 0.5;
                }
            }
        });
    },
    
    /**
     * Handle interaction with an NPC
     */
    handleNPCInteraction: function(npc) {
        // Get a random dialogue line for this NPC
        const dialogue = npc.dialogues[Math.floor(Math.random() * npc.dialogues.length)];
        
        // Show dialogue with enhanced styling
        this.showNPCDialogue(npc.name, dialogue);
        
        // Trigger dialogue event (for quests, etc.)
        Utils.events.emit('npcDialogue', npc.npcType, dialogue);
    },
    
    /**
     * Show dialogue in Enhanced Character style
     */
    showNPCDialogue: function(name, dialogue) {
        // Create stylized dialogue box
        const dialogueBox = document.createElement('div');
        dialogueBox.className = 'npc-dialogue';
        dialogueBox.innerHTML = `
            <div class="npc-dialogue-header">${name}</div>
            <div class="npc-dialogue-body">${dialogue}</div>
        `;
        
        // Add to DOM
        document.body.appendChild(dialogueBox);
        
        // Remove after timer
        setTimeout(() => {
            dialogueBox.classList.add('fadeout');
            setTimeout(() => {
                document.body.removeChild(dialogueBox);
            }, 1000);
        }, 5000);
    },
    
    /**
     * Play a random speech bubble sound effect
     */
    playRandomSpeechSound: function() {
        const sounds = [
            'speech_pop1.mp3',
            'speech_pop2.mp3',
            'speech_pop3.mp3'
        ];
        
        const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
        Utils.playSound(randomSound, 0.5);
    },
    
    /**
     * Get all NPCs for collision detection
     */
    getNPCs: function() {
        return this.characters;
    },
    
    /**
     * Utility function to draw a rounded rectangle on a canvas context
     */
    roundRect: function(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    },
    
    /**
     * Add floating name tag above head
     */
    addNameTag: function(npc) {
        // Create a canvas for the name tag
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Add background with rounded corners
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.beginPath();
        this.roundRect(ctx, 0, 0, canvas.width, canvas.height, 10);
        ctx.fill();
        
        // Add name text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(npc.name || 'NPC', canvas.width / 2, canvas.height / 2);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        
        // Create nametag material and geometry
        const nameMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            depthTest: false
        });
        const nameGeometry = new THREE.PlaneGeometry(1, 0.25);
        
        // Create name tag mesh
        const nameTag = new THREE.Mesh(nameGeometry, nameMaterial);
        nameTag.position.set(0, 2.3, 0);
        
        // Add floating animation
        nameTag.userData.floatPhase = Math.random() * Math.PI * 2;
        npc.nameTagPhase = 0;
        npc.nameTagBaseY = nameTag.position.y;
        
        npc.nameTag = nameTag;
        npc.add(nameTag);
        
        return nameTag;
    }
};

/**
 * Add NPC dialogue style CSS to the document
 */
function addNPCDialogueStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .npc-dialogue {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            border: 3px solid #14F195;
            border-radius: 10px;
            padding: 10px;
            color: white;
            width: 60%;
            max-width: 500px;
            z-index: 1000;
            animation: pop-in 0.3s ease-out forwards;
        }
        
        .npc-dialogue-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #9945FF;
        }
        
        .npc-dialogue-title {
            font-size: 24px;
            color: #14F195;
            margin: 0;
        }
        
        .npc-dialogue-close {
            cursor: pointer;
            font-size: 24px;
            color: #9945FF;
            background: none;
            border: none;
            padding: 0;
        }
        
        .npc-dialogue-body {
            font-size: 18px;
            text-align: center;
        }
        
        @keyframes pop-in {
            0% { transform: translate(-50%, -50%) scale(0); }
            80% { transform: translate(-50%, -50%) scale(1.1); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
        
        .fadeout {
            opacity: 0;
            transition: opacity 1s;
        }
    `;
    document.head.appendChild(style);
}

// Call this function when the game initializes
addNPCDialogueStyles();