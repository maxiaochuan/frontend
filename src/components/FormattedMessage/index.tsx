import { IObjectType } from '@mxcins/types';
import * as React from 'react';
import {
  formatMessage as fm,
  FormattedMessage as FM,
  IFormattedMessageProps as IFMP,
} from 'umi/locale';

export interface IFormattedMessageProps extends IFMP {
  prefix?: string;
}

export function formatMessage(options: IFormattedMessageProps, values?: IObjectType) {
  const { prefix, id } = options;
  return fm({ ...options, id: prefix ? `${prefix}.${id}` : id }, values);
}

export default class FormattedMessage extends React.Component<IFormattedMessageProps> {
  public static defaultProps = {
    prefix: '',
  };
  public render() {
    const { id, prefix, ...others } = this.props;
    return <FM id={prefix ? `${prefix}.${id}` : id} {...others} />;
  }
}
