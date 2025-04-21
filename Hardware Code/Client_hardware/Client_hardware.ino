#include <WiFi.h>
#include <HTTPClient.h>
#include <LoRa.h>


#define LORA_SCK 5
#define LORA_MISO 19
#define LORA_MOSI 27
#define LORA_CS 18
#define LORA_RESET 14
#define LORA_DIO0 26

const char* ssid = "ESP_96E0BD";  
const char* password = "";        
const char* serverIP = "192.168.4.1"; 
bool isLora = false; 

void setup() {
  Serial.begin(115200);
  Serial.println("ESP32 Sender Starting...");

  if (isLora) {
    loraStart();
  } else {
    wifiStart();
  }
}
String generateSensorData() {
  String mpuStatus;
  int status = random(0, 3); 
  if (status == 0) {
    mpuStatus = "OK";
  } else if (status == 1) {
    mpuStatus = "FALL";
  } else {
    mpuStatus = "PENDING";
  }

  float latitude = 13.0 + random(0, 10000) / 10000.0;  
  float longitude = 13.0 + random(0, 10000) / 10000.0;
  float battery = 3.5 + random(0, 70) / 100.0;

  // Build JSON string
  String json = "{";
  json += "\"MPU\":\"" + mpuStatus + "\",";
  json += "\"GPS\":{";
  json += "\"lat\":" + String(latitude, 4) + ",";
  json += "\"lon\":" + String(longitude, 4);
  json += "},";
  json += "\"BATT\":" + String(battery, 2);
  json += "}";

  return json;
}

void loop() {

  String dataToSend = generateSensorData();

  if (isLora) {
    loraSend(dataToSend);
  } else {
    wifiSend(dataToSend);
  }

  delay(5000);
}

// ------------ LoRa Functions ------------
void loraStart() {
  LoRa.setPins(LORA_CS, LORA_RESET, LORA_DIO0);
  if (!LoRa.begin(915E6)) {
    Serial.println("LoRa init failed. Check wiring.");
    while (1);
  }
  Serial.println("LoRa sender initialized.");
}

void loraSend(const String &data) {
  LoRa.beginPacket();
  LoRa.print(data);
  LoRa.endPacket();
  Serial.println("Sent via LoRa: " + data);
}

// ------------ WiFi + HTTP Functions ------------
void wifiStart() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConnected to Host!");
    Serial.println("Local IP: " + WiFi.localIP().toString());
  } else {
    Serial.println("\nFailed to connect. Check SSID and try again.");
  }
}

void wifiSend(const String &data) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String serverURL = "http://" + String(serverIP) + "/data";

    http.begin(serverURL);
    http.addHeader("Content-Type", "text/plain");

    int responseCode = http.POST(data);
    if (responseCode > 0) {
      Serial.println("Server response: " + http.getString());
    } else {
      Serial.print("POST failed, Error: ");
      Serial.println(responseCode);
    }

    http.end();
  } else {
    Serial.println("WiFi disconnected, can't send data. Trying to reconnect...");
    wifiStart(); // Try
  }
}