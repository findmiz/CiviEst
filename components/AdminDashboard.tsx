import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MonthlyProfit } from '../types';
import { TrendingUp, DollarSign, Users } from 'lucide-react';

const data: MonthlyProfit[] = [
  { month: 'Jan', revenue: 40000, expenses: 24000, profit: 16000 },
  { month: 'Feb', revenue: 30000, expenses: 13980, profit: 16020 },
  { month: 'Mar', revenue: 20000, expenses: 9800, profit: 10200 },
  { month: 'Apr', revenue: 27800, expenses: 3908, profit: 23892 },
  { month: 'May', revenue: 18900, expenses: 4800, profit: 14100 },
  { month: 'Jun', revenue: 23900, expenses: 3800, profit: 20100 },
  { month: 'Jul', revenue: 34900, expenses: 4300, profit: 30600 },
  { month: 'Aug', revenue: 45000, expenses: 5000, profit: 40000 },
];

const StatCard = ({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
      <div className="p-3 bg-blue-50 rounded-full">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
    <div className="mt-4 text-sm text-green-600 font-medium">
      {trend} <span className="text-slate-400 font-normal">vs last month</span>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Business Depository</h1>
        <p className="text-slate-500">Internal financial tracking and growth analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Profit (YTD)" value="$171,012" icon={DollarSign} trend="+12.5%" />
        <StatCard title="Active Projects" value="24" icon={TrendingUp} trend="+4.0%" />
        <StatCard title="New Clients" value="8" icon={Users} trend="+2.0%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold mb-4">Monthly Profit Growth</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Legend />
                <Line type="monotone" dataKey="profit" stroke="#2563eb" strokeWidth={3} activeDot={{ r: 8 }} name="Net Profit" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold mb-4">Revenue vs Expenses</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800 font-medium">
          🔒 This area is restricted to Firm Administrators. All data is hidden from clients.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;