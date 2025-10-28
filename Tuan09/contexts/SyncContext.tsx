import React, { createContext, useContext, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { SyncService } from '@/services/SyncService';
import { SYNC_CONFIG } from '@/constants/config';

interface SyncContextType {
  lastSyncTime: Date | null;
  isSyncing: boolean;
  syncError: string | null;
  performSync: () => Promise<void>;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const [lastSyncTime, setLastSyncTime] = React.useState<Date | null>(null);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [syncError, setSyncError] = React.useState<string | null>(null);
  const appStateRef = React.useRef<AppStateStatus>('active');
  const syncTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const performSync = React.useCallback(async () => {
    if (SyncService.getIsSyncing()) {
      console.log('Sync already in progress');
      return;
    }

    setIsSyncing(true);
    setSyncError(null);

    try {
      await SyncService.fullSync();
      setLastSyncTime(new Date());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setSyncError(errorMessage);
      console.error('Sync error:', error);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Setup automatic sync when app comes to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
      // App has come to foreground
      console.log('App came to foreground, performing sync...');
      performSync();
    }
    appStateRef.current = nextAppState;
  };

  // Setup periodic sync
  useEffect(() => {
    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
    }

    const setupNextSync = () => {
      syncTimerRef.current = setTimeout(() => {
        if (appStateRef.current === 'active') {
          performSync().then(setupNextSync).catch(() => setupNextSync());
        } else {
          setupNextSync();
        }
      }, SYNC_CONFIG.AUTO_SYNC_INTERVAL);
    };

    setupNextSync();

    return () => {
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }
    };
  }, [performSync]);

  return (
    <SyncContext.Provider
      value={{
        lastSyncTime,
        isSyncing,
        syncError,
        performSync,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
}

export function useSyncContext() {
  const context = useContext(SyncContext);
  if (context === undefined) {
    throw new Error('useSyncContext must be used within a SyncProvider');
  }
  return context;
}
