import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Timer, Volume2, VolumeX } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const PRESETS = [
  { label: '🔥 Tabata', work: 20, rest: 10, rounds: 8, description: '20s work / 10s rest' },
  { label: '💪 HIIT 30/30', work: 30, rest: 30, rounds: 10, description: '30s work / 30s rest' },
  { label: '🧘 Plank Hold', work: 60, rest: 30, rounds: 3, description: '60s hold / 30s rest' },
  { label: '⚡ Sprint', work: 15, rest: 45, rounds: 12, description: '15s sprint / 45s rest' },
];

const beep = (freq: number, duration: number) => {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    gain.gain.value = 0.15;
    osc.start();
    osc.stop(ctx.currentTime + duration / 1000);
  } catch {}
};

const WorkoutTimerGame = () => {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [phase, setPhase] = useState<'idle' | 'work' | 'rest' | 'done'>('idle');
  const [timeLeft, setTimeLeft] = useState(PRESETS[0].work);
  const [currentRound, setCurrentRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalTime = selectedPreset.rounds * (selectedPreset.work + selectedPreset.rest);
  const overallProgress = phase === 'done' ? 100 : (totalElapsed / totalTime) * 100;

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setTotalElapsed(t => t + 1);
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (phase === 'work') {
            if (currentRound >= selectedPreset.rounds) {
              setPhase('done');
              setIsRunning(false);
              if (soundOn) { beep(880, 300); setTimeout(() => beep(880, 300), 400); setTimeout(() => beep(1100, 500), 800); }
              return 0;
            }
            setPhase('rest');
            if (soundOn) beep(600, 200);
            return selectedPreset.rest;
          } else {
            setPhase('work');
            setCurrentRound(r => r + 1);
            if (soundOn) beep(800, 150);
            return selectedPreset.work;
          }
        }
        if (prev <= 4 && prev > 1 && soundOn) beep(440, 80);
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, phase, currentRound, selectedPreset, soundOn]);

  const start = () => {
    setPhase('work');
    setTimeLeft(selectedPreset.work);
    setCurrentRound(1);
    setTotalElapsed(0);
    setIsRunning(true);
    if (soundOn) beep(800, 150);
  };

  const reset = () => {
    setIsRunning(false);
    setPhase('idle');
    setTimeLeft(selectedPreset.work);
    setCurrentRound(1);
    setTotalElapsed(0);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const phaseStyles = {
    work: 'from-red-500 to-orange-500',
    rest: 'from-green-500 to-emerald-500',
    idle: 'from-primary to-secondary',
    done: 'from-yellow-400 to-amber-500',
  };

  const roundProgress = phase === 'work' 
    ? ((selectedPreset.work - timeLeft) / selectedPreset.work) * 100
    : phase === 'rest'
    ? ((selectedPreset.rest - timeLeft) / selectedPreset.rest) * 100
    : 0;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2"><Timer className="h-5 w-5 text-primary" /> Interval Timer</span>
          <Button variant="ghost" size="icon" onClick={() => setSoundOn(!soundOn)} className="h-8 w-8">
            {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </CardTitle>
        <CardDescription>Select a preset and start your interval training</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Presets */}
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => { if (phase === 'idle') { setSelectedPreset(p); setTimeLeft(p.work); } }}
              className={`text-left p-3 rounded-xl border-2 transition-all duration-200 ${
                selectedPreset.label === p.label
                  ? 'border-primary bg-primary/10 shadow-md'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              } ${phase !== 'idle' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="font-semibold text-sm">{p.label}</div>
              <div className="text-xs text-muted-foreground">{p.description} × {p.rounds}</div>
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className={`bg-gradient-to-br ${phaseStyles[phase]} rounded-2xl p-8 text-center text-white shadow-lg transition-all duration-500`}>
          <div className="text-sm font-medium uppercase tracking-widest opacity-80 mb-2">
            {phase === 'idle' ? 'Ready to Go' : phase === 'done' ? '🎉 Workout Complete!' : phase === 'work' ? '💪 WORK' : '😮‍💨 REST'}
          </div>
          <div className="text-8xl font-mono font-black tabular-nums leading-none mb-3">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm opacity-80">
            Round {currentRound} of {selectedPreset.rounds}
          </div>
          {(phase === 'work' || phase === 'rest') && (
            <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-white/60 rounded-full transition-all duration-1000" style={{ width: `${roundProgress}%` }} />
            </div>
          )}
        </div>

        {/* Overall Progress */}
        {phase !== 'idle' && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Overall Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-3">
          {phase === 'idle' ? (
            <Button onClick={start} size="lg" className="gap-2 px-8 h-14 text-lg rounded-xl shadow-lg">
              <Play className="h-6 w-6" /> Start Workout
            </Button>
          ) : (
            <>
              <Button onClick={() => setIsRunning(!isRunning)} variant="outline" size="lg" className="gap-2 h-14 px-6 rounded-xl">
                {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                {isRunning ? 'Pause' : 'Resume'}
              </Button>
              <Button onClick={reset} variant="destructive" size="lg" className="gap-2 h-14 px-6 rounded-xl">
                <RotateCcw className="h-5 w-5" /> Reset
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutTimerGame;
