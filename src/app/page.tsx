"use client"
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CloudRain, Layers, Activity, ThermometerSun, BarChart2, Map } from 'lucide-react';
import ImageUploadSection from './ImageUploadSection';
import TerrainMap from './Google3DMap';
import 'maplibre-gl/dist/maplibre-gl.css';

// Mock data for demonstration
const generateMockData = (days = 7) => {
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString(),
      soilMoisture: 30 + Math.random() * 20,
      displacement: Math.random() * 5,
      rainfall: Math.random() * 30,
      vibration: Math.random() * 15,
      temperature: 18 + Math.random() * 12,
    });
  }
  
  return data;
};

// Alert thresholds
const THRESHOLDS = {
  soilMoisture: 45,
  displacement: 3.5,
  rainfall: 25,
  vibration: 12,
};

export default function LandslideMonitoringDashboard() {
  const [sensorData, setSensorData] = useState(generateMockData());
  const [riskLevel, setRiskLevel] = useState('Low');
  const [riskColor, setRiskColor] = useState('text-green-500');
  
  // Update risk level based on latest sensor readings
  useEffect(() => {
    const latest = sensorData[sensorData.length - 1];
    let criticalFactors = 0;
    
    if (latest.soilMoisture > THRESHOLDS.soilMoisture) criticalFactors++;
    if (latest.displacement > THRESHOLDS.displacement) criticalFactors++;
    if (latest.rainfall > THRESHOLDS.rainfall) criticalFactors++;
    if (latest.vibration > THRESHOLDS.vibration) criticalFactors++;
    
    if (criticalFactors >= 3) {
      setRiskLevel('High');
      setRiskColor('text-red-500');
    } else if (criticalFactors >= 1) {
      setRiskLevel('Medium');
      setRiskColor('text-yellow-500');
    } else {
      setRiskLevel('Low');
      setRiskColor('text-green-500');
    }
  }, [sensorData]);
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...sensorData];
      const latest = {...newData[newData.length - 1]};
      
      // Update with small random changes
      latest.soilMoisture = Math.max(20, Math.min(60, latest.soilMoisture + (Math.random() - 0.5) * 2));
      latest.displacement = Math.max(0, Math.min(10, latest.displacement + (Math.random() - 0.5) * 0.2));
      latest.rainfall = Math.max(0, Math.min(50, latest.rainfall + (Math.random() - 0.5) * 3));
      latest.vibration = Math.max(0, Math.min(20, latest.vibration + (Math.random() - 0.5) * 1));
      latest.temperature = Math.max(10, Math.min(35, latest.temperature + (Math.random() - 0.5) * 0.5));
      
      newData.push(latest);
      if (newData.length > 8) newData.shift();
      
      setSensorData(newData);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [sensorData]);
  
  // Format sensor reading with appropriate units
  const formatReading = (value, parameter) => {
    switch (parameter) {
      case 'soilMoisture': return `${value.toFixed(1)}%`;
      case 'displacement': return `${value.toFixed(2)}mm`;
      case 'rainfall': return `${value.toFixed(1)}mm`;
      case 'vibration': return `${value.toFixed(1)}Hz`;
      case 'temperature': return `${value.toFixed(1)}°C`;
      default: return value.toFixed(1);
    }
  };
  
  // Check if value exceeds threshold
  const isAboveThreshold = (value, parameter) => {
    return THRESHOLDS[parameter] && value > THRESHOLDS[parameter];
  };
  
  return (
    <main>
    <div className="bg-gray-50 min-h-screen text-black">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">

            <h1 className="text-2xl font-bold">Landslide Monitoring System</h1>
          </div>
          <div className="flex items-center">
            <span className="bg-blue-800 px-3 py-1 rounded text-sm">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Status Panel */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">System Status <p className='text-red-600 animate-pulse'>Offline</p></h2>
              <p className="text-gray-500">Ooty
Town in Tamil Nadu</p>
            </div>
            <div className="flex items-center">
              <AlertTriangle className={`h-6 w-6 ${riskColor} mr-2`} />
            </div>
          </div>
        </div>
        {/* Location Section - Replace with Image Upload */}
<ImageUploadSection />
        {/* Sensor Reading Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {Object.entries({
            soilMoisture: { label: 'Soil Moisture', icon: <Layers /> },
            displacement: { label: 'Displacement', icon: <Activity /> },
            rainfall: { label: 'Rainfall', icon: <CloudRain /> },
            vibration: { label: 'Vibration', icon: <Activity /> },
            temperature: { label: 'Temperature', icon: <ThermometerSun /> },
          }).map(([key, { label, icon }]) => {
            const latestValue = sensorData[sensorData.length - 1][key];
            const isAlert = isAboveThreshold(latestValue, key);
            
            return (
              <div key={key} className={`bg-white rounded-lg shadow p-4 ${isAlert ? 'border-l-4 border-red-500' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">{icon}</span>
                    <h3 className="font-medium">{label}</h3>
                  </div>
                  {isAlert && <AlertTriangle className="h-5 w-5 text-red-500" />}
                </div>
                <p className="text-2xl font-bold">
                  {formatReading(latestValue, key)}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  {isAlert ? 
                    <span className="text-red-500">Above threshold</span> : 
                    <span>Normal range</span>
                  }
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Charts Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center mb-4">
            <BarChart2 className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-700">Sensor Trends</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Displacement Chart */}
            <div className="h-64">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Displacement (mm)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="displacement" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Soil Moisture Chart */}
            <div className="h-64">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Soil Moisture (%)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="soilMoisture" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Rainfall Chart */}
            <div className="h-64">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Rainfall (mm)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="rainfall" 
                    stroke="#6366f1" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Vibration Chart */}
            <div className="h-64">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Vibration (Hz)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="vibration" 
                    stroke="#f59e0b" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Location Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-4">
            <Map className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-700">Monitoring Location</h2>
          </div>
          <div className='bg-white p-10 rounded-[20px]' >
            <div className="text-center text-gray-500">
            <div style={{ height: '100vh', width: '100%' }}>
      <TerrainMap />
    </div>


            </div>
          </div>
        </div>
      </main>
    </div>
    </main>
  );
  
}