import { GAME_CONFIG } from './constants';

export const handleShooting = (gameState) => {
  const { player, bullets } = gameState;

  // Check if we can shoot (not too many bullets)
  if (bullets.length >= GAME_CONFIG.maxBullets) {
    console.log('Too many bullets, cannot shoot');
    return;
  }

  // Create new bullet at player position
  const newBullet = {
    x: player.x,
    y: player.y - 1,
  };

  console.log('New bullet created at:', newBullet);
  gameState.bullets.push(newBullet);
};

export const checkCollisions = (gameState) => {
  const { bullets, aliens, boardHeight } = gameState;
  const newBullets = [];
  const newAliens = [...aliens]; // Create a copy of aliens array
  let scoreIncrease = 0;

  // Check each bullet against each alien
  for (const bullet of bullets) {
    let bulletHit = false;

    // Find the index of the alien that was hit
    const hitAlienIndex = newAliens.findIndex(
      (alien) => bullet.x === alien.x && bullet.y === alien.y
    );

    if (hitAlienIndex !== -1) {
      console.log('Collision detected!', {
        bullet,
        alien: newAliens[hitAlienIndex],
        bulletIndex: bullets.indexOf(bullet),
        alienIndex: hitAlienIndex,
      });
      bulletHit = true;
      scoreIncrease += GAME_CONFIG.alienPoints;
      // Remove the hit alien
      newAliens.splice(hitAlienIndex, 1);
    } else {
      newBullets.push(bullet);
    }
  }

  // Check if any aliens reached the bottom
  for (const alien of newAliens) {
    if (alien.y >= boardHeight - 1) {
      console.log('Alien reached bottom at:', alien);
      gameState.lives--;
      if (gameState.lives <= 0) {
        gameState.gameOver = true;
      }
    }
  }

  if (
    newBullets.length !== bullets.length ||
    newAliens.length !== aliens.length
  ) {
    console.log('Collision results:', {
      bulletsBefore: bullets.length,
      bulletsAfter: newBullets.length,
      aliensBefore: aliens.length,
      aliensAfter: newAliens.length,
      scoreIncrease,
    });
  }

  gameState.bullets = newBullets;
  gameState.aliens = newAliens;
  gameState.score += scoreIncrease;
};

export const checkGameOver = (gameState) => {
  return gameState.gameOver || gameState.lives <= 0;
};

export const checkWin = (gameState) => {
  return gameState.aliens.length === 0;
};
