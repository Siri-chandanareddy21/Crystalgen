import React, { useState } from 'react';
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Settings,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Layers,
  Grid,
  Atom
} from 'lucide-react';

const Visualization: React.FC = () => {
  const [selectedStructure, setSelectedStructure] = useState('TiO₂');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBonds, setShowBonds] = useState(true);
  const [showUnitCell, setShowUnitCell] = useState(true);
  const [viewMode, setViewMode] = useState('ball-stick');

  const structures = [
    { name: 'TiO₂', formula: 'TiO₂', system: 'Tetragonal' },
    { name: 'CaTiO₃', formula: 'CaTiO₃', system: 'Cubic' },
    { name: 'SrTiO₃', formula: 'SrTiO₃', system: 'Cubic' },
    { name: 'BaTiO₃', formula: 'BaTiO₃', system: 'Tetragonal' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Crystal Structure Visualization
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Interactive 3D visualization of generated crystal structures with advanced analysis tools.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Structure Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Structures</span>
            </h3>
            <div className="space-y-2">
              {structures.map((structure) => (
                <button
                  key={structure.name}
                  onClick={() => setSelectedStructure(structure.name)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedStructure === structure.name
                      ? 'bg-blue-50 border border-blue-200 text-blue-900'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="font-medium">{structure.formula}</div>
                  <div className="text-xs text-slate-500">{structure.system}</div>
                </button>
              ))}
            </div>
          </div>

          {/* View Controls */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <span>View Controls</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Rendering Mode
                </label>
                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="ball-stick">Ball & Stick</option>
                  <option value="space-filling">Space Filling</option>
                  <option value="wireframe">Wireframe</option>
                  <option value="polyhedral">Polyhedral</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showBonds}
                    onChange={(e) => setShowBonds(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Show Bonds</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showUnitCell}
                    onChange={(e) => setShowUnitCell(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Show Unit Cell</span>
                </label>
              </div>
            </div>
          </div>

          {/* Animation Controls */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Animation
            </h3>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className={`p-3 rounded-lg transition-all ${
                  isAnimating 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-slate-500 uppercase tracking-wide">
                Rotation Speed
              </label>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                defaultValue="1"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* 3D Viewer */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Viewer Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Atom className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{selectedStructure}</h3>
                    <p className="text-xs text-slate-500">Interactive 3D Structure</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 3D Viewer Area */}
            <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              {/* Placeholder 3D Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className={`mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-emerald-400 flex items-center justify-center ${
                    isAnimating ? 'animate-spin' : ''
                  } transition-all duration-300`}>
                    <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center">
                      <Atom className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="text-white space-y-2">
                    <h4 className="font-semibold">{selectedStructure} Crystal Structure</h4>
                    <p className="text-sm text-slate-300">3D Interactive Visualization</p>
                  </div>
                </div>
              </div>

              {/* Visualization Grid Overlay */}
              {showUnitCell && (
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }}></div>
                </div>
              )}

              {/* Corner Info */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
                <div className="space-y-1">
                  <div>Mode: {viewMode}</div>
                  <div>Bonds: {showBonds ? 'On' : 'Off'}</div>
                  <div>Animation: {isAnimating ? 'Active' : 'Paused'}</div>
                </div>
              </div>
            </div>

            {/* Structure Information */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Space Group:</span>
                  <p className="font-medium text-slate-900">P42/mnm</p>
                </div>
                <div>
                  <span className="text-slate-500">Lattice Parameters:</span>
                  <p className="font-medium text-slate-900">a=4.59Å, c=2.96Å</p>
                </div>
                <div>
                  <span className="text-slate-500">Volume:</span>
                  <p className="font-medium text-slate-900">62.43 Ų</p>
                </div>
                <div>
                  <span className="text-slate-500">Density:</span>
                  <p className="font-medium text-slate-900">4.23 g/cm³</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;