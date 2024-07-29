#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>

#define TRIG_PIN1 2
#define ECHO_PIN1 3
#define TRIG_PIN2 4
#define ECHO_PIN2 5
#define SERVO_PIN 6
#define BUTTON_PIN 7

Servo myServo;
LiquidCrystal_I2C lcd(0x27, 16, 2); // Adjust the I2C address if needed

bool buttonPressed = false;

void setup() {
  pinMode(TRIG_PIN1, OUTPUT);
  pinMode(ECHO_PIN1, INPUT);
  pinMode(TRIG_PIN2, OUTPUT);
  pinMode(ECHO_PIN2, INPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  
  myServo.attach(SERVO_PIN);
  myServo.write(0); // Initial position of the servo
  
  lcd.init(); // Initialize the LCD
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Smart Parking");
  
  Serial.begin(9600);
  Serial.println("Setup complete");
}

void loop() {
  long duration1, distance1, duration2, distance2;

  // Sensor 1
  digitalWrite(TRIG_PIN1, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN1, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN1, LOW);
  duration1 = pulseIn(ECHO_PIN1, HIGH);
  distance1 = duration1 * 0.034 / 2;
  
  // Sensor 2
  digitalWrite(TRIG_PIN2, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN2, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN2, LOW);
  duration2 = pulseIn(ECHO_PIN2, HIGH);
  distance2 = duration2 * 0.034 / 2;
  
  // Print distances to the serial monitor
  Serial.print("Distance 1: ");
  Serial.print(distance1);
  Serial.println(" cm");
  
  Serial.print("Distance 2: ");
  Serial.print(distance2);
  Serial.println(" cm");
  
  // Send distances as JSON
  Serial.print("{\"distance1\":");
  Serial.print(distance1);
  Serial.print(", \"distance2\":");
  Serial.print(distance2);
  Serial.println("}");

  // Update LCD with distances
  lcd.setCursor(0, 1);
  lcd.print("D1: ");
  lcd.print(distance1);
  lcd.print(" cm ");
  
  lcd.setCursor(10, 1);
  lcd.print("D2: ");
  lcd.print(distance2);
  lcd.print(" cm ");

  // Check button press to control the servo motor
  if (digitalRead(BUTTON_PIN) == LOW) {
    if (!buttonPressed) {
      buttonPressed = true;
      myServo.write(90); // Rotate to 90 degrees
      delay(2000); // Hold for a second
      myServo.write(0); // Return to 0 degrees
    }
  } else {
    buttonPressed = false;
  }
  
  delay(1000); // Delay for sensor readings and debounce
}
