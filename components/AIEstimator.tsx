import React, { useState } from 'react';
import { EstimationRequest, AIEstimateResponse } from '../types';
import { generateConstructionEstimate } from '../services/geminiService';
import { Calculator, AlertCircle, Loader2, Home, Building2, MapPin } from 'lucide-react';

const AIEstimator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIEstimateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<EstimationRequest>({
    areaSqFt: 1500,
    location: '',
    floors: 1,
    quality: 'Standard',
    projectType: 'Residential'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'areaSqFt' || name === 'floors' ? Number(value) : value
    }));
  };

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location) {
      setError("Please enter a location.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateConstructionEstimate(formData);
      setResult(data);
    } catch (err) {
      setError("Failed to generate estimate. Please try again later or check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Input Form */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calculator className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">AI Estimator</h2>
              <p className="text-xs text-slate-500">Powered by Gemini 2.5 Flash</p>
            </div>
          </div>
          
          <form onSubmit={handleEstimate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Project Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: 'Residential' })}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-medium transition-colors ${
                    formData.projectType === 'Residential' 
                    ? 'bg-blue-50 border-blue-500 text-blue-700' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Home className="w-4 h-4" /> Residential
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: 'Commercial' })}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-medium transition-colors ${
                    formData.projectType === 'Commercial' 
                    ? 'bg-blue-50 border-blue-500 text-blue-700' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-4 h-4" /> Commercial
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Total Area (sq ft)</label>
              <input
                type="number"
                name="areaSqFt"
                value={formData.areaSqFt}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                min="100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Location (City, State)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Austin, TX"
                  className="w-full pl-10 p-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Floors</label>
                <input
                  type="number"
                  name="floors"
                  value={formData.floors}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  max="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Quality</label>
                <select
                  name="quality"
                  value={formData.quality}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center gap-2 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Calculating...
                </>
              ) : (
                'Generate Estimate'
              )}
            </button>
            
            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Output Display */}
      <div className="lg:col-span-8">
        {!result && !loading && (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
            <Calculator className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">Ready to estimate</p>
            <p className="text-sm">Fill out the details to get an AI-powered cost breakdown.</p>
          </div>
        )}

        {loading && (
           <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200">
             <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
             <p className="text-slate-600 font-medium">Analyzing market rates...</p>
             <p className="text-slate-400 text-sm">Consulting virtual engineers...</p>
           </div>
        )}

        {result && !loading && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in">
            <div className="bg-slate-900 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">Estimated Cost</h3>
                  <p className="text-slate-300 text-sm mt-1">
                    {formData.projectType} • {formData.areaSqFt} sq ft • {formData.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-extrabold text-green-400">
                    {result.currency} {result.totalEstimatedCost.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-400">Approx. Duration: {result.timelineMonths} Months</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-blue-900 text-sm leading-relaxed font-medium">
                  Executive Summary
                </p>
                <p className="text-blue-800 text-sm mt-1 leading-relaxed">
                  {result.summary}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-4 text-lg">Cost Breakdown</h4>
                <div className="space-y-3">
                  {result.breakdown.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">{item.category}</p>
                        <p className="text-xs text-slate-500">{item.description}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 font-mono font-bold text-slate-700">
                        {result.currency} {item.cost.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-slate-400 text-center pt-4 border-t border-slate-100">
                Disclaimer: This is an AI-generated estimate for planning purposes only. 
                Actual costs may vary based on site conditions, vendor pricing, and final blueprints.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIEstimator;