import Layout from "../../components/Layout";
import EmployeeList from "../../modules/employees/EmployeeList";
import ActivityReview from "../../modules/activities/ActivityReview";
import AdminChart from "../../components/AdminChart";
import StatsCard from "../../components/StatsCard";
import { useEmployees } from "../../context/EmployeeContext";
import { useActivities } from "../../context/ActivityContext";

export default function AdminDashboard() {
  const { employees } = useEmployees();
  const { activities } = useActivities();

  const activeEmployees = employees.filter(e => e.status === "active").length;
  const pendingActivities = activities.filter(a => a.status === "pending").length;
  const approvedActivities = activities.filter(a => a.status === "approved").length;

  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-4 py-2 rounded-lg shadow">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">System Active</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Employees"
            value={employees.length}
            change={12}
            color="blue"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Active Employees"
            value={activeEmployees}
            change={8}
            color="green"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Pending Reviews"
            value={pendingActivities}
            change={-5}
            color="orange"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Approved Activities"
            value={approvedActivities}
            change={15}
            color="purple"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            }
          />
        </div>

        {/* Chart */}
        <AdminChart />
        
        {/* Employee List */}
        <EmployeeList />
        
        {/* Activity Review */}
        <ActivityReview />
      </div>
    </Layout>
  );
}
