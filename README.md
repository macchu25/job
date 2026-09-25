# Web HMI Hệ Thống Phân Loại Hàng (Package Sorting System HMI)

Dự án Web HMI dành cho hệ thống phân loại hàng tự động công nghiệp đa ô chứa.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React
- **Backend:** Node.js, Express, TypeScript, tsx

---

## 📁 Cấu trúc dự án (Project Structure)

```text
job/
├── docs/                      # Hồ sơ báo cáo chi tiết từng Task
│   ├── TASK_01_INITIALIZE_PROJECT.md
│   └── TASK_02_SORTING_HMI_CONVERSION.md
├── frontend/                  # Web HMI Frontend UI (Vite + React 19 + Tailwind CSS v4)
│   ├── src/
│   │   ├── components/        # Thư viện component phân tách (Sidebar, Topbar, KPI, Charts, ...)
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Topbar.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── KPICard.tsx
│   │   │   ├── ProcessOverview.tsx
│   │   │   ├── BinFillChart.tsx
│   │   │   ├── BinStatusTable.tsx
│   │   │   └── ActivityLog.tsx
│   │   ├── pages/             # Các trang ứng dụng
│   │   │   └── Dashboard.tsx
│   │   ├── data/              # Nguồn dữ liệu mẫu & định nghĩa Interface
│   │   │   └── mockData.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts
│   └── .env.example
├── backend/                   # Express Backend API
│   ├── src/
│   │   └── index.ts
│   ├── tsconfig.json
│   └── .env.example
├── .env.example               # Mẫu biến môi trường tổng quan
├── package.json               # Npm workspace runner
└── README.md                  # Tài liệu hướng dẫn dự án
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
- 📗 [Báo Cáo Chi Tiết Task 02: Chuyển Đổi Giao Diện Sang HMI Phân Loại Hàng Đa Ô Chứa](docs/TASK_02_SORTING_HMI_CONVERSION.md)
