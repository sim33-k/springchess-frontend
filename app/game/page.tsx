'use client';

import ChessBoard from '../components/ChessBoard';

export default function GamePage() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6 overflow-hidden">
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
          <div>
            <p className="text-white font-semibold text-sm">Opponent</p>
            <p className="text-gray-400 text-xs">Waiting...</p>
          </div>
        </div>

        {/* Chess Board */}
        <ChessBoard gameId="game-123" />

        {/* Bottom Player (You) */}
        <div className="flex items-center gap-3 mt-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=player" 
              alt="You"
              className="w-full h-full"
            />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">You</p>
            <p className="text-gray-400 text-xs">Ready</p>
          </div>
        </div>
      </div>
    </div>
  );
}
