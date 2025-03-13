/**
 * World management for Solana Ascension game - Futuristic Perfect World Edition (Expanded)
 */

const World = {
    // Three.js scene objects
    scene: null,
    renderer: null,
    camera: null,

    // Post-processing
    composer: null,
    bloomPass: null,

    // Lighting
    ambientLight: null,
    mainDirectionalLight: null,

    // Interactive objects
    interactiveObjects: [],

    // Store bounding boxes or colliders for world obstacles
    colliders: [],

    // NPCs
    npcs: [],

    // World transformation state (0-1)
    transformationState: 0,

    /**
     * Initialize the world
     */
    init: function (container) {
        // Create scene
        this.scene = new THREE.Scene();

        // --- Create renderer ---
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(this.renderer.domElement);

        // --- Create camera ---
        this.camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            4000  // Extended far plane to accommodate a bigger map
        );
        this.camera.position.set(0, 30, 90);

        // --- Set up lighting ---
        this.setupLighting();

        // --- Create environment & geometry ---
        this.createWorld();

        // --- Set up post-processing (Bloom, etc.) ---
        this.setupPostProcessing();

        // --- Handle window resizing ---
        window.addEventListener('resize', () => this.handleResize());

        // --- Transformation events ---
        Utils.events.on('ascension', () => {
            this.startTransformation();
        });
        for (let i = 1; i <= 5; i++) {
            const threshold = i * 0.2; // 0.2, 0.4, 0.6, 0.8, 1.0
            Utils.events.on(`transformationStage${i}`, () => {
                this.updateTransformation(threshold);
            });
        }
    },

    /**
     * Set up base lighting for a bright, futuristic scene
     */
    setupLighting: function () {
        // Large-scale ambient lighting
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(this.ambientLight);

        // Primary directional light (like a bright sun)
        this.mainDirectionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        this.mainDirectionalLight.position.set(100, 200, 100);
        this.mainDirectionalLight.castShadow = true;
        this.mainDirectionalLight.shadow.mapSize.width = 4096;
        this.mainDirectionalLight.shadow.mapSize.height = 4096;
        this.mainDirectionalLight.shadow.camera.near = 0.5;
        this.mainDirectionalLight.shadow.camera.far = 600;
        this.mainDirectionalLight.shadow.camera.left = -200;
        this.mainDirectionalLight.shadow.camera.right = 200;
        this.mainDirectionalLight.shadow.camera.top = 200;
        this.mainDirectionalLight.shadow.camera.bottom = -200;
        this.scene.add(this.mainDirectionalLight);

        // Subtle colored fill lights for extra atmosphere
        const fillLight1 = new THREE.PointLight(0x99ddff, 0.5, 300);
        fillLight1.position.set(-60, 60, 70);
        this.scene.add(fillLight1);

        const fillLight2 = new THREE.PointLight(0xffeecc, 0.4, 300);
        fillLight2.position.set(60, 40, -70);
        this.scene.add(fillLight2);
    },

    /**
     * Set up post-processing for bloom/glow
     */
    setupPostProcessing: function () {
        try {
            // Check if post-processing classes are available
            if (typeof THREE.EffectComposer === 'undefined' || 
                typeof THREE.RenderPass === 'undefined' || 
                typeof THREE.UnrealBloomPass === 'undefined') {
                console.warn('Required post-processing modules not found. Skipping post-processing setup.');
                return;
            }
            
            this.composer = new THREE.EffectComposer(this.renderer);

            // Basic pass that draws scene
            const renderPass = new THREE.RenderPass(this.scene, this.camera);
            this.composer.addPass(renderPass);

            // Bloom pass for a soft futuristic glow
            this.bloomPass = new THREE.UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                1.2, // strength
                0.4, // radius
                0.85 // threshold
            );
            this.composer.addPass(this.bloomPass);
            
            console.log('Post-processing setup complete');
        } catch (error) {
            console.error('Error setting up post-processing:', error);
            this.composer = null;
        }
    },

    /**
     * Creates the overall environment and places major objects
     */
    createWorld: function () {
        // 1. Sky or environment background
        this.createSkyDome();

        // 2. Futuristic ground plane with reflective or polished surface
        this.createGround();

        // 3. Road system or path lines
        this.createRoads();

        // 4. A central water body or floating water disk
        this.createCentralLake();

        // 5. Cluster of advanced, organically shaped buildings
        this.createFuturisticCity();

        // 6. Central Ascension monument
        this.createMonument();

        // 7. Decorative & interactive elements
        this.createDecorations();

        // 8. Create transparent boundaries
        this.createBoundaries();

        // 9. Additional interactive objects (minigames, quests, etc.)
        this.createInteractiveObjects();

        // 10. Create some NPCs
        this.createNPCs();
    },

    /**
     * Create a large sky dome or skybox with a bright, futuristic texture/gradient
     */
    createSkyDome: function () {
        const skyGeo = new THREE.SphereGeometry(2000, 64, 64);
        const skyMat = new THREE.MeshBasicMaterial({
            // Use a gradient or a seamless "futuristic sky" texture
            map: Assets.textures.futuristicSky || null,
            color: new THREE.Color(0xccffff),
            side: THREE.BackSide
        });
        const skyDome = new THREE.Mesh(skyGeo, skyMat);
        this.scene.add(skyDome);
    },

    /**
     * Create a large ground plane that subtly reflects, representing an ultra-polished surface
     */
    createGround: function () {
        const groundGeo = new THREE.PlaneGeometry(2000, 2000);
        const groundMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.2,
            metalness: 0.3,
            reflectivity: 0.4,
            // If you have a polished concrete texture or futuristic tile texture:
            map: Assets.textures.polishedTile || null
        });

        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Save as a collider for NPCs
        ground.userData.isCollider = true;
        ground.geometry.computeBoundingBox();
        ground.userData.boundingBox = ground.geometry.boundingBox.clone();
        ground.userData.boundingBox.translate(ground.position);
        this.colliders.push(ground);
    },

    /**
     * Create a simple road system or path lines
     */
    createRoads: function () {
        // Example: create cross-like roads or radial roads
        // In a real scenario, you'd place detailed road geometry or use textures
        const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
        
        function createRoad(width, length, x, z, rotation) {
            const roadGeo = new THREE.PlaneGeometry(length, width);
            const road = new THREE.Mesh(roadGeo, roadMaterial);
            road.rotation.x = -Math.PI / 2;
            road.rotation.z = rotation;
            road.position.set(x, 0.01, z); // slightly above ground
            road.receiveShadow = false;
            World.scene.add(road);
        }

        // Create a few radial roads from the center
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 * i) / 6;
            createRoad(20, 600, 0, 0, angle);
        }

        // Create a circular "ring road" around the center
        // (For a truly curved road, you'd need a custom geometry or lines)
        // We'll skip a 3D ring for brevity, but you can add one similarly.
    },

    /**
     * Create a central reflective lake or water platform to add serenity
     */
    createCentralLake: function () {
        // Circle geometry for water
        const waterGeo = new THREE.CircleGeometry(30, 64);
        const waterMat = new THREE.MeshPhysicalMaterial({
            color: 0x88ccff,
            metalness: 0.2,
            roughness: 0.05,
            transmission: 0.5, // partially transparent
            transparent: true,
            reflectivity: 0.7,
            opacity: 0.9
        });
        const water = new THREE.Mesh(waterGeo, waterMat);
        water.rotation.x = -Math.PI / 2;
        water.position.set(0, 0.02, 0);
        water.receiveShadow = true;

        this.scene.add(water);
    },

    /**
     * Create a futuristic city with towering arcs, spires, and glowing edges
     */
    createFuturisticCity: function () {
        // Extend city radius for a larger map
        const cityRadius = 300;
        // Increase building groups
        const buildingGroups = 6; // e.g., 6 clusters around the center

        for (let i = 0; i < buildingGroups; i++) {
            const angle = (2 * Math.PI * i) / buildingGroups;
            const clusterX = Math.cos(angle) * cityRadius;
            const clusterZ = Math.sin(angle) * cityRadius;

            // Create a cluster of buildings
            this.createBuildingCluster(clusterX, clusterZ, 10);
        }
    },

    /**
     * Create multiple buildings in a local cluster
     */
    createBuildingCluster: function (centerX, centerZ, buildingCount) {
        for (let i = 0; i < buildingCount; i++) {
            const offsetX = Utils.randomFloat(-25, 25);
            const offsetZ = Utils.randomFloat(-25, 25);

            // Each building is placed around the cluster center
            const x = centerX + offsetX;
            const z = centerZ + offsetZ;
            const scale = Utils.randomFloat(1, 3);

            // Randomly choose to create spire, arc, or tower
            const type = Utils.randomInt(0, 2);
            if (type === 0) {
                this.createSpireBuilding(x, z, scale);
            } else if (type === 1) {
                this.createArcBuilding(x, z, scale);
            } else {
                this.createTowerBuilding(x, z, scale);
            }
        }
    },

    /**
     * Utility to get a random color from a pastel/futuristic palette
     */
    getRandomFuturisticColor: function () {
        // Simple pastel color approach: random hue in 0.4–0.6 range
        const hue = 0.4 + Math.random() * 0.2;
        const saturation = 0.5 + Math.random() * 0.5;
        const lightness = 0.5 + Math.random() * 0.4;
        return new THREE.Color().setHSL(hue, saturation, lightness);
    },

    /**
     * Create a sleek spire building
     */
    createSpireBuilding: function (x, z, scale) {
        const height = Utils.randomInt(50, 100) * scale;
        const radiusTop = Utils.randomFloat(0.5, 2);
        const radiusBottom = Utils.randomFloat(3, 6);

        const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 24);

        const material = new THREE.MeshPhongMaterial({
            color: this.getRandomFuturisticColor(),
            emissive: 0x88ccff,
            emissiveIntensity: 0.05,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });

        const spire = new THREE.Mesh(geometry, material);
        spire.position.set(x, height / 2, z);
        spire.castShadow = true;
        spire.receiveShadow = true;
        this.scene.add(spire);

        // Compute bounding box for collision checks
        spire.geometry.computeBoundingBox();
        const bb = spire.geometry.boundingBox.clone();
        bb.translate(spire.position);
        spire.userData.boundingBox = bb;
        spire.userData.isCollider = true;
        this.colliders.push(spire);
    },

    /**
     * Create a large arc building, like a futuristic gateway
     */
    createArcBuilding: function (x, z, scale) {
        // Use a torus geometry as a base for the arch, scaled vertically
        const radius = Utils.randomFloat(5, 12) * scale;
        const tube = Utils.randomFloat(0.6, 1);
        const arcGeo = new THREE.TorusGeometry(radius, tube, 16, 50, Math.PI);
        const arcMat = new THREE.MeshPhysicalMaterial({
            color: this.getRandomFuturisticColor(),
            emissive: 0xccffff,
            emissiveIntensity: 0.05,
            roughness: 0.2,
            metalness: 0.5,
            transparent: true,
            opacity: 0.95
        });

        const arc = new THREE.Mesh(arcGeo, arcMat);

        // Rotate upright
        arc.rotation.x = Math.PI / 2;
        arc.position.set(x, radius / 2, z);
        arc.castShadow = true;
        arc.receiveShadow = true;
        this.scene.add(arc);

        // Bounding box
        arc.geometry.computeBoundingBox();
        const bb = arc.geometry.boundingBox.clone();
        bb.translate(arc.position);
        arc.userData.boundingBox = bb;
        arc.userData.isCollider = true;
        this.colliders.push(arc);
    },

    /**
     * Create a tall tower building with distinct top shapes
     */
    createTowerBuilding: function (x, z, scale) {
        const width = Utils.randomInt(4, 10) * scale;
        const depth = Utils.randomInt(4, 10) * scale;
        const height = Utils.randomInt(50, 120) * scale;

        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshPhongMaterial({
            color: this.getRandomFuturisticColor(),
            emissive: 0x99ccff,
            emissiveIntensity: 0.04,
            shininess: 80
        });

        const tower = new THREE.Mesh(geometry, material);
        tower.position.set(x, height / 2, z);
        tower.castShadow = true;
        tower.receiveShadow = true;

        // Optionally add a glowing "crown" at the top
        const crownGeo = new THREE.ConeGeometry(width * 0.6, width, 16);
        const crownMat = new THREE.MeshPhongMaterial({
            color: 0x99ccff,
            emissive: 0x99ccff,
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: 0.8
        });
        const crown = new THREE.Mesh(crownGeo, crownMat);
        crown.position.set(0, height / 2, 0);
        tower.add(crown);

        this.scene.add(tower);

        // Compute bounding box for collision checks
        tower.geometry.computeBoundingBox();
        const bb = tower.geometry.boundingBox.clone();
        bb.translate(tower.position);
        tower.userData.boundingBox = bb;
        tower.userData.isCollider = true;
        this.colliders.push(tower);
    },

    /**
     * Create the central Ascension Monument with a more complex look
     */
    createMonument: function () {
        // Monument base
        const baseGeo = new THREE.CylinderGeometry(10, 12, 2.5, 32);
        const baseMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            emissive: 0x88eeff,
            emissiveIntensity: 0.1,
            metalness: 0.3,
            roughness: 0.2
        });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.set(0, 1.25, 0);
        base.receiveShadow = true;
        this.scene.add(base);

        // Pillar with swirling geometry (e.g. twist or helix).
        // Here, we’ll just do a tall cylinder for simplicity
        const pillarGeo = new THREE.CylinderGeometry(1.5, 1.5, 14, 64);
        const pillarMat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            emissive: 0x88ddff,
            emissiveIntensity: 0.15,
            shininess: 120,
            transparent: true,
            opacity: 0.95
        });
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        pillar.position.set(0, 8, 0);
        pillar.castShadow = true;
        this.scene.add(pillar);

        // Floating crystal orb
        const crystalGeo = new THREE.IcosahedronGeometry(2, 1);
        const crystalMat = new THREE.MeshPhongMaterial({
            color: 0xffccff,
            emissive: 0xff99ff,
            emissiveIntensity: 0.4,
            shininess: 200,
            transparent: true,
            opacity: 0.85
        });
        const crystal = new THREE.Mesh(crystalGeo, crystalMat);
        crystal.position.set(0, 15, 0);
        crystal.castShadow = true;

        crystal.userData = {
            originalY: 15,
            rotationSpeed: 0.01
        };

        this.scene.add(crystal);

        // Internal light for the crystal
        const crystalLight = new THREE.PointLight(0xff99ff, 1.2, 20);
        crystalLight.position.set(0, 0, 0);
        crystal.add(crystalLight);

        // Combine references
        this.monument = {
            base,
            pillar,
            crystal,
            light: crystalLight
        };

        // Make crystal interactive (if you have interactions)
        crystal.isInteractive = true;
        crystal.name = "Ascension Monument";
        this.interactiveObjects.push(crystal);

        // Colliders
        base.geometry.computeBoundingBox();
        const baseBB = base.geometry.boundingBox.clone();
        baseBB.translate(base.position);
        base.userData.boundingBox = baseBB;
        base.userData.isCollider = true;
        this.colliders.push(base);

        pillar.geometry.computeBoundingBox();
        const pillarBB = pillar.geometry.boundingBox.clone();
        pillarBB.translate(pillar.position);
        pillar.userData.boundingBox = pillarBB;
        pillar.userData.isCollider = true;
        this.colliders.push(pillar);
    },

    /**
     * Create extra decorative elements:
     * - Floating platforms
     * - Holographic billboards
     * - Flying vehicles (optional)
     */
    createDecorations: function () {
        // 1. Floating platforms around the monument
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5;
            const radius = 40;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            this.createFloatingPlatform(x, 4, z);
        }

        // 2. A few holographic billboards in the city
        for (let i = 0; i < 8; i++) {
            const x = Utils.randomFloat(-150, 150);
            const z = Utils.randomFloat(-150, 150);
            // Keep them away from center
            if (Math.hypot(x, z) > 35) {
                this.createHolographicBillboard(x, z);
            }
        }

        // 3. Optionally place some small flying vehicles or drones
        for (let i = 0; i < 5; i++) {
            this.createFlyingDrone();
        }

        // 4. Collectible digital fragments
        for (let i = 0; i < 10; i++) {
            const x = Utils.randomFloat(-120, 120);
            const z = Utils.randomFloat(-120, 120);
            this.createDigitalFragment(x, 2, z);
        }
    },

    /**
     * Create a floating platform (like a garden or observation deck)
     */
    createFloatingPlatform: function (x, y, z) {
        const platformGeo = new THREE.CylinderGeometry(6, 6, 0.5, 16);
        const platformMat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            emissive: 0x88eecc,
            emissiveIntensity: 0.05,
            shininess: 60,
            transparent: true,
            opacity: 0.9
        });
        const platform = new THREE.Mesh(platformGeo, platformMat);
        platform.position.set(x, y, z);
        platform.castShadow = true;
        platform.receiveShadow = true;
        this.scene.add(platform);

        // Add a small garden or decorative top
        const gardenGeo = new THREE.CircleGeometry(5.5, 16);
        const gardenMat = new THREE.MeshStandardMaterial({
            color: 0x44ff88,
            roughness: 0.7
        });
        const garden = new THREE.Mesh(gardenGeo, gardenMat);
        garden.rotation.x = -Math.PI / 2;
        garden.position.y = 0.26;
        platform.add(garden);

        // Store bobbing animation data
        platform.userData = {
            originalY: y,
            bobAmplitude: 0.3,
            bobSpeed: 0.001 + Math.random() * 0.002
        };

        // Colliders
        platform.geometry.computeBoundingBox();
        const bb = platform.geometry.boundingBox.clone();
        bb.translate(platform.position);
        platform.userData.boundingBox = bb;
        platform.userData.isCollider = true;
        this.colliders.push(platform);
    },

    /**
     * Create a holographic billboard
     */
    createHolographicBillboard: function (x, z) {
        // A simple plane with a glowing, transparent material
        const billboardGeo = new THREE.PlaneGeometry(7, 4);
        const billboardMat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            emissive: 0x66ccff,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
            // Optionally add a "futuristic ad" texture
            // map: Assets.textures.futuristicAd
        });

        const billboard = new THREE.Mesh(billboardGeo, billboardMat);
        billboard.position.set(x, 6, z);
        billboard.rotation.y = Math.random() * Math.PI * 2;
        billboard.castShadow = true;

        this.scene.add(billboard);

        // Colliders
        billboard.geometry.computeBoundingBox();
        const bb = billboard.geometry.boundingBox.clone();
        bb.translate(billboard.position);
        billboard.userData.boundingBox = bb;
        billboard.userData.isCollider = true;
        this.colliders.push(billboard);
    },

    /**
     * Create a small flying drone that floats around the city
     */
    createFlyingDrone: function () {
        // Place it randomly above the ground
        const x = Utils.randomFloat(-150, 150);
        const y = Utils.randomFloat(10, 30);
        const z = Utils.randomFloat(-150, 150);

        // A small spherical core
        const droneCoreGeo = new THREE.SphereGeometry(1, 16, 16);
        const droneCoreMat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            emissive: 0x99eeff,
            emissiveIntensity: 0.2,
            shininess: 100
        });
        const droneCore = new THREE.Mesh(droneCoreGeo, droneCoreMat);
        droneCore.position.set(x, y, z);
        droneCore.castShadow = true;
        droneCore.receiveShadow = true;

        // Optional: add thrusters or wings
        const thrusterGeo = new THREE.CylinderGeometry(0.2, 0.5, 1, 8);
        const thrusterMat = new THREE.MeshPhongMaterial({
            color: 0xcccccc,
            emissive: 0x666666,
            emissiveIntensity: 0.05
        });
        const thruster = new THREE.Mesh(thrusterGeo, thrusterMat);
        thruster.rotation.x = Math.PI / 2;
        thruster.position.y = -1;
        droneCore.add(thruster);

        // Animate the drone to move in a circle or figure-8 pattern
        droneCore.userData = {
            centerX: x,
            centerY: y,
            centerZ: z,
            radius: Utils.randomFloat(10, 30),
            angle: 0,
            speed: 0.001 + Math.random() * 0.002
        };

        this.scene.add(droneCore);
    },

    /**
     * Create a collectible digital fragment with a shimmering effect
     */
    createDigitalFragment: function (x, y, z) {
        const fragmentGeo = new THREE.TetrahedronGeometry(0.7, 0);
        const fragmentMat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: 0.85
        });

        const fragment = new THREE.Mesh(fragmentGeo, fragmentMat);
        fragment.position.set(x, y, z);

        fragment.userData = {
            originalY: y,
            rotationSpeed: 0.03
        };

        fragment.isCollectible = true;
        fragment.name = "Digital Fragment";
        fragment.itemType = "digitalFragment";

        this.scene.add(fragment);
        this.interactiveObjects.push(fragment);

        // No collider for small collectible items (optional)
    },

    /**
     * Create transparent or gently glowing boundaries around the playable area
     */
    createBoundaries: function () {
        const boundarySize = 800;
        const boundaryHeight = 20;
        const boundaryThickness = 2;

        const boundaryMat = new THREE.MeshPhongMaterial({
            color: 0xccffff,
            emissive: 0xccffff,
            emissiveIntensity: 0.1,
            transparent: true,
            opacity: 0.15
        });

        const geometryX = new THREE.BoxGeometry(
            boundaryThickness,
            boundaryHeight,
            boundarySize * 2
        );
        const geometryZ = new THREE.BoxGeometry(
            boundarySize * 2,
            boundaryHeight,
            boundaryThickness
        );

        const north = new THREE.Mesh(geometryZ, boundaryMat);
        north.position.set(0, boundaryHeight / 2, -boundarySize);
        this.scene.add(north);

        const south = new THREE.Mesh(geometryZ, boundaryMat);
        south.position.set(0, boundaryHeight / 2, boundarySize);
        this.scene.add(south);

        const east = new THREE.Mesh(geometryX, boundaryMat);
        east.position.set(boundarySize, boundaryHeight / 2, 0);
        this.scene.add(east);

        const west = new THREE.Mesh(geometryX, boundaryMat);
        west.position.set(-boundarySize, boundaryHeight / 2, 0);
        this.scene.add(west);

        // Colliders
        [north, south, east, west].forEach((wall) => {
            wall.geometry.computeBoundingBox();
            const bb = wall.geometry.boundingBox.clone();
            bb.translate(wall.position);
            wall.userData.boundingBox = bb;
            wall.userData.isCollider = true;
            this.colliders.push(wall);
        });
    },

    /**
     * Create interactive objects (mini-games, quest buildings, etc.)
     */
    createInteractiveObjects: function () {
        // If a MiniGames module is available
        if (typeof MiniGames !== 'undefined') {
            const miniGameObj = MiniGames.createMiniGameObject(
                this.scene,
                'cryptoMining',
                new THREE.Vector3(-30, 1, 30),
                2
            );
            this.interactiveObjects.push(miniGameObj);
        }

        // Create a shining "Innovation Center" or quest hub
        const innovationCenter = this.createInnovationCenter(120, 120);
        this.interactiveObjects.push(innovationCenter);
    },

    /**
     * Create a special building for quests (Innovation Center)
     */
    createInnovationCenter: function (x, z) {
        const geo = new THREE.CylinderGeometry(6, 10, 20, 32);
        const mat = new THREE.MeshPhysicalMaterial({
            color: 0xe0ffff,
            emissive: 0xaaffff,
            emissiveIntensity: 0.1,
            metalness: 0.3,
            roughness: 0.2,
            transparent: true,
            opacity: 0.9
        });

        const center = new THREE.Mesh(geo, mat);
        center.position.set(x, 10, z);
        center.castShadow = true;
        center.receiveShadow = true;
        center.isInteractive = true;
        center.name = "Innovation Center";
        this.scene.add(center);

        // Add a radiant point light near the top
        const topLight = new THREE.PointLight(0xaaffff, 1.5, 30);
        topLight.position.set(x, 25, z);
        this.scene.add(topLight);

        // Colliders
        center.geometry.computeBoundingBox();
        const bb = center.geometry.boundingBox.clone();
        bb.translate(center.position);
        center.userData.boundingBox = bb;
        center.userData.isCollider = true;
        this.colliders.push(center);

        return center;
    },

    /**
     * Create some NPCs that walk around (avoiding obstacles)
     */
    createNPCs: function () {
        // Example: 5 NPCs
        for (let i = 0; i < 5; i++) {
            const x = Utils.randomFloat(-100, 100);
            const z = Utils.randomFloat(-100, 100);
            if (Math.hypot(x, z) < 20) {
                // Keep them out of the center lake/monument area
                continue;
            }
            this.createNPC(x, z);
        }
    },

    /**
     * Create a single NPC with a simple bounding box and random movement
     */
    createNPC: function (x, z) {
        // Use a small cylinder or box to represent an NPC
        const npcGeo = new THREE.CylinderGeometry(1, 1, 2, 12);
        const npcMat = new THREE.MeshStandardMaterial({
            color: 0xffaaaa, // slight pastel red to contrast environment
            roughness: 0.6,
            metalness: 0.1
        });
        const npc = new THREE.Mesh(npcGeo, npcMat);
        npc.position.set(x, 1, z);
        npc.castShadow = true;
        npc.receiveShadow = true;
        this.scene.add(npc);

        // Simple random movement data
        npc.userData = {
            speed: 0.02,
            direction: new THREE.Vector3(
                Utils.randomFloat(-1, 1),
                0,
                Utils.randomFloat(-1, 1)
            ).normalize()
        };

        // Store bounding box for collision
        npc.geometry.computeBoundingBox();
        npc.userData.baseBoundingBox = npc.geometry.boundingBox.clone();

        this.npcs.push(npc);
    },

    /**
     * Handle window resizing
     */
    handleResize: function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        if (this.composer) {
            this.composer.setSize(window.innerWidth, window.innerHeight);
        }
    },

    /**
     * Update world objects, animations, NPCs, and post-processing each frame
     */
    update: function (deltaTime) {
        // Update monument crystal float & rotation
        if (this.monument && this.monument.crystal) {
            const crystal = this.monument.crystal;
            crystal.position.y = crystal.userData.originalY +
                Math.sin(performance.now() * 0.001) * 0.5;
            crystal.rotation.y += crystal.userData.rotationSpeed;
            crystal.rotation.x += crystal.userData.rotationSpeed * 0.5;

            // Adjust light intensity with transformation state
            const pulse = 0.8 + Math.sin(performance.now() * 0.002) * 0.2;
            this.monument.light.intensity = pulse * (1 + this.transformationState);
        }

        // Update floating objects (platforms, drones, fragments, etc.)
        // and bounding boxes for buildings or obstacles
        this.scene.traverse((obj) => {
            // Floating platform bobbing
            if (obj.userData && obj.userData.bobAmplitude) {
                obj.position.y =
                    obj.userData.originalY +
                    Math.sin(performance.now() * obj.userData.bobSpeed) *
                        obj.userData.bobAmplitude;
            }
            // Digital fragments rotation
            if (obj.isCollectible) {
                obj.position.y =
                    obj.userData.originalY +
                    Math.sin(performance.now() * 0.001) * 0.2;
                obj.rotation.y += obj.userData.rotationSpeed;
                obj.rotation.x += obj.userData.rotationSpeed * 0.3;
            }
            // Drones flying in a circle
            if (obj.userData && obj.userData.centerX !== undefined) {
                obj.userData.angle += obj.userData.speed;
                const r = obj.userData.radius;
                obj.position.x = obj.userData.centerX + r * Math.cos(obj.userData.angle);
                obj.position.z = obj.userData.centerZ + r * Math.sin(obj.userData.angle);
            }

            // Update bounding boxes for static objects that might have moved
            if (obj.userData && obj.userData.isCollider && obj.geometry) {
                if (obj.userData.boundingBox) {
                    const boundingBox = obj.userData.boundingBox;
                    boundingBox.copy(obj.geometry.boundingBox).translate(obj.position);
                }
            }
        });

        // NPC movement and collision checks
        this.updateNPCs();

        // Render with post-processing if available, otherwise use standard renderer
        if (this.composer) {
            try {
                this.composer.render();
            } catch (error) {
                console.error('Error rendering with composer:', error);
                this.composer = null; // Disable composer after error
                this.renderer.render(this.scene, this.camera);
            }
        } else {
            this.renderer.render(this.scene, this.camera);
        }
    },

    /**
     * Very simple NPC movement & collision detection
     */
    updateNPCs: function () {
        this.npcs.forEach((npc) => {
            // Move NPC forward in current direction
            const delta = npc.userData.speed;
            const dir = npc.userData.direction.clone();
            npc.position.add(dir.multiplyScalar(delta));

            // Update bounding box
            const baseBB = npc.userData.baseBoundingBox.clone();
            baseBB.translate(npc.position);

            // Check collisions with colliders
            let collided = false;
            for (const collider of this.colliders) {
                if (!collider.userData || !collider.userData.boundingBox) continue;
                if (baseBB.intersectsBox(collider.userData.boundingBox)) {
                    collided = true;
                    break;
                }
            }

            // If collided, step back and choose a new random direction
            if (collided) {
                npc.position.sub(dir.multiplyScalar(delta)); // revert move
                npc.userData.direction = new THREE.Vector3(
                    Utils.randomFloat(-1, 1),
                    0,
                    Utils.randomFloat(-1, 1)
                ).normalize();
            }
        });
    },

    /**
     * Start the staged world transformation
     */
    startTransformation: function () {
        // Trigger each stage after a certain delay
        setTimeout(() => Utils.events.emit('transformationStage1'), 2000);
        setTimeout(() => Utils.events.emit('transformationStage2'), 5000);
        setTimeout(() => Utils.events.emit('transformationStage3'), 8000);
        setTimeout(() => Utils.events.emit('transformationStage4'), 11000);
        setTimeout(() => Utils.events.emit('transformationStage5'), 14000);
    },

    /**
     * Update world appearance based on transformation stage
     */
    updateTransformation: function (stage) {
        this.transformationState = stage;

        // Sky color shift: from a light aqua to an even more vibrant, glowing sky
        const newSkyColor = new THREE.Color().setHSL(
            0.5 - stage * 0.1,
            0.7 + stage * 0.3,
            0.6 + stage * 0.3
        );
        this.scene.background = newSkyColor;

        // Ambient light intensifies
        this.ambientLight.intensity = 0.3 + 0.7 * stage;

        // Directional light color shift
        const newSunColor = new THREE.Color().setHSL(
            0.13 + stage * 0.1,
            0.9,
            0.5 + stage * 0.3
        );
        this.mainDirectionalLight.color = newSunColor;

        // Adjust bloom strength dynamically for a more "glorious" glow
        if (this.bloomPass) {
            this.bloomPass.strength = 1.2 + 0.8 * stage;
        }

        // Monument crystal becomes larger/more emissive
        if (this.monument) {
            const m = this.monument;
            m.crystal.material.emissiveIntensity = 0.4 + stage * 1.5;
            m.crystal.scale.set(1 + stage, 1 + stage, 1 + stage);

            // Shift crystal color from pinkish to bright electric cyan
            const crystalColor = new THREE.Color().setHSL(
                0.8 - stage * 0.3,
                1,
                0.5 + 0.4 * stage
            );
            m.crystal.material.color = crystalColor;
            m.crystal.material.emissive = crystalColor;
            m.light.color = crystalColor;
        }

        // Optional: show notifications or UI updates
        const messages = [
            "A subtle shimmer fills the air, heralding a grand transformation...",
            "Structures and nature harmonize; the city pulses with new energy.",
            "A radiant glow envelops every surface. Technology merges with life.",
            "Consciousness expands throughout the network, uniting all minds.",
            "Perfect equilibrium achieved! A sublime, futuristic utopia emerges."
        ];
        const index = Math.floor(stage * 5) - 1;
        if (index >= 0 && index < messages.length) {
            Utils.showNotification(
                `Transformation Stage ${Math.round(stage * 5)}`,
                messages[index],
                5000
            );
        }
    },

    /**
     * Final transformation call
     */
    transform: function () {
        this.updateTransformation(1.0);
    },

    /**
     * Get all interactive objects for collision detection
     */
    getInteractiveObjects: function () {
        return this.interactiveObjects;
    }
};
