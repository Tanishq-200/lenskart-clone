# Lenskart Partner & Landlord Website (Full-Stack Recreation)

A faithful full-stack recreation of the **original Lenskart Partner and Landlord website**, built strictly in accordance with the original reference screenshots without any invented elements or unrequested redesigns.

---

## 📸 Website Structure (Exact Match to Screenshots)

### 1. Announcement Bar & Navigation
- **Top Announcement Bar** (`#111111`):
  `Be cautious while dealing with anyone claiming to offer Lenskart franchisee and to verify details click here.`
- **Header**:
  - Lenskart logo on the left (two circular blue spectacle rims + "lenskart" in dark blue typography).
  - Centered navigation: **Partner** and **Landlord**.
  - Solid turquoise underline indicator (`#52b4a7`) beneath the active tab.

---

### 2. Partner Page (Screenshots 3, 4, 5)
- **Left Column**:
  - `OWN A SUCCESSFUL BUSINESS`
  - `Join Us As A Franchise Partner Today` (turquoise `#52b4a7`)
  - Description:
    *"Lenskart is a technology-driven eyewear company, with 2500+ stores across 500+ cities. Become a franchise partner, and join Lenskart's Vision Mission today."*
  - `Returns that we deliver for our partners`
    - `25-30% Margin` with coin icon in circular turquoise outline.
    - `Quick Breakeven` with trendline chart icon in circular turquoise outline.
  - `Why Partner With Us?`
    - Card with 3 vertical sidebar icons on left:
      1. Briefcase / Model icon (Business Model & Economics).
      2. Optometrist / Computer icon (Active turquoise tab in Screenshot 4: Business Vision).
      3. Storefront icon (Active tab in Screenshot 5: Store photo with caption *"A premium store for all cities in India."*).
- **Right Column (Light Turquoise Panel `#c1eee6`)**:
  - `Ready to start your growth journey?`
  - `Are you an optometrist ?` (`Yes` / `No` radio options)
  - Pill-shaped text inputs with centered placeholder:
    - `Name`
    - `Email`
    - `Phone Number`
    - `City`
  - `What property type will you open the store at?` (`Owned` / `Rented/Leased` radio options)
  - Button: `SUBMIT REQUEST` (pill-shaped, solid turquoise `#52b4a7`).

---

### 3. Landlord Page (Screenshots 1 & 2)
- **Header**:
  - Title: `Landlords - Lenskart` (turquoise `#52b4a7`, centered).
  - Description:
    *"Do you have a property in a main market in your city which you would like to rent? We are here for you. Lenskart has a network of 2500+ stores. As part of our expansion plan, we constantly require main market properties that meet our specifications."*
  - Link: *"Click here to check out the list of cities and markets where we are actively looking for a store."*
  - Follow-up: *"We request you to fill the form below and we will contact you shortly."*
- **Form Layout (Two-Column Horizontal Alignment)**:
  - **PERSONAL DETAILS**:
    - `First Name * :` [Enter your First Name]  |  `Mobile No * :` [Enter your Mobile No.]
    - `Last Name * :` [Enter your Last Name]    |  `City * :` [Enter your city]
    - `Email Id * :` [Enter your Email Id]      |  `State * :` [Select State v]
  - **LAND DETAILS**:
    - `Landlord Type * :` [Select Landlords Type v]  |  `Frontage * :` [Frontage in Sq.ft]
    - `Property Address * :` [Layout Address] (textarea)
    - `City * :` [Location]                         |  `Carpet Area * :` [Size in Sq.ft]
    - `Super Area * :` [In Sq.ft]                   |  `Catchment :` [Neighborhood Market]
  - Button: `SUBMIT` (turquoise `#52b4a7`).

---

## 🛠️ Technology Stack

- **Frontend**:
  - React 19
  - Vite 6
  - Vanilla CSS design system strictly matching the screenshots
  - Lucide React Icons
- **Backend**:
  - Node.js & Express
  - RESTful APIs (`/api/leads/partner`, `/api/leads/landlord`, `/api/health`)
  - Request validation and database persistence
- **Database**:
  - MongoDB / Mongoose models (`PartnerLead`, `LandlordLead`)
  - Graceful persistent JSON disk store (`server/data/submissions.json`) ensuring immediate run without local mongod setup.

---

## 🚀 How to Run

1. **Install dependencies**:
   ```bash
   npm install
   npm install --prefix server
   npm install --prefix client
   ```

2. **Start the application**:
   ```bash
   npm run dev
   ```
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:5000](http://localhost:5000)

3. **Run API verification tests**:
   ```bash
   npm run test:api
   ```
