import React, { useEffect, useRef, useState } from 'react';
import { GameState, GameProps, Alien, Bullet } from './types';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
} from './constants';
import { movePlayer, moveBullets, moveAliens } from './movement';
import {
  handleShooting,
  checkCollisions,
  checkGameOver,
  checkWin,
} from './gameLogic';
import { renderGame } from './rendering';

const SpaceInvaders: React.FC<GameProps> = ({ onExit }) => {
  const [gameState, setGameState] = useState<GameState>({
    player: { x: Math.floor(BOARD_WIDTH / 2), y: BOARD_HEIGHT - 2 },
    aliens: [],
    bullets: [],
    score: 0,
    isGameOver: false,
    isWin: false,
    keysPressed: new Set(),
    lastShotTime: 0,
    lastUpdateTime: Date.now(),
  });

  const gameStateRef = useRef<GameState>(gameState);
  const gameLoopRef = useRef<number>();

  useEffect(() => {
    // Initialize aliens
    const initialAliens: Alien[] = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        initialAliens.push({
          id: `${i}-${j}`,
          x: i * 2 + 2,
          y: j * 2 + 2,
        });
      }
    }
    setGameState((prev) => ({ ...prev, aliens: initialAliens }));
    gameStateRef.current = { ...gameState, aliens: initialAliens };

    // Handle keyboard input
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default actions for game controls
      if (e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Escape') {
        e.preventDefault();
      }
      
      if (e.key === 'Escape') {
        onExit();
        return;
      }
      setGameState((prev) => {
        const newKeys = new Set(prev.keysPressed);
        newKeys.add(e.key);
        return { ...prev, keysPressed: newKeys };
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Prevent default actions for game controls
      if (e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
      }
      
      setGameState((prev) => {
        const newKeys = new Set(prev.keysPressed);
        newKeys.delete(e.key);
        return { ...prev, keysPressed: newKeys };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Game loop
    const gameLoop = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - gameStateRef.current.lastUpdateTime;

      // Update game state
      const newState = { ...gameStateRef.current };
      newState.lastUpdateTime = currentTime;

      // Move player
      movePlayer(newState, deltaTime);

      // Handle shooting
      handleShooting(newState, currentTime);

      // Move bullets
      moveBullets(newState, deltaTime);

      // Move aliens
      moveAliens(newState, deltaTime);

      // Check collisions
      checkCollisions(newState);

      // Check game over
      checkGameOver(newState);

      // Check win
      checkWin(newState);

      // Update state and ref
      setGameState(newState);
      gameStateRef.current = newState;

      // Continue game loop if game is not over
      if (!newState.isGameOver && !newState.isWin) {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
      }
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [onExit]);

  return (
    <div className="terminal">
      <div className="terminal-header">
        Space Invaders - Score: {gameState.score}
      </div>
      <div className="terminal-content">{renderGame(gameState)}</div>
    </div>
  );
};

export default SpaceInvaders;
