import Layout from "../../components/Layout";
import AdminChart from "../../components/AdminChart";
import StatsCard from "../../components/StatsCard";
import { useEmployees } from "../../context/EmployeeContext";
import { useActivities } from "../../context/ActivityContext";
import { useMemo, useState, useEffect } from "react";
import EmployeeModal from "../../components/EmployeeModal";

export default function AdminDashboard() {
  const { employees, dispatch: employeeDispatch } = useEmployees();
  const { activities } = useActivities();
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showAllEmployees, setShowAllEmployees] = useState(false);
  const [showActivityLogs, setShowActivityLogs] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeDetail, setShowEmployeeDetail] = useState(false);
  const [detailEmployee, setDetailEmployee] = useState(null);
  const [sidebarOffset, setSidebarOffset] = useState(288);
  const [mounted, setMounted] = useState(false);

  // Employee list filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // Detect sidebar width changes
  useEffect(() => {
    const updateOffset = () => {
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        setSidebarOffset(sidebar.offsetWidth);
      }
    };
    
    updateOffset();
    
    // Use ResizeObserver to detect sidebar width changes
    const sidebar = document.querySelector('aside');
    if (sidebar) {
      const observer = new ResizeObserver(updateOffset);
      observer.observe(sidebar);
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Recompute sidebar offset when any modal opens/closes to ensure overlays align
  useEffect(() => {
    const updateOffsetNow = () => {
      const sidebar = document.querySelector('aside');
      if (sidebar) setSidebarOffset(sidebar.offsetWidth);
    };

    updateOffsetNow();
  }, [showAllEmployees, showActivityLogs, showEmployeeDetail]);

  // Note: overlay left is driven by `sidebarOffset` state (measured via ResizeObserver)

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

  const viewEmployeeDetails = (emp) => {
    setDetailEmployee(emp);
    setShowEmployeeDetail(true);
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
      const dateB = new Date(a.createdAt || b.date || 0);
      return dateB - dateA;
    });
  }, [activities]);

  const filteredLogs = selectedEmployee 
    ? sortedActivities.filter(a => a.employeeId === selectedEmployee.id)
    : sortedActivities;

  // Filter, search, sort, and paginate employees
  const processedEmployees = useMemo(() => {
    let result = [...employees];

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(emp =>
        emp.name.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.department.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(emp => emp.status === statusFilter);
    }

    // Department filter
    if (departmentFilter !== "all") {
      result = result.filter(emp => emp.department === departmentFilter);
    }

    // Sort
    result.sort((a, b) => {
      let compareA, compareB;
      if (sortBy === "name") {
        compareA = a.name.toLowerCase();
        compareB = b.name.toLowerCase();
      } else if (sortBy === "department") {
        compareA = a.department.toLowerCase();
        compareB = b.department.toLowerCase();
      } else if (sortBy === "status") {
        compareA = a.status;
        compareB = b.status;
      }

      if (sortOrder === "asc") {
        return compareA > compareB ? 1 : -1;
      } else {
        return compareA < compareB ? 1 : -1;
      }
    });

    return result;
  }, [employees, searchQuery, statusFilter, departmentFilter, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(processedEmployees.length / pageSize);
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return processedEmployees.slice(startIndex, startIndex + pageSize);
  }, [processedEmployees, currentPage, pageSize]);

  // Get unique departments for filter
  const departments = useMemo(() => {
    return [...new Set(employees.map(emp => emp.department))];
  }, [employees]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, departmentFilter, sortBy, sortOrder]);

  return (
    <Layout>
      <>
      <div className="space-y-4 sm:space-y-6 animate-fade">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">
              Admin Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-3 sm:px-4 py-2 rounded-lg shadow-sm">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-semibold text-green-700 dark:text-green-400">System Active</span>
          </div>
        </div>

        {/* Stats Grid - Mobile First */}
        <div className="grid-stats">
          <StatsCard
            title="Total Employees"
            value={employees.length}
            change={0}
            color="blue"
            icon={
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Active Employees"
            value={activeEmployees}
            change={0}
            color="green"
            icon={
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Pending Reviews"
            value={pendingActivities}
            change={0}
            color="orange"
            icon={
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Approved Activities"
            value={approvedActivities}
            change={0}
            color="purple"
            icon={
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            }
          />
        </div>

        {/* Chart */}
        <AdminChart />
        
        {/* Quick Actions - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          <button
            onClick={() => {
              setEditingEmployee(null);
              setShowEmployeeModal(true);
            }}
            className="card hover:shadow-2xl transition-all cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-700 group touch-manipulation"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div className="text-left flex-1 min-w-0">
                <h4 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 truncate">Add Employee</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">Create new employee</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setShowAllEmployees(true)}
            className="card hover:shadow-2xl transition-all cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700 group touch-manipulation"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-left flex-1 min-w-0">
                <h4 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 truncate">View All Employees</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">Manage employee list</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => {
              setSelectedEmployee(null);
              setShowActivityLogs(true);
            }}
            className="card hover:shadow-2xl transition-all cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700 group touch-manipulation"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-left flex-1 min-w-0">
                <h4 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 truncate">Activity Logs</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">View full history</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Modals - Rendered outside content wrapper to avoid sidebar overlap */}
      {/* All Employees Modal */}
      {mounted && showAllEmployees && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-2 sm:p-4 animate-fade" 
          onClick={() => setShowAllEmployees(false)}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-2">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white truncate">All Employees</h2>
                  <p className="text-green-100 mt-1 text-xs sm:text-sm truncate">{processedEmployees.length} filtered • {employees.length} total • {activeEmployees} active</p>
                </div>
                <button 
                  onClick={() => setShowAllEmployees(false)} 
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation flex-shrink-0"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Search and Filters - Compact */}
            <div className="bg-gray-50 dark:bg-gray-900/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2 items-center">
                {/* Search Bar - Compact */}
                <div className="relative flex-1 min-w-[200px] max-w-xs">
                  <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Filters - Compact */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Name</option>
                  <option value="department">Department</option>
                  <option value="status">Status</option>
                </select>

                <button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="px-2.5 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  title={sortOrder === "asc" ? "Ascending" : "Descending"}
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>

                <button
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setDepartmentFilter("all");
                    setSortBy("name");
                    setSortOrder("asc");
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1 overflow-x-auto">
              {paginatedEmployees.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full min-w-[320px]">
                    {paginatedEmployees.map((emp) => {
                      const empActivities = activities.filter(a => a.employeeId === emp.id);
                      return (
                        <div 
                          key={emp.id} 
                          className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col h-full cursor-pointer"
                          onClick={() => viewEmployeeDetails(emp)}
                        >
                          {/* Header with Avatar and Status */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0">
                                {emp.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 dark:text-white text-lg truncate mb-1">{emp.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{emp.email}</p>
                              </div>
                            </div>
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ml-3 flex-shrink-0 ${
                              emp.status === "active" 
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" 
                                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                            }`}>
                              {emp.status}
                            </span>
                          </div>

                          {/* Department and Activities Info */}
                          <div className="space-y-3 mb-5 flex-grow">
                            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 px-3 py-2 rounded-lg">
                              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <span className="font-medium">{emp.department}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 px-3 py-2 rounded-lg">
                              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span className="font-medium">{empActivities.length} activities</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-2 mt-auto">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleEditEmployee(emp); }}
                              className="flex-1 min-w-[100px] min-h-[44px] px-3 py-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors flex items-center justify-center space-x-2 touch-manipulation"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); viewEmployeeLogs(emp); }}
                              className="flex-1 min-w-[100px] min-h-[44px] px-3 py-2.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg text-sm font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center justify-center space-x-2 touch-manipulation"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>Logs</span>
                            </button>
                            {emp.status === "active" ? (
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDeactivateEmployee(emp.id); }}
                                className="px-4 py-2.5 min-h-[44px] min-w-[44px] bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center justify-center touch-manipulation"
                                title="Deactivate"
                                aria-label="Deactivate employee"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            ) : (
                              <button
                                onClick={(e) => { e.stopPropagation(); handleActivateEmployee(emp.id); }}
                                className="px-4 py-2.5 min-h-[44px] min-w-[44px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors flex items-center justify-center touch-manipulation"
                                title="Activate"
                                aria-label="Activate employee"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center mt-6 space-x-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 btn btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        // Show first, last, current, and adjacent pages
                        if (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                currentPage === pageNum
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                          return <span key={pageNum} className="px-2 text-gray-500">...</span>;
                        }
                        return null;
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 btn btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400">No employees found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Activity Logs Modal */}
      {mounted && showActivityLogs && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-2 sm:p-4 animate-fade" 
          onClick={() => setShowActivityLogs(false)}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-2">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white truncate">
                    {selectedEmployee ? `${selectedEmployee.name}'s Activity Logs` : 'Full Activity Logs'}
                  </h2>
                  <p className="text-purple-100 mt-1 text-xs sm:text-sm truncate">{filteredLogs.length} total activities</p>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {selectedEmployee && (
                    <button
                      onClick={() => setSelectedEmployee(null)}
                      className="px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors min-h-[44px] touch-manipulation"
                    >
                      Show All
                    </button>
                  )}
                  <button 
                    onClick={() => setShowActivityLogs(false)} 
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                    aria-label="Close modal"
                  >
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
                      <div className="flex flex-col">
                        <div className="flex items-center flex-wrap gap-3 mb-3">
                          <span className="text-sm font-bold text-gray-500 dark:text-gray-400">#{filteredLogs.length - idx}</span>
                          {employee && (
                            <div className="flex items-center space-x-2">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
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
                        <div className="mt-2">
                          <p className="text-base font-medium text-gray-900 dark:text-white mb-2 leading-relaxed">{activity.description}</p>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{activity.createdAt ? new Date(activity.createdAt).toLocaleString() : activity.date}</span>
                          </div>
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
      {mounted && showEmployeeModal && (
        <EmployeeModal 
          close={() => {
            setShowEmployeeModal(false);
            setEditingEmployee(null);
          }} 
          employee={editingEmployee}
        />
      )}

      {/* Employee Detail Modal */}
      {mounted && showEmployeeDetail && detailEmployee && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-2 sm:p-4 animate-fade"
          onClick={() => setShowEmployeeDetail(false)}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0 mr-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-2xl sm:text-3xl shadow-xl flex-shrink-0">
                    {detailEmployee.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white truncate">{detailEmployee.name}</h2>
                    <p className="text-indigo-100 mt-1 text-xs sm:text-sm truncate">{detailEmployee.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEmployeeDetail(false)} 
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation flex-shrink-0"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Employee Details */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Department */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Department</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{detailEmployee.department}</p>
                </div>

                {/* Role */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Role</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{detailEmployee.role || 'N/A'}</p>
                </div>

                {/* Status */}
                <div className={`p-4 rounded-xl border ${
                  detailEmployee.status === 'active' 
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800' 
                    : 'bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className={`w-5 h-5 ${detailEmployee.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className={`text-sm font-semibold ${detailEmployee.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>Status</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">{detailEmployee.status}</p>
                </div>

                {/* Activities */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">Activities</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {activities.filter(a => a.employeeId === detailEmployee.id).length}
                  </p>
                </div>
              </div>

              {/* Joined Date */}
              {detailEmployee.joinedDate && (
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Joined Date</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {new Date(detailEmployee.joinedDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setShowEmployeeDetail(false);
                    handleEditEmployee(detailEmployee);
                  }}
                  className="flex-1 py-3 min-h-[44px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 touch-manipulation"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit Employee</span>
                </button>
                <button
                  onClick={() => {
                    setShowEmployeeDetail(false);
                    viewEmployeeLogs(detailEmployee);
                  }}
                  className="flex-1 py-3 min-h-[44px] bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 touch-manipulation"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>View Logs</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
    </Layout>
  );
}
