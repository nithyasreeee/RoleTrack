import Layout from "../../components/Layout";
import ActivityForm from "../../modules/activities/ActivityForm";
import { useActivities } from "../../context/ActivityContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useMemo } from "react";

export default function EmployeeDashboard() {
  const { activities } = useActivities();
  const { user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const myActivities = activities.filter(a => a.employeeId === user.role);
  const pendingCount = myActivities.filter(a => a.status === "pending").length;
  const approvedCount = myActivities.filter(a => a.status === "approved").length;
  const rejectedCount = myActivities.filter(a => a.status === "rejected").length;

  // Mock employee profile data
  const employeeProfile = useMemo(() => ({
    name: user.role === 'employee' ? 'John Smith' : 'Employee User',
    email: `${user.role}@roletrack.com`,
    role: 'Employee',
    department: 'Engineering',
    employeeId: 'EMP-' + user.role.toUpperCase().slice(0, 4),
    joinedDate: '2025-01-01',
    manager: 'Sarah Johnson',
    status: 'active'
  }), [user.role]);

  // Sort activities by date
  const sortedActivities = useMemo(() => {
    return [...myActivities].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date || 0);
      const dateB = new Date(b.createdAt || b.date || 0);
      return dateB - dateA;
    });
  }, [myActivities]);

  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        {/* Welcome Card */}
        <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome Back, {employeeProfile.name}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Ready to log your activities for today?
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowProfile(true)}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>My Profile</span>
              </button>
              <button
                onClick={() => setShowHistory(true)}
                className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-semibold rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-all flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>History</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card hover:shadow-xl transition-all cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Total Activities</p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">{myActivities.length}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-xl transition-all cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Approved</p>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">{approvedCount}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-xl transition-all cursor-pointer bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{pendingCount}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-xl transition-all cursor-pointer bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-200 dark:border-red-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Rejected</p>
                <p className="text-4xl font-bold text-red-600 dark:text-red-400 mt-2">{rejectedCount}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activity Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ActivityForm />
          </div>

          {/* Quick Tips - Takes 1 column */}
          <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Quick Tips</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Be specific and detailed in your activity descriptions</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Submit activities daily for better tracking</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Include time spent and outcomes achieved</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Minimum 5 characters required for submission</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Recent Activities Preview */}
        {myActivities.length > 0 && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center space-x-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Recent Activities</span>
              </h3>
              <button
                onClick={() => setShowHistory(true)}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold flex items-center space-x-1"
              >
                <span>View All</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              {sortedActivities.slice(0, 5).map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{activity.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.createdAt ? new Date(activity.createdAt).toLocaleString() : 'Recent'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    activity.status === "pending" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                    activity.status === "approved" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : 
                    "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade" onClick={() => setShowProfile(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-3xl shadow-xl">
                    {employeeProfile.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{employeeProfile.name}</h2>
                    <p className="text-blue-100 text-lg">{employeeProfile.role}</p>
                  </div>
                </div>
                <button onClick={() => setShowProfile(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Profile Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: 'Employee ID', value: employeeProfile.employeeId },
                  { label: 'Email', value: employeeProfile.email },
                  { label: 'Department', value: employeeProfile.department },
                  { label: 'Manager', value: employeeProfile.manager },
                  { label: 'Status', value: employeeProfile.status },
                  { label: 'Joined Date', value: new Date(employeeProfile.joinedDate).toLocaleDateString() }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">{item.label}</label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade" onClick={() => setShowHistory(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">Activity History</h2>
                  <p className="text-indigo-100 mt-1">View all your submitted activities</p>
                </div>
                <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-3">
                {sortedActivities.length > 0 ? sortedActivities.map((activity, idx) => (
                  <div key={activity.id} className="p-5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-bold text-gray-500 dark:text-gray-400">#{sortedActivities.length - idx}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            activity.status === "pending" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                            activity.status === "approved" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : 
                            "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          }`}>
                            {activity.status}
                          </span>
                        </div>
                        <p className="text-base font-semibold text-gray-900 dark:text-white mb-2">{activity.description}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Submitted: {activity.createdAt ? new Date(activity.createdAt).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400 font-semibold">No activities yet</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Start submitting your daily activities</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
