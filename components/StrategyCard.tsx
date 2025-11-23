import React from 'react';
import { Strategy } from '../types';
import { Clock, Eye, MessageSquare, Wind, CheckCircle, AlertCircle, Heart, Lightbulb, User, Quote } from 'lucide-react';

interface StrategyCardProps {
  strategy: Strategy;
  onRemove?: (id: string) => void;
  variant?: 'display' | 'print';
}

const iconMap = {
  clock: Clock,
  eye: Eye,
  message: MessageSquare,
  wind: Wind,
  check: CheckCircle,
  alert: AlertCircle,
  heart: Heart
};

const colorMap = {
  clock: 'bg-blue-100 text-blue-700 border-blue-200',
  eye: 'bg-purple-100 text-purple-700 border-purple-200',
  message: 'bg-amber-100 text-amber-700 border-amber-200',
  wind: 'bg-teal-100 text-teal-700 border-teal-200',
  check: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  alert: 'bg-rose-100 text-rose-700 border-rose-200',
  heart: 'bg-pink-100 text-pink-700 border-pink-200'
};

export const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, onRemove, variant = 'display' }) => {
  const Icon = iconMap[strategy.icon] || CheckCircle;
  const themeClass = colorMap[strategy.icon] || colorMap.check;

  // Print Version (Visual Poster Style)
  if (variant === 'print') {
    return (
      <div className="flex flex-col sm:flex-row gap-5 p-5 border border-slate-200 rounded-xl mb-4 bg-white print-break-inside shadow-sm">
        
        {/* Left: Visual Anchor */}
        <div className="flex sm:flex-col items-center sm:w-20 flex-shrink-0 gap-3 pt-1">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${themeClass}`}>
            <Icon size={28} strokeWidth={2.5} />
          </div>
        </div>

        {/* Middle: Content */}
        <div className="flex-grow">
          <h3 className="text-lg font-black text-slate-900 mb-1">{strategy.title}</h3>
          
          <div className="mb-3">
            <p className="text-slate-900 text-[15px] font-semibold leading-snug">
              {strategy.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
             <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide border border-slate-200">
              Why
            </span>
            <span className="text-slate-600 font-medium">
              {strategy.reason}
            </span>
          </div>
        </div>

        {/* Right: The Concrete Example */}
        <div className="sm:w-1/3 flex-shrink-0 bg-slate-50 rounded-lg p-3 border-l-4 border-slate-300">
          <div className="flex gap-2">
            <Quote size={14} className="text-slate-300 flex-shrink-0 transform rotate-180 mt-1" />
            <p className="text-sm text-slate-700 font-medium font-serif leading-relaxed italic">
              {strategy.example}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Display / Edit Mode
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-all relative group">
      {onRemove && (
        <button 
          onClick={() => onRemove(strategy.id)}
          className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
          aria-label="Remove strategy"
        >
          &times;
        </button>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Icon Column */}
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${themeClass}`}>
            <Icon size={20} strokeWidth={2.5} />
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {/* Header & Description */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{strategy.title}</h3>
            <p className="text-slate-800 font-semibold leading-snug">
              {strategy.description}
            </p>
          </div>

          {/* The "Example" Box */}
          <div className="bg-slate-50 rounded-lg p-3 border-l-4 border-slate-300">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Example Scenario</span>
            </div>
            <div className="flex gap-2">
              <p className="text-slate-700 text-sm italic font-medium">
                "{strategy.example}"
              </p>
            </div>
          </div>

          {/* Insight Footer */}
          <div className="flex items-start sm:items-center gap-2 pt-1">
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase tracking-wide flex-shrink-0 mt-0.5 sm:mt-0">
              Insight
            </span>
            <span className="text-sm text-slate-500 font-medium leading-tight">
              {strategy.reason}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};