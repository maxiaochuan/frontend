const apis: { [x: string]: string } = {
  user: '/api/users/:id.json',
};

export default (key: string) => apis[key];
