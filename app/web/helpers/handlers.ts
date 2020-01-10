import { notification } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { FormEvent } from 'react';
import { request } from '@/common';

export const DEFAULT_ON_SUCCESS = () => {
  notification.success({ message: 'S' });
};

export const DEFAULT_ON_ERROR = () => {
  notification.error({ message: 'E' });
};

export interface IOnSubmitOpts {
  onSuccess?: (resp: Record<string, any>) => void;
  onError?: (error: Error) => void;
  form?: WrappedFormUtils;
  values?: Record<string, any>;
  klass?: string;
  action?: string;
  mode?: 'create' | 'update';
}

const validate = async (form: WrappedFormUtils) =>
  new Promise<[any, any]>(resolve => form.validateFields((e, v) => resolve([e, v])));

export const onSubmit = async (event: FormEvent, opts: IOnSubmitOpts) => {
  event.preventDefault();
  const {
    onSuccess = DEFAULT_ON_SUCCESS,
    onError = DEFAULT_ON_ERROR,
    form,
    values,
    klass,
    action,
    mode = 'create',
  } = opts;
  let data = klass ? { [klass.snakecase]: values } : values;
  try {
    if (form) {
      const [e, v] = await validate(form);
      if (e) {
        console.error(e);
        return;
      }
      data = klass ? { [klass.snakecase]: v } : v;
    }
    const target =
      action ||
      (klass &&
        (mode === 'create' ? `/${klass.pluralize.snakecase}.json` : `/${klass.snakecase}.json`));
    if (!target) {
      console.error('submit target error');
      return;
    }
    const method = mode === 'create' ? 'post' : 'patch';
    const resp = await request[method](target, { data });

    onSuccess(resp);
  } catch (error) {
    onError(error);
  }
};
