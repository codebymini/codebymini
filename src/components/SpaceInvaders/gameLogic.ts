import { GameState, Bullet, Alien } from './types';
import { BOARD_HEIGHT, BOARD_WIDTH, SHOT_COOLDOWN } from './constants';

export const handleShooting = (
  state: GameState,
  currentTime: number = Date.now()
): void => {
  const { keysPressed, lastShotTime, bullets, player } = state;

  if (keysPressed.has(' ') && currentTime - lastShotTime >= SHOT_COOLDOWN) {
    const newBullet: Bullet = {
      id: `bullet-${currentTime}`,
      x: Math.floor(player.x),
      y: player.y - 1,
    };
    bullets.push(newBullet);
    state.lastShotTime = currentTime;
  }
};

export const checkCollisions = (state: GameState): void => {
  const { bullets, aliens, score } = state;

  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];

    for (let j = aliens.length - 1; j >= 0; j--) {
      const alien = aliens[j];

      if (
        Math.floor(bullet.x) === Math.floor(alien.x) &&
        Math.floor(bullet.y) === Math.floor(alien.y)
      ) {
        // Remove bullet and alien
        bullets.splice(i, 1);
        aliens.splice(j, 1);
        state.score = score + 100;
        break;
      }
    }
  }
};

export const checkGameOver = (state: GameState): void => {
  const { aliens, player } = state;

  for (const alien of aliens) {
    if (
      Math.floor(alien.y) >= Math.floor(player.y) ||
      (Math.floor(alien.x) === Math.floor(player.x) &&
        Math.floor(alien.y) === Math.floor(player.y))
    ) {
      state.isGameOver = true;
      return;
    }
  }

  for (const alien of aliens) {
    if (alien.x <= 0 || alien.x >= BOARD_WIDTH - 1) {
      state.isGameOver = true;
      return;
    }
  }
};

export const checkWin = (state: GameState): void => {
  if (state.aliens.length === 0) {
    state.isWin = true;
  }
};
