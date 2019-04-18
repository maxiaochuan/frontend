import request from '@mxcins/request';
import { message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

export const deleteHandler = async (id: string | number, uri: string) => {
  const resp = await request(uri, {
    params: { id },
    method: 'DELETE',
  });
  message.success(`Delete success, ${JSON.stringify(resp)}`);
  return;
};

export const updateHandler = async (form: WrappedFormUtils, uri: string, id: number | string) =>
  new Promise((resolve, reject) => {
    form.validateFields((error, values) => {
      if (error) {
        message.error(JSON.stringify(error));
        return;
      }
      request(uri, {
        params: { id },
        method: 'PATCH',
        data: values,
      })
        .then(resolve)
        .catch(reject);
    });
  });
