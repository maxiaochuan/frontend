interface ICURD {
  create: string;
  update: string;
  retrieve: string;
  delete: string;
}

const apis: { [x: string]: ICURD } = {
  user: {
    create: '/api/users.json',
    update: '/api/users/:id.json',
    retrieve: '/api/users/:id.json',
    delete: '/api/users/:id.json',
  },
};

export default (key: string, type: keyof ICURD) => apis[key] && apis[key][type];
