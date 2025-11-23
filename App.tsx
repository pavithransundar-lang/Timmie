import React, { useState, useEffect } from 'react';
import { Strategy, INITIAL_STRATEGIES } from './types';
import { generateNewStrategy } from './services/geminiService';
import { StrategyCard } from './components/StrategyCard';
import { DocumentPreview } from './components/DocumentPreview';
import { Sparkles, Plus, Info, ChevronRight, X } from 'lucide-react';

const SAMPLE_OBSERVATION = "He has shown unregulated behaviour during tidy-up time, potentially harming teachers. This might be related to a long week. We need strategies for safe clean-up routines.";

const App: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>(INITIAL_STRATEGIES);
  const [observation, setObservation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showInput, setShowInput] = useState(true);
  
  // To handle the mobile/desktop layout switch
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const handleGenerate = async () => {
    if (!observation.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const newStrategies = await generateNewStrategy(observation, strategies);
      setStrategies(prev => [...prev, ...newStrategies]);
      setObservation('');
      // On mobile, switch to preview to see result
      if (window.innerWidth < 1024) {
        setActiveTab('preview');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const removeStrategy = (id: string) => {
    setStrategies(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-20 no-print">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
              T
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 hidden sm:block">
              Timmie's Support Station
            </h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-2 rounded-lg text-sm font-medium lg:hidden ${activeTab === 'edit' ? 'bg-slate-100 text-slate-900' : 'text-slate-500'}`}
            >
              Strategies
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium lg:hidden ${activeTab === 'preview' ? 'bg-slate-100 text-slate-900' : 'text-slate-500'}`}
            >
              Document
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 lg:p-6 grid lg:grid-cols-2 gap-8">
        
        {/* Left Column: Input & Live List */}
        <div className={`space-y-6 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'} no-print`}>
          
          {/* AI Input Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="text-teal-500 w-5 h-5" />
                New Observation
              </h2>
              <button 
                onClick={() => setObservation(SAMPLE_OBSERVATION)}
                className="text-xs text-teal-600 hover:text-teal-700 font-medium underline decoration-dotted"
              >
                Use email example
              </button>
            </div>
            
            <div className="relative">
              <textarea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Describe a new behavior or context (e.g., 'Timmie is struggling with sharing during art class...')"
                className="w-full min-h-[120px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none resize-none text-slate-700 placeholder-slate-400"
              />
              {observation && (
                <button 
                  onClick={() => setObservation('')}
                  className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {error && (
              <div className="mt-3 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
                <Info size={16} />
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !observation.trim()}
              className={`mt-4 w-full py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all
                ${isGenerating || !observation.trim() 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg'
                }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing with Gemini...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add Strategy
                </>
              )}
            </button>
          </div>

          {/* Interactive Strategy List */}
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-lg font-bold text-slate-800">Current Strategies</h2>
              <span className="text-sm text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
                {strategies.length} active
              </span>
            </div>
            
            <div className="space-y-4">
              {strategies.map(strategy => (
                <StrategyCard 
                  key={strategy.id} 
                  strategy={strategy} 
                  onRemove={removeStrategy}
                  variant="display"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Document Preview */}
        <div className={`${activeTab === 'edit' ? 'hidden lg:block' : 'block'}`}>
          <div className="lg:sticky lg:top-24">
             {/* Info Box (Desktop only hint) */}
            <div className="hidden lg:flex items-start gap-3 p-4 mb-6 bg-blue-50 text-blue-800 rounded-xl text-sm border border-blue-100 no-print">
              <Info className="flex-shrink-0 mt-0.5" size={16} />
              <p>
                The document on the right updates automatically. You can remove strategies from the left list to customize the final printout.
              </p>
            </div>

            <DocumentPreview strategies={strategies} />
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;