'use client';

import { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

interface ChessBoardProps {
  gameId?: string;
  playerId?: string;
  playerColor?: string;
}

export default function ChessBoard({ gameId, playerId, playerColor = 'white' }: ChessBoardProps) {
  const [game, setGame] = useState(() => new Chess());

  function makeAMove(move: { from: string; to: string; promotion?: string }) {
    try {
      const gameCopy = new Chess(game.fen());
      const result = gameCopy.move(move);
      if (result) {
        setGame(gameCopy);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Invalid move:', error);
      return false;
    }
  }

  function onDrop({ sourceSquare, targetSquare, piece }: { sourceSquare: string | null; targetSquare: string | null; piece: string }) {
    if (!sourceSquare || !targetSquare) {
      return false;
    }

    const moveResult = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to queen for simplicity
    });

    console.log('Move result:', moveResult, 'From:', sourceSquare, 'To:', targetSquare);

    if (!moveResult) {
      return false;
    }

    // TODO: Send move to server via socket.io
    // socket.emit('makeMove', { gameId, playerId, move: { from: sourceSquare, to: targetSquare } });

    return true;
  }

  return (
    <div className="w-full max-w-[500px]">
      <Chessboard
        id="BasicBoard"
        options={{
          position: game.fen(),
          onPieceDrop: onDrop,
          boardOrientation: playerColor === 'black' ? 'black' : 'white',
          lightSquareStyle: { backgroundColor: '#ffffff' },
          darkSquareStyle: { backgroundColor: '#848484' },
        }}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 5px 15px rgba(255, 255, 255, 0.1)',
        }}
      />
    </div>
  );
}
