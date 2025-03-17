export const movePlayer = (gameState, keysPressed) => {
  const { player, boardWidth } = gameState;
  const newPlayer = { ...player };

  if (keysPressed.has('ArrowLeft')) {
    newPlayer.x = Math.max(0, player.x - 1);
  }
  if (keysPressed.has('ArrowRight')) {
    newPlayer.x = Math.min(boardWidth - 1, player.x + 1);
  }

  if (newPlayer.x !== player.x) {
    console.log('Player moved:', player.x, '->', newPlayer.x);
  }

  gameState.player = newPlayer;
};

export const moveBullets = (gameState) => {
  const { bullets } = gameState;
  const newBullets = [];

  for (const bullet of bullets) {
    const newY = bullet.y - 1;
    if (newY >= 0) {
      const newBullet = { ...bullet, y: newY };
      newBullets.push(newBullet);
      console.log('Bullet moved:', bullet.y, '->', newY);
    } else {
      console.log('Bullet went off screen:', bullet);
    }
  }

  if (newBullets.length !== bullets.length) {
    console.log(
      'Bullets count changed:',
      bullets.length,
      '->',
      newBullets.length
    );
  }

  gameState.bullets = newBullets;
};

export const moveAliens = (gameState) => {
  const { aliens, boardWidth, alienDirection } = gameState;
  const newAliens = [];
  let needsDirectionChange = false;

  for (const alien of aliens) {
    const newAlien = { ...alien };

    if (alienDirection === 1) {
      newAlien.x = alien.x + 1;
      if (newAlien.x >= boardWidth - 1) {
        needsDirectionChange = true;
      }
    } else {
      newAlien.x = alien.x - 1;
      if (newAlien.x <= 0) {
        needsDirectionChange = true;
      }
    }

    newAliens.push(newAlien);
  }

  if (needsDirectionChange) {
    gameState.alienDirection *= -1;
    for (const alien of newAliens) {
      alien.y += 1;
    }
  }

  if (newAliens.length !== aliens.length) {
    console.log('Aliens moved:', aliens.length, '->', newAliens.length);
  }

  gameState.aliens = newAliens;
};
