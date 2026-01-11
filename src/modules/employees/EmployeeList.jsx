import { useEmployees } from "../../context/EmployeeContext";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import EmptyState from "../../components/EmptyState";
import EmployeeModal from "../../components/EmployeeModal";


export default function EmployeeList() {
  const { employees } = useEmployees();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(0);

  const pageSize = 5;
  const [showModal, setShowModal] = useState(false);


  let data = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort) data.sort((a, b) => a[sort].localeCompare(b[sort]));

  const paginated = data.slice(page * pageSize, (page + 1) * pageSize);

  if (!employees.length) return <EmptyState text="No employees yet" />;

  return (
    <div className="card animate-fade">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Employee Directory
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {data.length} {data.length === 1 ? 'employee' : 'employees'} found
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Employee</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="input pl-10"
            placeholder="Search by name..."
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select 
          className="input sm:w-48" 
          onChange={e => setSort(e.target.value)}
          value={sort}
        >
          <option value="">Sort by...</option>
          <option value="name">Name (A-Z)</option>
          <option value="department">Department</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(e => (
              <tr key={e.id}>
                <td data-label="Name">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                      {e.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{e.name}</span>
                  </div>
                </td>
                <td data-label="Department">
                  <span className="badge badge-info">{e.department}</span>
                </td>
                <td data-label="Status">
                  <span className={`badge ${
                    e.status === "active" ? "badge-success" : "badge-danger"
                  }`}>
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} total={data.length} setPage={setPage} />
      
      {showModal && <EmployeeModal close={() => setShowModal(false)} />}
    </div>
  );
}
