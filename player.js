/**
 * Player character and controls for Solana Ascension game
 * Features a high-detail curvaceous female frog character
 */

const Player = {
    // Three.js objects
    model: null,
    camera: null,
    cameraOffset: new THREE.Vector3(0, 1.7, -5), // Changed from positive 5 to negative 5
    cameraTarget: new THREE.Vector3(),
    
    // Character mesh components
    bodyParts: {},
    
    // Movement properties
    position: new THREE.Vector3(0, 0, 0),
    velocity: new THREE.Vector3(0, 0, 0),
    moveDirection: new THREE.Vector3(),
    rotation: 0,
    moveSpeed: 0.07, 
    sprintMultiplier: 2.16,
    isSprinting: false,
    rotationSpeed: 0.03,
    isJumping: false,
    jumpForce: 0.3,
    gravity: 0.01,
    friction: 0.9,
    
    // Animation properties
    walkCycle: 0,
    
    // Camera properties
    mouseSensitivity: {
        horizontal: 0.002,
        vertical: 0.0005
    },
    cameraRotation: {
        horizontal: 0, // Changed from Math.PI - start facing away from camera
        vertical: 0
    },
    verticalAngleLimit: Math.PI / 4,
    
    // Free look mode
    isFreeLookActive: false,
    savedCameraRotation: {
        horizontal: 0,
        vertical: 0
    },
    
    // Control states
    keys: {
        forward: false,
        backward: false,
        left: false,
        right: false,
        jump: false,
        interact: false,
        map: false,
        sprint: false,
        pause: false
    },
    
    // Mouse control
    isMouseLocked: false,
    
    // Player states
    isInteracting: false,
    currentInteraction: null,
    
    /**
     * Initialize the player with enhanced model
     */
    init: function(scene, camera) {
        this.camera = camera;
        
        // Create main group for the character
        this.model = new THREE.Group();
        this.bodyParts = {};
        
        // Materials with enhanced properties
        const skinMaterial = new THREE.MeshPhongMaterial({
            color: 0x4ADB50, // Bright green
            specular: 0x99FF99, // Light green highlights
            shininess: 30,
            emissive: 0x003300, // Very subtle glow
            emissiveIntensity: 0.1
        });
        
        const darkSkinMaterial = new THREE.MeshPhongMaterial({
            color: 0x35A63A, // Darker green
            specular: 0x77DD77, // Green highlights
            shininess: 40
        });
        
        const lipsMaterial = new THREE.MeshPhongMaterial({
            color: 0xBB7722, // Brown
            specular: 0xFFAA55, // Orange-ish highlights
            shininess: 60
        });
        
        const eyeMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xFFFFFF,
            specular: 0xFFFFFF,
            shininess: 100
        });
        
        const pupilMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x000000,
            specular: 0x333333,
            shininess: 100
        });
        
        const nippleMaterial = new THREE.MeshPhongMaterial({
            color: 0x994444, // Pinkish-brown
            specular: 0xBB6666,
            shininess: 50
        });
        
        // Create highly detailed feminine frog model
        this.createDetailedFrogModel(skinMaterial, darkSkinMaterial, lipsMaterial, eyeMaterial, pupilMaterial, nippleMaterial);
        
        // Set initial position - directly on ground
        this.model.position.set(0, 0, 0); // No hover
        scene.add(this.model);
        
        // Set initial rotation to face away from the camera (change Math.PI to 0)
        this.model.rotation.y = 0;
        this.rotation = 0;
        
        // Add a point light attached to the player
        const playerLight = new THREE.PointLight(0x14F195, 0.7, 10);
        playerLight.position.set(0, 1.5, 0);
        this.model.add(playerLight);
        
        // Position camera behind player
        this.updateCamera();
        
        // Set up controls
        this.setupControls();
    },
    
    /**
     * Create detailed frog model with feminine characteristics
     */
    createDetailedFrogModel: function(skinMaterial, darkSkinMaterial, lipsMaterial, eyeMaterial, pupilMaterial, nippleMaterial) {
        // ---- TORSO SECTION ----
        // Waist (narrowed middle)
        const waistGeometry = new THREE.SphereGeometry(0.22, 32, 24); // Smaller waist
        waistGeometry.scale(1, 1.1, 0.65); // More narrowed
        this.bodyParts.waist = new THREE.Mesh(waistGeometry, skinMaterial);
        this.bodyParts.waist.position.set(0, 1.2, 0);
        this.model.add(this.bodyParts.waist);
        
        // Torso connection (upper-mid torso)
        const torsoConnectGeometry = new THREE.SphereGeometry(0.25, 32, 24); // Smaller torso
        torsoConnectGeometry.scale(1.05, 0.4, 0.7); // More narrowed
        this.bodyParts.torsoConnect = new THREE.Mesh(torsoConnectGeometry, skinMaterial);
        this.bodyParts.torsoConnect.position.set(0, 1.45, 0);
        this.model.add(this.bodyParts.torsoConnect);
        
        // ---- CHEST SECTION ----
        // Base chest (smaller)
        const chestGeometry = new THREE.SphereGeometry(0.28, 32, 24);
        chestGeometry.scale(0.85, 0.6, 0.75); // Reduced size
        this.bodyParts.chest = new THREE.Mesh(chestGeometry, skinMaterial);
        this.bodyParts.chest.position.set(0, 1.6, 0);
        this.model.add(this.bodyParts.chest);
        
        // Left breast (larger)
        const leftBreastGeometry = new THREE.SphereGeometry(0.2, 24, 24);
        this.bodyParts.leftBreast = new THREE.Mesh(leftBreastGeometry, skinMaterial);
        this.bodyParts.leftBreast.position.set(0.15, 1.62, 0.15);
        this.model.add(this.bodyParts.leftBreast);
        
        // Left nipple
        const leftNippleGeometry = new THREE.SphereGeometry(0.03, 16, 16);
        this.bodyParts.leftNipple = new THREE.Mesh(leftNippleGeometry, nippleMaterial);
        this.bodyParts.leftNipple.position.set(0.15, 1.62, 0.32);
        this.model.add(this.bodyParts.leftNipple);
        
        // Right breast (larger)
        const rightBreastGeometry = new THREE.SphereGeometry(0.2, 24, 24);
        this.bodyParts.rightBreast = new THREE.Mesh(rightBreastGeometry, skinMaterial);
        this.bodyParts.rightBreast.position.set(-0.15, 1.62, 0.15);
        this.model.add(this.bodyParts.rightBreast);
        
        // Right nipple
        const rightNippleGeometry = new THREE.SphereGeometry(0.03, 16, 16);
        this.bodyParts.rightNipple = new THREE.Mesh(rightNippleGeometry, nippleMaterial);
        this.bodyParts.rightNipple.position.set(-0.15, 1.62, 0.32);
        this.model.add(this.bodyParts.rightNipple);
        
        // ---- HIPS SECTION ----
        // Upper hips connection
        const hipConnectGeometry = new THREE.SphereGeometry(0.3, 32, 24);
        hipConnectGeometry.scale(1.05, 0.5, 0.9);
        this.bodyParts.hipConnect = new THREE.Mesh(hipConnectGeometry, skinMaterial);
        this.bodyParts.hipConnect.position.set(0, 0.95, 0);
        this.model.add(this.bodyParts.hipConnect);
        
        // Lower hips sphere (smaller)
        const hipsGeometry = new THREE.SphereGeometry(0.3, 32, 24); // Reduced from 0.4
        hipsGeometry.scale(1.1, 0.8, 1.0);
        this.bodyParts.hips = new THREE.Mesh(hipsGeometry, skinMaterial);
        this.bodyParts.hips.position.set(0, 0.75, -0.05);
        this.model.add(this.bodyParts.hips);
        
        // Left butt cheek
        const leftButtGeometry = new THREE.SphereGeometry(0.25, 32, 24);
        leftButtGeometry.scale(0.7, 0.9, 0.9);
        this.bodyParts.leftButt = new THREE.Mesh(leftButtGeometry, skinMaterial);
        this.bodyParts.leftButt.position.set(0.15, 0.7, -0.25); // Moved closer to center
        this.model.add(this.bodyParts.leftButt);
        
        // Right butt cheek
        const rightButtGeometry = new THREE.SphereGeometry(0.25, 32, 24);
        rightButtGeometry.scale(0.7, 0.9, 0.9);
        this.bodyParts.rightButt = new THREE.Mesh(rightButtGeometry, skinMaterial);
        this.bodyParts.rightButt.position.set(-0.15, 0.7, -0.25); // Moved closer to center
        this.model.add(this.bodyParts.rightButt);
        
        // Butt crease (dark indent between cheeks)
        const crackGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.15);
        this.bodyParts.crack = new THREE.Mesh(crackGeometry, darkSkinMaterial);
        this.bodyParts.crack.position.set(0, 0.7, -0.32);
        this.model.add(this.bodyParts.crack);
        
        // ---- HEAD SECTION ----
        // Neck
        const neckGeometry = new THREE.CylinderGeometry(0.12, 0.15, 0.12, 16);
        this.bodyParts.neck = new THREE.Mesh(neckGeometry, darkSkinMaterial);
        this.bodyParts.neck.position.set(0, 1.8, 0);
        this.model.add(this.bodyParts.neck);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.25, 32, 24);
        headGeometry.scale(1.0, 0.95, 0.9);
        this.bodyParts.head = new THREE.Mesh(headGeometry, darkSkinMaterial);
        this.bodyParts.head.position.set(0, 1.95, 0);
        this.model.add(this.bodyParts.head);
        
        // Face details (slightly protruding snout)
        const snoutGeometry = new THREE.SphereGeometry(0.15, 32, 16);
        snoutGeometry.scale(0.8, 0.6, 0.8);
        this.bodyParts.snout = new THREE.Mesh(snoutGeometry, darkSkinMaterial);
        this.bodyParts.snout.position.set(0, 1.9, 0.2);
        this.model.add(this.bodyParts.snout);
        
        // Eyes
        const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        
        // Left eye
        this.bodyParts.leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        this.bodyParts.leftEye.position.set(0.09, 1.98, 0.22);
        this.bodyParts.leftEye.scale.set(1, 0.8, 0.6);
        this.model.add(this.bodyParts.leftEye);
        
        // Right eye
        this.bodyParts.rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        this.bodyParts.rightEye.position.set(-0.09, 1.98, 0.22);
        this.bodyParts.rightEye.scale.set(1, 0.8, 0.6);
        this.model.add(this.bodyParts.rightEye);
        
        // Eye pupils
        const pupilGeometry = new THREE.SphereGeometry(0.025, 16, 12);
        
        // Left pupil
        this.bodyParts.leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        this.bodyParts.leftPupil.position.set(0.09, 1.98, 0.25);
        this.model.add(this.bodyParts.leftPupil);
        
        // Right pupil
        this.bodyParts.rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        this.bodyParts.rightPupil.position.set(-0.09, 1.98, 0.25);
        this.model.add(this.bodyParts.rightPupil);
        
        // Mouth
        const mouthGeometry = new THREE.TorusGeometry(0.07, 0.02, 16, 16, Math.PI);
        this.bodyParts.mouth = new THREE.Mesh(mouthGeometry, lipsMaterial);
        this.bodyParts.mouth.position.set(0, 1.85, 0.25);
        this.bodyParts.mouth.rotation.set(Math.PI/2, 0, 0);
        this.model.add(this.bodyParts.mouth);
        
        // ---- ARMS SECTION ----
        // Left shoulder
        const leftShoulderGeometry = new THREE.SphereGeometry(0.08, 16, 12);
        this.bodyParts.leftShoulder = new THREE.Mesh(leftShoulderGeometry, darkSkinMaterial);
        this.bodyParts.leftShoulder.position.set(0.4, 1.6, 0);
        this.model.add(this.bodyParts.leftShoulder);
        
        // Left upper arm - fix connection
        const leftArmGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.22, 16);
        this.bodyParts.leftArm = new THREE.Mesh(leftArmGeometry, darkSkinMaterial);
        this.bodyParts.leftArm.position.set(0.47, 1.5, 0);
        // Rotate arm to connect to shoulder
        this.bodyParts.leftArm.rotation.z = -Math.PI/6;
        this.model.add(this.bodyParts.leftArm);
        
        // Left elbow
        const leftElbowGeometry = new THREE.SphereGeometry(0.06, 16, 12);
        this.bodyParts.leftElbow = new THREE.Mesh(leftElbowGeometry, darkSkinMaterial);
        this.bodyParts.leftElbow.position.set(0.57, 1.4, 0);
        this.model.add(this.bodyParts.leftElbow);
        
        // Left forearm - fix connection
        const leftForearmGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.2, 16);
        this.bodyParts.leftForearm = new THREE.Mesh(leftForearmGeometry, darkSkinMaterial);
        this.bodyParts.leftForearm.position.set(0.65, 1.32, 0);
        // Rotate forearm to connect to elbow
        this.bodyParts.leftForearm.rotation.z = -Math.PI/4;
        this.model.add(this.bodyParts.leftForearm);
        
        // Left hand
        const leftHandGeometry = new THREE.SphereGeometry(0.06, 16, 12);
        leftHandGeometry.scale(1, 0.7, 0.7);
        this.bodyParts.leftHand = new THREE.Mesh(leftHandGeometry, darkSkinMaterial);
        this.bodyParts.leftHand.position.set(0.72, 1.22, 0);
        this.model.add(this.bodyParts.leftHand);
        
        // Right shoulder
        const rightShoulderGeometry = new THREE.SphereGeometry(0.08, 16, 12);
        this.bodyParts.rightShoulder = new THREE.Mesh(rightShoulderGeometry, darkSkinMaterial);
        this.bodyParts.rightShoulder.position.set(-0.4, 1.6, 0);
        this.model.add(this.bodyParts.rightShoulder);
        
        // Right upper arm - fix connection
        const rightArmGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.22, 16);
        this.bodyParts.rightArm = new THREE.Mesh(rightArmGeometry, darkSkinMaterial);
        this.bodyParts.rightArm.position.set(-0.47, 1.5, 0);
        // Rotate arm to connect to shoulder
        this.bodyParts.rightArm.rotation.z = Math.PI/6;
        this.model.add(this.bodyParts.rightArm);
        
        // Right elbow
        const rightElbowGeometry = new THREE.SphereGeometry(0.06, 16, 12);
        this.bodyParts.rightElbow = new THREE.Mesh(rightElbowGeometry, darkSkinMaterial);
        this.bodyParts.rightElbow.position.set(-0.57, 1.4, 0);
        this.model.add(this.bodyParts.rightElbow);
        
        // Right forearm - fix connection
        const rightForearmGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.2, 16);
        this.bodyParts.rightForearm = new THREE.Mesh(rightForearmGeometry, darkSkinMaterial);
        this.bodyParts.rightForearm.position.set(-0.65, 1.32, 0);
        // Rotate forearm to connect to elbow
        this.bodyParts.rightForearm.rotation.z = Math.PI/4;
        this.model.add(this.bodyParts.rightForearm);
        
        // Right hand
        const rightHandGeometry = new THREE.SphereGeometry(0.06, 16, 12);
        rightHandGeometry.scale(1, 0.7, 0.7);
        this.bodyParts.rightHand = new THREE.Mesh(rightHandGeometry, darkSkinMaterial);
        this.bodyParts.rightHand.position.set(-0.72, 1.22, 0);
        this.model.add(this.bodyParts.rightHand);
        
        // ---- LEGS SECTION ----
        // Hip joints
        // Left hip joint
        const leftHipJointGeometry = new THREE.SphereGeometry(0.09, 16, 12);
        this.bodyParts.leftHipJoint = new THREE.Mesh(leftHipJointGeometry, darkSkinMaterial);
        this.bodyParts.leftHipJoint.position.set(0.22, 0.7, 0);
        this.model.add(this.bodyParts.leftHipJoint);
        
        // Right hip joint
        const rightHipJointGeometry = new THREE.SphereGeometry(0.09, 16, 12);
        this.bodyParts.rightHipJoint = new THREE.Mesh(rightHipJointGeometry, darkSkinMaterial);
        this.bodyParts.rightHipJoint.position.set(-0.22, 0.7, 0);
        this.model.add(this.bodyParts.rightHipJoint);
        
        // Left leg - thigh (improved connection)
        const leftThighGeometry = new THREE.CylinderGeometry(0.08, 0.07, 0.3, 16);
        this.bodyParts.leftThigh = new THREE.Mesh(leftThighGeometry, darkSkinMaterial);
        this.bodyParts.leftThigh.position.set(0.22, 0.55, 0);
        this.model.add(this.bodyParts.leftThigh);
        
        // Left knee (properly connected)
        const leftKneeGeometry = new THREE.SphereGeometry(0.07, 16, 12);
        this.bodyParts.leftKnee = new THREE.Mesh(leftKneeGeometry, darkSkinMaterial);
        this.bodyParts.leftKnee.position.set(0.22, 0.4, 0);
        this.model.add(this.bodyParts.leftKnee);
        
        // Left calf (improved connection)
        const leftCalfGeometry = new THREE.CylinderGeometry(0.065, 0.05, 0.25, 16);
        this.bodyParts.leftCalf = new THREE.Mesh(leftCalfGeometry, darkSkinMaterial);
        this.bodyParts.leftCalf.position.set(0.22, 0.25, 0);
        this.model.add(this.bodyParts.leftCalf);
        
        // Left ankle
        const leftAnkleGeometry = new THREE.SphereGeometry(0.05, 12, 8);
        this.bodyParts.leftAnkle = new THREE.Mesh(leftAnkleGeometry, darkSkinMaterial);
        this.bodyParts.leftAnkle.position.set(0.22, 0.1, 0);
        this.model.add(this.bodyParts.leftAnkle);
        
        // Left foot
        const leftFootGeometry = new THREE.SphereGeometry(0.07, 16, 12);
        leftFootGeometry.scale(1.2, 0.5, 1.5);
        this.bodyParts.leftFoot = new THREE.Mesh(leftFootGeometry, darkSkinMaterial);
        this.bodyParts.leftFoot.position.set(0.22, 0.07, 0.08);
        this.model.add(this.bodyParts.leftFoot);
        
        // Right leg - thigh (improved connection)
        const rightThighGeometry = new THREE.CylinderGeometry(0.08, 0.07, 0.3, 16);
        this.bodyParts.rightThigh = new THREE.Mesh(rightThighGeometry, darkSkinMaterial);
        this.bodyParts.rightThigh.position.set(-0.22, 0.55, 0);
        this.model.add(this.bodyParts.rightThigh);
        
        // Right knee (properly connected)
        const rightKneeGeometry = new THREE.SphereGeometry(0.07, 16, 12);
        this.bodyParts.rightKnee = new THREE.Mesh(rightKneeGeometry, darkSkinMaterial);
        this.bodyParts.rightKnee.position.set(-0.22, 0.4, 0);
        this.model.add(this.bodyParts.rightKnee);
        
        // Right calf (improved connection)
        const rightCalfGeometry = new THREE.CylinderGeometry(0.065, 0.05, 0.25, 16);
        this.bodyParts.rightCalf = new THREE.Mesh(rightCalfGeometry, darkSkinMaterial);
        this.bodyParts.rightCalf.position.set(-0.22, 0.25, 0);
        this.model.add(this.bodyParts.rightCalf);
        
        // Right ankle
        const rightAnkleGeometry = new THREE.SphereGeometry(0.05, 12, 8);
        this.bodyParts.rightAnkle = new THREE.Mesh(rightAnkleGeometry, darkSkinMaterial);
        this.bodyParts.rightAnkle.position.set(-0.22, 0.1, 0);
        this.model.add(this.bodyParts.rightAnkle);
        
        // Right foot
        const rightFootGeometry = new THREE.SphereGeometry(0.07, 16, 12);
        rightFootGeometry.scale(1.2, 0.5, 1.5);
        this.bodyParts.rightFoot = new THREE.Mesh(rightFootGeometry, darkSkinMaterial);
        this.bodyParts.rightFoot.position.set(-0.22, 0.07, 0.08);
        this.model.add(this.bodyParts.rightFoot);
        
        // Enable shadows for all parts
        this.model.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });
    },
    
    /**
     * Animate walking motion
     */
    animateWalking: function(normalizedDelta) {
        // Slower animation speed
        const speed = this.keys.sprint ? 6 : 4; // Reduced from 12/8 to 6/4
        this.walkCycle += normalizedDelta * speed;
        
        const legSwing = Math.sin(this.walkCycle * 0.5) * 0.4; // Reduced amplitude
        const armSwing = -Math.sin(this.walkCycle * 0.5) * 0.5; // Reduced amplitude
        const bodyBounce = Math.abs(Math.sin(this.walkCycle * 0.5)) * 0.04; // Reduced bounce
        
        // Arm movement
        if (this.bodyParts.leftArm && this.bodyParts.rightArm) {
            this.bodyParts.leftArm.rotation.x = armSwing;
            this.bodyParts.leftForearm.rotation.x = armSwing * 0.5;
            
            this.bodyParts.rightArm.rotation.x = -armSwing;
            this.bodyParts.rightForearm.rotation.x = -armSwing * 0.5;
        }
        
        // Leg movement
        if (this.bodyParts.leftThigh && this.bodyParts.rightThigh) {
            this.bodyParts.leftThigh.rotation.x = legSwing;
            this.bodyParts.leftCalf.rotation.x = Math.abs(legSwing) * 0.5;
            
            this.bodyParts.rightThigh.rotation.x = -legSwing;
            this.bodyParts.rightCalf.rotation.x = Math.abs(legSwing) * 0.5;
        }
        
        // Body bounce
        if (this.bodyParts.waist) {
            this.bodyParts.waist.position.y = 1.2 + bodyBounce;
            this.bodyParts.torsoConnect.position.y = 1.45 + bodyBounce;
            this.bodyParts.chest.position.y = 1.6 + bodyBounce;
            this.bodyParts.leftBreast.position.y = 1.62 + bodyBounce;
            this.bodyParts.rightBreast.position.y = 1.62 + bodyBounce;
            this.bodyParts.leftNipple.position.y = 1.62 + bodyBounce;
            this.bodyParts.rightNipple.position.y = 1.62 + bodyBounce;
            this.bodyParts.neck.position.y = 1.8 + bodyBounce;
            this.bodyParts.head.position.y = 1.95 + bodyBounce;
            this.bodyParts.snout.position.y = 1.9 + bodyBounce;
            this.bodyParts.leftEye.position.y = 1.98 + bodyBounce;
            this.bodyParts.rightEye.position.y = 1.98 + bodyBounce;
            this.bodyParts.leftPupil.position.y = 1.98 + bodyBounce;
            this.bodyParts.rightPupil.position.y = 1.98 + bodyBounce;
            this.bodyParts.mouth.position.y = 1.85 + bodyBounce;
        }
    },
    
    /**
     * Reset animation poses to default
     */
    resetAnimationPoses: function() {
        // Reset arm rotations
        if (this.bodyParts.leftArm && this.bodyParts.rightArm) {
            this.bodyParts.leftArm.rotation.x = 0;
            this.bodyParts.leftForearm.rotation.x = 0;
            
            this.bodyParts.rightArm.rotation.x = 0;
            this.bodyParts.rightForearm.rotation.x = 0;
        }
        
        // Reset leg rotations
        if (this.bodyParts.leftThigh && this.bodyParts.rightThigh) {
            this.bodyParts.leftThigh.rotation.x = 0;
            this.bodyParts.leftCalf.rotation.x = 0;
            
            this.bodyParts.rightThigh.rotation.x = 0;
            this.bodyParts.rightCalf.rotation.x = 0;
        }
        
        // Reset body positions
        if (this.bodyParts.waist) {
            this.bodyParts.waist.position.y = 1.2;
            this.bodyParts.torsoConnect.position.y = 1.45;
            this.bodyParts.chest.position.y = 1.6;
            this.bodyParts.leftBreast.position.y = 1.62;
            this.bodyParts.rightBreast.position.y = 1.62;
            this.bodyParts.leftNipple.position.y = 1.62;
            this.bodyParts.rightNipple.position.y = 1.62;
            this.bodyParts.neck.position.y = 1.8;
            this.bodyParts.head.position.y = 1.95;
            this.bodyParts.snout.position.y = 1.9;
            this.bodyParts.leftEye.position.y = 1.98;
            this.bodyParts.rightEye.position.y = 1.98;
            this.bodyParts.leftPupil.position.y = 1.98;
            this.bodyParts.rightPupil.position.y = 1.98;
            this.bodyParts.mouth.position.y = 1.85;
        }
    },
    
    /**
     * Set up keyboard, mouse, and touch controls
     */
    setupControls: function() {
        // Keyboard events
        document.addEventListener('keydown', (event) => {
            this.handleKeyDown(event.key.toLowerCase());
        });
        
        document.addEventListener('keyup', (event) => {
            this.handleKeyUp(event.key.toLowerCase());
        });
        
        // Mouse controls for camera rotation
        document.addEventListener('mousemove', (event) => {
            if (this.isMouseLocked) {
                this.handleMouseMove(event);
            }
        });
        
        // Mouse lock for pointer controls
        document.addEventListener('click', () => {
            if (!this.isMouseLocked) {
                this.lockMouse();
            }
        });
        
        // Free look with left mouse button
        document.addEventListener('mousedown', (event) => {
            if (event.button === 0 && this.isMouseLocked) { // Left mouse button
                this.startFreeLook();
            }
        });
        
        document.addEventListener('mouseup', (event) => {
            if (event.button === 0 && this.isFreeLookActive) { // Left mouse button
                this.endFreeLook();
            }
        });
        
        // Handle pointer lock changes
        document.addEventListener('pointerlockchange', () => {
            this.isMouseLocked = document.pointerLockElement !== null;
        });
        
        // Handle pointer lock errors
        document.addEventListener('pointerlockerror', () => {
            console.error('Pointer lock failed');
        });
        
        // Escape key handling for pointer lock
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.keys.pause = !this.keys.pause;
                
                if (this.keys.pause) {
                    this.unlockMouse();
                    Utils.events.emit('pauseGame');
                } else {
                    this.lockMouse();
                    Utils.events.emit('resumeGame');
                }
            }
        });
    },
    
    /**
     * Start free look mode (decouple camera rotation from player rotation)
     */
    startFreeLook: function() {
        this.isFreeLookActive = true;
        // Save current camera rotation
        this.savedCameraRotation.horizontal = this.cameraRotation.horizontal;
        this.savedCameraRotation.vertical = this.cameraRotation.vertical;
    },
    
    /**
     * End free look mode
     */
    endFreeLook: function() {
        this.isFreeLookActive = false;
        // Restore player rotation to match horizontal camera rotation
        this.rotation = this.cameraRotation.horizontal;
        this.model.rotation.y = this.rotation;
    },
    
    /**
     * Lock the mouse pointer for camera control
     */
    lockMouse: function() {
        const gameContainer = document.getElementById('game-container');
        gameContainer.requestPointerLock = gameContainer.requestPointerLock || 
                                         gameContainer.mozRequestPointerLock ||
                                         gameContainer.webkitRequestPointerLock;
        
        if (gameContainer.requestPointerLock) {
            gameContainer.requestPointerLock();
        }
    },
    
    /**
     * Unlock the mouse pointer
     */
    unlockMouse: function() {
        if (document.exitPointerLock) {
            document.exitPointerLock();
        }
    },
    
    /**
     * Handle mouse movement for camera rotation
     */
    handleMouseMove: function(event) {
        // Get mouse movement
        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        
        // Update camera rotation based on mouse movement with different sensitivities
        this.cameraRotation.horizontal -= movementX * this.mouseSensitivity.horizontal;
        this.cameraRotation.vertical -= movementY * this.mouseSensitivity.vertical;
        
        // Limit vertical rotation to prevent camera flipping
        this.cameraRotation.vertical = Math.max(
            -this.verticalAngleLimit,
            Math.min(this.verticalAngleLimit, this.cameraRotation.vertical)
        );
        
        // Update model rotation to match camera's horizontal rotation if not in free look mode
        if (!this.isFreeLookActive) {
            this.rotation = this.cameraRotation.horizontal;
            this.model.rotation.y = this.rotation;
        }
    },
    
    /**
     * Handle key down events
     */
    handleKeyDown: function(key) {
        switch(key) {
            case 'w':
                this.keys.backward = true;
                if (this.isFreeLookActive) this.endFreeLook();
                break;
            case 's':
                this.keys.forward = true;
                if (this.isFreeLookActive) this.endFreeLook();
                break;
            case 'a':
                this.keys.left = true;
                if (this.isFreeLookActive) this.endFreeLook();
                break;
            case 'd':
                this.keys.right = true;
                if (this.isFreeLookActive) this.endFreeLook();
                break;
            case ' ':
                this.keys.jump = true;
                if (!this.isJumping) {
                    this.jump();
                }
                break;
            case 'e':
                this.keys.interact = true;
                this.interact();
                break;
            case 'm':
                this.keys.map = !this.keys.map; // Toggle map
                Utils.events.emit('toggleMap', this.keys.map);
                break;
            case 'shift':
                this.keys.sprint = true;
                break;
        }
    },
    
    /**
     * Handle key up events
     */
    handleKeyUp: function(key) {
        switch(key) {
            case 'w':
                this.keys.backward = false;
                break;
            case 's':
                this.keys.forward = false;
                break;
            case 'a':
                this.keys.left = false;
                break;
            case 'd':
                this.keys.right = false;
                break;
            case ' ':
                this.keys.jump = false;
                break;
            case 'e':
                this.keys.interact = false;
                break;
            case 'shift':
                this.keys.sprint = false;
                break;
        }
    },
    
    /**
     * Update player position and state
     */
    update: function(deltaTime, colliders) {
        // Normalize delta time to avoid speed differences on different frame rates
        const normalizedDelta = Math.min(deltaTime, 3);
        
        // Handle A/D for rotation instead of strafing
        if (this.keys.left) {
            this.rotation += this.rotationSpeed * normalizedDelta;
            this.model.rotation.y = this.rotation;
            
            // Update camera rotation to match
            if (!this.isFreeLookActive) {
                this.cameraRotation.horizontal = this.rotation;
            }
        }
        
        if (this.keys.right) {
            this.rotation -= this.rotationSpeed * normalizedDelta;
            this.model.rotation.y = this.rotation;
            
            // Update camera rotation to match
            if (!this.isFreeLookActive) {
                this.cameraRotation.horizontal = this.rotation;
            }
        }
        
        // Calculate movement direction based on player orientation (not camera)
        this.moveDirection.set(0, 0, 0);
        
        // Forward/backward motion (relative to player direction)
        if (this.keys.forward) this.moveDirection.z = -1;
        if (this.keys.backward) this.moveDirection.z = 1;
        
        // Apply player rotation to movement direction
        let moveX = 0;
        let moveZ = 0;
        
        if (this.moveDirection.z !== 0) {
            moveX = Math.sin(this.rotation) * this.moveDirection.z;
            moveZ = Math.cos(this.rotation) * this.moveDirection.z;
        }
        
        // Apply sprint multiplier if sprinting
        const speedMultiplier = this.keys.sprint ? this.sprintMultiplier : 1;
        
        // Apply movement to velocity with acceleration
        if (this.moveDirection.length() > 0) {
            this.velocity.x += moveX * this.moveSpeed * speedMultiplier * normalizedDelta;
            this.velocity.z += moveZ * this.moveSpeed * speedMultiplier * normalizedDelta;
            
            // Apply walking animation
            this.animateWalking(normalizedDelta);
        } else {
            // Reset to idle pose
            this.resetAnimationPoses();
        }
        
        // Apply friction for smooth deceleration
        this.velocity.x *= this.friction;
        this.velocity.z *= this.friction;
        
        // Apply gravity and jumping
        if (this.isJumping) {
            this.velocity.y -= this.gravity * normalizedDelta;
            
            // Check if landed - now at 0 instead of 0.5
            if (this.model.position.y <= 0) {
                this.model.position.y = 0; // No hover
                this.velocity.y = 0;
                this.isJumping = false;
            }
        }
        
        // Update position
        this.model.position.x += this.velocity.x * normalizedDelta;
        this.model.position.y += this.velocity.y * normalizedDelta;
        this.model.position.z += this.velocity.z * normalizedDelta;
        
        // Simple collision detection with bounds
        const bounds = 1000; // World size (2000x2000 map, so 1000 in each direction from center)
        this.model.position.x = Utils.clamp(this.model.position.x, -bounds, bounds);
        this.model.position.z = Utils.clamp(this.model.position.z, -bounds, bounds);
        
        // Update camera to follow player
        this.updateCamera();
        
        // Check for nearby interactive objects
        this.checkInteractions(colliders);
    },
    
    /**
     * Make the player jump
     */
    jump: function() {
        if (!this.isJumping) {
            this.velocity.y = this.jumpForce;
            this.isJumping = true;
        }
    },
    
    /**
     * Player interaction with objects
     */
    interact: function() {
        if (this.currentInteraction) {
            this.isInteracting = true;
            Utils.events.emit('interact', this.currentInteraction);
        }
    },
    
    /**
     * Check for nearby interactive objects
     */
    checkInteractions: function(interactives) {
        if (!interactives || !interactives.length) return;
        
        // Reset current interaction
        this.currentInteraction = null;
        
        const playerPosition = this.model.position.clone();
        const interactionDistance = 3; // Maximum distance for interaction
        
        // Find the closest interactive object within range
        interactives.forEach(object => {
            const distance = playerPosition.distanceTo(object.position);
            
            if (distance < interactionDistance) {
                this.currentInteraction = object;
                
                // Show interaction hint
                if (!this.isInteracting) {
                    Utils.showNotification('Interaction Available', `Press E to interact with ${object.name || 'object'}`, 1000);
                }
            }
        });
    },
    
    /**
     * Update camera position to follow player
     */
    updateCamera: function() {
        // Calculate spherical coordinates for camera position
        const theta = this.cameraRotation.horizontal;
        const phi = Math.PI/2 - this.cameraRotation.vertical;
        
        // Convert spherical to cartesian coordinates
        const offsetX = this.cameraOffset.z * Math.sin(phi) * Math.sin(theta);
        const offsetY = this.cameraOffset.y + this.cameraOffset.z * Math.cos(phi);
        const offsetZ = this.cameraOffset.z * Math.sin(phi) * Math.cos(theta);
        
        // Set camera position
        this.camera.position.x = this.model.position.x + offsetX;
        this.camera.position.y = this.model.position.y + offsetY;
        this.camera.position.z = this.model.position.z + offsetZ;
        
        // Look at player
        this.cameraTarget.copy(this.model.position);
        this.cameraTarget.y += 1.5; // Look at upper body level
        this.camera.lookAt(this.cameraTarget);
    },
    
    /**
     * Reset player to starting position
     */
    reset: function() {
        this.model.position.set(0, 0, 0); // No hover
        this.velocity.set(0, 0, 0);
        this.rotation = 0; // Start facing away from camera (changed from Math.PI)
        this.model.rotation.y = 0; // Changed from Math.PI
        this.isJumping = false;
        this.cameraRotation.horizontal = 0; // Changed from Math.PI
        this.cameraRotation.vertical = 0;
        this.resetAnimationPoses();
        this.updateCamera();
    },
    
    /**
     * Get player's current position
     */
    getPosition: function() {
        return this.model.position.clone();
    }
};