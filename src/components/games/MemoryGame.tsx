import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, RotateCcw } from 'lucide-react';

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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initGame = () => {
    const pairs = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
    setCards(pairs);
    setFlippedIds([]);
    setMoves(0);
    setMatches(0);
  };

  useEffect(() => { initGame(); }, []);

  useEffect(() => {
    if (matches === EMOJIS.length && matches > 0) {
      if (!bestMoves || moves < bestMoves) setBestMoves(moves);
    }
  }, [matches, moves, bestMoves]);

  const handleFlip = (id: number) => {
    if (isChecking || cards[id].flipped || cards[id].matched || flippedIds.length >= 2) return;

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
        }, 800);
      }
    }
  };

  const isComplete = matches === EMOJIS.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5" /> Fitness Memory Game</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <span className="text-sm text-muted-foreground">Moves: <strong>{moves}</strong></span>
            <span className="text-sm text-muted-foreground">Matches: <strong>{matches}/{EMOJIS.length}</strong></span>
          </div>
          <Button onClick={initGame} variant="outline" size="sm" className="gap-1">
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
        </div>

        {bestMoves && (
          <div className="text-center text-sm text-yellow-500 font-medium">🏆 Best: {bestMoves} moves</div>
        )}

        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
          {cards.map(card => (
            <button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-300 transform ${
                card.flipped || card.matched
                  ? 'bg-primary/10 border-2 border-primary scale-100 rotate-0'
                  : 'bg-gradient-to-br from-primary to-secondary text-transparent hover:scale-105 cursor-pointer'
              } ${card.matched ? 'opacity-60' : ''}`}
            >
              {card.flipped || card.matched ? card.emoji : '?'}
            </button>
          ))}
        </div>

        {isComplete && (
          <div className="text-center space-y-3">
            <div className="text-2xl font-bold text-green-500">🎉 You did it in {moves} moves!</div>
            <Button onClick={initGame}>Play Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemoryGame;
