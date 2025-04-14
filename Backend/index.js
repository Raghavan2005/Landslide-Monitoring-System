const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const PORT = 3000;

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

// REST API endpoint
app.get('/data', (req, res) => {
  res.json({ esp32: latestESP32Data });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server is running at http://localhost:${PORT}`);
  connectToESP32();
});
