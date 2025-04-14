
# Landslide Monitoring System: Frontend

This repository contains the frontend code for the **Landslide Monitoring System**. The frontend is built using **Next.js** with **TypeScript** and is responsible for presenting the sensor data and visualizations to the user.

---

## Prerequisites:

Before you begin, ensure you have the following installed:

1. **Node.js** (v14.0 or above) - Frontend runtime environment.
2. **npm** (Node Package Manager) - For managing dependencies.

---

## Installation Instructions:

1. **Clone the repository**:
   Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/Raghavan2005/landslide-monitoring-system.git
   ```

2. **Install dependencies**:
   Navigate to the frontend folder and install the required dependencies.

   ```bash
   cd frontend
   npm install
   ```

   This will install all necessary packages listed in the `package.json` file, including:

   - **next**: The Next.js framework for building the React-based application.
   - **react** and **react-dom**: For building the user interface.
   - **axios**: For making HTTP requests to the backend API.

---

## Running the Frontend:

1. **Start the frontend server**:
   After installing the dependencies, you can run the frontend by executing the following command:

   ```bash
   npm run dev
   ```

   The frontend will be served on `http://localhost:3000` by default.

2. **Open the Frontend**:
   Open a web browser and visit the following URL:

   ```bash
   http://localhost:3000
   ```

   You should now be able to see the Landslide Monitoring System frontend displaying real-time data from the sensors.

---

## Features:

- **Real-time Sensor Data**: The frontend fetches real-time sensor data (e.g., accelerometer, gyroscope, GPS) from the backend API.
- **Data Visualization**: The frontend presents the data in a user-friendly format, including charts and graphs to visualize accelerometer and gyroscope data.
- **Responsive Design**: The frontend is designed to be responsive, making it usable on both desktop and mobile devices.

---

## API Integration:

The frontend interacts with the backend API to retrieve sensor data.

### **API Endpoints**:

The frontend communicates with the backend through the following API endpoint:

- **GET /data**: This endpoint fetches the most recent sensor data from the backend.

Example usage:

```ts
const response = await axios.get('http://localhost:3000/data');
const data = response.data;
```

The response data format will look like:

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



## Error Handling:

- **API Request Failures**: If the frontend fails to fetch data from the backend (e.g., network issues), an error message will be displayed on the UI.
- **Invalid Data**: If the backend returns data in an unexpected format, the frontend will handle it gracefully and show an appropriate error message.

---

## Troubleshooting:

- **Frontend Not Loading**: If the frontend isn't loading, ensure that the backend is running and the API is accessible.
- **Data Not Displaying**: Check that the frontend is correctly receiving data from the backend API by inspecting the browser's network console.

---
