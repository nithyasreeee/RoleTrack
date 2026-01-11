import { useState } from "react";
import { useActivities } from "../../context/ActivityContext";
import { useAuth } from "../../context/AuthContext";

export default function ActivityForm() {
  const { dispatch } = useActivities();
  const { user } = useAuth();

  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (!date || desc.length < 5) {
      setError("Invalid input");
      return;
    }

    dispatch({
      type: "add",
      payload: { employeeId: user.role, date, description: desc }
    });

    setDate("");
    setDesc("");
    setError("");
  };

  return (
    <div className="card animate-slide">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Submit Activity
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Log your daily work activities
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-4 flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Date
          </label>
          <input
            type="date"
            className="input"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Activity Description
          </label>
          <textarea
            className="input min-h-[120px] resize-none"
            placeholder="Describe what you worked on today..."
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Minimum 5 characters required
          </p>
        </div>

        <button 
          onClick={submit}
          className="btn btn-primary w-full flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Submit Activity</span>
        </button>
      </div>
    </div>
  );
}
