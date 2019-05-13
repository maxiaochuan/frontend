declare module '*.gql';
declare module '*.less';

declare module 'umi/locale' {
  import { IObjectType } from '@mxcins/types';
  import * as React from 'react';
  export interface IMessageDescriptor {
    id: string;
    description?: string;
    defaultMessage?: string;
  }
  export interface IFormattedMessageProps extends IMessageDescriptor {
    values?: IObjectType;
  }
  export class FormattedMessage extends React.Component<IFormattedMessageProps> {}

  export function formatMessage(options: IMessageDescriptor, values?: IObjectType): any;
}
