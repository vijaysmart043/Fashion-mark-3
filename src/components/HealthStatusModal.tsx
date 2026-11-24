import { CheckCircle2, Database, RefreshCw, Server, X } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export function HealthStatusModal() {
  const { health, healthLoading, healthError, refreshHealth, isHealthModalOpen, setIsHealthModalOpen } =
    useStore();

  if (!isHealthModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#25211F]/55 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Express API and Database Health Status"
    >
      <div className="w-full max-w-lg border border-[#25211F]/15 bg-[#F8F5EF] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#25211F]/10 pb-4">
          <div>
            <p className="text-xs font-medium tracking-wider text-[#651E32] uppercase">
              Live Diagnostics · /api/health
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-[#25211F]">
              Server &amp; Database Status
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsHealthModalOpen(false)}
            aria-label="Close diagnostics"
            className="flex h-10 w-10 items-center justify-center text-[#25211F] hover:text-[#651E32]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {healthError ? (
            <div className="border border-red-300 bg-red-50 p-4 text-sm text-red-900">
              {healthError}
            </div>
          ) : health ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-[#25211F]/10 bg-white p-4">
                  <div className="flex items-center gap-2 text-xs text-[#6E6560]">
                    <Server className="h-3.5 w-3.5 text-[#651E32]" aria-hidden="true" />
                    <span>Express Backend</span>
                  </div>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#25211F]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                    <span>Online ({health.environment})</span>
                  </p>
                  <p className="mt-1 text-xs text-[#6E6560] tabular-nums">
                    Uptime: {health.uptimeSeconds}s
                  </p>
                </div>

                <div className="border border-[#25211F]/10 bg-white p-4">
                  <div className="flex items-center gap-2 text-xs text-[#6E6560]">
                    <Database className="h-3.5 w-3.5 text-[#651E32]" aria-hidden="true" />
                    <span>Storage Mode</span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-[#25211F]">
                    {health.database.connected ? 'MongoDB Atlas' : 'Demo Fallback Mode'}
                  </p>
                  <p className="mt-1 text-xs text-[#6E6560]">
                    State: {health.database.readyStateLabel}
                  </p>
                </div>
              </div>

              <div className="border border-[#25211F]/10 bg-white p-4 text-xs leading-relaxed text-[#25211F]">
                <p className="font-semibold text-[#651E32]">Connection Details</p>
                <p className="mt-1 text-[#6E6560]">{health.database.message}</p>
                <p className="mt-2 text-[#6E6560]">
                  Milestone: <span className="font-medium text-[#25211F]">{health.milestone}</span>
                </p>
                <p className="mt-1 text-[#6E6560]">
                  Cloudinary:{' '}
                  <span className="font-medium text-[#25211F]">
                    {health.features.cloudinaryConfigured
                      ? 'Configured'
                      : 'Not configured (Local sample assets active)'}
                  </span>
                </p>
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#25211F]/10 pt-4">
          <button
            type="button"
            onClick={() => void refreshHealth()}
            disabled={healthLoading}
            className="inline-flex h-10 items-center gap-2 border border-[#25211F]/20 bg-white px-4 text-xs font-semibold text-[#25211F] hover:border-[#651E32] hover:text-[#651E32] disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${healthLoading ? 'animate-spin' : ''}`} />
            <span>{healthLoading ? 'Checking...' : 'Re-check /api/health'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsHealthModalOpen(false)}
            className="h-10 bg-[#651E32] px-5 text-xs font-semibold text-white hover:bg-[#4D1525]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
