import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-neutral-900 text-white rounded-2xl p-4 shadow-2xl border border-neutral-800 flex items-start space-x-3 transition-all animate-in slide-in-from-bottom-5 duration-200"
        >
          {toast.productImage ? (
            <img
              src={toast.productImage}
              alt=""
              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-neutral-700 bg-neutral-800"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-white tracking-tight">{toast.title}</h5>
            {toast.description && (
              <p className="text-xs text-neutral-300 mt-0.5 truncate">{toast.description}</p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 shrink-0 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
