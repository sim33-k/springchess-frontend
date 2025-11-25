# Chess Application Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Core Technologies](#core-technologies)
4. [Component Breakdown](#component-breakdown)
5. [Data Flow](#data-flow)
6. [Chess Logic](#chess-logic)
7. [State Management](#state-management)
8. [Routing](#routing)
9. [Styling](#styling)
10. [Future Integration Points](#future-integration-points)

---

## Overview

This is a multiplayer chess application built with **Next.js 16** (App Router), **React**, **TypeScript**, **Tailwind CSS**, and chess-specific libraries (`chess.js` and `react-chessboard`). The application allows two players to play chess against each other in real-time.

### Key Features
- User authentication (Login/Register pages)
- Real-time chess gameplay
- Move validation using chess.js
- Visual chessboard with drag-and-drop
- Player profiles with avatars
- Game timers for each player
- Black and white themed UI

---

## Project Structure

```
springchess-frontend/
├── app/                          # Next.js App Router directory
│   ├── components/               # Reusable React components
│   │   ├── ChessBoard.tsx       # Chess board component
│   │   └── ChatBox.tsx          # (Currently unused) Chat component
│   ├── game/                    # Game page route
│   │   └── page.tsx            # Main game page
│   ├── login/                   # Login page route
│   │   └── page.tsx
│   ├── register/                # Register page route
│   │   └── page.tsx
│   ├── layout.tsx               # Root layout (wraps all pages)
│   ├── page.tsx                 # Home page (landing page)
│   └── globals.css              # Global styles
├── public/                       # Static assets
├── node_modules/                 # Dependencies
├── package.json                  # Project dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── next.config.ts                # Next.js configuration
└── requirements.txt              # Project requirements document
```

---

## Core Technologies

### 1. **Next.js 16 (App Router)**
Next.js is a React framework that provides:
- **File-based routing**: Each folder in `app/` becomes a route
- **Server and Client Components**: Components can run on server or client
- **Built-in optimization**: Automatic code splitting, image optimization, etc.

**How it works in this project:**
- `app/page.tsx` → renders at `/` (home page)
- `app/login/page.tsx` → renders at `/login`
- `app/game/page.tsx` → renders at `/game`

### 2. **React 19**
React is the UI library. Key concepts used:
- **Components**: Reusable UI pieces (ChessBoard, game page, etc.)
- **State**: Data that can change over time (`useState`)
- **Props**: Data passed from parent to child components
- **Hooks**: Special functions like `useState`, `useSearchParams`

### 3. **TypeScript**
TypeScript adds type safety to JavaScript:
```typescript
interface ChessBoardProps {
  gameId?: string;        // Optional string
  playerId?: string;      // Optional string
  playerColor?: string;   // Optional string
}
```
This helps catch errors before runtime.

### 4. **chess.js**
A JavaScript chess library that handles:
- Move validation (is this move legal?)
- Game state management (FEN notation)
- Check/checkmate detection
- Turn management

**FEN Notation Example:**
```
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
```
This represents the entire chess board state in a single string.

### 5. **react-chessboard**
A React component that renders a visual chessboard:
- Drag-and-drop piece interaction
- Board orientation (white/black perspective)
- Customizable square colors
- Piece rendering

### 6. **Tailwind CSS**
A utility-first CSS framework. Instead of writing CSS classes, you use utility classes:
```tsx
<div className="bg-black h-screen flex items-center justify-center">
```
- `bg-black`: black background
- `h-screen`: full viewport height
- `flex`: flexbox layout
- `items-center`: vertically center
- `justify-center`: horizontally center

---

## Component Breakdown

### 1. **Home Page** (`app/page.tsx`)

**Purpose**: Landing page with links to login/register

**Key Features:**
- Hero section with chess emoji icons
- Call-to-action buttons (Login, Register)
- Feature highlights
- Pure black background with gradient

**Code Structure:**
```tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Content */}
    </div>
  );
}
```

---

### 2. **Login Page** (`app/login/page.tsx`)

**Purpose**: User authentication entry point

**Key Features:**
- Email and password input fields
- Form validation
- Error handling
- Link to register page

**State Management:**
```tsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
```

**How it works:**
1. User types in email → `onChange` updates `email` state
2. User types in password → `onChange` updates `password` state
3. User clicks submit → `handleSubmit` fires
4. Currently: Mock authentication (console.log)
5. Future: API call to backend for real authentication
6. On success: Redirect to `/game` using `router.push('/game')`

**Client-Side Rendering:**
```tsx
'use client';  // This tells Next.js to render on client, not server
```
Why? Because we need:
- `useState` for form state
- `useRouter` for navigation
- Browser events (onClick, onChange)

---

### 3. **Register Page** (`app/register/page.tsx`)

**Purpose**: New user account creation

**Key Features:**
- Username, email, password fields
- Password confirmation
- Client-side validation
- Link to login page

**Validation Logic:**
```tsx
if (password !== confirmPassword) {
  setError('Passwords do not match');
  return;
}

if (password.length < 6) {
  setError('Password must be at least 6 characters');
  return;
}
```

**Flow:**
1. User fills form
2. Click submit
3. Validate passwords match
4. Validate password length
5. (Future) Send to backend API
6. Redirect to login page

---

### 4. **Game Page** (`app/game/page.tsx`)

**Purpose**: Main chess game interface

**Key Features:**
- Two player sections (top and bottom)
- Chess board in the center
- Timer displays for each player
- Profile avatars

**URL Parameters:**
The game page accepts URL query parameters:
```
/game?gameId=abc123&playerId=player1&color=white
```

**How to read URL parameters:**
```tsx
const searchParams = useSearchParams();
const gameId = searchParams.get('gameId') || 'game-123';
const playerId = searchParams.get('playerId') || 'player-1';
const playerColor = searchParams.get('color') || 'white';
```

**Component Layout:**
```
┌─────────────────────────────┐
│  [Avatar] Opponent    10:00 │  ← Top Player
├─────────────────────────────┤
│                             │
│      Chess Board            │
│                             │
├─────────────────────────────┤
│  [Avatar] You         10:00 │  ← Bottom Player
└─────────────────────────────┘
```

**Props Passing:**
```tsx
<ChessBoard 
  gameId={gameId}           // Which game is this?
  playerId={playerId}       // Who is playing?
  playerColor={playerColor} // white or black?
/>
```

---

### 5. **ChessBoard Component** (`app/components/ChessBoard.tsx`)

**Purpose**: Core chess gameplay logic and rendering

This is the most complex component. Let's break it down in detail.

#### **State Management**

```tsx
const [game, setGame] = useState(() => new Chess());
```

**Why the arrow function?**
```tsx
// ❌ Wrong - creates new Chess instance on every render
const [game, setGame] = useState(new Chess());

// ✅ Correct - only creates Chess instance once
const [game, setGame] = useState(() => new Chess());
```

The arrow function ensures `new Chess()` is only called once when the component mounts, not on every re-render.

#### **The Chess Instance**

```tsx
const game = new Chess();
```

This creates a chess.js instance which maintains:
- Current board position
- Whose turn it is
- Castling rights
- En passant targets
- Move history
- Check/checkmate status

#### **Move Making Function**

```tsx
function makeAMove(move: { from: string; to: string; promotion?: string }) {
  try {
    const gameCopy = new Chess(game.fen());  // Create a copy
    const result = gameCopy.move(move);      // Try the move
    if (result) {
      setGame(gameCopy);                      // Update state
      return true;
    }
    return false;
  } catch (error) {
    console.error('Invalid move:', error);
    return false;
  }
}
```

**Why create a copy?**
- React state should never be mutated directly
- We need to create a new instance to trigger re-render
- If the move is invalid, we don't affect the current game

**Move object:**
```typescript
{
  from: 'e2',      // Starting square
  to: 'e4',        // Ending square
  promotion: 'q'   // If pawn reaches end, promote to queen
}
```

#### **Piece Drop Handler**

This is called when a user drags and drops a chess piece:

```tsx
function onDrop({ sourceSquare, targetSquare, piece }: { 
  sourceSquare: string | null; 
  targetSquare: string | null; 
  piece: string 
}) {
  // Null check
  if (!sourceSquare || !targetSquare) {
    return false;
  }

  // Attempt the move
  const moveResult = makeAMove({
    from: sourceSquare,
    to: targetSquare,
    promotion: 'q',
  });

  console.log('Move result:', moveResult, 'From:', sourceSquare, 'To:', targetSquare);

  if (!moveResult) {
    return false;  // Invalid move - piece snaps back
  }

  // TODO: Send move to server via socket.io
  // socket.emit('makeMove', { gameId, playerId, move: { from: sourceSquare, to: targetSquare } });

  return true;  // Valid move - piece stays
}
```

**Return value matters:**
- `return true`: Move accepted, piece stays in new position
- `return false`: Move rejected, piece returns to original position

#### **Rendering the Board**

```tsx
<Chessboard
  id="BasicBoard"
  options={{
    position: game.fen(),                    // Current board state
    onPieceDrop: onDrop,                    // What to do when piece dropped
    boardOrientation: playerColor === 'black' ? 'black' : 'white',  // Flip board
    lightSquareStyle: { backgroundColor: '#ffffff' },  // White squares
    darkSquareStyle: { backgroundColor: '#848484' },   // Gray squares
  }}
  customBoardStyle={{
    borderRadius: '4px',
    boxShadow: '0 5px 15px rgba(255, 255, 255, 0.1)',
  }}
/>
```

**Position (FEN string):**
`game.fen()` returns something like:
```
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
```
This tells the board where every piece is.

**Board Orientation:**
- If `playerColor === 'white'`, white pieces at bottom
- If `playerColor === 'black'`, black pieces at bottom (board flipped)

---

## Data Flow

### **Move Flow Diagram**

```
User drags piece
       ↓
react-chessboard detects drag
       ↓
User drops piece on target square
       ↓
react-chessboard calls onDrop({ sourceSquare, targetSquare, piece })
       ↓
onDrop calls makeAMove({ from, to, promotion })
       ↓
makeAMove creates copy: new Chess(game.fen())
       ↓
makeAMove tries: gameCopy.move({ from, to })
       ↓
chess.js validates move (is it legal?)
       ↓
   ┌─────────────┴─────────────┐
   │                           │
Valid                      Invalid
   │                           │
   ↓                           ↓
setGame(gameCopy)          return false
   ↓                           ↓
State updates              Piece snaps back
   ↓
Component re-renders
   ↓
Board shows new position
```

### **State Update Cycle**

1. **Initial State**: Game starts with standard chess position
2. **User Action**: Drag piece from e2 to e4
3. **Event Handler**: `onDrop` is called with `{ sourceSquare: 'e2', targetSquare: 'e4' }`
4. **Validation**: chess.js checks if e2→e4 is legal
5. **State Update**: `setGame(newGameState)`
6. **Re-render**: React detects state change
7. **UI Update**: Chessboard displays new position

---

## Chess Logic

### **Understanding FEN Notation**

FEN (Forsyth-Edwards Notation) is a standard for describing chess positions:

```
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
```

Breaking it down:
- `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR`: Board position
  - `/` separates ranks (rows)
  - Lowercase = black pieces (r=rook, n=knight, b=bishop, q=queen, k=king, p=pawn)
  - Uppercase = white pieces
  - Numbers = empty squares
- `w`: White to move
- `KQkq`: Castling availability (K=white kingside, Q=white queenside, k=black kingside, q=black queenside)
- `-`: En passant target square (or - if none)
- `0`: Halfmove clock (for 50-move rule)
- `1`: Fullmove number

### **Move Validation**

chess.js validates:
1. **Piece movement rules**: Can this piece move this way?
2. **Board obstacles**: Are there pieces in the way?
3. **Turn order**: Is it this player's turn?
4. **King safety**: Does this move leave king in check?
5. **Special moves**: Castling, en passant, promotion

Example:
```typescript
// Valid move
game.move({ from: 'e2', to: 'e4' });  // ✓ Pawn can move 2 squares from start

// Invalid moves
game.move({ from: 'e2', to: 'e5' });  // ✗ Pawn can't move 3 squares
game.move({ from: 'e1', to: 'e8' });  // ✗ King can't jump across board
game.move({ from: 'e2', to: 'd3' });  // ✗ Pawn can't move diagonally without capturing
```

---

## State Management

### **React State Basics**

```tsx
const [game, setGame] = useState(() => new Chess());
```

This creates two things:
1. `game`: The current value (read-only)
2. `setGame`: Function to update the value

**Rules:**
- Never modify `game` directly: `game.move()` ❌
- Always use `setGame`: `setGame(newGame)` ✓
- State updates trigger re-renders

### **Why Immutability Matters**

```tsx
// ❌ WRONG - Mutates state directly
function badMove(move) {
  game.move(move);  // This changes game object
  setGame(game);    // React doesn't detect change (same object reference)
}

// ✅ CORRECT - Creates new object
function goodMove(move) {
  const gameCopy = new Chess(game.fen());  // New object
  gameCopy.move(move);                      // Modify copy
  setGame(gameCopy);                        // React detects change (different reference)
}
```

React compares object references:
```typescript
const a = { value: 1 };
const b = a;
a === b  // true - same reference

const c = { value: 1 };
a === c  // false - different reference (even though content is same)
```

---

## Routing

### **Next.js App Router**

File structure = URL structure:

```
app/
├── page.tsx           → /
├── login/
│   └── page.tsx      → /login
├── register/
│   └── page.tsx      → /register
└── game/
    └── page.tsx      → /game
```

### **Navigation**

**Link Component (preferred):**
```tsx
import Link from 'next/link';

<Link href="/game">Go to Game</Link>
```
Benefits: Prefetching, client-side navigation

**Programmatic Navigation:**
```tsx
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/game');  // Redirect to game page
```

### **URL Parameters**

**Reading parameters:**
```tsx
import { useSearchParams } from 'next/navigation';

const searchParams = useSearchParams();
const gameId = searchParams.get('gameId');  // From ?gameId=123
```

**Example URL:**
```
http://localhost:3000/game?gameId=abc123&playerId=player1&color=white
```

Accessing:
```tsx
gameId = 'abc123'
playerId = 'player1'
color = 'white'
```

---

## Styling

### **Tailwind CSS Utility Classes**

Instead of writing CSS:
```css
/* Traditional CSS */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
}
```

Use utility classes:
```tsx
<div className="flex items-center justify-center h-screen bg-black">
```

### **Common Patterns**

**Flexbox centering:**
```tsx
<div className="flex items-center justify-center">
  {/* Centered content */}
</div>
```

**Spacing:**
```tsx
<div className="p-4">     {/* Padding all sides */}
<div className="px-6">    {/* Padding left and right */}
<div className="mt-3">    {/* Margin top */}
<div className="gap-4">   {/* Gap between flex/grid items */}
```

**Sizing:**
```tsx
<div className="w-10 h-10">        {/* 40px × 40px */}
<div className="max-w-[500px]">    {/* Max width 500px */}
<div className="h-screen">         {/* Full viewport height */}
```

**Colors:**
```tsx
<div className="bg-black text-white">
<div className="bg-slate-700 text-gray-400">
```

**Typography:**
```tsx
<p className="text-sm font-semibold">    {/* Small, semi-bold text */}
<p className="text-xl font-bold">        {/* Extra large, bold text */}
```

---

## Future Integration Points

### **1. Backend API Integration**

**Authentication:**
```tsx
// Currently in login/page.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // TODO: Replace with actual API call
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  if (data.success) {
    localStorage.setItem('token', data.token);
    router.push('/game');
  } else {
    setError(data.message);
  }
};
```

### **2. Socket.IO Integration**

**Real-time moves:**
```tsx
// In ChessBoard.tsx
import { io } from 'socket.io-client';

useEffect(() => {
  const socket = io('http://localhost:3001');
  
  // Join game room
  socket.emit('joinGame', { gameId, playerId });
  
  // Listen for opponent moves
  socket.on('opponentMove', ({ from, to }) => {
    makeAMove({ from, to, promotion: 'q' });
  });
  
  return () => socket.disconnect();
}, [gameId]);

// In onDrop function
function onDrop({ sourceSquare, targetSquare, piece }) {
  // ... validation ...
  
  if (moveResult) {
    // Broadcast move to opponent
    socket.emit('makeMove', {
      gameId,
      playerId,
      move: { from: sourceSquare, to: targetSquare }
    });
  }
  
  return moveResult;
}
```

### **3. Timer Implementation**

```tsx
const [whiteTime, setWhiteTime] = useState(600); // 10 minutes in seconds
const [blackTime, setBlackTime] = useState(600);

useEffect(() => {
  const interval = setInterval(() => {
    if (game.turn() === 'w') {
      setWhiteTime(prev => prev - 1);
    } else {
      setBlackTime(prev => prev - 1);
    }
  }, 1000);
  
  return () => clearInterval(interval);
}, [game]);

// Display timer
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
```

### **4. Game State Persistence**

```tsx
// Save game to database
const saveGame = async () => {
  await fetch('/api/games', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      gameId,
      fen: game.fen(),
      moves: game.history(),
      whiteTime,
      blackTime,
    }),
  });
};

// Load game from database
const loadGame = async (gameId: string) => {
  const response = await fetch(`/api/games/${gameId}`);
  const data = await response.json();
  
  const loadedGame = new Chess(data.fen);
  setGame(loadedGame);
  setWhiteTime(data.whiteTime);
  setBlackTime(data.blackTime);
};
```

### **5. Player Profiles**

```tsx
// Fetch player data
const [opponent, setOpponent] = useState(null);

useEffect(() => {
  const fetchPlayers = async () => {
    const response = await fetch(`/api/games/${gameId}/players`);
    const data = await response.json();
    setOpponent(data.opponent);
  };
  
  fetchPlayers();
}, [gameId]);

// Display real player names and avatars
<img src={opponent.avatarUrl} alt={opponent.username} />
<p>{opponent.username}</p>
```

---

## Debugging Tips

### **Console Logging**

```tsx
console.log('Current FEN:', game.fen());
console.log('Move history:', game.history());
console.log('Is check?', game.isCheck());
console.log('Is checkmate?', game.isCheckmate());
console.log('Whose turn?', game.turn()); // 'w' or 'b'
```

### **React DevTools**

Install browser extension to inspect:
- Component tree
- Props and state
- Re-render reasons

### **Common Issues**

1. **Pieces not moving**: Check `onDrop` return value
2. **State not updating**: Ensure you're not mutating state directly
3. **Page not navigating**: Check if using `'use client'` directive
4. **Styles not applying**: Check Tailwind class names spelling

---

## Performance Considerations

### **Why we use `() => new Chess()` in useState**

```tsx
// ❌ Bad - Creates Chess instance on every render
const [game, setGame] = useState(new Chess());

// ✅ Good - Creates Chess instance only once
const [game, setGame] = useState(() => new Chess());
```

### **Memoization (Future optimization)**

```tsx
import { useMemo } from 'react';

// Only recalculate when game changes
const legalMoves = useMemo(() => {
  return game.moves();
}, [game]);
```

---

## Testing Strategy (Future)

### **Unit Tests**

```tsx
// Test move validation
test('should allow valid move', () => {
  const game = new Chess();
  const result = game.move({ from: 'e2', to: 'e4' });
  expect(result).toBeTruthy();
});

test('should reject invalid move', () => {
  const game = new Chess();
  const result = game.move({ from: 'e2', to: 'e5' });
  expect(result).toBeNull();
});
```

### **Integration Tests**

```tsx
// Test component rendering
test('ChessBoard renders correctly', () => {
  render(<ChessBoard gameId="test" playerId="player1" playerColor="white" />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});
```

---

## Summary

This chess application is built with modern web technologies:
- **Next.js** handles routing and rendering
- **React** manages UI components and state
- **chess.js** provides game logic and validation
- **react-chessboard** renders the visual board
- **Tailwind CSS** styles the interface

The core data flow is:
1. User interacts with board (drag & drop)
2. Event handler validates move with chess.js
3. State updates if move is valid
4. React re-renders with new position
5. (Future) Move sent to server via Socket.IO

Everything is TypeScript for type safety, and the architecture is ready for real-time multiplayer integration when the backend is built.
