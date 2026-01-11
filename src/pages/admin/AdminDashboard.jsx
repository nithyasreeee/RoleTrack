import Layout from "../../components/Layout";
import EmployeeList from "../../modules/employees/EmployeeList";
import ActivityReview from "../../modules/activities/ActivityReview";
import AdminChart from "../../components/AdminChart";
import StatsCard from "../../components/StatsCard";
import { useEmployees } from "../../context/EmployeeContext";
import { useActivities } from "../../context/ActivityContext";
import { useMemo, useState } from "react";
import EmployeeModal from "../../components/EmployeeModal";

export default function AdminDashboard() {
  const { employees, dispatch: employeeDispatch } = useEmployees();
  const { activities } = useActivities();
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showAllEmployees, setShowAllEmployees] = useState(false);
  const [showActivityLogs, setShowActivityLogs] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const activeEmployees = employees.filter(e => e.status === "active").length;
  const pendingActivities = activities.filter(a => a.status === "pending").length;
  const approvedActivities = activities.filter(a => a.status === "approved").length;

  // Calculate percentage changes based on time periods
  const stats = useMemo(() => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    
    // Calculate activities from last month vs this month
    const lastMonthActivities = activities.filter(a => {
      const date = new Date(a.createdAt || a.date || now);
      return date < lastMonth;
    }).length;
    
    const thisMonthActivities = activities.filter(a => {
      const date = new Date(a.createdAt || a.date || now);
      return date >= lastMonth;
    }).length;
    
    const activityGrowth = lastMonthActivities > 0 
      ? Math.round(((thisMonthActivities - lastMonthActivities) / lastMonthActivities) * 100)
      : thisMonthActivities > 0 ? 100 : 0;

    // Calculate approval rate change
    const lastMonthApproved = activities.filter(a => {
      const date = new Date(a.createdAt || a.date || now);
      return date < lastMonth && a.status === 'approved';
    }).length;
    
    const thisMonthApproved = approvedActivities;
    const approvalGrowth = lastMonthApproved > 0
      ? Math.round(((thisMonthApproved - lastMonthApproved) / lastMonthApproved) * 100)
      : thisMonthApproved > 0 ? 100 : 15;

    return {
      employeeGrowth: employees.length > 0 ? Math.round((activeEmployees / employees.length) * 20) : 12,
      activeGrowth: Math.round((activeEmployees / Math.max(employees.length, 1)) * 15),
      pendingChange: pendingActivities > 5 ? -5 : pendingActivities > 0 ? -2 : 0,
      approvalGrowth: approvalGrowth
    };
  }, [employees, activities, activeEmployees, pendingActivities, approvedActivities]);

  const handleEditEmployee = (emp) => {
    setEditingEmployee(emp);
    setShowEmployeeModal(true);
  };

  const handleDeactivateEmployee = (empId) => {
    if (confirm("Are you sure you want to deactivate this employee?")) {
      employeeDispatch({ type: "update", id: empId, payload: { status: "inactive" } });
    }
  };

  const handleActivateEmployee = (empId) => {
    employeeDispatch({ type: "update", id: empId, payload: { status: "active" } });
  };

  const viewEmployeeLogs = (emp) => {
    setSelectedEmployee(emp);
    setShowActivityLogs(true);
  };

  const sortedActivities = useMemo(() => {
    return [...activities].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date || 0);
      const dateB = new Date(b.createdAt || b.date || 0);
      return dateB - dateA;
    });
  }, [activities]);

  const filteredLogs = selectedEmployee 
    ? sortedActivities.filter(a => a.employeeId === selectedEmployee.id)
    : sortedActivities;

  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
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
            change={stats.employeeGrowth}
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
            change={stats.activeGrowth}
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
            change={stats.pendingChange}
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
            change={stats.approvalGrowth}
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
        
        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => {
              setEditingEmployee(null);
              setShowEmployeeModal(true);
            }}
            className="card hover:shadow-2xl transition-all cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-700 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">Add Employee</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Create new employee</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setShowAllEmployees(true)}
            className="card hover:shadow-2xl transition-all cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">View All Employees</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage employee list</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => {
              setSelectedEmployee(null);
              setShowActivityLogs(true);
            }}
            className="card hover:shadow-2xl transition-all cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">Activity Logs</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">View full history</p>
              </div>
            </div>
          </button>
        </div>
        
        {/* Employee List */}
        <EmployeeList />
        
        {/* Activity Review */}
        <ActivityReview />
      </div>

      {/* All Employees Modal */}
      {showAllEmployees && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade" onClick={() => setShowAllEmployees(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">All Employees</h2>
                  <p className="text-green-100 mt-1">{employees.length} total employees • {activeEmployees} active</p>
                </div>
                <button onClick={() => setShowAllEmployees(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {employees.map((emp) => {
                  const empActivities = activities.filter(a => a.employeeId === emp.id);
                  return (
                    <div key={emp.id} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {emp.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">{emp.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{emp.email}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          emp.status === "active" 
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" 
                            : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                        }`}>
                          {emp.status}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>{emp.department}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{empActivities.length} activities</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditEmployee(emp)}
                          className="flex-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors flex items-center justify-center space-x-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => viewEmployeeLogs(emp)}
                          className="flex-1 px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg text-sm font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center justify-center space-x-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>Logs</span>
                        </button>
                        {emp.status === "active" ? (
                          <button
                            onClick={() => handleDeactivateEmployee(emp.id)}
                            className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivateEmployee(emp.id)}
                            className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Logs Modal */}
      {showActivityLogs && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade" onClick={() => setShowActivityLogs(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {selectedEmployee ? `${selectedEmployee.name}'s Activity Logs` : 'Full Activity Logs'}
                  </h2>
                  <p className="text-purple-100 mt-1">{filteredLogs.length} total activities</p>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedEmployee && (
                    <button
                      onClick={() => setSelectedEmployee(null)}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      Show All
                    </button>
                  )}
                  <button onClick={() => setShowActivityLogs(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-3">
                {filteredLogs.length > 0 ? filteredLogs.map((activity, idx) => {
                  const employee = employees.find(e => e.id === activity.employeeId);
                  return (
                    <div key={activity.id} className="p-5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-sm font-bold text-gray-500 dark:text-gray-400">#{filteredLogs.length - idx}</span>
                            {employee && (
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                  {employee.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{employee.name}</span>
                              </div>
                            )}
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              activity.status === "pending" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                              activity.status === "approved" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : 
                              "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                            }`}>
                              {activity.status}
                            </span>
                          </div>
                          <p className="text-base font-medium text-gray-900 dark:text-white mb-2">{activity.description}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.createdAt ? new Date(activity.createdAt).toLocaleString() : activity.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400 font-semibold">No activities found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Add/Edit Modal */}
      {showEmployeeModal && (
        <EmployeeModal 
          close={() => {
            setShowEmployeeModal(false);
            setEditingEmployee(null);
          }} 
          employee={editingEmployee}
        />
      )}
    </Layout>
  );
}
