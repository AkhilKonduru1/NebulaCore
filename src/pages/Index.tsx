import Header from '@/components/Header';
import EarthScene from '@/components/EarthScene';
import SatelliteStatus from '@/components/SatelliteStatus';
import RoutingEngine from '@/components/RoutingEngine';
import EconomicsDashboard from '@/components/EconomicsDashboard';
import QuickStats from '@/components/QuickStats';
import SatelliteSizeOptimization from '@/components/SatelliteSizeOptimization';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-space">
      <Header />
      
      <div className="grid grid-cols-12 gap-4 p-4 h-[calc(100vh-88px)]">
        {/* Center - 3D Earth View */}
        <div className="col-span-8 rounded-xl overflow-hidden border border-border shadow-card bg-card/30 backdrop-blur-sm">
          <EarthScene />
        </div>

        {/* Right Panel - Live Data */}
        <div className="col-span-4 space-y-4 overflow-y-auto">
          <QuickStats />
          <SatelliteStatus />
          <RoutingEngine />
          <EconomicsDashboard />
          <SatelliteSizeOptimization />
        </div>
      </div>
    </div>
  );
};

export default Index;
