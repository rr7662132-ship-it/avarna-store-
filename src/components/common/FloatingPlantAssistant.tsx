import React, { useState } from 'react';
import { Bot, X, Sparkles, Send, Stethoscope, ChevronDown } from 'lucide-react';
import PlantCareAssistant from '../home/PlantCareAssistant';

const FloatingPlantAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 bg-gradient-to-r from-forest-800 to-emerald-700 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-forest-900/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-emerald-400/30"
            aria-label="Open AI Plant Doctor"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-emerald-200 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
            </div>
            <span className="text-sm font-semibold tracking-wide">Ask Dr. Flora AI</span>
          </button>
        )}
      </div>

      {/* Slide-over / Modal for the AI Assistant */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-forest-900 text-white flex items-center justify-between border-b border-forest-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-forest-700 flex items-center justify-center border border-forest-600">
                  <Bot className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    Dr. Flora • AI Plant Doctor & Care Assistant
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Instant diagnosis, symptom solver & personalized recommendations
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-forest-800 hover:bg-forest-700 flex items-center justify-center text-forest-200 hover:text-white transition-colors"
                aria-label="Close assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto flex-1">
              <PlantCareAssistant />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingPlantAssistant;