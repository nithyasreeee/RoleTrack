export default function StatsCard({ title, value, change, icon, color = "blue" }) {
  const colors = {
    blue: "from-blue-500 to-indigo-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-pink-600",
    orange: "from-orange-500 to-red-600"
  };

  const isPositive = change >= 0;

  return (
    <div className="card group hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 truncate">
            {value}
          </p>
          {change !== undefined && (
            <div className={`flex items-center space-x-1 text-xs sm:text-sm font-semibold ${
              isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isPositive ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                )}
              </svg>
              <span className="truncate">{Math.abs(change)}% from last month</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${colors[color]} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0`}>
          <div className="text-white w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
