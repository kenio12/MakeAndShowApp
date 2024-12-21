export enum AppGenre {
  GAME = 'GAME',
  TOOL = 'TOOL',
  EDUCATION = 'EDUCATION',
  ENTERTAINMENT = 'ENTERTAINMENT',
  BUSINESS = 'BUSINESS',
  SOCIAL = 'SOCIAL',
  UNSPECIFIED = 'UNSPECIFIED'
}

export const AppGenreLabels: Record<AppGenre, string> = {
  [AppGenre.GAME]: 'ゲーム',
  [AppGenre.TOOL]: 'ツール',
  [AppGenre.EDUCATION]: '教育',
  [AppGenre.ENTERTAINMENT]: 'エンタメ',
  [AppGenre.BUSINESS]: 'ビジネス',
  [AppGenre.SOCIAL]: 'ソーシャル',
  [AppGenre.UNSPECIFIED]: '未指定'
}

export const AppGenreColors: Record<AppGenre, { bg: string; text: string; border: string }> = {
  [AppGenre.GAME]: { bg: '#FED7D7', text: '#9B2C2C', border: '#FC8181' },
  [AppGenre.TOOL]: { bg: '#E9D8FD', text: '#553C9A', border: '#B794F4' },
  [AppGenre.EDUCATION]: { bg: '#C6F6D5', text: '#276749', border: '#68D391' },
  [AppGenre.ENTERTAINMENT]: { bg: '#FEEBC8', text: '#9C4221', border: '#F6AD55' },
  [AppGenre.BUSINESS]: { bg: '#BEE3F8', text: '#2C5282', border: '#63B3ED' },
  [AppGenre.SOCIAL]: { bg: '#FED7E2', text: '#97266D', border: '#F687B3' },
  [AppGenre.UNSPECIFIED]: { bg: '#E2E8F0', text: '#4A5568', border: '#A0AEC0' }
} 