export enum AppGenre {
  UNSPECIFIED = 'UNSPECIFIED',
  WEB = 'WEB_APP',
  IOS = 'IOS_APP',
  ANDROID = 'ANDROID_APP',
  WINDOWS = 'WINDOWS_APP',
  MAC = 'MAC_APP',
  LINUX = 'LINUX_APP'
}

export const AppGenreLabels: Record<AppGenre, string> = {
  [AppGenre.UNSPECIFIED]: '指定なし',
  [AppGenre.WEB]: 'Webアプリ',
  [AppGenre.IOS]: 'iPhoneアプリ',
  [AppGenre.ANDROID]: 'Androidアプリ',
  [AppGenre.WINDOWS]: 'Windowsアプリ',
  [AppGenre.MAC]: 'Macアプリ',
  [AppGenre.LINUX]: 'Linuxアプリ'
}

// ジャンルごとの色を定義
export const AppGenreColors: Record<AppGenre, { bg: string; text: string; border: string }> = {
  [AppGenre.UNSPECIFIED]: {
    bg: '#F7FAFC',      // 薄いグレー
    text: '#4A5568',    // グレー
    border: '#CBD5E0'   // 中間のグレー
  },
  [AppGenre.WEB]: {
    bg: '#EBF8FF',      // 薄い青
    text: '#2B6CB0',    // 濃い青
    border: '#90CDF4'   // 中間の青
  },
  [AppGenre.IOS]: {
    bg: '#F0FFF4',      // 薄い緑
    text: '#276749',    // 濃い緑
    border: '#9AE6B4'   // 中間の緑
  },
  [AppGenre.ANDROID]: {
    bg: '#FEEBC8',      // 薄いオレンジ
    text: '#C05621',    // 濃いオレンジ
    border: '#FBD38D'   // 中間のオレンジ
  },
  [AppGenre.WINDOWS]: {
    bg: '#E9D8FD',      // 薄い紫
    text: '#553C9A',    // 濃い紫
    border: '#B794F4'   // 中間の紫
  },
  [AppGenre.MAC]: {
    bg: '#FED7D7',      // 薄い赤
    text: '#C53030',    // 濃い赤
    border: '#FC8181'   // 中間の赤
  },
  [AppGenre.LINUX]: {
    bg: '#E2E8F0',      // 薄いグレー
    text: '#2D3748',    // 濃いグレー
    border: '#A0AEC0'   // 中間のグレー
  }
} 