# E-Commerce Frontend

A **React** frontend for an e-commerce application with cart, checkout, and order history functionality.  

---

## **Technologies Used**

- **React** (with Hooks: `useState`, `useEffect`)  
- **React Router** for page navigation  
- **Tailwind CSS** for styling  
- **Axios** for API calls  

---

## **Installation**

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm start
```

The app will run on `http://localhost:3000`.

---

## **Project Structure**

```
src/
├─ pages/
│  ├─ Dashboard.jsx     # Main page showing products, cart, and orders
│  ├─ Cart.jsx          # Cart page with item management
│  └─ Checkout.jsx      # Checkout form with pre-filled user details
├─ components/
│  └─ Navbar.jsx        # Navbar with fixed position and cart count
├─ api.js               # Axios instance for API requests
└─ App.jsx              # Routes configuration
```

---

## **Features Explained**

### **1. Dashboard**
- Displays welcome message with user name and email  
- Shows all products in a grid  
- Add products to cart or update quantity  
- Shows cart count in Navbar  
- Displays user’s order history  

### **2. Cart Page**
- List of items in cart  
- Increase/decrease quantity  
- Remove individual items  
- Clear entire cart  
- Proceed to checkout  

### **3. Checkout Page**
- Pre-fills user details (name, email, phone, address) if present  
- Users can edit phone and address  
- Place order → sends cart items to backend  
- Clears cart after successful order  
- Redirects back to dashboard  

### **4. Navbar**
- Fixed at the top of the page  
- Shows logged-in user name and cart count  
- Navigation links to Dashboard and Cart  

---

## **Usage**

1. Login or register (assumes backend API exists)  
2. Browse products on the Dashboard  
3. Add products to your cart  
4. Manage cart items in Cart page  
5. Checkout to place order  
6. Orders are displayed on Dashboard  

---

## **Notes**
- Local storage is used to store user info and token  
- Axios instance in `api.js` handles API requests  
- Cart and checkout pages rely on logged-in user data from local storage

