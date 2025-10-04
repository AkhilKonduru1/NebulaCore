import { Header, EarthScene, RoutingEngine, EconomicsDashboard, QuickStats, SatelliteSizeOptimization } from '@/components';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-space">
      <Header />
      
      <div className="grid grid-cols-12 gap-4 p-4 h-[calc(100vh-88px)]">
        {/* Center - 3D Earth View */}
        <div className="col-span-8 overflow-hidden bg-black">
          <EarthScene />
        </div>

        {/* Right Panel - Live Data */}
        <div className="col-span-4 space-y-4 overflow-y-auto">
          <QuickStats />
          <RoutingEngine />
          <EconomicsDashboard />
          <SatelliteSizeOptimization />
        </div>
      </div>
    </div>
  );
};

export default Index;
