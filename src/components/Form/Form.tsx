import Debug from 'debug';
import React, { SFC, useCallback, useRef } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Enhanced from './Enhanced';
import { handleSubmit } from './handlers';
import { IFormProps, IValues } from './interface';

const debug = Debug('form:top');

const Form: SFC<IFormProps & RouteComponentProps> = props => {
  const { klass, mode, match, params, uri, method, onSuccess, onError, children } = props;
  const locale = useRef(props.locale || klass);

  const onSubmit = useCallback(
    async (values: IValues) => {
      try {
        const result = await handleSubmit(klass, mode, {
          uri,
          method,
          values,
          params: { ...match.params, ...params },
        });
        debug('onSubmit \n values: \n %o ret: %o\n', values, result);
        if (onSuccess) {
          onSuccess(result.values || values);
        }
        return result;
      } catch (error) {
        const errors = onError && onError(error);
        if (errors) {
          return {
            values,
            errors,
          };
        }
        throw error;
      }
    },
    [uri, method, match.params, params],
  );

  return (
    <Enhanced locale={locale.current} onSubmit={onSubmit}>
      {children}
    </Enhanced>
  );
};

export default withRouter(Form);
