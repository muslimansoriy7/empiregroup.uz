'use client';
import { useState, useEffect } from 'react';

const WORDS = ['pul', 'vaqt', 'asab'];

export default function RotatingWord() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((p) => (p + 1) % WORDS.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="rot-word">
      {/* eng keng so'z joyni band qiladi — sakrash bo'lmaydi */}
      <span className="rot-word-sizer" aria-hidden="true">vaqt</span>
      <span key={i} className="rot-word-in">{WORDS[i]}</span>
    </span>
  );
}
