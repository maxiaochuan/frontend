import { IObjectType, Omit } from '@mxcins/types';
import { FormComponentProps, FormItemProps, FormProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import { ComponentClass, MutableRefObject, ReactElement, ReactNode } from 'react';

export type FormChildren =
  | Array<ReactElement<IFormItemProps | null>>
  | ReactElement<IFormItemProps>
  | null;

export interface IFormCommonProps {
  formRef?: MutableRefObject<WrappedFormUtils | undefined>;
  klass: string;
  children?: FormChildren;
}

export interface IFormHandlerProps {
  onSubmit: <T = any>(values: IObjectType) => T;
  onSuccess: (values: IObjectType) => void;
  onError: (error: Error) => void;
}

export interface IFormViewProps
  extends Omit<FormProps, 'form' | 'children' | 'onError'>,
    FormComponentProps,
    IFormCommonProps {}

export interface IFormProps extends IFormCommonProps, FormComponentProps, IFormHandlerProps {
  mode: 'create' | 'update';

  onValuesChange: (values: IObjectType) => void;
  onValueChange: (key: string, value: any) => void;
}

export interface IFormItemProps extends FormItemProps, Partial<FormComponentProps> {
  name: string;
  klass?: string;
  decorators?: GetFieldDecoratorOptions;
  component?: ComponentClass;
  locale?: string;
  label?: ReactNode;
}
