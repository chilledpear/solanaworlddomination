# Solana Ascension: Road to Utopia

A third-person browser game set in a futuristic world where Solana cryptocurrency hitting $1000 will bring about a utopian transformation. Explore the city, complete quests, and participate in mini-games as you prepare for the ascension!

## Game Features

- Immersive 3D world with third-person controls
- Quest system with multiple objectives and rewards
- Interactive NPCs with dialogue
- Mini-games (Crypto Mining Simulator and more to come)
- Central countdown timer building anticipation for transformation
- Collectible items
- Visual transformation of the world as the countdown progresses

## Game Controls

- **WASD** - Move character
- **SPACE** - Jump
- **E** - Interact with objects/NPCs
- **M** - Toggle map (future feature)

## Technical Structure

The game is built with a modular architecture consisting of 10 main files:

1. `index.html` - Main entry point and HTML structure
2. `main.js` - Game initialization and main loop
3. `world.js` - 3D environment and scene management
4. `player.js` - Character controller and camera
5. `quests.js` - Quest system and definitions
6. `minigames.js` - Mini-game framework and implementations
7. `npcs.js` - NPC characters and dialogue
8. `ui.js` - User interface including countdown
9. `assets.js` - Asset loading and management
10. `utils.js` - Utility functions and helpers

## Deployment

### Local Development

1. Clone this repository
2. Open `index.html` in a modern browser
3. No build step required for local development

### Deployment to Vercel

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Deploy with the following settings:
   - Framework Preset: `None`
   - Build Command: `None`
   - Output Directory: `.`
   - Install Command: `None`

## Future Enhancements

- Additional mini-games (Market Trading, Blockchain Puzzle)
- Expanded world with more districts
- Character customization
- Inventory system
- Enhanced visual effects for the transformation

## Technologies

- Three.js for 3D rendering
- GSAP for animations
- Pure JavaScript for game logic

## License

This project is licensed under the MIT License - see the LICENSE file for details.