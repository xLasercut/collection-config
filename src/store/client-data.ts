import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import {TNotificationSettings} from '../models/notifications.ts';

interface TClientDataStoreData {
  notificationSettings: TNotificationSettings;
  signedIn: boolean;
  isMsds: boolean;
}

interface TClientDataStoreState extends TClientDataStoreData {
  setNotificationSettings: (settings: TNotificationSettings) => void;
  signIn: (msds: boolean) => void;
  signOut: () => void;
  reset: () => void;
}

const initialData: TClientDataStoreData = {
  notificationSettings: {
    submissionWindowClose: true,
    submissionWindowOpen: true,
    submissionProcessed: true,
    submissionSummaryReady: true,
    extractCanBeDownloaded: true,
    midWindowClose: true,
  },
  signedIn: false,
  isMsds: false,
};

const clientDataStore = createStore<TClientDataStoreState>(set => {
  return {
    ...initialData,
    setNotificationSettings: (settings: TNotificationSettings) => {
      return set(() => {
        return {
          notificationSettings: settings,
        };
      });
    },
    signIn: (msds: boolean) => {
      return set(() => {
        return {
          signedIn: true,
          isMsds: msds,
        };
      });
    },
    signOut: () => {
      return set(() => {
        return {
          signedIn: false,
        };
      });
    },
    reset: () => {
      return set(() => {
        return {
          ...initialData,
        };
      });
    },
  };
});

function useClientDataStore() {
  return useStore(clientDataStore);
}

export {clientDataStore, useClientDataStore};
