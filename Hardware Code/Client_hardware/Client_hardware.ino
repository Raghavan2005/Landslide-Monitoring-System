#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_Sensor.h>
#include <TinyGPS++.h>
#include <LoRa.h>

// IMU (MPU6050)
Adafruit_MPU6050 mpu;
Adafruit_SSD1306 display = Adafruit_SSD1306(128, 64, &Wire);

// GPS (Neo-6M) using HardwareSerial
HardwareSerial mySerial(1); // Use Serial1 (you can use Serial2 or any other UART port)
TinyGPSPlus gps;

// LoRa pins
#define LORA_SCK 5
#define LORA_MISO 19
#define LORA_MOSI 27
#define LORA_CS 18
#define LORA_RESET 14
#define LORA_DIO0 26

void setup() {
  Serial.begin(115200);
  mySerial.begin(9600, SERIAL_8N1, 16, 17); // RX, TX (use correct pins)

  // Initialize IMU
  if (!mpu.begin()) {
    Serial.println("MPU6050 init failed");
    while (1);
  }
  Serial.println("MPU6050 found");

  // Initialize LoRa
  if (!LoRa.begin(915E6)) {
    Serial.println("LoRa init failed");
    while (1);
  }
  Serial.println("LoRa initialized");

  // Initialize GPS
  Serial.println("GPS initializing...");
  
  // Initialize OLED display (optional for debugging)
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("OLED init failed"));
    while (1);
  }
  display.display();
  delay(500);
}

void loop() {
  // Read MPU6050 accelerometer and gyroscope data
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  // Read GPS data
  while (mySerial.available() > 0) {
    gps.encode(mySerial.read());
  }

  // If valid GPS data
  if (gps.location.isUpdated()) {
    Serial.print("Latitude= "); 
    Serial.print(gps.location.lat(), 6); 
    Serial.print(" Longitude= "); 
    Serial.println(gps.location.lng(), 6);
  }

  // Filtered accelerometer and gyroscope data (simple example: average of last 10 readings)
  float accX = a.acceleration.x;
  float accY = a.acceleration.y;
  float accZ = a.acceleration.z;
  
  // Filter logic (optional, e.g., smoothing)
  // Here we just send raw data. You can apply advanced filtering like low-pass filtering or averaging.

  // Send data over LoRa
  String data = "Acc: " + String(accX, 2) + "," + String(accY, 2) + "," + String(accZ, 2) +
                " | Lat: " + String(gps.location.lat(), 6) + " | Lon: " + String(gps.location.lng(), 6);

  LoRa.beginPacket();
  LoRa.print(data);
  LoRa.endPacket();
  Serial.println("Sent data over LoRa: " + data);

  delay(1000);  // 1 second delay for next reading
}
