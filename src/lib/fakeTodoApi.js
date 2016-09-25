import { v4 } from 'uuid';

const data = [{
  id: v4(),
  text: 'learn React',
  completed: true,
}, {
  id: v4(),
  text: 'Get rip',
  completed: false,
}, {
  id: v4(),
  text: 'Found the girl',
  completed: false,
}, {
  id: v4(),
  text: 'Now go and get her',
  completed: false,
}];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const get = (filter) => {
  return delay(Math.random() * 500)
    .then(() => {
      switch (filter) {
        case 'all':
          return data;
        case 'completed':
          return data.filter(i => i.completed);
        case 'pending':
          return data.filter(i => !i.completed);
        default:
          return data;
      }
    });
};

const api = {
  get,
};

export default api;
