import { useActivities } from "../context/ActivityContext";
import { useMemo } from "react";

export default function AdminChart() {
  const { activities } = useActivities();

  // Calculate weekly activity data
  const weeklyData = useMemo(() => {
    const now = new Date();
    const weeks = [];
    
    // Generate last 4 weeks
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - (i * 7 + 7));
      const weekEnd = new Date(now);
      weekEnd.setDate(now.getDate() - (i * 7));
      
      // Count activities in this week
      const weekActivities = activities.filter(activity => {
        const activityDate = new Date(activity.createdAt || activity.date || now);
        return activityDate >= weekStart && activityDate <= weekEnd;
      });
      
      const approved = weekActivities.filter(a => a.status === 'approved').length;
      const total = weekActivities.length || 1; // Avoid division by zero
      const percentage = Math.round((approved / total) * 100);
      
      weeks.push({
        value: total > 0 ? percentage : 0,
        count: weekActivities.length,
        approved: approved,
        label: `Week ${4 - i}`,
        color: i === 3 ? "from-blue-400 to-blue-600" : 
               i === 2 ? "from-indigo-400 to-indigo-600" :
               i === 1 ? "from-purple-400 to-purple-600" :
               "from-pink-400 to-pink-600"
      });
    }
    
    return weeks;
  }, [activities]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    const values = weeklyData.map(w => w.value).filter(v => v > 0);
    const average = values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
    const peak = values.length > 0 ? Math.max(...values) : 0;
    const low = values.length > 0 ? Math.min(...values) : 0;
    
    // Calculate growth (comparing last week vs first week)
    const firstWeek = weeklyData[0]?.value || 0;
    const lastWeek = weeklyData[weeklyData.length - 1]?.value || 0;
    const growth = firstWeek > 0 ? Math.round(((lastWeek - firstWeek) / firstWeek) * 100) : 0;
    
    return { average, peak, low, growth };
  }, [weeklyData]);

  return (
    <div className="card relative animate-slide">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Activity Statistics
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Weekly activity overview
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Last 4 weeks</span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex gap-6 items-end h-64 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl p-6">
        {weeklyData.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full relative group">
              <div
                style={{ height: `${Math.max(item.value * 2, 20)}px` }}
                className={`w-full bg-gradient-to-t ${item.color} rounded-t-lg transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer relative`}
              >
                {/* Tooltip */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white px-3 py-2 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  <div>{item.value}% Approval Rate</div>
                  <div className="text-gray-300">{item.approved} of {item.count} activities</div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {item.label}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {item.value}%
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center group hover:scale-105 transition-transform cursor-pointer">
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.average}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Average</p>
        </div>
        <div className="text-center group hover:scale-105 transition-transform cursor-pointer">
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.peak}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Peak</p>
        </div>
        <div className="text-center group hover:scale-105 transition-transform cursor-pointer">
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.low}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Low</p>
        </div>
        <div className="text-center group hover:scale-105 transition-transform cursor-pointer">
          <p className={`text-3xl font-bold ${stats.growth >= 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-red-600 dark:text-red-400'}`}>
            {stats.growth >= 0 ? '+' : ''}{stats.growth}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Growth</p>
        </div>
      </div>

      {/* No Data Message */}
      {activities.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
          <div className="text-center p-8">
            <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-gray-600 dark:text-gray-400 font-semibold">No activity data yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Start adding activities to see statistics</p>
          </div>
        </div>
      )}
    </div>
  );
}
