# 📋 Task Management App - Tuan09

A modern task management application built with **Expo Router**, **SQLite**, and **Cloud Sync** capabilities. Featuring local-first architecture with bi-directional synchronization to MockAPI.

> **Assignment**: Build a React Native app using Expo Router + SQLite with cloud sync and EAS preview distribution

## ✨ Features

### 🎯 Core Features
- ✅ **Task Management**: Create, read, update, delete tasks locally
- ✅ **Local Storage**: SQLite database for offline capability
- ✅ **Cloud Sync**: Bi-directional sync with MockAPI
- ✅ **Sync Status**: Visual indicators showing sync status (✓ synced / ⚠️ pending)
- ✅ **Pull-to-Refresh**: Manually sync with cloud
- ✅ **Auto-Sync**: Automatic background synchronization
- ✅ **Error Handling**: Graceful error management with retry logic

### 🔄 Sync Capabilities
- **From Cloud**: Pull latest tasks from API
- **To Cloud**: Push local changes to API
- **Full Sync**: Bi-directional synchronization
- **Conflict Resolution**: Last-write-wins strategy
- **Status Tracking**: Know which tasks are synced

### 📱 Platform Support
- iOS (via Expo)
- Android (via Expo)
- Web (via Expo Web)
- Preview Distribution (via EAS Build)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI for building (`npm install -g eas-cli`)

### Installation

```bash
cd Tuan09
npm install
```

### Run Development Server

```bash
# Universal
npm start

# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

Scan the QR code with **Expo Go** app to run on your phone!

## 📦 Project Structure

```
Tuan09/
├── app/                    # Expo Router app directory
│   ├── _layout.tsx        # Root layout with providers
│   └── index.tsx          # Main tasks screen
├── components/            # React components
│   ├── TaskInput.tsx      # New task input
│   ├── TaskItem.tsx       # Individual task
│   └── TaskList.tsx       # Tasks list
├── hooks/                 # Custom React hooks
│   └── useTasks.ts        # Task management hook
├── services/              # Business logic layer
│   ├── DatabaseService.ts # SQLite operations
│   ├── ApiService.ts      # API client
│   └── SyncService.ts     # Sync orchestration
├── contexts/              # React contexts
│   └── SyncContext.tsx    # Global sync state
├── models/                # TypeScript types
│   └── Task.ts            # Task interface
└── constants/             # App configuration
    └── config.ts          # Configuration
```

## 🔌 API Integration

**MockAPI Endpoint:**
```
https://68ca01fdceef5a150f6692a8.mockapi.io/tasks
```

**Task Structure:**
```json
{
  "id": "1",
  "title": "International Configuration Consultant",
  "isComplete": false,
  "createdAt": "2025-10-27T20:07:15.014Z",
  "syncedAt": "2025-10-29T10:30:00.000Z"
}
```

## 💾 Local Database

**SQLite Table:**
```sql
CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  isComplete INTEGER NOT NULL,
  createdAt TEXT NOT NULL,
  syncedAt TEXT  -- NULL if not synced
);
```

## 🔄 Sync Architecture

### How Sync Works

1. **Local-First**: Changes are saved to SQLite immediately
2. **Auto-Sync**: Synchronizes with API in background
3. **Manual Sync**: User can pull-to-refresh anytime
4. **Status Tracking**: Each task tracks if it's synced

### Sync Flow

```
User adds task
    ↓
Saved to SQLite
    ↓
UI updates immediately
    ↓
Background: Sync to API
    ↓
Update syncedAt timestamp
    ↓
UI shows sync status
```

### Sync Modes

- **Pull from Cloud**: Fetch latest from API
- **Push to Cloud**: Send local changes to API
- **Full Sync**: Both directions

## 🎯 Usage

### Add a Task
1. Type task title in input field
2. Press "+" button
3. Task appears in list (⚠️ unsynced)
4. Auto-sync or manual pull-to-refresh to sync

### Complete a Task
1. Tap checkbox next to task
2. Task status updates locally
3. Syncs to cloud automatically

### Delete a Task
1. Tap delete icon (×)
2. Confirm deletion
3. Task removed from local database
4. Syncs to cloud

### Manual Sync
1. Pull list down to refresh (pull-to-refresh)
2. Or tap cloud icon in header
3. App syncs with MockAPI
4. Status indicators update

## 📊 App Statistics

Shows real-time stats:
- **Total**: Total number of tasks
- **Completed**: Completed tasks count
- **Remaining**: Pending tasks count
- **Synced**: Synced tasks count

## 🚀 Building for Preview

### Step 1: Setup EAS
```bash
eas login
eas build:configure
```

### Step 2: Build Preview
```bash
# Android
eas build --platform android --profile preview

