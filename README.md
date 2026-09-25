# Web HMI Hệ Thống Phân Loại Hàng (Package Sorting System HMI)

Dự án Web HMI dành cho hệ thống phân loại hàng công nghiệp.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React
- **Backend:** Node.js, Express, TypeScript, tsx

---

## 📁 Cấu trúc dự án (Project Structure)

```text
job/
├── docs/              # Báo cáo chi tiết sau mỗi task
│   └── TASK_01_INITIALIZE_PROJECT.md
├── frontend/          # Web HMI Frontend UI (Vite + React + Tailwind CSS)
│   ├── public/
│   │   └── isometric_sorting_plant.jpg
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts
│   └── .env.example
├── backend/           # Express Backend API
│   ├── src/
│   │   └── index.ts
│   ├── tsconfig.json
│   └── .env.example
├── .env.example       # Mẫu biến môi trường tổng quan
├── package.json       # Npm workspace runner
└── README.md          # Tài liệu hướng dẫn dự án
```

---

## 🚀 Hướng Dẫn Chạy Dự Án (Quick Start)

### 1. Cài đặt các gói phụ thuộc (Install Dependencies)

Chạy lệnh sau tại thư mục gốc để tự động cài đặt gói phụ thuộc cho cả `frontend` và `backend`:

```bash
npm install
```

### 2. Khởi chạy ứng dụng (Run Development Mode)

Chạy lệnh duy nhất để khởi động đồng thời cả Backend (port 3001) và Frontend (port 3000):

```bash
npm run dev
```

Sau khi chạy thành công:
- **Frontend Web HMI:** [http://localhost:3000](http://localhost:3000)
- **Backend Health Check:** [http://localhost:3001/api/health](http://localhost:3001/api/health)

---

## 🔌 API Endpoints

### `GET /api/health`

- **Port Backend:** `3001`
- **Host Bind:** `0.0.0.0`
- **Response Format:**
  ```json
  {
    "status": "ok"
  }
  ```

---

## 📑 Danh Sách Báo Cáo Task (Task Reports)

- 📘 [Báo Cáo Chi Tiết Task 01: Khởi Tạo Dự Án & Baseline HMI Dashboard](docs/TASK_01_INITIALIZE_PROJECT.md)
