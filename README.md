# PG-Rental

## Overview
PG-Rental is a user-friendly, full-stack web-application that efficiently connects PG owners with seekers, managed by admins. Owners can easily advertise their accommodations, while seekers find and rent spaces conveniently. With its advanced features, PG-Rental ensures a seamless experience for all users.

## Key Features
- **User SignUp/SignIn**: Seamlessly create or access user accounts to explore PG listings.
- **PGs Search, Sort, Filter**: Effortlessly search, sort, and filter PG accommodations based on preferences.
- **PG Payment**: Securely process payments for renting PG accommodations.
- **PG Rent Agreement & Its Payment**: Designated users process the rent agreement along with its associated fees payment.
- **Admin SignIn**: Seperate panel for admin login
- **Admin View/Add/Delete PGs**: Admins manage PG listings by viewing, adding, or deleting them as necessary.
- **Contact Admin**: PG owners provide PG details to admins for PG listings.
- **PG Feedback**: Provide valuable feedback on PG accommodations to admins.

## Technical Details
The PG-Rental is built using the following technologies :

- MongoDB
- Express.js
- React.js
- Node.js
- Bootstrap

## Setup Instructions

### Prerequisites

Before getting started with PG-Rental, ensure you have the MERN prerequisites installed.

### Getting Started

Follow these steps to get started with PG-Rental:

1. **Clone the Repository**: Clone the PG-Rental repository to your local machine using the following command:

   ```bash
   git clone https://github.com/jugalupadhyay/PG-Rental.git

2. **Fill out links**
   - Provide the link of the MongoDB Url.
     - File: `db.js`
     - File: `routes\keys.js`

   - Provide the api link of the Stripe payment.
     - File: `client\src\components\Agreement.js`
     - File: `client\src\components\Payment.js`
     - File: `client\src\components\PG.js`
     - File: `server.js`

   - Provide the api link of the Cloudinary.
     - File: `client\src\components\ContactAdmin.js`
     - File: `client\src\screens\Addpg.js`
      
   - Provide the api link of the Formspree.
     - File: `client\src\components\ContactAdmin.js`
     - File: `client\src\components\ReportIssue.js`
    
   - Provide the api link of the GoogleOAuthProvider Client Id.
     - File: `client\src\App.js`
    
   - Provide the links for the relevent Images.
     - File: `client\src\components\Admin.js`
     - File: `client\src\components\PasswordReset.css`
     - File: `client\src\components\SignIn.js`
     - File: `client\src\components\SignUp.css`
     - File: `client\src\screens\Homescreen.js`
    
    - Create folder images `client\src\images`
      - Create following files and add relevent images
        - File: `client\src\images\fail.png`
        - File: `client\src\images\logo.png`
        - File: `client\src\images\NotaryVerification.png`
        - File: `client\src\images\payment.png`
        - File: `client\src\images\profile.jpg`

   - Provide the links for the relevent GIF.
     - File: `client\src\components\ContactAdmin.js`
     - File: `client\src\components\ReportIssue.js`
    
   - Fill out details
     - File: `client\src\components\Agreement.js`
       - Write demo details (name, address, charge, contact number)
     - File: `routes\auth.js`
       - write email
       - write password
       - set admin email and password for login to admin panel
       - write email

3. **Install dependencies using npm**: Run following command in each directory where package.json is present

   ```bash
   npm install

4. **Start the server using nodemon**

   ```bash
   nodemon server

5. **Start the client using npm**

   ```bash
   cd client
   npm start   

### Accessing PG-Rental
- Once both the backend and frontend are running, you can access PG-Rental by navigating to the `localhost:3000` in your web browser.

       
 
