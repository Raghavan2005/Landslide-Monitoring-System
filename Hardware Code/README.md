
# Landslide Monitoring System: Hardware Code

This repository contains the hardware code for the **Landslide Monitoring System** using ESP32. The system includes various sensors (MPU6050 for motion detection, GPS Neo-6M for location tracking) and communication modules (LoRa for data transmission).

---

## Components Used:
1. **ESP32 Microcontroller** - Core controller for the project.
2. **MPU6050** - 3-axis accelerometer and gyroscope sensor.
3. **Neo-6M GPS Module** - GPS module for acquiring the location coordinates.
4. **LoRa Module (e.g., RFM95)** - For long-range wireless data communication.
5. **OLED Display (optional)** - To display sensor data (acceleration, gyroscope, GPS coordinates).
6. **Wires & Breadboard** - For making connections.

---

## Pin Configuration:
### ESP32 Pin Mapping:
- **MPU6050 (I2C)**:
  - SDA -> GPIO 21
  - SCL -> GPIO 22
- **Neo-6M GPS Module (UART)**:
  - RX -> GPIO 16
  - TX -> GPIO 17
- **LoRa Module**:
  - **SCK** -> GPIO 5
  - **MISO** -> GPIO 19
  - **MOSI** -> GPIO 27
  - **CS** -> GPIO 18
  - **RESET** -> GPIO 14
  - **DIO0** -> GPIO 26

---

## Libraries Used:
1. **Adafruit MPU6050** - For the MPU6050 sensor (acceleration, gyroscope data).
2. **Adafruit SSD1306** - For controlling the OLED display.
3. **TinyGPS++** - For processing GPS data from the Neo-6M module.
4. **LoRa** - For communication using the LoRa module.
5. **Wire** - For I2C communication with the MPU6050.

You can install these libraries through the Arduino Library Manager or by downloading them from their respective GitHub repositories.

---

## Code Overview:
### **1. Setup**:
The setup function initializes all components:
- **MPU6050**: It checks if the sensor is properly connected and functional.
- **GPS Module**: Initializes the GPS communication through a hardware serial port.
- **LoRa Module**: Initializes the LoRa communication at a frequency of 915 MHz (adjust this based on your region).
- **OLED Display**: Initializes the OLED display to show data.

### **2. Loop**:
- **MPU6050**: The system reads the accelerometer and gyroscope data and sends it over LoRa.
- **GPS**: The GPS data (latitude and longitude) is read from the Neo-6M module and transmitted over LoRa.
- **LoRa Communication**: Data is packaged and sent over LoRa, where it can be received by another LoRa module.
- **OLED Display**: Optionally, the received data is displayed on an OLED screen for local monitoring.

---

## Data Flow:
1. **Sensor Data**:
   - The **MPU6050** sensor measures acceleration and gyroscope data along the X, Y, Z axes.
   - The **GPS module** provides the current **latitude** and **longitude** coordinates.
   - The data from both the MPU6050 and GPS is collected, filtered (optional), and formatted.

2. **LoRa Communication**:
   - The formatted data (e.g., accelerometer readings, gyroscope readings, GPS coordinates) is sent via LoRa to a remote device. This can be another ESP32 or compatible device with a LoRa module.
   - LoRa transmission allows for long-range, low-power communication over a wide area.

3. **OLED Display (Optional)**:
   - The data is also optionally displayed on an OLED screen for local monitoring.

---

## How to Use:
### **1. Wiring the Components**:
Make the following connections on your ESP32:
- **MPU6050** (I2C):
  - SDA to GPIO 21
  - SCL to GPIO 22
- **GPS Neo-6M**:
  - RX to GPIO 16
  - TX to GPIO 17
- **LoRa Module**:
  - SCK to GPIO 5
  - MISO to GPIO 19
  - MOSI to GPIO 27
  - CS to GPIO 18
  - RESET to GPIO 14
  - DIO0 to GPIO 26
- **OLED Display** (optional):
  - Connect SDA and SCL to the I2C bus (usually GPIO 21 and 22).

### **2. Uploading the Code**:
- Open the Arduino IDE.
- Select the correct board and port for your ESP32.
- Install the required libraries through the Arduino Library Manager:
  - **Adafruit MPU6050**
  - **Adafruit SSD1306**
  - **TinyGPS++**
  - **LoRa**
- Paste the code into the Arduino IDE and upload it to the ESP32.

### **3. Monitoring Data**:
- Open the Serial Monitor to view the transmitted data.
- The data sent via LoRa can be received by another LoRa-enabled device and displayed on its Serial Monitor.

### **4. Visualizing Data**:
If you have an OLED display, it will show the received data directly. You can use this display to monitor data locally before transmitting it over LoRa.

---

## Example Output:
**Serial Monitor**:

```
MPU6050 found
LoRa initialized
GPS initializing...
Received from LoRa: Acc: 0.01, -0.02, 9.81 | Lat: 37.7749 | Lon: -122.4194
Sent data over LoRa: Acc: 0.01, -0.02, 9.81 | Lat: 37.7749 | Lon: -122.4194
Latitude= 37.7749 Longitude= -122.4194
```

**OLED Display**:
```
Received from LoRa:
Acc: 0.01, -0.02, 9.81
Lat: 37.7749 | Lon: -122.4194
```

---

## Troubleshooting:
- **LoRa Not Transmitting**:
  - Make sure the LoRa modules on both devices are using the same frequency (e.g., 915 MHz).
  - Ensure the **LoRa.begin(915E6)** frequency is correctly set for your region.
  
- **MPU6050 Not Detected**:
  - Double-check your **I2C wiring**.
  - Ensure that the **SDA** and **SCL** pins are correctly connected to the ESP32.
  
- **GPS Not Receiving Location**:
  - Ensure the GPS module is outdoors or near a window for proper satellite reception.
  - Verify that the **GPS baud rate** matches the configuration in the code (9600 by default).

---

