import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NavigationPage, SystemSettings, Conversation, Brand } from '../types';
import { BRANDS, INITIAL_SETTINGS } from '../data/mockData';
import { ApiService } from '../services/api';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  activePage: NavigationPage;
  setActivePage: (page: NavigationPage) => void;
  selectedBrand: string;
  setSelectedBrand: (brandId: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  toggleDarkMode: () => void;
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  setActiveConversation: (conv: Conversation | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  updateConversationStatus: (id: string, status: Conversation['status'], newReply?: string) => Promise<void>;
  brands: Brand[];
  currentBrandObj: Brand;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<NavigationPage>('overview');
  const [selectedBrand, setSelectedBrand] = useState<string>('demo-brand');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [settings, setSettings] = useState<SystemSettings>(INITIAL_SETTINGS);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const showToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const loadConversations = async () => {
    const list = await ApiService.getConversations(searchQuery);
    setConversations(list);
    if (!activeConversation && list.length > 0) {
      setActiveConversation(list[0]);
    }
  };

  useEffect(() => {
    loadConversations();
  }, [searchQuery, selectedBrand]);

  const handleUpdateSettings = (newSettings: Partial<SystemSettings>) => {
    const updated = ApiService.updateSettings(newSettings);
    setSettings(updated);
    showToast('System settings updated successfully', 'success');
  };

  const handleUpdateConversationStatus = async (id: string, status: Conversation['status'], newReply?: string) => {
    try {
      const updatedConv = await ApiService.updateConversationStatus(id, status, newReply);
      setConversations(prev => prev.map(c => c.id === id ? updatedConv : c));
      if (activeConversation?.id === id) {
        setActiveConversation(updatedConv);
      }
      showToast(`Conversation status updated to ${status.toUpperCase()}`, 'success');
    } catch (err) {
      showToast('Failed to update conversation status', 'error');
    }
  };

  const currentBrandObj = BRANDS.find(b => b.id === selectedBrand) || BRANDS[0];

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedBrand,
        setSelectedBrand,
        darkMode,
        setDarkMode,
        toggleDarkMode,
        settings,
        updateSettings: handleUpdateSettings,
        conversations,
        activeConversation,
        setActiveConversation,
        searchQuery,
        setSearchQuery,
        toasts,
        showToast,
        removeToast,
        updateConversationStatus: handleUpdateConversationStatus,
        brands: BRANDS,
        currentBrandObj
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
