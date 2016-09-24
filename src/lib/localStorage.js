const Key = 'R_STATE';

export const loadState = () => {
  try {
    return JSON.parse(localStorage.getItem(Key));
  } catch (e) {
    return undefined;
  }
};

export const saveState = (data) => {
  try {
    localStorage.setItem(Key, JSON.stringify(data));
  } catch (error) {
    // noop
  }
};
