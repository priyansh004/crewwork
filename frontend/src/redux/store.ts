import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { Store } from '@reduxjs/toolkit';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { WebStorage } from 'redux-persist/lib/types';

export function createPersistStorage(): WebStorage {
  const isServer = typeof window === 'undefined';

  // Returns noop (dummy) storage.
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }

  return createWebStorage('local');
}


const persistConfig = {
    key: 'root',
    version: 1,
    storage:createPersistStorage()
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store: Store = configureStore({
    reducer: {
      user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;