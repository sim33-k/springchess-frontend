'use client';

import ChessBoard from '../components/ChessBoard';
import { useSearchParams } from 'next/navigation';

export default function GamePage() {
  const searchParams = useSearchParams();
  const gameId = searchParams.get('gameId') || 'game-123';
  const playerId = searchParams.get('playerId') || 'player-1';
  const playerColor = searchParams.get('color') || 'white'; // 'white' or 'black'

  return (
    <div className="h-screen bg-black flex items-center justify-center p-6 overflow-hidden">
      <div className="flex flex-col max-h-full">
        {/* Top Player (Opponent) */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=opponent" 
              alt="Opponent"
              className="w-full h-full"
            />
          </div>
          <p className="text-white font-semibold text-sm">Opponent</p>
        </div>

        {/* Chess Board */}
        <ChessBoard gameId={gameId} playerId={playerId} playerColor={playerColor} />

        {/* Bottom Player (You) */}
        <div className="flex items-center gap-3 mt-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=player" 
              alt="You"
              className="w-full h-full"
            />
          </div>
          <p className="text-white font-semibold text-sm">You</p>
        </div>
      </div>
    </div>
  );
}
