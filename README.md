# FutureMobile 2026 - Academic Seminar Invitation

This repository contains the source code for a professional, elegant, and academic landing page designed to invite attendees to the **"Developing Cross-Platform Mobile Applications for the Future"** seminar. The project is tailored for academic evaluation, featuring high-quality formal English invitation language.

## 🚀 Features
- **Professional Light Aesthetic**: Optimized for academic presentation with a bright, clean, and elegant design.
- **Academic English**: Utilizes advanced formal vocabulary and polite invitation structures (e.g., *"Your Presence is Requested"*, *"Explore Particulars"*, *"Event Synopsis"*).
- **Glassmorphism**: Elegant light-mode glass effects with soft shadows and high readability.
- **Fully Responsive**: Adapts seamlessly across mobile, tablet, and desktop viewports.
- **Smooth Animations**: Includes scroll reveal animations, subtle background aurora effects, hover transitions, and a custom loading screen.
- **Interactive Elements**:
  - Functional Countdown Timer.
  - Interactive Testimonial Slider.
  - FAQ Accordion.
  - Form validation with academic-style feedback.
  - Sticky Navigation with scroll spy (active link highlighting).
- **Vanilla Tech Stack**: Built purely using HTML5, CSS3, and Vanilla JavaScript. No heavy frameworks (React/Vue/Angular) or heavy CSS frameworks (Bootstrap/Tailwind) were used.

## 📁 File Structure
- `index.html` - The main structure of the landing page.
- `style.css` - Custom CSS styling, variables, glassmorphism, and animations.
- `script.js` - Pure JavaScript logic for interactivty (Slider, Form, Accordion, Scroll events).
- `README.md` - Project documentation.

## 🛠️ How to Run
Since this project uses plain HTML, CSS, and JS, there is no need to compile or run a local server (unless desired). 

1. **Directly in Browser**: 
   Simply double-click the `index.html` file, and it will open and function perfectly in any modern web browser (Chrome, Edge, Firefox, Safari).
   
2. **Local Server (Optional but recommended)**:
   If you are using an IDE like VS Code, you can use the **Live Server** extension to host the files locally.
   Alternatively, if you have Python installed, you can open your terminal in this directory and run:
   ```bash
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` in your browser.

## 🎨 Design & Assets
- **Icons**: [Font Awesome 6.4](https://fontawesome.com/)
- **Typography**: [Google Fonts](https://fonts.google.com/) (`Outfit`, `Inter`, `Poppins`)
- **Images**: Provided by placeholder services (`picsum.photos` and `pravatar.cc`).

## ✨ Notes
The form submission is simulated using JavaScript `setTimeout` to mimic a network request delay and display a success message gracefully. No actual backend is connected.
