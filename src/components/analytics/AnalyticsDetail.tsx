import { useEffect, useState } from 'react';

interface AnalyticsDetailProps {
  timeRange: '7days' | '30days' | '3months' | '1year';
}

export function AnalyticsDetail({ timeRange }: AnalyticsDetailProps) {
  return (
    <div className="space-y-8">
      <div className="bg-gray-700/50 rounded-xl p-6">
        <h4 className="text-gray-400 text-sm mb-4">Daily Focus Distribution</h4>
        <div className="h-64 flex items-end justify-between">
          {/* Chart implementation will go here */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700/50 rounded-xl p-6">
          <h4 className="text-gray-400 text-sm mb-4">Most Productive Hours</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>9:00 AM</span>
              <div className="h-2 w-3/4 bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-[#39FF14] w-[85%]" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>10:00 AM</span>
              <div className="h-2 w-3/4 bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-[#39FF14] w-[75%]" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>2:00 PM</span>
              <div className="h-2 w-3/4 bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-[#39FF14] w-[65%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-xl p-6">
          <h4 className="text-gray-400 text-sm mb-4">Task Categories</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Development</span>
              <div className="h-2 w-3/4 bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-[#39FF14] w-[60%]" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Design</span>
              <div className="h-2 w-3/4 bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-[#39FF14] w-[25%]" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Planning</span>
              <div className="h-2 w-3/4 bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-[#39FF14] w-[15%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}