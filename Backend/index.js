const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const cors = require('cors');
const app = express();
const PORT = 4000;

let latestESP32Data = ''; // Store the latest serial data

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

// Connect to ESP32 and listen
async function connectToESP32() {
  try {
    const path = await findESP32Port();
    console.log(`✅ ESP32 detected on ${path}`);

    const port = new SerialPort({
      path,
      baudRate: 115200
    });

    const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

    parser.on('data', (line) => {
      latestESP32Data = line.trim();
      console.log('📩 Received from ESP32:', latestESP32Data);
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
    soilMoisture: 30 + Math.random() * 20,
    displacement: Math.random() * 5,
    rainfall: Math.random() * 30,
    vibration: Math.random() * 15,
    temperature: 18 + Math.random() * 12,
  };
}

app.use(cors());

// Dummy endpoint
app.get('/api/sensor-data', (req, res) => {
  const data = generateSensorData();
  res.json(data);
});

// Endpoint to get latest ESP32 data
app.get('/data', (req, res) => {
  res.json({ esp32: latestESP32Data });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server is running at http://localhost:${PORT}`);
  // Uncomment this if you want to read from ESP32
  // connectToESP32();
  (async () => {
    try {
      await connectToESP32();
    } catch (error) {
      console.error('⚠️ Failed to connect to ESP32, but server is still running.');
    }
  })();
});
