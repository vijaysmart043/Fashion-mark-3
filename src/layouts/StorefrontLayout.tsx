import { Outlet } from 'react-router-dom';
import { BagDrawer } from '../components/BagDrawer.tsx';
import { Footer } from '../components/Footer.tsx';
import { Header } from '../components/Header.tsx';
import { HealthStatusModal } from '../components/HealthStatusModal.tsx';

export function StorefrontLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8F5EF] text-[#25211F]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BagDrawer />
      <HealthStatusModal />
    </div>
  );
}
