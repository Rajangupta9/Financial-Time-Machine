import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthController from '../../controllers/AuthController';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Sliders, DollarSign, Calendar, TrendingUp, Users, Settings, Clock, BarChart2 } from 'lucide-react';

const FinancialTimeMachineDashboard = () => {
  const navigate = useNavigate();
  const authController = new AuthController();
  const user = authController.getCurrentUser() || { name: 'Alex Thompson', email: 'alex@example.com' };
  
  const [activeTab, setActiveTab] = useState('overview');
  const [scenario, setScenario] = useState('baseline');
  const [timeframe, setTimeframe] = useState(5); // years
  
  const handleLogout = () => {
    authController.logout();
    navigate('/auth');
  };

  // Demo financial data
  const financialData = {
    baseline: [
      { year: 2025, savings: 15000, investments: 45000, netWorth: 60000 },
      { year: 2026, savings: 25000, investments: 70000, netWorth: 95000 },
      { year: 2027, savings: 40000, investments: 100000, netWorth: 140000 },
      { year: 2028, savings: 55000, investments: 140000, netWorth: 195000 },
      { year: 2029, savings: 75000, investments: 190000, netWorth: 265000 },
      { year: 2030, savings: 100000, investments: 250000, netWorth: 350000 }
    ],
    careerChange: [
      { year: 2025, savings: 10000, investments: 40000, netWorth: 50000 },
      { year: 2026, savings: 15000, investments: 60000, netWorth: 75000 },
      { year: 2027, savings: 35000, investments: 100000, netWorth: 135000 },
      { year: 2028, savings: 65000, investments: 160000, netWorth: 225000 },
      { year: 2029, savings: 100000, investments: 230000, netWorth: 330000 },
      { year: 2030, savings: 150000, investments: 320000, netWorth: 470000 }
    ],
    homeInvestment: [
      { year: 2025, savings: 5000, investments: 25000, netWorth: 30000 },
      { year: 2026, savings: 8000, investments: 45000, netWorth: 53000 },
      { year: 2027, savings: 15000, investments: 80000, netWorth: 95000 },
      { year: 2028, savings: 30000, investments: 130000, netWorth: 160000 },
      { year: 2029, savings: 50000, investments: 180000, netWorth: 230000 },
      { year: 2030, savings: 85000, investments: 240000, netWorth: 325000 }
    ]
  };

  const chartData = financialData[scenario].filter(item => item.year <= 2025 + timeframe - 1);
  
  const scenarioDescriptions = {
    baseline: "Your current financial trajectory based on existing income, spending habits, and investment strategy.",
    careerChange: "Projected outcomes if you pursue that career change with initial income reduction but higher long-term growth.",
    homeInvestment: "Financial impact of purchasing a home, including mortgage payments, equity building, and tax benefits."
  };
  
  const aiRecommendations = {
    baseline: [
      "Increase monthly investment contribution by $200 to reach retirement goals sooner",
      "Consider consolidating your credit card debt to save on interest payments",
      "Your emergency fund should be increased to cover 6 months of expenses"
    ],
    careerChange: [
      "Build additional skills in your target field before making the transition",
      "Consider a 6-month overlap period to reduce income disruption",
      "Temporarily reduce investment contributions to build a transition buffer"
    ],
    homeInvestment: [
      "Consider 20% down payment to avoid PMI costs",
      "Factor in maintenance costs of approximately 1% of home value annually",
      "Explore first-time homebuyer programs in your area"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex h-screen">
        <div className="w-64 bg-indigo-900 text-white p-4 flex flex-col">
          <div className="mb-8">
            <h1 className="text-xl font-bold flex items-center">
              <Clock className="mr-2" />
              Financial Time Machine
            </h1>
          </div>
          
          <nav className="flex-grow">
            <ul>
              <li className="mb-2">
                <button 
                  className={`w-full text-left p-2 rounded flex items-center ${activeTab === 'overview' ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <BarChart2 size={18} className="mr-2" />
                  Overview
                </button>
              </li>
              <li className="mb-2">
                <button 
                  className={`w-full text-left p-2 rounded flex items-center ${activeTab === 'scenarios' ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`}
                  onClick={() => setActiveTab('scenarios')}
                >
                  <Sliders size={18} className="mr-2" />
                  What-If Scenarios
                </button>
              </li>
              <li className="mb-2">
                <button 
                  className={`w-full text-left p-2 rounded flex items-center ${activeTab === 'advisor' ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`}
                  onClick={() => setActiveTab('advisor')}
                >
                  <Users size={18} className="mr-2" />
                  AI Advisor
                </button>
              </li>
              <li className="mb-2">
                <button 
                  className={`w-full text-left p-2 rounded flex items-center ${activeTab === 'investments' ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`}
                  onClick={() => setActiveTab('investments')}
                >
                  <TrendingUp size={18} className="mr-2" />
                  Investments
                </button>
              </li>
              <li className="mb-2">
                <button 
                  className={`w-full text-left p-2 rounded flex items-center ${activeTab === 'settings' ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings size={18} className="mr-2" />
                  Settings
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="mt-auto pt-4 border-t border-indigo-800">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-2">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-indigo-300">{user.email}</div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full bg-indigo-800 hover:bg-indigo-700 py-2 px-3 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Financial Dashboard</h1>
              <p className="text-gray-600">Visualize your financial future with precision</p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <DollarSign className="text-green-500 mr-2" />
                  <h2 className="text-lg font-medium">Current Net Worth</h2>
                </div>
                <p className="text-3xl font-bold">${financialData[scenario][0].netWorth.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">Updated today</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="text-blue-500 mr-2" />
                  <h2 className="text-lg font-medium">Projected Growth</h2>
                </div>
                <p className="text-3xl font-bold">
                  {Math.round((financialData[scenario][financialData[scenario].length-1].netWorth / financialData[scenario][0].netWorth - 1) * 100)}%
                </p>
                <p className="text-sm text-gray-500 mt-2">Over {timeframe} years</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="text-purple-500 mr-2" />
                  <h2 className="text-lg font-medium">Financial Freedom</h2>
                </div>
                <p className="text-3xl font-bold">2035</p>
                <p className="text-sm text-gray-500 mt-2">Estimated date</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Financial Projection</h2>
                <div className="flex space-x-4">
                  <select 
                    className="border rounded p-2 text-sm"
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                  >
                    <option value="baseline">Current Path</option>
                    <option value="careerChange">Career Change</option>
                    <option value="homeInvestment">Home Investment</option>
                  </select>
                  
                  <select 
                    className="border rounded p-2 text-sm"
                    value={timeframe}
                    onChange={(e) => setTimeframe(parseInt(e.target.value))}
                  >
                    <option value="3">3 Years</option>
                    <option value="5">5 Years</option>
                    <option value="10">10 Years</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600">{scenarioDescriptions[scenario]}</p>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                      labelFormatter={(label) => `Year: ${label}`}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="savings" stroke="#8884d8" name="Savings" strokeWidth={2} />
                    <Line type="monotone" dataKey="investments" stroke="#82ca9d" name="Investments" strokeWidth={2} />
                    <Line type="monotone" dataKey="netWorth" stroke="#ff7300" name="Net Worth" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Users className="text-blue-500 mr-2" />
                <h2 className="text-xl font-medium">AI Financial Recommendations</h2>
              </div>
              
              <ul className="space-y-3">
                {aiRecommendations[scenario].map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-green-100 text-green-800 p-1 rounded-full mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialTimeMachineDashboard;