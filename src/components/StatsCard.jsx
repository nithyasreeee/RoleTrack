export default function StatsCard({ title, value, change, icon, color = "blue" }) {
  const colors = {
    blue: "from-blue-500 to-indigo-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-pink-600",
    orange: "from-orange-500 to-red-600"
  };

  const isPositive = change >= 0;

  return (
    <div className="card group hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {value}
          </p>
          {change !== undefined && (
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isPositive ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                )}
              </svg>
              <span>{Math.abs(change)}% from last month</span>
            </div>
          )}
        </div>
        <div className={`w-16 h-16 bg-gradient-to-br ${colors[color]} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
