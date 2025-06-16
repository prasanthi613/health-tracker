# 🌿 Mobile Health Tracker App

A simple and elegant React Native mobile app built with **Expo Router** that helps users **track daily health metrics** such as water intake, step count, and sleep hours. The app visualizes trends, stores data persistently on the device, and offers a clean UI/UX for a smooth user experience.

---

## 📱 Features

- ✅ Track **Water Intake**, **Steps**, and **Sleep Hours**
- 📊 Visualize **Step Trends** using a bar chart (last 7 logs)
- 📆 View **log history** with timestamped entries
- 🗑️ Delete specific entries from log
- 💾 **Persistent local storage** with AsyncStorage
- 🎯 Daily summary box with cumulative values
- 📐 Responsive design with clean, mobile-first layout

---

## 🛠️ Tech Stack

| Layer         | Tech Used                         |
|---------------|----------------------------------|
| Framework     | [React Native](https://reactnative.dev/) via [Expo](https://expo.dev/) |
| Routing       | [Expo Router](https://expo.github.io/router/docs) |
| Charts        | [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit) |
| Local Storage | [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) |
| UI Components | React Native built-in components |
| Styling       | Custom `StyleSheet` API          |

---

## 🧠 Architecture & Workflow

- The app uses **functional components** and **hooks** (`useState`, `useEffect`) for state management and side effects.
- Logs are stored in local state and synced with **AsyncStorage** so data is preserved across sessions.
- Bar chart is dynamically generated from the last 7 log entries to help users visualize activity trends.
- All layout and navigation is handled through **Expo Router**, supporting file-based routing for scalability.

---

## 📦 Setup Instructions

   ```bash
   git clone https://github.com/yourusername/health-tracker.git
   cd health-tracker
   npm install
   npx expo install react-native-svg react-native-chart-kit @react-native-async-storage/async-storage
   npx expo start

Open in your emulator or scan QR with Expo Go app.
