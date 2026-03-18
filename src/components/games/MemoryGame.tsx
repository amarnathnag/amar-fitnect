import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, RotateCcw, Trophy } from 'lucide-react';

const EMOJIS = ['🏋️', '🏃', '🧘', '🚴', '🏊', '⚽', '🥊', '🎯'];

interface MemoryCard {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [bestMoves, setBestMoves] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const initGame = () => {
    const pairs = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
    setCards(pairs);
    setFlippedIds([]);
    setMoves(0);
    setMatches(0);
    setGameStarted(false);
    setElapsedTime(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => { initGame(); }, []);

  useEffect(() => {
    if (gameStarted && matches < EMOJIS.length) {
      timerRef.current = setInterval(() => setElapsedTime(t => t + 1), 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
    if (matches === EMOJIS.length && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [gameStarted, matches]);

  useEffect(() => {
    if (matches === EMOJIS.length && matches > 0) {
      if (!bestMoves || moves < bestMoves) setBestMoves(moves);
    }
  }, [matches, moves, bestMoves]);

  const handleFlip = (id: number) => {
    if (isChecking || cards[id].flipped || cards[id].matched || flippedIds.length >= 2) return;
    if (!gameStarted) setGameStarted(true);

    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);
    setCards(prev => prev.map(c => c.id === id ? { ...c, flipped: true } : c));

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setIsChecking(true);
      const [first, second] = newFlipped;

      if (cards[first].emoji === cards[id].emoji) {
        setCards(prev => prev.map(c => c.id === first || c.id === second ? { ...c, matched: true } : c));
        setMatches(m => m + 1);
        setFlippedIds([]);
        setIsChecking(false);
      } else {
        timeoutRef.current = setTimeout(() => {
          setCards(prev => prev.map(c => c.id === first || c.id === second ? { ...c, flipped: false } : c));
          setFlippedIds([]);
          setIsChecking(false);
        }, 700);
      }
    }
  };

  const isComplete = matches === EMOJIS.length;
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5 text-primary" /> Fitness Memory Game</CardTitle>
        <CardDescription>Match all fitness emoji pairs in as few moves as possible</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Stats Bar */}
        <div className="flex items-center justify-between bg-muted/50 rounded-xl p-3">
          <div className="flex gap-4 text-sm">
            <span className="font-medium">Moves: <strong className="text-primary">{moves}</strong></span>
            <span className="font-medium">Pairs: <strong className="text-primary">{matches}/{EMOJIS.length}</strong></span>
            <span className="font-medium tabular-nums">⏱️ {formatTime(elapsedTime)}</span>
          </div>
          <Button onClick={initGame} variant="ghost" size="sm" className="gap-1 h-8">
            <RotateCcw className="h-3 w-3" /> New Game
          </Button>
        </div>

        {/* Best Score */}
        {bestMoves && (
          <div className="flex items-center justify-center gap-2 py-2 px-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">Best: {bestMoves} moves</span>
          </div>
        )}

        {/* Card Grid */}
        <div className="grid grid-cols-4 gap-2.5 max-w-sm mx-auto">
          {cards.map(card => (
            <button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-300 transform select-none touch-manipulation ${
                card.flipped || card.matched
                  ? 'bg-primary/10 border-2 border-primary shadow-md scale-100'
                  : 'bg-gradient-to-br from-primary to-secondary hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer'
              } ${card.matched ? 'opacity-50 scale-90' : ''}`}
              disabled={card.matched}
            >
              {card.flipped || card.matched ? (
                <span className="animate-in zoom-in-50 duration-200">{card.emoji}</span>
              ) : (
                <span className="text-white text-xl font-bold">?</span>
              )}
            </button>
          ))}
        </div>

        {/* Complete */}
        {isComplete && (
          <div className="text-center space-y-3 bg-green-500/10 rounded-2xl p-6 border border-green-500/20">
            <div className="text-3xl font-bold text-green-500">🎉 You did it!</div>
            <div className="text-muted-foreground">{moves} moves in {formatTime(elapsedTime)}</div>
            <Button onClick={initGame} size="lg" className="gap-2 rounded-xl">
              <RotateCcw className="h-4 w-4" /> Play Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemoryGame;
