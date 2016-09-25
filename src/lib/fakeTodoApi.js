import { v4 } from 'uuid';

let data = [{
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

export const get = (filter) =>
  delay(Math.random() * 500)
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

export const create = (text) =>
  delay(Math.random() * 500)
    .then(() => {
      const newTodo = {
        id: v4(),
        text,
        completed: false,
      };

      data = [...data, newTodo];
      return newTodo;
    });

export const toggle = id =>
  delay(Math.random() * 500)
    .then(() => {
      let ret;
      data = data.map(todo => {
        if (todo.id === id) {
          ret = { ...todo, completed: !todo.completed };
          return ret;
        }
        return todo;
      });
      return ret;
    });

const api = {
  get,
  create,
  toggle,
};

export default api;
