Drunk Cigs – Full-Stack E-Commerce Clothing Store

A full-stack e-commerce application built for the Drunk Cigs clothing brand.
Includes a responsive frontend storefront, dynamic product system, shopping cart with LocalStorage persistence, and a Node.js/Express backend integrated with Stripe Checkout (test mode).

Live Preview
Home Page
<img width="957" height="1031" alt="Home page screenshot" src="https://github.com/user-attachments/assets/2d61c4c9-56a1-49ab-9509-c028a37d75c5" />
Shop
<img width="953" height="1029" alt="Shop screenshot" src="https://github.com/user-attachments/assets/fbcc20d2-830f-428c-be3e-673f762ff749" />
Side Cart
<img width="955" height="1029" alt="Side cart screenshot" src="https://github.com/user-attachments/assets/501a0e39-fc76-479c-91eb-2dc2bf80127d" />
Cart
<img width="954" height="1034" alt="Cart screenshot" src="https://github.com/user-attachments/assets/53e33b5c-2751-454c-942a-6e6250124806" />
Stripe Checkout
<img width="962" height="1030" alt="Stripe checkout screenshot" src="https://github.com/user-attachments/assets/d1f847e6-9963-451c-bcd9-d44cc0b6816c" />
Success Page
<img width="960" height="1025" alt="Order success screenshot" src="https://github.com/user-attachments/assets/4a4acc75-dc2a-4a25-aadb-c577499b9ce2" />
Cancel Page
<img width="957" height="1027" alt="Order cancel screenshot" src="https://github.com/user-attachments/assets/d5dc2e9b-0096-4184-80b3-1615eaf1811f" />
Features
Product Catalog

Product database defined in product.js.

Auto-rendered into a responsive product grid.

Each product includes:

Title, description, and price

Size options

Front & back images

Optional product tags (e.g., Best Seller, New)

Smooth hover image swap (front → back).

Dynamic Product Detail Page

Individual product pages rendered using URL parameters.

Displays:

Product image

Description

Price

Size selector

Add-to-Cart functionality

Clean, mobile-responsive layout.

Shopping Cart System

Cart data stored in localStorage.

Supports:

Size tracking

Quantity updates

Line-item totals

Cart subtotal

Cart is shared across all pages of the site.

Sliding Cart Sidebar

Opens from the right on any page that supports it.

Displays:

Items, sizes, quantities

Line totals

Cart subtotal

Pages without the sidebar still use cart.html for full cart review.

Full Cart Page

Traditional cart display for final review.

Shares rendering logic with the sidebar for consistency.

Clean, simple UI focused on readability.

Project Structure
DrunkCigs/
│
├── backend/
│   ├── server.js            # Node.js + Express backend (Stripe Checkout)
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── shop.html
│   ├── product.html
│   ├── cart.html
│   ├── success.html
│   ├── cancel.html
│   │
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css
│   │   ├── images/
│   │   │   └── (all product images)
│   │   └── js/
│   │       ├── product.js         # Product database
│   │       ├── shop.js            # Product grid + hover logic
│   │       ├── productDetail.js   # Dynamic product detail page
│   │       ├── cart.js            # LocalStorage cart + sidebar logic
│   │       └── main.js            # Shared UI behaviors
│
└── .gitignore



Tech Stack
Frontend

HTML5

CSS3 (custom styles + responsive grid)

JavaScript (ES6 modules)

LocalStorage API

Modular JS architecture

Backend

Node.js

Express.js

Stripe API (Checkout Sessions – test mode)

Installation & Setup
1. Clone the repository
git clone https://github.com/YOUR_USERNAME/DrunkCigs-full-stack-e-commerce-project.git
cd DrunkCigs-full-stack-e-commerce-project


Replace YOUR_USERNAME and repo name with your actual GitHub path.

2. Frontend Setup (No build tools needed)

You can open the site directly in a browser or via a simple static server:

frontend/index.html

frontend/shop.html

The frontend runs entirely in the browser.

3. Backend Setup (Stripe Checkout)

From the project root:

cd backend
npm install


Create a .env file in the backend/ folder:

STRIPE_SECRET_KEY=your_stripe_test_key_here


Start the server:

node server.js


The backend runs at:

http://localhost:4242


Note: Only Stripe test keys are used during development. No real payment data is processed.

Future Improvements

Enable production-ready Stripe Checkout end-to-end (live mode).

Admin dashboard for product and inventory management.

Editable cart items (inline editing of size/quantity).

“Quick Add” modals and micro-interactions.

Skeleton loaders and subtle animations for product loads.

Mobile drawer/cart refinements.

Dark/light mode toggle.

Author

Joey Castillo
Full-stack developer & CS student building real-world applications.
Guided by ChatGPT during development to support a real small clothing brand.
