export interface Position {
  x: number;
  y: number;
}

export interface Alien extends Position {
  id: string;
}

export interface Bullet extends Position {
  id: string;
}

export interface GameState {
  player: Position;
  aliens: Alien[];
  bullets: Bullet[];
  score: number;
  isGameOver: boolean;
  isWin: boolean;
  keysPressed: Set<string>;
  lastShotTime: number;
  lastUpdateTime: number;
}

export interface GameProps {
  onExit: () => void;
}

export type MovementFunction = (state: GameState, deltaTime?: number) => void;
export type GameLogicFunction = (
  state: GameState,
  currentTime?: number
) => void;
