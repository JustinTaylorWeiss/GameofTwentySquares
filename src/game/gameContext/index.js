import React from 'react';

import { isAITurn, aiTurn } from './functions/aiFunctions';
// Import AI State

import { getTileModifierWithCoords, getTileStonesWithCoords, validateMove } from './functions/boardStateFunctions';
// Import Board State

import { defaultGameState, whiteStoneIDs, blackStoneIDs, whiteStonePath, blackStonePath, rowLetterMap } from './functions/gameConstants';
// Import Constants

import { reducer } from './reducer';
// Import Reducer

export { isAITurn, aiTurn};
// Export AI State

export { getTileModifierWithCoords, getTileStonesWithCoords, validateMove };
// Export Board State

export { defaultGameState, whiteStoneIDs, blackStoneIDs, whiteStonePath, blackStonePath, rowLetterMap };
// Export Constants

export { reducer };
// Export Reducer

export const GameContext = React.createContext([]);
// Export Context

