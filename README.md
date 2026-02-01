# 🍽️ Restaurant Solutions — Frontend

Production React frontend for the Restaurant Management Platform, deployed to **AWS S3 + CloudFront CDN** with an automated GitHub Actions pipeline.

## 🌐 Live Website
[www.restaurantsolutions.shop](https://www.restaurantsolutions.shop)(https://app.restaurantsolutions.shop)

---

## 🏗️ Architecture Overview

```
GitHub Actions → React Build → S3 Bucket → CloudFront CDN → Users
                                   ↑
                          dynamic-images/ (preserved)
```

---

## ☁️ AWS Services Used

| Service | Purpose |
|---------|---------|
| **S3** | Hosts the built React app |
| **CloudFront** | Global CDN for fast delivery |
| **Route 53** | DNS management |
| **ACM** | SSL certificate |

---

## 📦 Tech Stack

- **Framework:** React (Create React App)
- **Language:** JavaScript
- **Icons:** react-icons
- **API:** Connects to backend via REST API
- **Deployment:** GitHub Actions + S3 + CloudFront

---

## 🔄 CI/CD Pipeline

```
1. Push code to main branch
2. GitHub Actions triggers workflow
3. npm ci → npm run build
4. S3 sync (preserves dynamic-images folder)
5. CloudFront cache invalidation
6. Live instantly worldwide
```

### Key Details
- `--delete` flag removes old files from S3
- `--exclude "dynamic-images/*"` preserves uploaded images
- CloudFront invalidation ensures users see latest version immediately

---

## 📁 Project Structure

```
restaurant-app-front-end/
├── public/
│   └── index.html
├── src/
│   ├── index.js           # Entry point
│   ├── App.js             # Main app + navigation
│   ├── components/
│   │   ├── MenuPage.js    # Menu display
│   │   ├── CartPage.js    # Shopping cart
│   │   ├── OrdersPage.js  # Order history
│   │   ├── LoginPage.js   # Authentication
│   │   └── RegisterPage.js
│   └── styles-premium-mobile.css  # Responsive styles
├── .github/
│   └── workflows/
│       └── deploy-frontend-s3.yml  # CI/CD pipeline
└── package.json
```

---

## 📱 Features

- **Responsive Design** — Mobile-first with hamburger menu
- **Menu Browsing** — Browse and filter restaurant items
- **Shopping Cart** — Add/remove items with live badge count
- **User Auth** — JWT-based login/register
- **Order History** — View past orders
- **Toast Notifications** — Real-time feedback on actions
- **Dynamic Images** — Hosted on S3, served via CloudFront CDN
