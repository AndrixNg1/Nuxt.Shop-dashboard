export type SettingsTabId = 'general' | 'store' | 'notifications' | 'security'

export interface SettingsTab {
  id: SettingsTabId
  label: string
  icon: string
}

export interface SettingsProfile {
  firstName: string
  lastName: string
  email: string
  bio: string
}
