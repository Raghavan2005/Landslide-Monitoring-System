

// ====================================================================================
// RECEIVER CODE (receiver.ino)
// ====================================================================================

#include <WiFi.h>
#include <WebServer.h>
#include <LoRa.h>

// LoRa Pins - same as sender
#define LORA_SCK 5
#define LORA_MISO 19
#define LORA_MOSI 27
#define LORA_CS 18
#define LORA_RESET 14
#define LORA_DIO0 26

// WiFi credentials for Access Point
const char* ap_ssid = "ESP_96E0BD";
const char* ap_password = "";

// Mode selector - must match the sender
bool isLora = false;  // Set to true for LoRa, false for WiFi

WebServer server(80);

void setup() {
  Serial.begin(115200);
  Serial.println("ESP32 Receiver Starting...");

  if (isLora) {
    setupLoraReceiver();
  } else {
    setupWifiReceiver();
  }
}

void loop() {
  if (isLora) {
    checkLoraData();
  } else {
    server.handleClient();
  }
}

// ------------ LoRa Receiver Functions ------------
void setupLoraReceiver() {
  LoRa.setPins(LORA_CS, LORA_RESET, LORA_DIO0);
  if (!LoRa.begin(915E6)) {
    Serial.println("LoRa receiver init failed. Check wiring.");
    while (1);
  }
  Serial.println("LoRa receiver initialized.");
}

void checkLoraData() {
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    String receivedData = "";
    while (LoRa.available()) {
      receivedData += (char)LoRa.read();
    }
    
    Serial.print("Received via LoRa: ");
    Serial.println(receivedData);
    
    // Process data as needed
    processData(receivedData);
  }
}

// ------------ WiFi Receiver Functions ------------
void setupWifiReceiver() {
  // Create Access Point
  WiFi.softAP(ap_ssid, ap_password);
  Serial.println("Access Point Started");
  Serial.print("AP IP address: ");
  Serial.println(WiFi.softAPIP());

  // Setup server endpoints
  server.on("/data", HTTP_POST, handleDataReceived);
  server.begin();
  Serial.println("HTTP server started");
}

void handleDataReceived() {
  if (server.hasArg("plain")) {
    String receivedData = server.arg("plain");
    //Serial.print("Received via WiFi: ");
    Serial.println(receivedData);
    
    
    processData(receivedData);
    
    server.send(200, "text/plain", "Data received");
  } else {
    server.send(400, "text/plain", "No data received");
  }
}

// ------------ Common Data Processing Function ------------
void processData(String data) {
  // Parse the received data and take appropriate actions
  // Example: splitting comma-separated values
  
  int mpu_pos = data.indexOf("MPU=");
  int gps_pos = data.indexOf("GPS=");
  int batt_pos = data.indexOf("BATT=");
  
  String mpu_status = "";
  String gps_data = "";
  String battery = "";
  
  if (mpu_pos >= 0) {
    mpu_status = data.substring(mpu_pos + 4, data.indexOf(",", mpu_pos));
    Serial.println("MPU Status: " + mpu_status);
  }
  
  if (gps_pos >= 0) {
    gps_data = data.substring(gps_pos + 4, data.indexOf(",", gps_pos));
    Serial.println("GPS Data: " + gps_data);
  }
  
  if (batt_pos >= 0) {
    battery = data.substring(batt_pos + 5);
    Serial.println("Battery: " + battery);
  }
  
  // Add your code here to do something with this data
}
