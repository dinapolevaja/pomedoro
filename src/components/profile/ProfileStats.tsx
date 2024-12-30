interface ProfileStatsProps {
  totalFocusTime: number;
  longestStreak: number;
  goalsAchieved: number;
  avgSession: number;
}

export function ProfileStats({
  totalFocusTime,
  longestStreak,
  goalsAchieved,
  avgSession
}: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-gray-400 text-sm">Total Focus Time</div>
        <div className="text-2xl font-bold">{totalFocusTime} hrs</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-gray-400 text-sm">Longest Streak</div>
        <div className="text-2xl font-bold">{longestStreak} days</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-gray-400 text-sm">Goals Achieved</div>
        <div className="text-2xl font-bold">{goalsAchieved}%</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-gray-400 text-sm">Avg. Session</div>
        <div className="text-2xl font-bold">{avgSession} min</div>
      </div>
    </div>
  );
}