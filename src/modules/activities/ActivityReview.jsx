import { useActivities } from "../../context/ActivityContext";
import EmptyState from "../../components/EmptyState";
import { useState } from "react";

export default function ActivityReview() {
  const { activities, dispatch } = useActivities();
  const [filter, setFilter] = useState("all");

  if (!activities.length) return <EmptyState text="No activities to review" icon="clipboard" />;

  const update = (id, status) => {
    dispatch({ type: "update", id, payload: { status } });
  };

  const filtered = filter === "all" 
    ? activities 
    : activities.filter(a => a.status === filter);

  const statusCounts = {
    pending: activities.filter(a => a.status === "pending").length,
    approved: activities.filter(a => a.status === "approved").length,
    rejected: activities.filter(a => a.status === "rejected").length
  };

  return (
    <div className="card animate-fade">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Activity Review
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Review and manage team activities
          </p>
        </div>
        
        {/* Stats Summary */}
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400">{statusCounts.pending} Pending</span>
          </div>
          <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-semibold text-green-700 dark:text-green-400">{statusCounts.approved} Approved</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        {["all", "pending", "approved", "rejected"].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-all ${
              filter === status
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Activity Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((a, index) => (
          <div 
            key={a.id} 
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-lg group animate-slide"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Activity Log</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {a.date}
                  </p>
                </div>
              </div>
              
              <span className={`badge ${
                a.status === "pending" ? "badge-warning" :
                a.status === "approved" ? "badge-success" : "badge-danger"
              }`}>
                {a.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
              {a.description}
            </p>

            {/* Action Buttons */}
            {a.status === "pending" && (
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={() => update(a.id, "approved")}
                  className="flex-1 btn btn-success btn-sm flex items-center justify-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Approve</span>
                </button>
                <button 
                  onClick={() => update(a.id, "rejected")}
                  className="flex-1 btn btn-danger btn-sm flex items-center justify-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Reject</span>
                </button>
              </div>
            )}

            {/* Status Message for Approved/Rejected */}
            {a.status !== "pending" && (
              <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2 text-sm ${
                a.status === "approved" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {a.status === "approved" ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
                <span className="font-medium capitalize">{a.status}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400">No {filter} activities</p>
        </div>
      )}
    </div>
  );
}
