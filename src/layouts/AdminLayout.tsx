import { ArrowLeft, Database, ShieldCheck } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import { useStore } from '../context/StoreContext.tsx';

export function AdminLayout() {
  const { health } = useStore();

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25211F]">
      <header className="border-b border-[#25211F]/10 bg-white">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#6E6560] hover:text-[#651E32]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Storefront</span>
            </Link>
            <span className="h-4 w-[1px] bg-[#25211F]/15" aria-hidden="true" />
            <span className="font-display text-xl font-semibold text-[#25211F]">
              Your Brand · Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#6E6560]">
            <span className="inline-flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-[#651E32]" />
              {health?.database.connected ? 'MongoDB Atlas' : 'Demo Fallback'}
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-[#651E32]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Milestone 1 Foundation
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
