import { useEffect, useRef, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const gameLoopRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  const keysPressedRef = useRef(new Set());
  const lastShotTimeRef = useRef(0);
  const containerRef = useRef(null);
  const alienMoveCounterRef = useRef(0);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle keyboard and touch events
  useEffect(() => {
    console.log('Setting up keyboard and touch handlers');

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

    // Touch controls
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      setTouchStartX(touch.clientX);
    };

    const handleTouchMove = (e) => {
      if (touchStartX === null) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX;

      // Clear previous movement keys
      keysPressedRef.current.delete('ArrowLeft');
      keysPressedRef.current.delete('ArrowRight');

      // Add movement based on touch direction
      if (deltaX < -10) {
        keysPressedRef.current.add('ArrowLeft');
      } else if (deltaX > 10) {
        keysPressedRef.current.add('ArrowRight');
      }

      setTouchStartX(touch.clientX);
    };

    const handleTouchEnd = () => {
      setTouchStartX(null);
      keysPressedRef.current.delete('ArrowLeft');
      keysPressedRef.current.delete('ArrowRight');
    };

    // Focus the container when mounted
    if (containerRef.current) {
      containerRef.current.focus();
      console.log('Container focused');
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    if (isMobile) {
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (isMobile) {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      }
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [onExit, isMobile, touchStartX]);

  // Game loop
  useEffect(() => {
    console.log('Starting game loop');
    let frameCount = 0;

    const gameLoop = () => {
      frameCount++;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTimeRef.current;
      lastUpdateTimeRef.current = currentTime;

      setGameState((prevState) => {
        if (prevState.gameOver) return prevState;

        const newState = { ...prevState };

        // Update player position
        movePlayer(newState, keysPressedRef.current);

        // Auto-shoot on mobile or handle space key
        if (isMobile || keysPressedRef.current.has(' ')) {
          if (currentTime - lastShotTimeRef.current >= (isMobile ? 500 : 250)) {
            handleShooting(newState);
            lastShotTimeRef.current = currentTime;
          }
        }

        // Update bullets
        moveBullets(newState);

        // Update aliens (slower on mobile)
        alienMoveCounterRef.current++;
        if (alienMoveCounterRef.current >= (isMobile ? 4 : 3)) {
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

        return newState;
      });
    };

    // Adjust game speed for mobile
    const gameSpeed = isMobile ? 150 : 100;
    gameLoopRef.current = setInterval(gameLoop, gameSpeed);
    console.log(`Game loop interval set up with ${gameSpeed}ms delay`);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        console.log('Game loop interval cleared');
      }
    };
  }, [onExit, isMobile]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="p-4 focus:outline-none select-none touch-none"
    >
      <div className="mb-4">
        <div className="text-[#60a5fa] mb-2">Score: {gameState.score}</div>
        <div className="text-[#60a5fa]">Lives: {gameState.lives}</div>
      </div>
      <pre className="font-mono text-xs md:text-sm whitespace-pre">
        {renderGame(gameState)}
      </pre>
      <div className="mt-4 text-[#94a3b8] text-sm">
        {isMobile ? (
          <>
            <div>Swipe left/right to move</div>
            <div>Auto-shooting enabled</div>
          </>
        ) : (
          'Controls: ← → to move, SPACE to shoot, ESC to exit'
        )}
      </div>
    </div>
  );
};

export default SpaceInvaders;
