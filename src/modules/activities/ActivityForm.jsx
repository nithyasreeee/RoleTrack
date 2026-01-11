import { useState } from "react";
import { useActivities } from "../../context/ActivityContext";

export default function ActivityForm({ employeeId, employeeName }) {
  const { dispatch } = useActivities();

  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!date) {
      setError("Please select a date");
      return;
    }

    if (!desc || desc.trim().length < 10) {
      setError("Description must be at least 10 characters");
      return;
    }

    if (desc.trim().length > 500) {
      setError("Description must not exceed 500 characters");
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate > today) {
      setError("Cannot select a future date");
      return;
    }

    // Submit activity
    dispatch({
      type: "ADD",
      payload: { 
        employeeId: employeeId, 
        employeeName: employeeName,
        date: date, 
        description: desc.trim() 
      }
    });

    setDate("");
    setDesc("");
    setSuccess(true);
    
    setTimeout(() => setSuccess(false), 3000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center space-x-2 animate-slide">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl flex items-center space-x-2 animate-slide">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Activity submitted successfully!</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
          value={date}
          onChange={e => setDate(e.target.value)}
          max={today}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          Activity Description <span className="text-red-500">*</span>
        </label>
        <textarea
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all resize-none"
          placeholder="Describe your work activity in detail (minimum 10 characters)..."
          value={desc}
          onChange={e => setDesc(e.target.value)}
          rows={5}
          minLength={10}
          maxLength={500}
          required
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {desc.length}/500 characters {desc.length >= 10 ? "✓" : `(${10 - desc.length} more needed)`}
          </p>
        </div>
      </div>

      <button 
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>Submit Activity</span>
      </button>
    </form>
  );
}
