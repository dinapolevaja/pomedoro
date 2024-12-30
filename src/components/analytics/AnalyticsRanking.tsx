interface AnalyticsRankingProps {
  timeRange: '7days' | '30days' | '3months' | '1year';
}

export function AnalyticsRanking({ timeRange }: AnalyticsRankingProps) {
  return (
    <div className="space-y-8">
      <div className="bg-gray-700/50 rounded-xl p-6">
        <h4 className="text-gray-400 text-sm mb-4">Top Focus Sessions</h4>
        <div className="space-y-4">
          {[1, 2, 3].map((rank) => (
            <div key={rank} className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-gray-400">#{rank}</div>
              <div className="flex-1">
                <div className="font-medium">Project Planning</div>
                <div className="text-sm text-gray-400">March 15, 2024</div>
              </div>
              <div className="text-[#39FF14]">2h 45m</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-700/50 rounded-xl p-6">
        <h4 className="text-gray-400 text-sm mb-4">Most Productive Days</h4>
        <div className="space-y-4">
          {[1, 2, 3].map((rank) => (
            <div key={rank} className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-gray-400">#{rank}</div>
              <div className="flex-1">
                <div className="font-medium">Tuesday, March 12</div>
                <div className="text-sm text-gray-400">8 tasks completed</div>
              </div>
              <div className="text-[#39FF14]">6h 30m</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-700/50 rounded-xl p-6">
        <h4 className="text-gray-400 text-sm mb-4">Achievement Progress</h4>
        <div className="space-y-4">
          {[1, 2, 3].map((rank) => (
            <div key={rank} className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-gray-400">#{rank}</div>
              <div className="flex-1">
                <div className="font-medium">Focus Master</div>
                <div className="text-sm text-gray-400">90/100 hours</div>
              </div>
              <div className="text-[#39FF14]">90%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}