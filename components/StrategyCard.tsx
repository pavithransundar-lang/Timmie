import React from 'react';
import { Strategy } from '../types';
import { Clock, Eye, MessageSquare, Wind, CheckCircle, AlertCircle, Heart, Sparkles, Lightbulb } from 'lucide-react';

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

export const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, onRemove, variant = 'display' }) => {
  const Icon = iconMap[strategy.icon] || CheckCircle;

  if (variant === 'print') {
    return (
      <div className="flex gap-5 p-5 border-b border-gray-100 print-break-inside items-start">
        <div className="flex-shrink-0 mt-1 p-2 bg-teal-50 rounded-lg text-teal-700">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-grow">
          <h3 className="text-slate-900 font-bold text-lg mb-2">{strategy.title}</h3>
          
          <div className="mb-3">
            <span className="font-semibold text-slate-700 text-sm uppercase tracking-wide">Strategy:</span>
            <p className="text-slate-800 text-base">{strategy.description}</p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 bg-amber-50 p-3 rounded-lg border border-amber-100">
               <div className="flex items-center gap-2 mb-1">
                 <Lightbulb className="w-3 h-3 text-amber-600" />
                 <span className="text-xs font-bold text-amber-700 uppercase">In Practice</span>
               </div>
               <p className="text-sm text-slate-800 italic">"{strategy.example}"</p>
            </div>
            
            <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
               <div className="flex items-center gap-2 mb-1">
                 <Sparkles className="w-3 h-3 text-indigo-500" />
                 <span className="text-xs font-bold text-indigo-700 uppercase">Why it works</span>
               </div>
               <p className="text-sm text-slate-700">{strategy.reason}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative group">
      {onRemove && (
        <button 
          onClick={() => onRemove(strategy.id)}
          className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
          aria-label="Remove strategy"
        >
          &times;
        </button>
      )}
      
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-teal-100 text-teal-700 rounded-xl shadow-sm">
          <Icon size={24} />
        </div>
        <h3 className="font-bold text-gray-900 text-xl leading-tight">{strategy.title}</h3>
      </div>
      
      <p className="text-gray-700 mb-5 text-lg leading-relaxed border-b border-gray-100 pb-4">
        {strategy.description}
      </p>

      <div className="space-y-3">
        {/* Example Box */}
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 relative">
          <div className="absolute -top-2.5 left-4 bg-white px-2 text-xs font-bold text-amber-600 uppercase tracking-wider border border-amber-100 rounded-full flex items-center gap-1">
            <Lightbulb size={12} />
            Try This
          </div>
          <p className="text-slate-800 font-medium italic">
            "{strategy.example}"
          </p>
        </div>

        {/* Reason Box */}
        <div className="flex items-start gap-3 px-2 pt-2">
           <div className="mt-1">
              <Sparkles size={16} className="text-indigo-400" />
           </div>
           <div>
             <span className="text-xs font-bold text-indigo-500 uppercase tracking-wide block mb-0.5">The Logic</span>
             <p className="text-sm text-slate-500 leading-relaxed">
               {strategy.reason}
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};