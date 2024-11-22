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
      await axios.post(`${API_URL}/api/flames`, {
        name1,
        name2,
        relationship
      });
    } catch (error) {
      setError('Failed to save result. Backend might be unavailable.');
      console.error('Error saving result:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-2">
              <Flame className="h-8 w-8 text-red-500" />
              <h1 className="text-3xl font-bold text-gray-800">FLAMES</h1>
            </div>
            <p className="text-gray-600 mt-2">Find your relationship destiny!</p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 p-2 border"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Second Name</label>
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 p-2 border"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-md hover:from-pink-600 hover:to-purple-600 transition duration-300 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  'Calculating...'
                ) : (
                  <>
                    <Heart className="h-5 w-5" />
                    Calculate Relationship
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            {result && !error && (
              <div className="mt-6 text-center">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800">Result:</h2>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                    {result}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
