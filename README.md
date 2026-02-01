
# SVNIT Buy-Sell Marketplace 🛒

A dedicated peer-to-peer marketplace built for the **SVNIT (Sardar Vallabhbhai National Institute of Technology)** community. This platform allows students to buy, sell, or trade items like electronics, musical instruments, calculators, and books within the campus ecosystem.

## 🚀 Project Overview

The **SVNIT Buy-Sell** website simplifies the process of finding second-hand essentials for students. By creating a localized platform, it eliminates the need for external classifieds and ensures that transactions happen safely between verified campus peers.

## ✨ Features

* **Campus-Specific Categories:** Organized sections for Musical Instruments, Calculators, Study Materials, and more.
* **Student Dashboard:** Manage your listings, track interested buyers, and update item status.
* **Search & Filter:** Easily find specific items needed for coursework or hostel life.
* **Responsive Design:** Optimized for both mobile and desktop use for quick browsing between classes.
* **Secure Authentication:** User management designed to keep the marketplace exclusive to the community.

## 🛠️ Tech Stack

* **Framework:** [Next.js 14/15](https://nextjs.org/) (App Router)
* **Styling:** Tailwind CSS & [shadcn/ui](https://ui.shadcn.com/)
* **Language:** TypeScript
* **Deployment:** [Vercel](https://vercel.com/)
* **Icons:** Lucide React

## 📂 Project Structure

```text
├── app/                # Next.js App Router (Pages, API routes, Layouts)
├── components/         # Reusable UI components (Buttons, Cards, Navbar)
├── public/             # Static assets (Images, Logos)
├── lib/                # Utility functions and shared configurations
├── hooks/              # Custom React hooks
└── types/              # TypeScript definitions

```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MananVelani/svnit-buy-sell.git
cd svnit-buy-sell

```

### 2. Install dependencies

```bash
npm install
# or
yarn install

```

### 3. Set up Environment Variables

Create a `.env.local` file in the root directory and add your necessary credentials (Database URLs, Auth Secrets, etc.):

```env
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url

```

### 4. Run the development server

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view the application.

## 🚀 Deployment

This project is optimized for deployment on the **Vercel Platform**.

To deploy:

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Configure your Environment Variables in the Vercel Dashboard.
4. Click **Deploy**.

## 🤝 Contributing

Contributions make the campus community stronger! If you'd like to add a feature or fix a bug:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/NewFeature`).
3. Commit your Changes (`git commit -m 'Add some NewFeature'`).
4. Push to the Branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

## 📜 License

Distributed under the MIT License.

---

**Developed with ❤️ for SVNIT by [Manan Velani**](https://www.google.com/search?q=https://github.com/MananVelani)
