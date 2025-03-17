import { useEffect, useRef, useState } from 'react';
import { GAME_CONFIG } from './constants';
import { initializeGameState } from './gameState';
import { movePlayer, moveBullets, moveAliens } from './movement';
import {
  handleShooting,
  checkCollisions,
  checkGameOver,
  checkWin,
} from './gameLogic';
import { renderGame } from './rendering';

const SpaceInvaders = ({ onExit }) => {
  const [gameState, setGameState] = useState(initializeGameState());
  const gameLoopRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  const keysPressedRef = useRef(new Set());
  const lastShotTimeRef = useRef(0);
  const containerRef = useRef(null);
  const alienMoveCounterRef = useRef(0);

  // Handle keyboard events
  useEffect(() => {
    console.log('Setting up keyboard handlers');
    const handleKeyDown = (e) => {
      console.log('Key down:', e.key);
      keysPressedRef.current.add(e.key);

      // Prevent default behavior for game controls
      if ([' ', 'ArrowLeft', 'ArrowRight', 'Escape'].includes(e.key)) {
        e.preventDefault();
      }

      // Handle ESC key for exit
      if (e.key === 'Escape') {
        console.log('ESC pressed, exiting game');
        onExit();
      }
    };

    const handleKeyUp = (e) => {
      console.log('Key up:', e.key);
      keysPressedRef.current.delete(e.key);
    };

    // Focus the container when mounted
    if (containerRef.current) {
      containerRef.current.focus();
      console.log('Container focused');
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [onExit]);

  // Game loop
  useEffect(() => {
    console.log('Starting game loop');
    let frameCount = 0;

    const gameLoop = () => {
      frameCount++;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTimeRef.current;
      lastUpdateTimeRef.current = currentTime;

      console.log(`Game loop frame ${frameCount}, deltaTime: ${deltaTime}ms`);
      console.log('Current keys pressed:', Array.from(keysPressedRef.current));
      console.log('Current game state:', {
        player: gameState.player,
        bullets: gameState.bullets,
        aliens: gameState.aliens,
        score: gameState.score,
        lives: gameState.lives,
      });

      setGameState((prevState) => {
        // Don't update if game is over
        if (prevState.gameOver) {
          return prevState;
        }

        const newState = { ...prevState };

        // Update player position
        movePlayer(newState, keysPressedRef.current);

        // Handle shooting
        if (
          keysPressedRef.current.has(' ') &&
          currentTime - lastShotTimeRef.current >= 250
        ) {
          handleShooting(newState);
          lastShotTimeRef.current = currentTime;
        }

        // Update bullets
        moveBullets(newState);

        // Update aliens (every 3 frames)
        alienMoveCounterRef.current++;
        if (alienMoveCounterRef.current >= 3) {
          moveAliens(newState);
          alienMoveCounterRef.current = 0;
        }

        // Check collisions
        checkCollisions(newState);

        // Check win/lose conditions
        if (checkGameOver(newState)) {
          console.log('Game Over!');
          newState.gameOver = true;
          clearInterval(gameLoopRef.current);
          onExit();
        } else if (checkWin(newState)) {
          console.log('You Win!');
          newState.gameOver = true;
          clearInterval(gameLoopRef.current);
          onExit();
        }

        // Log state changes
        if (
          newState.bullets.length !== prevState.bullets.length ||
          newState.aliens.length !== prevState.aliens.length ||
          newState.score !== prevState.score
        ) {
          console.log('State changed:', {
            bullets:
              prevState.bullets.length + ' -> ' + newState.bullets.length,
            aliens: prevState.aliens.length + ' -> ' + newState.aliens.length,
            score: prevState.score + ' -> ' + newState.score,
          });
        }

        return newState;
      });
    };

    // Slower game loop (100ms instead of 50ms)
    gameLoopRef.current = setInterval(gameLoop, 100);
    console.log('Game loop interval set up');

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        console.log('Game loop interval cleared');
      }
    };
  }, [onExit]);

  return (
    <div ref={containerRef} tabIndex={0} className="p-4 focus:outline-none">
      <div className="mb-4">
        <div className="text-[#60a5fa] mb-2">Score: {gameState.score}</div>
        <div className="text-[#60a5fa]">Lives: {gameState.lives}</div>
      </div>
      <pre className="font-mono text-sm whitespace-pre">
        {renderGame(gameState)}
      </pre>
      <div className="mt-4 text-[#94a3b8] text-sm">
        Controls: ← → to move, SPACE to shoot, ESC to exit
      </div>
    </div>
  );
};

export default SpaceInvaders;
