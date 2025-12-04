import React, { useState } from 'react';
import { User, UserRole } from './types';
import Pricing from './components/Pricing';
import AdminDashboard from './components/AdminDashboard';
import ClientDashboard from './components/ClientDashboard';
import AIEstimator from './components/AIEstimator';
import { HardHat, LayoutDashboard, Calculator, DollarSign, LogIn, LogOut, Lock } from 'lucide-react';

// Mock Authentication Service
const mockLogin = (role: UserRole): User => {
  return role === UserRole.ADMIN 
    ? { username: 'admin', role: UserRole.ADMIN, name: 'Robert Chief' }
    : { username: 'client', role: UserRole.CLIENT, name: 'Sarah Homeowner' };
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'pricing' | 'estimate' | 'dashboard'>('home');

  const handleLogin = (role: UserRole) => {
    setUser(mockLogin(role));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="text-center py-20 px-4">
            <h1 className="text-5xl font-extrabold text-slate-900 mb-6">Precision Civil Planning <br/><span className="text-blue-600">Built for Growth</span></h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              From instant AI cost estimations to detailed structural engineering. 
              We help homeowners build dreams and firms track success.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setActiveTab('estimate')} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition">
                Try AI Estimator
              </button>
              <button onClick={() => setActiveTab('pricing')} className="px-8 py-3 bg-white text-slate-800 font-semibold rounded-lg shadow border border-slate-200 hover:bg-slate-50 transition">
                View Pricing
              </button>
            </div>
            
            <div className="mt-20 grid md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                   <HardHat className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Civil Engineering</h3>
                <p className="text-slate-500">Expert structural planning and blueprint generation for residential and commercial sites.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                   <Calculator className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Estimation</h3>
                <p className="text-slate-500">Instant, AI-powered cost breakdowns to help you budget before breaking ground.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                   <DollarSign className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Transparent Costs</h3>
                <p className="text-slate-500">Clear pricing models and detailed financial tracking for firm transparency.</p>
              </div>
            </div>
          </div>
        );
      case 'pricing':
        return <Pricing />;
      case 'estimate':
        return <AIEstimator />;
      case 'dashboard':
        if (!user) return <div className="p-10 text-center">Please log in to view dashboard.</div>;
        return user.role === UserRole.ADMIN ? <AdminDashboard /> : <ClientDashboard user={user} />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <HardHat className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl tracking-tight">CivilEst</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveTab('home')}
                className={`text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-blue-400' : 'text-slate-300 hover:text-white'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveTab('pricing')}
                className={`text-sm font-medium transition-colors ${activeTab === 'pricing' ? 'text-blue-400' : 'text-slate-300 hover:text-white'}`}
              >
                Pricing
              </button>
              <button 
                onClick={() => setActiveTab('estimate')}
                className={`text-sm font-medium transition-colors ${activeTab === 'estimate' ? 'text-blue-400' : 'text-slate-300 hover:text-white'}`}
              >
                AI Estimator
              </button>
              
              {user ? (
                <>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'text-blue-400' : 'text-slate-300 hover:text-white'}`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                  <div className="h-6 w-px bg-slate-700 mx-2"></div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-400">
                      {user.role === UserRole.ADMIN ? 'Administrator' : 'Client'}
                    </span>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-1 text-sm bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md border border-slate-700"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleLogin(UserRole.CLIENT)}
                    className="flex items-center gap-1 text-sm bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Client Login
                  </button>
                  <button 
                    onClick={() => handleLogin(UserRole.ADMIN)}
                    className="flex items-center gap-1 text-sm text-slate-400 hover:text-white px-2 py-2"
                    title="Admin Access"
                  >
                    <Lock className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-white">CivilEst</span> © {new Date().getFullYear()}
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;