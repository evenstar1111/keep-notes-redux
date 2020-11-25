export const setLocal = (key, value) => {
  if (process.browser) {
    return localStorage.setItem(key, value);
  }
};

export const getLocal = (key) => {
  if (process.browser) return JSON.parse(localStorage.getItem(key));
};
