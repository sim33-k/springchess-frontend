'use client'

import Link from "next/link";
import {SignInButton, SignedIn, SignOutButton, SignedOut, User, UserProfile} from '@asgardeo/nextjs';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <header className="p-6 flex justify-between items-center border-b border-neutral-800">
        <h1 className="text-2xl font-bold text-white">Spring Chess</h1>
        <SignedOut>
          <SignInButton className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors">
            Sign In
          </SignInButton>
        </SignedOut>
      </header>
      
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
        <SignedOut>
          <div className="text-center space-y-8">
            <h2 className="text-6xl font-bold text-white mb-4">
              Spring Chess
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Play chess online with friends or challenge yourself against the computer.
              Join thousands of players in the ultimate game of strategy.
            </p>

            <div className="mt-16 pt-16 border-t border-neutral-800">
              <h3 className="text-2xl font-bold text-white mb-6">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                  <h4 className="text-xl font-semibold text-white mb-2">Multiplayer</h4>
                  <p className="text-neutral-400">
                    Play live games against real opponents with instant move updates
                  </p>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                  <h4 className="text-xl font-semibold text-white mb-2">Move Validation</h4>
                  <p className="text-neutral-400">
                    All moves are validated using the powerful chess.js library
                  </p>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                  <h4 className="text-xl font-semibold text-white mb-2">Game History</h4>
                  <p className="text-neutral-400">
                    Track your moves and analyze your games with detailed history
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="text-center space-y-8 max-w-2xl">
            <User>
              {(user) => (
                <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Welcome back, {user.userName || user.username || user.sub}
                  </h2>
                  <Link
                    href="/game?gameId=test123&playerId=player1&color=white"
                    className="inline-block px-8 py-4 bg-white text-black text-lg font-semibold rounded-lg hover:bg-neutral-200 transition-colors shadow-lg mt-4"
                  >
                    Start Game
                  </Link>
                </div>
              )}
            </User>
            <UserProfile />
          </div>
        </SignedIn>
      </main>
    </div>
  );
}
