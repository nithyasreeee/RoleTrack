import Layout from "../../components/Layout";
import ActivityReview from "../../modules/activities/ActivityReview";
import { useActivities } from "../../context/ActivityContext";
import { useEmployees } from "../../context/EmployeeContext";
import StatsCard from "../../components/StatsCard";
import { useState } from "react";

export default function ManagerDashboard() {
  const { activities } = useActivities();
  const { employees } = useEmployees();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  const pendingCount = activities.filter(a => a.status === "pending").length;
  const approvedCount = activities.filter(a => a.status === "approved").length;
  const rejectedCount = activities.filter(a => a.status === "rejected").length;

  // Filter assigned employees (for demo, showing all active employees)
  const assignedEmployees = employees.filter(e => e.status === "active");

  const viewEmployeeDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeModal(true);
  };

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
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Manager Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Review team activities and manage your employees
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Team Members"
            value={assignedEmployees.length}
            change={5}
            color="blue"
            icon={(
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )}
          />
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

        {/* Assigned Employees Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center space-x-2">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Assigned Employees</span>
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                View and manage your team members
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignedEmployees.map((employee) => {
              const employeeActivities = activities.filter(a => a.employeeId === employee.id);
              const recentActivity = employeeActivities[employeeActivities.length - 1];
              
              return (
                <div
                  key={employee.id}
                  className="group p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all cursor-pointer hover:shadow-xl"
                  onClick={() => viewEmployeeDetails(employee)}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {employee.name?.charAt(0) || 'E'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {employee.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{employee.role || 'Employee'}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Department:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{employee.department || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Activities:</span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{employeeActivities.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        employee.status === 'active' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {employee.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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

      {/* Employee Details Modal */}
      {showEmployeeModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade" onClick={() => setShowEmployeeModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl shadow-xl">
                    {selectedEmployee.name?.charAt(0) || 'E'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedEmployee.name}</h2>
                    <p className="text-indigo-100">{selectedEmployee.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEmployeeModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Employee Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Employee Information (Read-Only)</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Full Name</label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{selectedEmployee.name}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Email</label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{selectedEmployee.email || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Department</label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{selectedEmployee.department || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Role</label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{selectedEmployee.role || 'Employee'}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Status</label>
                    <p className={`text-lg font-bold mt-1 ${
                      selectedEmployee.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {selectedEmployee.status}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Joined Date</label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                      {selectedEmployee.joinedDate ? new Date(selectedEmployee.joinedDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Activity Summary */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Activity Summary</span>
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {['pending', 'approved', 'rejected'].map((status) => {
                    const count = activities.filter(a => a.employeeId === selectedEmployee.id && a.status === status).length;
                    return (
                      <div key={status} className="p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-center">
                        <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{count}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 capitalize">{status}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
