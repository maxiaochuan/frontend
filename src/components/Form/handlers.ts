import pluralize from '@mxcins/pluralize';
import { IObjectType } from '@mxcins/types';
import { message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { FormEvent } from 'react';

import { request, ResponseError } from '@/common';
import { FormMethod, IFormProps } from './interface';

const getUri = (klass: string, method: FormMethod) => 
  method === 'POST' ? `/${pluralize.plural(klass)}` : method === 'PATCH' ? `/${klass}` : ''

const validate = async (form: WrappedFormUtils) =>
  new Promise<[IObjectType, IObjectType]>(resolve =>
    form.validateFields((errors, values) => resolve([errors, values])),
  );

export const handleSubmit = async (
  e: FormEvent,
  form: WrappedFormUtils,
  props: IFormProps,
) => {
  e.preventDefault();
  const [errors, values] = await validate(form);
  if (errors) {
    message.error(JSON.stringify(errors));
    return;
  }

  const { onSuccess, onError } = props;

  try {
    const { klass, method } = props;
    const resp = await request(getUri(klass, method), { method, data: { [klass]: values } });
    if (onSuccess) {
      return onSuccess(resp);
    }
  } catch (e) {
    if (e.name === 'ResponseError') {
      const error = e as ResponseError;
      if (error.response.status === 422 && form) {
        const data = error.data as IObjectType<string[]>;
        const fieldsValue = form.getFieldsValue();
        const fields = Object.keys(data).reduce<IObjectType>((prev, key) => {
          prev[key] = {
            value: fieldsValue[key],
            errors: data[key].map(er => new Error(`${key} ${er}, `)),
            serverError: true,
          };
          return prev;
        }, {});
        form.setFields(fields);
      }
    }
    if (onError) {
      return onError(e);
    }
  }
};
