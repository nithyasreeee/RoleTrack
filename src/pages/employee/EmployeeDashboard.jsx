import Layout from "../../components/Layout";
import ActivityForm from "../../modules/activities/ActivityForm";
import { useActivities } from "../../context/ActivityContext";
import { useAuth } from "../../context/AuthContext";

export default function EmployeeDashboard() {
  const { activities } = useActivities();
  const { user } = useAuth();

  const myActivities = activities.filter(a => a.employeeId === user.role);
  const pendingCount = myActivities.filter(a => a.status === "pending").length;
  const approvedCount = myActivities.filter(a => a.status === "approved").length;

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
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Welcome Back!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Ready to log your activities for today?
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{myActivities.length}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Activities</p>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{approvedCount}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Approved</p>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow">
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingCount}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Pending</p>
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
          <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
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

        {/* Recent Activities */}
        {myActivities.length > 0 && (
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center space-x-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Recent Activities</span>
            </h3>
            <div className="space-y-3">
              {myActivities.slice(0, 5).map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{activity.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.date}</p>
                  </div>
                  <span className={`badge ${
                    activity.status === "pending" ? "badge-warning" :
                    activity.status === "approved" ? "badge-success" : "badge-danger"
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