# iOS
eas build --platform ios --profile preview

# Both
eas build --platform all --profile preview
```

### Step 3: Share Build
Build artifacts are automatically uploaded to expo.dev
- Share link with team
- Install directly on device
- No app store needed

**See [EAS_BUILD_GUIDE.md](./EAS_BUILD_GUIDE.md) for detailed instructions**

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Installation & setup guide
- **[SYNC_GUIDE.md](./SYNC_GUIDE.md)** - Detailed sync architecture
- **[EAS_BUILD_GUIDE.md](./EAS_BUILD_GUIDE.md)** - Build & distribution guide
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Complete file organization

## 🧪 Testing

### Test Cases

1. ✅ **Add task offline, sync when online**
2. ✅ **Add task on API, pull to sync**
3. ✅ **Update task locally and cloud**
4. ✅ **Delete and sync**
5. ✅ **Pull-to-refresh**
6. ✅ **Auto-sync in background**
7. ✅ **Error handling & retry**

## 🔧 Development

### Debugging

**View SQLite Data:**
```bash
# Android
adb shell
cd /data/data/com.expo.tuan09/databases/
sqlite3 tasks.db
SELECT * FROM tasks;
```

**Check Logs:**
```bash
# Terminal running `npm start`
# Watch console output for logs
```

**Use Debugger:**
- React Native Debugger
- Flipper (Facebook's debugging platform)
- VS Code debugger

### Hot Reload
Changes to `.tsx` and `.ts` files hot reload automatically

### Environment Variables
Edit `.env` file for configuration:
```env
EXPO_PUBLIC_API_URL=https://68ca01fdceef5a150f6692a8.mockapi.io
EXPO_PUBLIC_AUTO_SYNC_ENABLED=true
```

## 📦 Dependencies

### Core
- `expo@~54.0.20`
- `react@19.1.0`
- `react-native@0.81.5`

### Navigation
- `expo-router@~6.0.13`
- `@react-navigation/native@^7.1.8`

### Storage & Sync
- `expo-sqlite@^14.2.1`
- `axios@^1.6.2`

### UI
- `@expo/vector-icons@^15.0.3`
- `react-native-reanimated@~4.1.1`

## ⚙️ Configuration

### API Config
```typescript
API_BASE_URL: 'https://68ca01fdceef5a150f6692a8.mockapi.io/tasks'
TIMEOUT: 10000
```

### Sync Config
```typescript
AUTO_SYNC_INTERVAL: 5 minutes
RETRY_ATTEMPTS: 3
RETRY_DELAY: 1 second
```

## 🐛 Troubleshooting

### App won't start
```bash
# Clear cache and reinstall
npm install
npx expo-cli prebuild --clean
npm start -- --clear
```

### Sync not working
1. Check internet connection
2. Verify MockAPI endpoint is accessible
3. Check console logs for errors
4. Try manual sync with cloud icon

### SQLite errors
1. Clear app data
2. Reinstall app
3. Check database file permissions

### Build fails
- See [EAS_BUILD_GUIDE.md](./EAS_BUILD_GUIDE.md)

## 📱 Performance

- **Bundle Size**: ~50MB (Android APK)
- **SQLite**: Lightweight, suitable for thousands of tasks
- **Sync**: Efficient incremental sync
- **Memory**: Optimized with lazy loading

## 🔐 Security Considerations

- ⚠️ This uses MockAPI (for demo purposes)
- Implement proper authentication for production
- Validate data on backend
- Use HTTPS for API calls
- Encrypt sensitive data

## 📝 Notes

- MockAPI has rate limiting - be mindful when testing
- Timestamps are in ISO 8601 format
- All operations are asynchronous
- Offline changes are queued automatically

## 🤝 Contributing

Found a bug? Want to improve? 
- Create an issue with reproduction steps
- Submit a pull request with improvements
- Suggest features

## 📄 License

MIT License - Feel free to use for learning

## 👤 Author

**Lê Ngọc Hào** - 22683241

## 🙏 Acknowledgments

- Expo team for amazing tools
- MockAPI for free API testing
- React Native community

---

**Happy task managing! 🚀**

Made with ❤️ using React Native & Expo


## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
