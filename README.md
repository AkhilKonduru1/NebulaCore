# Orbit Decision Flow

A sophisticated satellite constellation management and optimization platform that demonstrates real-time decision-making for space-based data processing and routing. This application showcases the benefits of edge computing in space through an interactive 2D visualization and comprehensive analytics dashboard.

## 🚀 Features

### 🌍 Interactive 2D Earth Visualization
- Real-time satellite orbit simulation with multiple satellite types
- Dynamic Earth rendering with satellite constellation tracking
- Visual satellite legend and orbit path indicators
- Responsive canvas-based rendering with smooth animations

### 🧠 Intelligent Routing Engine
- Real-time routing decisions between satellites and ground stations
- Smart data flow optimization (satellite-to-hub → hub-to-earth)
- Live cost savings and latency reduction metrics
- Dynamic bandwidth optimization algorithms

### 💰 Economics Dashboard
- Live cost comparison between traditional and edge-enabled processing
- Real-time savings calculations and percentage metrics
- Bandwidth and time reduction tracking
- Projected annual savings projections

### 📊 Satellite Size Optimization
- Comprehensive satellite size comparison analysis
- Collision risk assessment and reduction strategies
- Network effect visualization and impact metrics
- Technical benefits breakdown (launch costs, power consumption, data efficiency)

### ⚡ Advanced Features
- LEO Hub laser data transport technology simulation
- Real-time metrics and performance monitoring
- Interactive simulation controls with speed adjustment
- Comprehensive satellite constellation management

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with comprehensive type definitions
- **Vite** - Fast build tool and development server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Radix UI** - Accessible, unstyled UI components
- **Lucide React** - Beautiful, customizable icons
- **Shadcn/ui** - High-quality, customizable component library

### Graphics & Visualization
- **Canvas API** - 2D graphics rendering for satellite orbits
- **Mathematical Calculations** - Orbit path and satellite position calculations
- **Responsive Scaling** - Dynamic canvas sizing and satellite positioning

### State Management & Data
- **TanStack Query** - Powerful data synchronization for React
- **React Router DOM** - Declarative routing for React applications
- **React Hook Form** - Performant, flexible forms with easy validation

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS post-processing with autoprefixer
- **TypeScript ESLint** - TypeScript-specific linting rules

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/orbit-decision-flow.git
   cd orbit-decision-flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready for deployment.

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── controls/        # Simulation controls and panels
│   ├── dashboard/       # Analytics and monitoring components
│   ├── layout/          # Layout components (Header, etc.)
│   ├── scene/           # 3D scene components
│   └── ui/              # Base UI components (buttons, cards, etc.)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and helpers
├── pages/               # Application pages/routes
└── main.tsx            # Application entry point
```

## 🎯 Key Components

### EarthScene
- **Purpose**: Interactive 2D Earth visualization with satellite orbits
- **Features**: Real-time satellite tracking, orbit path rendering, responsive scaling
- **Technology**: Canvas-based 2D rendering with mathematical orbit calculations

### RoutingEngine
- **Purpose**: Intelligent data routing and decision-making simulation
- **Features**: Real-time routing decisions, cost optimization, latency tracking
- **Technology**: Dynamic state management with simulated routing algorithms

### EconomicsDashboard
- **Purpose**: Financial impact analysis and cost comparison
- **Features**: Live cost tracking, savings calculations, ROI projections
- **Technology**: Real-time metrics with animated counters and progress indicators

### SatelliteSizeOptimization
- **Purpose**: Satellite design optimization and collision risk analysis
- **Features**: Size comparison, risk assessment, network effect visualization
- **Technology**: Interactive charts and comparative analysis tools

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for any environment-specific configurations:

```env
VITE_APP_TITLE=Orbit Decision Flow
VITE_API_BASE_URL=your_api_url_here
```

### Customization
- **Satellite Configuration**: Modify satellite data in `EarthScene.tsx`
- **Routing Logic**: Update routing algorithms in `RoutingEngine.tsx`
- **Styling**: Customize themes in `tailwind.config.ts`
- **Components**: Extend UI components in `src/components/ui/`

## 📊 Performance Metrics

The application demonstrates significant improvements in satellite constellation management:

- **Cost Reduction**: Up to 60% savings compared to traditional ground-based processing
- **Bandwidth Optimization**: 28% reduction in unnecessary data transmission
- **Collision Risk**: 28.5% lower collision probability with optimized satellite sizes
- **Processing Efficiency**: 52% reduction in onboard processing requirements

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Ensure all components are properly typed
- Test your changes thoroughly
- Follow the existing code style and structure

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** community for excellent 3D graphics tools
- **Radix UI** team for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **React** team for the amazing frontend framework

## 📞 Support

For support, questions, or feature requests:
- Open an issue on GitHub
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ for the future of space-based computing**