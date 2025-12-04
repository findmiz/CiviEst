import React from 'react';
import { CheckCircle } from 'lucide-react';

const PricingTier = ({ title, price, features, recommended = false }: { title: string, price: string, features: string[], recommended?: boolean }) => (
  <div className={`relative flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border ${recommended ? 'border-blue-500 shadow-xl scale-105 z-10' : 'border-gray-100 shadow'} xl:p-8`}>
    {recommended && <span className="absolute top-0 right-0 px-3 py-1 -mr-2 -mt-2 text-xs font-semibold text-white bg-blue-500 rounded-full">Popular</span>}
    <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
    <p className="font-light text-gray-500 sm:text-lg mb-4">Best for {title.toLowerCase()} projects.</p>
    <div className="flex justify-center items-baseline my-8">
      <span className="mr-2 text-5xl font-extrabold">{price}</span>
      <span className="text-gray-500">/sq ft</span>
    </div>
    <ul className="mb-8 space-y-4 text-left">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center space-x-3">
          <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-500" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button className={`mt-auto text-white focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${recommended ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-800 hover:bg-slate-900'}`}>
      Get Started
    </button>
  </div>
);

const Pricing: React.FC = () => {
  return (
    <section className="bg-slate-50 py-12">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-slate-900">Transparent Pricing</h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl">
            Our standard estimation rates for full-service civil planning and architectural design.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          <PricingTier 
            title="Basic Residential"
            price="$2.50"
            features={[
              "2D Floor Planning",
              "Basic Structural Estimation",
              "Material quantity list",
              "Email Support"
            ]}
          />
          <PricingTier 
            title="Premium Residential"
            price="$4.50"
            recommended={true}
            features={[
              "3D Architectural Modeling",
              "Detailed Structural Analysis",
              "Electrical & Plumbing Layouts",
              "Priority Phone Support",
              "Permit Assistance"
            ]}
          />
          <PricingTier 
            title="Commercial"
            price="$7.00"
            features={[
              "Complete Civil Engineering",
              "HVAC & Fire Safety Planning",
              "Legal Compliance Check",
              "Dedicated Project Manager",
              "On-site Consultation"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;