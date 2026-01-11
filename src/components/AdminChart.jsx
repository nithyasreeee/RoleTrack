export default function AdminChart() {
  const data = [
    { value: 40, label: "Week 1", color: "from-blue-400 to-blue-600" },
    { value: 70, label: "Week 2", color: "from-indigo-400 to-indigo-600" },
    { value: 55, label: "Week 3", color: "from-purple-400 to-purple-600" },
    { value: 90, label: "Week 4", color: "from-pink-400 to-pink-600" }
  ];

  return (
    <div className="card animate-slide">
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

      <div className="flex gap-6 items-end h-64 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl p-6">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full relative group">
              <div
                style={{ height: `${item.value * 2}px` }}
                className={`w-full bg-gradient-to-t ${item.color} rounded-t-lg transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer relative`}
              >
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.value}% Activity
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <div className="border-4 border-transparent border-t-gray-900"></div>
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
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">64%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Average</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">90%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Peak</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">40%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Low</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-indigo-600">+12%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Growth</p>
        </div>
      </div>
    </div>
  );
}
