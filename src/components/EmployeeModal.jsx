import { useState, useEffect } from "react";
import { useEmployees } from "../context/EmployeeContext";

export default function EmployeeModal({ close, employee }) {
  const { dispatch } = useEmployees();

  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setName(employee.name || "");
      setDept(employee.department || "");
      setEmail(employee.email || "");
    }
  }, [employee]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!dept.trim()) newErrors.dept = "Department is required";
    if (employee && !email.trim()) newErrors.email = "Email is required";
    if (employee && email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    return newErrors;
  };

  const save = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    if (employee) {
      // Update existing employee
      dispatch({ 
        type: "update", 
        id: employee.id, 
        payload: { name, department: dept, email } 
      });
    } else {
      // Add new employee
      dispatch({ type: "add", payload: { name, department: dept } });
    }
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade">
      <div 
        className="absolute inset-0" 
        onClick={close}
      ></div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl relative z-10 animate-slide">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {employee ? 'Edit Employee' : 'Add Employee'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {employee ? 'Update employee information' : 'Create a new employee record'}
              </p>
            </div>
          </div>
          <button 
            onClick={close}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className={`input ${errors.name ? 'input-error' : ''}`}
              value={name}
              onChange={e => {
                setName(e.target.value);
                setErrors(prev => ({ ...prev, name: '' }));
              }}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Department *
            </label>
            <select
              className={`input ${errors.dept ? 'input-error' : ''}`}
              value={dept}
              onChange={e => {
                setDept(e.target.value);
                setErrors(prev => ({ ...prev, dept: '' }));
              }}
            >
              <option value="">Select department</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
            {errors.dept && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.dept}
              </p>
            )}
          </div>

          {employee && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                placeholder="john.doe@company.com"
                className={`input ${errors.email ? 'input-error' : ''}`}
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setErrors(prev => ({ ...prev, email: '' }));
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
          <button 
            onClick={close}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button 
            onClick={save} 
            className="btn btn-primary flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {employee ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              )}
            </svg>
            <span>{employee ? 'Update Employee' : 'Add Employee'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
