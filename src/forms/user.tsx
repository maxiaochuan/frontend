import { Input } from 'antd';
// import gql from 'graphql-tag';
import React, { SFC } from 'react';

import { Form } from '@/components';
import { IMutationProps } from '@/decorators';
import { GQLUser, MutationToCreateUserArgs } from '@/graphql/generated';

export interface IUserProps
  extends IMutationProps<
    {
      createUser: GQLUser;
    },
    MutationToCreateUserArgs
  > {}

// const CREATE_USER = gql`
//   mutation CreateUser($name: String!, $email: String!) {
//     createUser(name: $name, email: $email) {
//       name
//       email
//     }
//   }
// `;

const User: SFC<IUserProps> = props => {
  return (
    <Form action={props.action} onValuesChange={props.onVariablesChange}>
      <Form.Item name="name" component={Input} />
      <Form.Item name="email" component={Input} />
    </Form>
  );
};

export default User;
