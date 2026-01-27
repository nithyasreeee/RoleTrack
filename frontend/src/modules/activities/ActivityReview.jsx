import { useActivities } from "../../context/ActivityContext";
import { useEmployees } from "../../context/EmployeeContext";
import { useAuth } from "../../context/AuthContext";
import EmptyState from "../../components/EmptyState";
import { useState, useMemo } from "react";

export default function ActivityReview() {
  const { activities, dispatch } = useActivities();
  const { employees } = useEmployees();
  const { user } = useAuth();
  
  const [filter, setFilter] = useState("all");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [actionType, setActionType] = useState(""); // "approve" or "reject"

  // Filter activities based on all criteria
  const filtered = useMemo(() => {
    let result = activities;

    // Status filter
    if (filter !== "all") {
      result = result.filter(a => a.status === filter);
    }

    // Employee filter
    if (employeeFilter !== "all") {
      result = result.filter(a => a.employeeId === employeeFilter);
    }

    // Date range filter
    if (startDate) {
      result = result.filter(a => a.date >= startDate);
    }
    if (endDate) {
      result = result.filter(a => a.date <= endDate);
    }

    return result;
  }, [activities, filter, employeeFilter, startDate, endDate]);

  const statusCounts = useMemo(() => ({
    pending: activities.filter(a => a.status === "pending").length,
    approved: activities.filter(a => a.status === "approved").length,
    rejected: activities.filter(a => a.status === "rejected").length
  }), [activities]);

  const handleActionClick = (activity, action) => {
    setSelectedActivity(activity);
    setActionType(action);
    setRemarks("");
    setShowModal(true);
  };

  const handleSubmitAction = () => {
    if (!selectedActivity) return;

    if (actionType === "approve") {
      dispatch({
        type: "APPROVE",
        id: selectedActivity.id,
        remarks,
        approvedBy: user?.employeeId || user?.role
      });
    } else if (actionType === "reject") {
      dispatch({
        type: "REJECT",
        id: selectedActivity.id,
        remarks,
        rejectedBy: user?.employeeId || user?.role
      });
    }

    setShowModal(false);
    setSelectedActivity(null);
    setRemarks("");
  };

  const clearFilters = () => {
    setFilter("all");
    setEmployeeFilter("all");
    setStartDate("");
    setEndDate("");
  };

  if (!activities.length) return <EmptyState text="No activities to review" icon="clipboard" />;

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

      {/* Filters Section */}
      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Employee Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Employee
            </label>
            <select
              value={employeeFilter}
              onChange={(e) => setEmployeeFilter(e.target.value)}
              className="input w-full"
            >
              <option value="all">All Employees</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} - {emp.department}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input w-full"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input w-full"
            />
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="btn btn-secondary w-full whitespace-nowrap h-[42px]"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
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
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((a, index) => {
          const employee = employees.find(e => e.id === a.employeeId);
          const employeeName = a.employeeName || employee?.name || "Unknown Employee";
          const employeeDept = employee?.department || "N/A";
          
          return (
            <div 
              key={a.id} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all hover:shadow-xl group animate-slide"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Card Header with Status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <div className="w-full h-full rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {employeeName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-gray-900 dark:text-white truncate">
                      {employeeName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {employeeDept}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{a.date}</span>
                    </p>
                  </div>
                </div>
                
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap ml-2 ${
                  a.status === "pending" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                  a.status === "approved" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                }`}>
                  {a.status}
                </span>
              </div>

              {/* Description Box */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Description:</p>
                <p className="text-base font-medium text-gray-900 dark:text-white leading-relaxed break-words">
                  {a.description}
                </p>
              </div>

              {/* Remarks Display */}
              {a.remarks && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-4">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">
                    {a.status === "approved" ? "Approval" : "Rejection"} Remarks:
                  </p>
                  <p className="text-sm text-blue-900 dark:text-blue-300">{a.remarks}</p>
                </div>
              )}

              {/* Action Buttons */}
              {a.status === "pending" && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    onClick={() => handleActionClick(a, "approve")}
                    className="flex-1 btn btn-success btn-sm flex items-center justify-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Approve</span>
                  </button>
                  <button 
                    onClick={() => handleActionClick(a, "reject")}
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
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400">No {filter} activities found</p>
        </div>
      )}

      {/* Remarks Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full animate-fade">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {actionType === "approve" ? "Approve" : "Reject"} Activity
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Activity by: <span className="font-semibold">{selectedActivity?.employeeName}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Date: <span className="font-semibold">{selectedActivity?.date}</span>
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Remarks (Optional)
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder={`Add ${actionType === "approve" ? "approval" : "rejection"} remarks...`}
                className="input w-full h-24 resize-none"
                maxLength={200}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {remarks.length}/200 characters
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAction}
                className={`flex-1 btn ${actionType === "approve" ? "btn-success" : "btn-danger"}`}
              >
                {actionType === "approve" ? "Approve" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
