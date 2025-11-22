'use client';

import { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

interface ChessBoardProps {
  gameId?: string;
}

export default function ChessBoard({ gameId }: ChessBoardProps) {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move: { from: string; to: string; promotion?: string }) {
    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move(move);
      if (result) {
        setGame(gameCopy);
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to queen for simplicity
    });

    if (!move) {
      return false;
    }

    // TODO: Send move to server via socket.io
    // socket.emit('makeMove', { gameId, move: { from: sourceSquare, to: targetSquare } });

    return true;
  }

  return (
    <div className="w-full max-w-[500px]">
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
        }}
      />
    </div>
  );
}
