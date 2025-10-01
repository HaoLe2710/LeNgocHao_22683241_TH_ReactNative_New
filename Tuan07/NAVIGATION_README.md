# Bike Shop App với Expo Router

Đây là ứng dụng React Native sử dụng Expo Router để quản lý navigation.

## Cài đặt

1. Cài đặt dependencies:

```bash
npm install
```

2. Khởi động ứng dụng:

```bash
npx expo start
```

## Cấu trúc Navigation

Ứng dụng sử dụng Expo Router với cấu trúc file-based routing:

```
app/
├── _layout.tsx          # Root layout với Stack Navigator
├── index.tsx            # Home Screen (/)
├── bike-list.tsx        # Bike List Screen (/bike-list)
└── bike-detail/
    └── [id].tsx         # Dynamic route cho Bike Detail (/bike-detail/[id])
```

## Các Screen

### 1. Home Screen (`/`)

- Màn hình chào mừng
- Nút "Get Started" điều hướng đến danh sách xe đạp

### 2. Bike List Screen (`/bike-list`)

- Hiển thị danh sách xe đạp từ API
- Có filter theo loại xe (All, Roadbike, Mountain)
- Tap vào xe để xem chi tiết

### 3. Bike Detail Screen (`/bike-detail/[id]`)

- Hiển thị thông tin chi tiết của xe đạp
- Lấy dữ liệu từ API dựa trên ID
- Có nút "Add to cart"

## API

Ứng dụng sử dụng MockAPI để lấy dữ liệu:

- GET: `https://68ca01fdceef5a150f6692a8.mockapi.io/bikes` - Lấy danh sách xe
- GET: `https://68ca01fdceef5a150f6692a8.mockapi.io/bikes/{id}` - Lấy chi tiết xe

## Navigation

Sử dụng Expo Router hooks:

- `useRouter()` - Để điều hướng
- `useLocalSearchParams()` - Để lấy parameters từ URL
- `router.push('/path')` - Điều hướng forward
- `router.back()` - Quay lại

## Components

- `BikeCard` - Component hiển thị thông tin cơ bản của xe đạp
- Các screen components trong thư mục `app/`

## Styling

- Sử dụng StyleSheet của React Native
- Màu chính: `#e94141` (đỏ)
- Shadow và elevation cho các card components
