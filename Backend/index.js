const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const cors = require('cors');

const app = express();
const PORT = 4000;

let latestESP32Data = null; // Store latest ESP32 data as parsed JSON

// Auto-detect ESP32 port
async function findESP32Port() {
  const ports = await SerialPort.list();

  for (const port of ports) {
    const isLikelyESP = port.manufacturer && (
      port.manufacturer.includes('Silicon Labs') ||
      port.manufacturer.includes('wch') ||
      port.manufacturer.includes('Espressif')
    );

    if (isLikelyESP) {
      return port.path;
    }
  }

  throw new Error('ESP32 port not found. Please check your USB connection.');
}

// Connect to ESP32 and listen for data
async function connectToESP32() {
  try {
    const path = await findESP32Port();

    const port = new SerialPort({
      path,
      baudRate: 115200
    });

    const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

    parser.on('data', (line) => {
      try {
        latestESP32Data = JSON.parse(line.trim());
        console.log('📥 ESP32 JSON:', latestESP32Data);
      } catch (err) {
        console.error('⚠️ Invalid JSON from ESP32:', line.trim());
      }
    });

    port.on('open', () => {
      console.log('🔌 Serial connection opened.');
    });

    port.on('error', (err) => {
      console.error('❌ Serial Error:', err.message);
    });

  } catch (err) {
    console.error('🚫 Error:', err.message);
  }
}

// Dummy sensor data generator
function generateSensorData() {
  const now = new Date();
  return {
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    soilMoisture: parseFloat((30 + Math.random() * 20).toFixed(2)),
    displacement: parseFloat((Math.random() * 5).toFixed(2)),
    rainfall: parseFloat((Math.random() * 30).toFixed(2)),
    vibration: parseFloat((Math.random() * 15).toFixed(2)),
    temperature: parseFloat((18 + Math.random() * 12).toFixed(2))
  };
}

app.use(cors());

// API endpoint to return sensor + ESP32 data
app.get('/api/sensor-data', (req, res) => {
  const dummyData = generateSensorData();
  res.json({
    ...dummyData,
    esp32: latestESP32Data || 'No data received yet'
  });
});

// API endpoint to return only raw ESP32 data
app.get('/data', (req, res) => {
  res.json({ esp32: latestESP32Data || 'No data received yet' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server is running at http://localhost:${PORT}`);
  (async () => {
    try {
      await connectToESP32();
    } catch (error) {
      console.error('⚠️ Failed to connect to ESP32, but server is still running.');
    }
  })();
});
