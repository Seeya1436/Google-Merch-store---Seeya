import React, { useState, useEffect } from 'react';
import { Activity, ChevronUp, ChevronDown, Trash2, X, CheckCircle2, Copy } from 'lucide-react';
import { subscribeToGA4Events, getRecentGA4Events, clearGA4Events, GA4EventRecord } from '../../utils/analytics';
import { GoogleGIcon, GoogleColorDots } from './GoogleLogo';

export const GA4LiveTracker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<GA4EventRecord[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setEvents(getRecentGA4Events());
    const unsubscribe = subscribeToGA4Events((newRecord) => {
      setEvents((prev) => [newRecord, ...prev.slice(0, 49)]);
    });
    return unsubscribe;
  }, []);

  const handleCopyJson = (ev: GA4EventRecord) => {
    navigator.clipboard?.writeText(JSON.stringify(ev, null, 2));
    setCopiedId(ev.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 z-40 max-w-sm sm:max-w-md w-full pointer-events-none font-sans">
      <div className="pointer-events-auto">
        {/* Collapsed Badge Pill */}
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-2.5 bg-neutral-900/90 hover:bg-neutral-900 text-white backdrop-blur-md px-3.5 py-2 rounded-full shadow-xl border border-neutral-700/80 text-xs font-medium transition-all hover:scale-105 group"
            title="Open GA4 Ecommerce Event Inspector"
          >
            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5">
              <GoogleGIcon className="w-full h-full" />
            </div>
            <span className="font-mono font-bold tracking-tight text-[#4285F4]">GA4 Live</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] text-neutral-300 font-mono">
              {events.length} {events.length === 1 ? 'event' : 'events'}
            </span>
            <ChevronUp className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
          </button>
        ) : (
          /* Expanded Log Console Drawer */
          <div className="bg-neutral-950 text-white rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
            {/* Header */}
            <div className="p-3.5 px-4 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5">
                  <GoogleGIcon className="w-full h-full" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-1.5">
                    <span>GA4 Ecommerce Inspector</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-mono">dataLayer &amp; gtag event stream</p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => {
                    clearGA4Events();
                    setEvents([]);
                  }}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                  title="Clear event logs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                  title="Minimize"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Event List */}
            <div className="max-h-72 overflow-y-auto p-3 space-y-2 font-mono text-[11px] divide-y divide-neutral-900">
              {events.length === 0 ? (
                <div className="py-8 text-center text-neutral-500">
                  <Activity className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p>Awaiting ecommerce interactions...</p>
                  <p className="text-[10px] text-neutral-600 mt-1">Browse products, add to cart, or search</p>
                </div>
              ) : (
                events.map((ev) => (
                  <div key={ev.id} className="pt-2 first:pt-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-blue-400 font-bold">
                          {ev.eventName}
                        </span>
                        <span className="text-[10px] text-neutral-500">{ev.timestamp}</span>
                      </div>
                      <button
                        onClick={() => handleCopyJson(ev)}
                        className="text-[10px] text-neutral-400 hover:text-white flex items-center space-x-1"
                        title="Copy event JSON"
                      >
                        {copiedId === ev.id ? (
                          <span className="text-emerald-400 flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-0.5" /> Copied
                          </span>
                        ) : (
                          <Copy className="w-3 h-3 opacity-60 hover:opacity-100" />
                        )}
                      </button>
                    </div>

                    <pre className="text-[10px] bg-neutral-900/60 p-2 rounded-xl text-neutral-300 overflow-x-auto border border-neutral-800/60">
                      {JSON.stringify(ev.params, null, 2)}
                    </pre>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-2.5 px-4 bg-neutral-900/50 border-t border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
              <div className="flex items-center space-x-1.5">
                <GoogleColorDots size="w-1 h-1" />
                <span>Standard GA4 Format</span>
              </div>
              <span>{events.length} Recorded</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
