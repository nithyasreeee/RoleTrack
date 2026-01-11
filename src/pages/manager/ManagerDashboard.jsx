import Layout from "../../components/Layout";
import ActivityReview from "../../modules/activities/ActivityReview";
import { useActivities } from "../../context/ActivityContext";
import StatsCard from "../../components/StatsCard";

export default function ManagerDashboard() {
  const { activities } = useActivities();

  const pendingCount = activities.filter(a => a.status === "pending").length;
  const approvedCount = activities.filter(a => a.status === "approved").length;
  const rejectedCount = activities.filter(a => a.status === "rejected").length;

  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        {/* Header */}
        <div className="card bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                  Manager Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Review and approve team activities efficiently
                </p>
              </div>
            </div>
            {pendingCount > 0 && (
              <div className="bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-300 dark:border-yellow-700 px-4 py-3 rounded-xl shadow-lg animate-bounce-subtle">
                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{pendingCount}</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-500 font-semibold">Pending Reviews</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Pending Activities"
            value={pendingCount}
            color="orange"
            icon={(
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          />
          <StatsCard
            title="Approved"
            value={approvedCount}
            change={18}
            color="green"
            icon={(
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          />
          <StatsCard
            title="Rejected"
            value={rejectedCount}
            change={-12}
            color="purple"
            icon={(
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          />
        </div>

        {/* Activity Review */}
        <ActivityReview />

        {/* No Pending Message */}
        {pendingCount === 0 && activities.length > 0 && (
          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-800 dark:text-green-300">All Caught Up!</h3>
                <p className="text-sm text-green-600 dark:text-green-400">There are no pending activities to review right now.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
