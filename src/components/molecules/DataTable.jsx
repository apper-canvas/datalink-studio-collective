import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const DataTable = ({ data, columns, emptyMessage = 'No results to display' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8">
        <ApperIcon name="Table" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
        <p className="text-surface-500">{emptyMessage}</p>
      </div>
    );
  }

  const keys = columns || Object.keys(data[0]);

  return (
    <div className="border border-surface-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-surface">
          <tr>
            {keys.map((column) => (
              <th
                key={column}
                className="px-4 py-3 text-left text-sm font-medium text-surface-700 border-b border-surface-200"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-surface-50 transition-colors"
            >
              {keys.map((key, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-sm text-surface-900 border-b border-surface-100 font-mono"
                >
                  {row[key] !== null ? String(row[key]) : (
                    <span className="text-surface-400 italic">NULL</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;