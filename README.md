# 💻 Smart Deals Backend

This is the **backend server** for the Smart Deals web application, a platform for listing products and managing bids.  
It provides RESTful APIs for user authentication, product management, and bid tracking.

---

## 🌐 Live Server
vercel -(https://smart-deals-server-ten.vercel.app/)

---

## 🛠️ Features

- **User Authentication** — Login and register using **Firebase Authentication**.
- **JWT Authorization** — Secure endpoints using JWT tokens.
- **Product Management**  
  - Add, update, delete, and fetch products.
- **Bid Management**  
  - Place new bids, update, delete, and fetch all bids for products.
- **Secure Routes** — Only authenticated users can access protected endpoints.
- **MongoDB Integration** — Store users, products, and bids.

---

## 🛠️ Tech Stack

### **Backend**
| Node.js | Express.js | Firebase Admin | JWT |
|---------|------------|----------------|-----|
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="45"/> | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" width="45"/> | <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" width="45"/> | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/jsonwebtokens/jsonwebtokens-original.svg" width="45"/> |

### **Database**
| MongoDB | Mongoose |
|---------|---------|
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" width="45"/> | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongoose/mongoose-original.svg" width="45"/> |

---

## 📁 API Endpoints

### **Users**
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/user` | Register a new user |
| POST | `/userToken` | Generate JWT for user |

### **Products**
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get single product by ID |
| POST | `/products` | Add new product (**JWT protected**) |
| PATCH | `/products/:id` | Update product by ID |
| DELETE | `/products/:id` | Delete product by ID |

### **Bids**
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/bids` | Get bids (JWT protected) |
| GET | `/bids/:id` | Get bid by ID |
| POST | `/bids` | Place a new bid |
| PATCH | `/bids/:id` | Update bid |
| DELETE | `/bids/:id` | Delete bid |

---

## ⚙️ Installation & Setup

1️⃣ Clone the repository
```bash
git clone https://github.com/rasel701/smart-deals-server.git
```

2️⃣ Install dependencies
```bash
npm install
```

3️⃣ Create a `.env` file:
```
PORT=3000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
JWT_SECRET=your_jwt_secret
```

4️⃣ Start the server
```bash
npm run start
```
or for dev mode:
```bash
npm run dev
```

---

## 🔐 Authentication

- JWT-based authentication is used for protected routes.
- Firebase Admin SDK is used for verifying users.
- Include token in `Authorization` header:  
```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

---

## 👨‍💻 Developer

**Rasel Mia**  
📧 Email: rasel708211@gmail.com

---

⭐ _If you like this project, consider giving a star!_
