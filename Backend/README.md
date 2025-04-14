
# Landslide Monitoring System: Backend

This repository contains the backend code for the **Landslide Monitoring System**. The backend is responsible for receiving and processing data from the hardware, such as sensor data from ESP32, over a USB or WiFi connection, and making it available through an endpoint.

---

## Prerequisites:

Before you begin, ensure you have the following installed:

1. **Node.js** (v14.0 or above) - Backend runtime environment.
2. **npm** (Node Package Manager) - For managing dependencies.

---

## Installation Instructions:

1. **Clone the repository**:
   Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/Raghavan2005/landslide-monitoring-system.git
   ```

2. **Install dependencies**:
   Navigate to the backend folder and install the required dependencies.

   ```bash
   cd backend
   npm install
   ```

   This will install all necessary packages listed in the `package.json` file, including:

   - **serialport**: For communicating with the ESP32 via USB.
   - **express**: For creating an API endpoint to handle incoming data.

---

## Running the Backend:

1. **Start the backend server**:
   After installing the dependencies, you can run the backend by executing the following command:

   ```bash
   node index.js
   ```

   The server will start, and the backend will listen for incoming data from the ESP32 over USB or WiFi.

2. **Check the Serial Output**:
   You will see the sensor data logged in the terminal. The data will be parsed and logged as follows:

   ```bash
   📩 Received from ESP32: Accelerometer X: 0.12 m/s^2, Y: 0.13 m/s^2, Z: 9.81 m/s^2
   ```

---

## API Endpoints:

Once the backend is running, the data from the ESP32 will be available at the following endpoint:

### **GET /data**
Retrieve the most recent data sent by the ESP32 over USB.

**Example**:
```bash
curl http://localhost:3000/data
```

**Response**:
```json
{
  "accelerometer": {
    "x": 0.12,
    "y": 0.13,
    "z": 9.81
  },
  "gyroscope": {
    "x": 0.02,
    "y": 0.01,
    "z": 0.00
  },
  "gps": {
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

---

## How the Backend Works:

- **Serial Port Communication**: The backend listens to the ESP32 through a serial port (USB or WiFi), which transmits sensor data (accelerometer, gyroscope, GPS).
  
- **Data Parsing**: Once data is received, the backend parses it and formats it into a readable JSON format.

- **API**: The backend exposes a simple **REST API** to retrieve the most recent sensor data.

---

## Error Handling:

- **Serial Connection Issues**: If the backend cannot connect to the ESP32 over the serial port, you will see an error message indicating the issue (e.g., "Access Denied").
- **Data Parsing Errors**: In case the incoming data from the ESP32 is in an unexpected format, you will receive an error message in the terminal.

---

## Troubleshooting:

- **Serial Connection Issues**: 
  - Ensure that the ESP32 is properly connected via USB or WiFi.
  - Ensure no other application is using the serial port.
  - Check that the correct serial port is selected.

- **Port Issues**: 
  - If you get a "Port Not Found" error, ensure the ESP32 is connected and powered on.

- **Server Not Responding**: 
  - Make sure the backend is running by checking the console for any errors. Restart the backend if necessary.

---
