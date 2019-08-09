import { IObjectType } from '@mxcins/types';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';

export interface IField {
  name: string;
  value?: any;
  errors?: Array<{ message: string; field: string }>;
  [x: string]: any;
}

export type IFields = Partial<{ [x: string]: IField }>;
export type IValues = Partial<{ [x: string]: any }>;
export interface IFormSubmitResult {
  values?: IValues;
  errors?: IObjectType<string[]>;
}

export interface IFormCommonProps {
  label?: boolean;
  onFieldsChange?: (fields: IFields, all?: IFields) => void;
  onValuesChange?: (values: IValues, all?: IValues) => void;
  onValueChange?: (key: string, value: any) => void;
}

export interface IInnerFormProps extends IFormCommonProps {
  locale: string;
  form: WrappedFormUtils;
  onSubmit: (values: IValues) => Promise<IFormSubmitResult>;
}

export interface IFormProps extends IFormCommonProps {
  klass: string;
  mode: 'create' | 'update';
  uri?: string;
  method?: 'PATCH' | 'POST';
  locale?: string;
  params?: IObjectType;
  onError?: (err: Error) => IObjectType<string[]>;
}

export interface IFormItemProps extends GetFieldDecoratorOptions {
  name: string;
  form?: WrappedFormUtils;
  label?: string;
}
