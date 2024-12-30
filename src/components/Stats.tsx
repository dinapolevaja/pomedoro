import { FC } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

export const Stats: FC = () => {
  const { analytics, loading } = useAnalytics('7days');

  if (loading || !analytics) {
    return (
      <div className="grid grid-cols-4 gap-8 w-full max-w-3xl">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-gray-700 rounded mb-2" />
            <div className="h-6 bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-8 w-full max-w-3xl">
      <div className="bg-gray-800 rounded-xl p-6 text-center">
        <div className="text-gray-400 mb-2">Sessions</div>
        <div className="text-2xl font-bold">
          {analytics.sessionsCompleted}/{analytics.totalSessions}
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-6 text-center">
        <div className="text-gray-400 mb-2">Daily Goal</div>
        <div className="text-2xl font-bold">{analytics.dailyProgress}%</div>
      </div>
      <div className="bg-gray-800 rounded-xl p-6 text-center">
        <div className="text-gray-400 mb-2">Streak</div>
        <div className="text-2xl font-bold">{analytics.currentStreak} days</div>
      </div>
      <div className="bg-gray-800 rounded-xl p-6 text-center">
        <div className="text-gray-400 mb-2">Focus Time</div>
        <div className="text-2xl font-bold">{analytics.totalFocusTime} hrs</div>
      </div>
    </div>
  );
};