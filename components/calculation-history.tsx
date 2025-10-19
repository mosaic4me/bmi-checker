'use client';

import { useState, useEffect } from 'react';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  age: number;
  height: number;
  weight: number;
  bmi: number;
  category: string;
  categoryLabel: string;
}

interface CalculationHistoryProps {
  onSelectEntry: (entry: HistoryEntry) => void;
}

export function CalculationHistory({ onSelectEntry }: CalculationHistoryProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem('bmi-history');
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all calculation history?')) {
      localStorage.removeItem('bmi-history');
      setHistory([]);
    }
  };

  const deleteEntry = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const updated = history.filter(entry => entry.id !== id);
    localStorage.setItem('bmi-history', JSON.stringify(updated));
    setHistory(updated);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      underweight: '#3B82F6',
      normal: '#10B981',
      overweight: '#F59E0B',
      obese: '#EF4444',
    };
    return colors[category] || '#6B7280';
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-teal-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Calculation History ({history.length})
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-lg font-medium transition-colors text-sm"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
          <button
            onClick={clearHistory}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg font-medium transition-colors text-sm"
          >
            Clear All
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.slice().reverse().map((entry) => (
            <div
              key={entry.id}
              onClick={() => onSelectEntry(entry)}
              className="border-2 border-gray-200 rounded-lg p-4 hover:border-teal-300 hover:bg-teal-50 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: getCategoryColor(entry.category) }}
                    >
                      BMI: {entry.bmi}
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: `${getCategoryColor(entry.category)}20`,
                        color: getCategoryColor(entry.category),
                      }}
                    >
                      {entry.categoryLabel}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 flex gap-4">
                    <span>Age: {entry.age}y</span>
                    <span>Height: {entry.height}cm</span>
                    <span>Weight: {entry.weight}kg</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(entry.timestamp)}
                  </div>
                </div>
                <button
                  onClick={(e) => deleteEntry(entry.id, e)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function saveToHistory(entry: Omit<HistoryEntry, 'id' | 'timestamp'>) {
  try {
    const stored = localStorage.getItem('bmi-history');
    const history: HistoryEntry[] = stored ? JSON.parse(stored) : [];

    const newEntry: HistoryEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    history.push(newEntry);

    // Keep only last 50 entries
    const trimmed = history.slice(-50);

    localStorage.setItem('bmi-history', JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error saving to history:', error);
  }
}
