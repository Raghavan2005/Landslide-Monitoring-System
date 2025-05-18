
# 🚀 Project Title: Landslide-Monitoring-System

## 📌 Overview
Landslide Monitoring System with Client and Control Center to Monitor Landslides, Predict Events, and Coordinate Rescue Operations.
## 🧠 Key Features
- ✅ Real-time tracking , smart control
- ✅ Web App Integration / IoT Support
- ✅ Admin Dashboard / Analytics Dash
- ✅ User Friendly 

## 🛠️ Technologies Used

### 💻 Frontend
![Next.js](https://img.shields.io/badge/Frontend-Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)

### 🧩 Backend
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=nodedotjs&logoColor=white)


### ⚙️ Hardware
![ESP32](https://img.shields.io/badge/Hardware-ESP32-000000?logo=espressif&logoColor=white)
![MPU6050](https://img.shields.io/badge/Hardware-MPU6050-4CAF50?logo=raspberrypi&logoColor=white)
![Neo-6M](https://img.shields.io/badge/Hardware-Neo--6M%20GPS%20Module-4CAF50?logo=raspberrypi&logoColor=white)
![LoRa](https://img.shields.io/badge/Hardware-LoRa%20Module-4CAF50?logo=raspberrypi&logoColor=white)


## 🧩 Available Platforms
- 🌐 Web
- 🚀 Embedded (ESP32)

## ⚙️ System Architecture
> _The system consists of multiple clients (users) and a central control node.
Each client node is equipped with sensors such as IMUs and other modules, which collect real-time data. All client nodes are interconnected and continuously transmit their data to the central control node.The control node aggregates and analyzes this data to determine whether a landslide event has occurred or is likely to occur, using predictive algorithms based on sensor readings and threshold analysis._
```mermaid
graph TD
  subgraph User Interface
    User["👤 User"]
    UI["🖥️ Next.js Frontend"]
  end

  subgraph ESP32 Hardware
    ESP32["🧠 ESP32 Controller"]
    MPU["📈 MPU6050 (I2C)\nSDA: GPIO 21\nSCL: GPIO 22"]
    GPS["📡 Neo-6M GPS (UART)\nRX: GPIO 16\nTX: GPIO 17"]
    LoRa["📶 LoRa Module (SPI)\nSCK: GPIO 5\nMISO: GPIO 19\nMOSI: GPIO 27\nCS: GPIO 18\nRESET: GPIO 14\nDIO0: GPIO 26"]
  end

  User -->|"UI Input"| UI
  UI -->|"Lora"| ESP32
  ESP32 -->|"Sensor Data"| UI

  ESP32 --> MPU
  ESP32 --> GPS
  ESP32 --> LoRa

```

## 📸 Screenshots / Demo

| Dashboard |
|-----------|
| ![image](https://github.com/user-attachments/assets/8f9f0cdd-0a3a-4e03-b228-58a758080c2f)
![image](https://github.com/user-attachments/assets/cb6a1b73-d2af-4f0c-82c0-5052821be437)
![image](https://github.com/user-attachments/assets/fa9b81df-bbcc-4286-af42-c972a3417a98)
![image](https://github.com/user-attachments/assets/986185ee-f90f-4066-ad0f-830defc37f31)



## 📱 Installation & Setup

### Prerequisites
- [ ] Node.js 
- [ ] ESP32
- [ ] Visual Studio Code

### Setup Steps
```bash
# Clone the repository
git clone https://github.com/Raghavan2005/Landslide-Monitoring-System.git
cd Landslide-Monitoring-System

# Install dependencies - Frontend
cd Frontend
npm install         # For Node.js backend
npm run dev         # To Run the Project

# Install dependencies - Backend
cd Backend
npm install         # For Node.js backend
npm start           # To Run the Project

```


## 📄 License
This project is licensed under the [MIT License](LICENSE).

