import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  Atom,
  Star,
  MoreVertical,
  AlertCircle 
} from 'lucide-react';


interface HistoryItem {
  id: string;
  timestamp: string;
  parameters: {
    bandGap?: string;
    symmetry?: string;
    magnetism?: string;
  };
  resultsCount: number;
  status: 'completed' | 'failed' | 'running';
  favorite: boolean;
}

const History: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockHistory: HistoryItem[] = [
    {
      id: '1',
      timestamp: '2025-01-08T10:30:00Z',
      parameters: {
        bandGap: '2.0-3.0 eV',
        symmetry: 'Cubic',
        magnetism: 'Ferromagnetic'
      },
      resultsCount: 15,
      status: 'completed',
      favorite: true
    },
    {
      id: '2',
      timestamp: '2025-01-08T09:15:00Z',
      parameters: {
        bandGap: '1.5 eV',
        symmetry: 'Tetragonal',
        magnetism: 'Diamagnetic'
      },
      resultsCount: 8,
      status: 'completed',
      favorite: false
    },
    {
      id: '3',
      timestamp: '2025-01-07T16:45:00Z',
      parameters: {
        bandGap: '3.5-4.0 eV',
        symmetry: 'Hexagonal',
        magnetism: 'Paramagnetic'
      },
      resultsCount: 12,
      status: 'completed',
      favorite: false
    },
    {
      id: '4',
      timestamp: '2025-01-07T14:20:00Z',
      parameters: {
        bandGap: '0.5 eV',
        symmetry: 'Monoclinic'
      },
      resultsCount: 0,
      status: 'failed',
      favorite: false
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>;
      case 'failed':
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      case 'running':
        return <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>;
      default:
        return <div className="w-2 h-2 bg-slate-300 rounded-full"></div>;
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = JSON.stringify(item.parameters).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Generation History
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Review your past crystal generation sessions and download results.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by parameters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="running">Running</option>
            </select>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(item.status)}
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(item.timestamp)}</span>
                  </div>
                  {item.favorite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(item.parameters).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <p className="text-sm font-medium text-slate-900">{value || 'Any'}</p>
                    </div>
                  ))}
                </div>

                {item.status === 'completed' && (
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2 text-emerald-600">
                      <Atom className="w-4 h-4" />
                      <span>{item.resultsCount} structures generated</span>
                    </div>
                  </div>
                )}

                {item.status === 'failed' && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>Generation failed - check parameters</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {item.status === 'completed' && (
                  <>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <div className="bg-slate-50 rounded-2xl p-12 text-center border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            No Results Found
          </h3>
          <p className="text-slate-500">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default History;