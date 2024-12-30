import { useState } from 'react';
import { X } from 'lucide-react';
import { AnalyticsSummary } from './AnalyticsSummary';
import { AnalyticsDetail } from './AnalyticsDetail';
import { AnalyticsRanking } from './AnalyticsRanking';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnalyticsModal({ isOpen, onClose }: AnalyticsModalProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'detail' | 'ranking'>('summary');
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '3months' | '1year'>('7days');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Analytics</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'summary' ? 'bg-[#39FF14] text-gray-900' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'detail' ? 'bg-[#39FF14] text-gray-900' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('detail')}
            >
              Detail
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'ranking' ? 'bg-[#39FF14] text-gray-900' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('ranking')}
            >
              Ranking
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded-lg ${
                timeRange === '7days' ? 'bg-[#39FF14] text-gray-900' : 'text-gray-400'
              }`}
              onClick={() => setTimeRange('7days')}
            >
              7 days
            </button>
            <button
              className={`px-3 py-1 rounded-lg ${
                timeRange === '30days' ? 'bg-[#39FF14] text-gray-900' : 'text-gray-400'
              }`}
              onClick={() => setTimeRange('30days')}
            >
              30 days
            </button>
            <button
              className={`px-3 py-1 rounded-lg ${
                timeRange === '3months' ? 'bg-[#39FF14] text-gray-900' : 'text-gray-400'
              }`}
              onClick={() => setTimeRange('3months')}
            >
              3 months
            </button>
            <button
              className={`px-3 py-1 rounded-lg ${
                timeRange === '1year' ? 'bg-[#39FF14] text-gray-900' : 'text-gray-400'
              }`}
              onClick={() => setTimeRange('1year')}
            >
              1 year
            </button>
          </div>
        </div>

        {activeTab === 'summary' && <AnalyticsSummary timeRange={timeRange} />}
        {activeTab === 'detail' && <AnalyticsDetail timeRange={timeRange} />}
        {activeTab === 'ranking' && <AnalyticsRanking timeRange={timeRange} />}
      </div>
    </div>
  );
}