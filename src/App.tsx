import React, { useState } from 'react';
import { Heart, Flame } from 'lucide-react';
import axios from 'axios';

const API_URL = 'https://sb1-frhaq.onrender.com';

function App() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateFlames = (n1: string, n2: string) => {
    const name1Chars = n1.toLowerCase().replace(/\s/g, '').split('');
    const name2Chars = n2.toLowerCase().replace(/\s/g, '').split('');
    
    // Remove common characters
    for (let i = 0; i < name1Chars.length; i++) {
      const index = name2Chars.indexOf(name1Chars[i]);
      if (index !== -1) {
        name1Chars.splice(i, 1);
        name2Chars.splice(index, 1);
        i--;
      }
    }

    const count = name1Chars.length + name2Chars.length;
    const flames = ['Friends', 'Lovers', 'Affectionate', 'Marriage', 'Enemies', 'Siblings'];
    let currentIndex = 0;
    
    for (let i = flames.length; i > 1; i--) {
      currentIndex = (currentIndex + count - 1) % i;
      flames.splice(currentIndex, 1);
    }
    
    return flames[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) return;

    setIsLoading(true);
    setError('');
    const relationship = calculateFlames(name1, name2);
    setResult(relationship);

    try {
      aw
