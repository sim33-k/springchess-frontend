import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-white mb-4">
            ♔ Chess Game ♚
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Play chess online with friends or challenge yourself against the computer.
            Join thousands of players in the ultimate game of strategy.
          </p>
          
          <div className="flex gap-6 justify-center mt-12">
            <Link
              href="/login"
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Register
            </Link>
          </div>

          <div className="mt-16 pt-16 border-t border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">Multiplayer</h3>
                <p className="text-gray-400">
                  Play live games against real opponents with instant move updates
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">Move Validation</h3>
                <p className="text-gray-400">
                  All moves are validated using the powerful chess.js library
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">Game History</h3>
                <p className="text-gray-400">
                  Track your moves and analyze your games with detailed history
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
