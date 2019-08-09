import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import { ReactElement } from 'react';

export interface IField {
  name: string;
  value?: any;
  errors?: Array<{ message: string; field: string }>;
  [x: string]: any;
}

export type IFields = Partial<{ [x: string]: IField }>;
export type IValues = Partial<{ [x: string]: any }>;

export interface IFormCommonProps {
  label?: boolean;
  onFieldsChange?: (fields: IFields, all?: IFields) => void;
  onValuesChange?: (values: IValues, all?: IValues) => void;
  onValueChange?: (key: string, value: any) => void;
}

export interface IInnerFormProps extends IFormCommonProps {
  locale: string;
  form: WrappedFormUtils;
  onSubmit: (values: IValues) => Promise<void>;
  isSubmitting: boolean;
}

export interface IFormProps extends IFormCommonProps {
  klass: string;
  locale?: string;
}

export interface IFormItemProps extends GetFieldDecoratorOptions {
  name: string;
  form?: WrappedFormUtils;
  label?: string;
}

export type IFormChildren = ReactElement<IFormItemProps> | Array<ReactElement<IFormItemProps>>;
