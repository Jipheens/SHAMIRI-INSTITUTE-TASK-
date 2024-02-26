// export const hostApi =
//   process.env.NODE_ENV === 'development' ? 'http://localhost' : '';
export const hostApi =
  process.env.NODE_ENV === 'development' ? 'https://api.abiescreen.com' : '';
  // https://api.abiescreen.com/
  
// export const portApi = process.env.NODE_ENV === 'development' ? 8080 : '';
// export const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;
export const baseURLApi = `${hostApi}/api/`
export const localStorageDarkModeKey = 'darkMode';

export const localStorageStyleKey = 'style';

export const containerMaxW = 'xl:max-w-6xl xl:mx-auto';

export const appTitle = 'ABIE Dashboard';

export const getPageTitle = (currentPageTitle: string) =>
  `${currentPageTitle} — ${appTitle}`;
