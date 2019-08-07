import { WrappedFormUtils } from 'antd/lib/form/Form';
import { ReactElement } from 'react';
import { IFormItemProps } from './Item';

export interface IFormCommonProps {
  locale?: string;
  children?: IFormChildren;
}

export interface IInnerFormProps extends IFormCommonProps {
  form: WrappedFormUtils;
}

export interface IFormProps extends IFormCommonProps {
  klass: string;
}

export type IFormChildren = ReactElement<IFormItemProps> | Array<ReactElement<IFormItemProps>>;
