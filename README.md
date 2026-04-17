# mouad-final-project
# Maroc Voyage - Luxury Travel Planner

An interactive, high-fidelity web application built with **Vanilla JavaScript**. This project allows users to curate a personalized Moroccan travel itinerary, manage costs in real-time, and securely "confirm" their booking through a dynamic user interface.

## 🌟 New Features (Latest Update)
* **Integrated Booking Engine:** Users can now click "Confirm My Trip" to see a final summary of their selected destinations and total cost on a dedicated success page.
* **Authentication Overlay:** A sleek, blurred-background Login Modal for user sign-in.
* **Full SPA Navigation:** Seamlessly switch between **Home**, **Planner**, and **Contact** views without page reloads.
* **Dynamic Cart Logic:** Real-time price calculation and list management as destinations are added or removed.

---

## 🛠️ Technical Implementation
This project was built to demonstrate advanced front-end development skills without the use of external libraries or frameworks:

* **State Management:** Uses a JavaScript `cart` array to track user selections and calculate the "Estimated Total" dynamically.
* **DOM Manipulation:** The destination grid and the final booking summary are generated entirely via JavaScript template literals.
* **Event Architecture:** Implements a variety of event listeners, including `submit` (for forms), `onclick` (for navigation/tabs), and `window.onload` (for data initialization).
* **UI/UX Design:** Follows a specific High-Fidelity brand guide using a Terracotta (#B24C3D) color palette and responsive Flexbox/Grid layouts.

---

## 📂 Project Structure
```text
Maroc-Voyage/
│
├── index.html          # Main structure (Home, Planner, Login, Confirmation)
├── style.css           # Custom "Red City" branding & animations
├── script.js          # App logic, data objects, and navigation
└── assets/             # Photography assets
    ├── welcome page.jpg
    ├── marakesh.jpg
    ├── fes.jpg
    ├── sahara desert.jpg
    └── chefchaouen.jpg