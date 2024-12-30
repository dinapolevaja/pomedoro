import { useAnalytics } from '../../hooks/useAnalytics';

interface AnalyticsSummaryProps {
  timeRange: '7days' | '30days' | '3months' | '1year';
}

export function AnalyticsSummary({ timeRange }: AnalyticsSummaryProps) {
  const { analytics, loading, error } = useAnalytics(timeRange);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#39FF14] border-t-transparent" />
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="text-center py-8 text-red-500">
        {error || 'Failed to load analytics'}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-700/50 rounded-xl p-6">
          <h4 className="text-gray-400 text-sm mb-2">Total Focus Time</h4>
          <div className="text-3xl font-bold">{analytics.totalFocusTime} hrs</div>
          <div className="text-sm text-gray-400 mt-1">
            {analytics.focusTimeChange > 0 ? '+' : ''}{analytics.focusTimeChange} hrs from last {timeRange}
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-xl p-6">
          <h4 className="text-gray-400 text-sm mb-2">Tasks Completed</h4>
          <div className="text-3xl font-bold">{analytics.tasksCompleted}</div>
          <div className="text-sm text-gray-400 mt-1">
            {analytics.tasksCompletedChange > 0 ? '+' : ''}{analytics.tasksCompletedChange} from last {timeRange}
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-xl p-6">
          <h4 className="text-gray-400 text-sm mb-2">Focus Score</h4>
          <div className="text-3xl font-bold">{analytics.focusScore}%</div>
          <div className="text-sm text-gray-400 mt-1">
            {analytics.focusScoreChange > 0 ? '+' : ''}{analytics.focusScoreChange}% from last {timeRange}
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-xl p-6">
          <h4 className="text-gray-400 text-sm mb-2">Current Streak</h4>
          <div className="text-3xl font-bold">{analytics.currentStreak} days</div>
          <div className="text-sm text-gray-400 mt-1">
            Best: {analytics.bestStreak} days
          </div>
        </div>
      </div>

      {/* Other sections remain the same but use analytics data */}
    </div>
  );
}