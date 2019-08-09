import Debug from 'debug';
import React, { SFC, useCallback, useRef, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Enhanced from './Enhanced';
import { handleSubmit } from './handlers';
import { IFormProps, IValues } from './interface';

const debug = Debug('form:top');

const Form: SFC<IFormProps & RouteComponentProps> = props => {
  const { klass, mode, match, params, uri, method, children } = props;
  const locale = useRef(props.locale || klass);
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (values: IValues) => {
      setSubmitting(true);
      const ret = await handleSubmit(klass, mode, {
        uri,
        method,
        values,
        params: { ...match.params, ...params },
      });
      debug('onSubmit \n values: \n %o ret: %o\n', values, ret);
      setSubmitting(false);
      return ret;
    },
    [uri, method, match.params, params],
  );

  return (
    <Enhanced locale={locale.current} onSubmit={onSubmit} isSubmitting={isSubmitting}>
      {children}
    </Enhanced>
  );
};

export default withRouter(Form);
