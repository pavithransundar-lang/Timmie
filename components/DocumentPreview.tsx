import React from 'react';
import { Strategy } from '../types';
import { StrategyCard } from './StrategyCard';
import { Printer, FileText } from 'lucide-react';

interface DocumentPreviewProps {
  strategies: Strategy[];
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ strategies }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex justify-between items-center no-print">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FileText className="text-teal-500" size={20} />
          Visual Guide Preview
        </h2>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-md font-medium"
        >
          <Printer size={16} />
          Print Guide
        </button>
      </div>

      {/* A4 Simulation Container */}
      <div className="bg-white shadow-xl mx-auto w-full max-w-[210mm] min-h-[297mm] p-8 md:p-12 relative print:shadow-none print:w-full print:max-w-none print:p-0 overflow-hidden">
        
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-3 bg-teal-500 print:block"></div>

        {/* Document Header */}
        <div className="border-b-2 border-slate-100 pb-6 mb-8 mt-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Classroom Support Guide</h1>
              <div className="flex items-center gap-2">
                <span className="text-xl text-slate-500 font-light">Student:</span>
                <span className="text-xl font-bold text-teal-700 bg-teal-50 px-3 py-0.5 rounded-md">Timmie</span>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-block bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                Learning Support
              </div>
              <p className="text-xs text-gray-400 font-medium">Generated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <h3 className="text-blue-900 font-bold text-sm uppercase mb-1">Quick Reference</h3>
            <p className="text-blue-800 text-sm leading-relaxed">
              These strategies are designed to support self-regulation and independence. 
              Please focus on <span className="font-semibold">visual aids</span> and <span className="font-semibold">clear prompts</span>.
            </p>
          </div>
        </div>

        {/* Strategies List */}
        <div className="flex flex-col gap-0">
          {strategies.map((strategy, index) => (
            <div key={strategy.id} className={index % 2 === 0 ? "bg-white" : "bg-white"}>
              <StrategyCard strategy={strategy} variant="print" />
            </div>
          ))}
        </div>

        {/* Document Footer */}
        <div className="mt-auto pt-8 border-t border-gray-100 text-center text-[10px] text-gray-400 uppercase tracking-widest print:fixed print:bottom-8 print:left-0 print:w-full">
          Confidential • Internal School Use Only • Learning Support Team
        </div>
      </div>
    </div>
  );
};