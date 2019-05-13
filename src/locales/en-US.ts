const locale = {
  'user.name': 'Username',
  'user.name.validate': "Username can't be blank, and maximum is {max} characters",
  'user.email': 'Email address',
  'user.password': 'Password',
  'user.password_confirmation': 'Password Confirmation',
};

export type LocaleID = keyof typeof locale;

export default locale;
