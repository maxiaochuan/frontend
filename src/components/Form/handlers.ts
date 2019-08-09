import { pluralize, request, ResponseError } from '@/utils';
import { IObjectType } from '@mxcins/types';
import { message } from 'antd';
import Debug from 'debug';
import { snakeCase } from 'lodash-es';
import { IFormSubmitResult, IValues } from './interface';

const debug = Debug('form:handlers');

export const handleSuccess = (_: IValues) => {
  message.success('success');
};

/**
 *
 * @param klass
 * @param values
 */
export const handleSubmit = async (
  klass: string,
  mode: 'create' | 'update',
  opts: { uri?: string; method?: string; values: IValues; params?: IObjectType },
): Promise<IFormSubmitResult> => {
  const basename = `/${pluralize.plural(klass)}`;
  const uri =
    opts.uri ||
    (mode === 'create' ? `${basename}.json` : mode === 'update' ? `${basename}/:id.json` : '');
  const method = opts.method || mode === 'create' ? 'POST' : mode === 'update' ? 'PATCH' : '';

  if (!uri || !method) {
    throw new Error(`Form Submit Uri Parse Error, ${uri}, ${method}`);
  }

  const { values, params } = opts;

  try {
    const data = { [snakeCase(klass)]: values };
    debug('fetch \n uri: %s \n params: %o \n values: %o \n', uri, params, data);
    const resp = await request<IValues>(uri, {
      method,
      params,
      data,
    });

    return { values: resp };
  } catch (error) {
    debug('submit error \n %s \n %o', error.name, error.response);
    if (error.name === 'ResponseError') {
      const err = error as ResponseError;
      if (err.response.status === 422) {
        return { errors: err.data };
      }
    }
    throw error;
  }
};
