import React from 'react';
import { Download, FileText, Clock, CheckCircle } from 'lucide-react';
import { ProjectFile, User } from '../types';

const MOCK_FILES: ProjectFile[] = [
  { id: '1', projectName: 'Lakeside Villa', type: 'Architectural Plan', date: '2023-10-15', status: 'Completed', downloadUrl: '#' },
  { id: '2', projectName: 'Lakeside Villa', type: 'Cost Estimation PDF', date: '2023-10-20', status: 'Completed', downloadUrl: '#' },
  { id: '3', projectName: 'Downtown Commercial', type: 'Structural Draft', date: '2023-11-02', status: 'Estimation', downloadUrl: '#' },
];

const ClientDashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.name}</h1>
        <p className="text-slate-500">Manage your projects and download your estimation documents.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Your Documents</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Project Name</th>
                <th scope="col" className="px-6 py-3">Document Type</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_FILES.map((file) => (
                <tr key={file.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{file.projectName}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    {file.type}
                  </td>
                  <td className="px-6 py-4">{file.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      file.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      file.status === 'Estimation' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {file.status === 'Completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {file.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a 
                      href={file.downloadUrl} 
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-900 font-medium"
                      onClick={(e) => { e.preventDefault(); alert(`Downloading ${file.projectName} - ${file.type}...`); }}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;