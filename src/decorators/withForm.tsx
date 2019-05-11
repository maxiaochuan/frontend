import request, { IRequestOptions } from '@mxcins/request';
import { IReactComponent, Omit } from '@mxcins/types';
import { Form, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { SFC } from 'react';

import getApi from '../common/api';

export interface IWithFormRequiredProps {
  klass: string;
}

export interface IWithFormResultProps extends FormComponentProps {
  form: IWrappedFormUtils;
}

interface IHandlers {
  onSuccess?: (...args: any[]) => void;
  onError?: (...args: any[]) => void;
  onFinally?: (...args: any[]) => void;
}

export interface IWrappedFormUtils extends WrappedFormUtils {
  onDestory: (options?: IRequestOptions, handlers?: IHandlers) => Promise<any>;
  onUpdate: (options?: IRequestOptions, handlers?: IHandlers) => Promise<any>;
}

const updateHandler = async (
  form: WrappedFormUtils,
  target: string,
  options?: IRequestOptions,
  handlers?: IHandlers,
) => {
  try {
    const [error, values] = await new Promise(resolve => {
      form.validateFields((e, v) => resolve([e, v]));
    });
    if (error) {
      message.error(JSON.stringify(error));
      return;
    }
    const resp = await request(getApi(target, 'update'), {
      ...options,
      method: 'PATCH',
      data: { ...values, ...((options && options.data) || {}) },
    });
    if (handlers && handlers.onSuccess) {
      await handlers.onSuccess(resp);
    }
    message.success('Update Success!');
    return resp;
  } catch (e) {
    if (e.response) {
      if (handlers && handlers.onError) {
        await handlers.onError();
      }
      message.error(JSON.stringify(e.data));
      return;
    }
  } finally {
    if (handlers && handlers.onFinally) {
      handlers.onFinally();
    }
  }
};

const destoryHandler = async (
  _: WrappedFormUtils,
  target: string,
  options?: IRequestOptions,
  handlers?: IHandlers,
) => {
  try {
    await request(getApi(target, 'delete'), {
      ...options,
      method: 'DELETE',
    });
    if (handlers && handlers.onSuccess) {
      await handlers.onSuccess();
    }
    message.success('Delete Success!');
    return;
  } catch (e) {
    if (e.response) {
      if (handlers && handlers.onError) {
        await handlers.onError();
      }
      message.error(JSON.stringify(e.data));
      return;
    }
  } finally {
    if (handlers && handlers.onFinally) {
      handlers.onFinally();
    }
  }
};

export default function withForm<P extends IWithFormResultProps = any>(
  component: IReactComponent<P>,
): IReactComponent<Omit<P, keyof IWithFormResultProps> & IWithFormRequiredProps> {
  const Component = component;

  const target: SFC<P & IWithFormRequiredProps> = props => {
    const { klass, form } = props;
    form.onDestory = async (options, handlers) => destoryHandler(form, klass, options, handlers);
    form.onUpdate = async (options, handlers) => updateHandler(form, klass, options, handlers);
    return <Component {...props} />;
  };

  return Form.create()(target) as any;
}
