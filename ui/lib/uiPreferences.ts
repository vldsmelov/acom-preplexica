export interface UIPreferences {
  showDiscoverTab: boolean;
  showAttach: boolean;
  showFocus: boolean;
}

export const DEFAULT_UI_PREFERENCES: UIPreferences = {
  showDiscoverTab: false,
  showAttach: false,
  showFocus: false,
};

const UI_PREFERENCE_KEYS = {
  showDiscoverTab: 'ui.showDiscoverTab',
  showAttach: 'ui.showAttach',
  showFocus: 'ui.showFocus',
} as const;

const getStoredBoolean = (key: string, fallback: boolean) => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const storedValue = localStorage.getItem(key);

  if (storedValue === null) {
    return fallback;
  }

  return storedValue === 'true';
};

export const getUIPreferences = (): UIPreferences => ({
  showDiscoverTab: getStoredBoolean(
    UI_PREFERENCE_KEYS.showDiscoverTab,
    DEFAULT_UI_PREFERENCES.showDiscoverTab,
  ),
  showAttach: getStoredBoolean(
    UI_PREFERENCE_KEYS.showAttach,
    DEFAULT_UI_PREFERENCES.showAttach,
  ),
  showFocus: getStoredBoolean(
    UI_PREFERENCE_KEYS.showFocus,
    DEFAULT_UI_PREFERENCES.showFocus,
  ),
});

export const saveUIPreferences = (preferences: UIPreferences) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(
    UI_PREFERENCE_KEYS.showDiscoverTab,
    String(preferences.showDiscoverTab),
  );
  localStorage.setItem(
    UI_PREFERENCE_KEYS.showAttach,
    String(preferences.showAttach),
  );
  localStorage.setItem(
    UI_PREFERENCE_KEYS.showFocus,
    String(preferences.showFocus),
  );
};
