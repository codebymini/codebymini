import { GameState } from './types';
import {
  BOARD_WIDTH,
  PLAYER_SPEED,
  BULLET_SPEED,
  ALIEN_SPEED,
} from './constants';

export const movePlayer = (state: GameState, deltaTime: number = 1): void => {
  const { keysPressed, player } = state;

  // Calculate movement based on deltaTime
  const movement = PLAYER_SPEED * deltaTime;

  if (keysPressed.has('ArrowLeft')) {
    player.x = Math.max(0, player.x - movement);
  }
  if (keysPressed.has('ArrowRight')) {
    player.x = Math.min(BOARD_WIDTH - 1, player.x + movement);
  }

  // Ensure player stays within bounds
  player.x = Math.max(0, Math.min(BOARD_WIDTH - 1, player.x));
};

export const moveBullets = (state: GameState, deltaTime: number = 1): void => {
  const { bullets } = state;

  // Move bullets up
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    bullet.y -= BULLET_SPEED * deltaTime;

    // Remove bullets that go off screen
    if (bullet.y < 0) {
      bullets.splice(i, 1);
    }
  }
};

export const moveAliens = (state: GameState, deltaTime: number = 1): void => {
  const { aliens } = state;

  // Move aliens down
  for (const alien of aliens) {
    alien.y += ALIEN_SPEED * deltaTime;
  }
};
