import Debug from 'debug';
import React, { SFC, useCallback, useRef, useState } from 'react';

import Enhanced from './Enhanced';
import { IFormProps, IValues } from './interface';
import Item from './Item';

const debug = Debug('form:top');

export const handleSubmit = () => {
  // TODO: handle submit
};

const Form: SFC<IFormProps> & { Item: typeof Item } = props => {
  const { children } = props;
  const locale = useRef(props.locale || props.klass);
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(async (values: IValues) => {
    setSubmitting(true);
    debug('onSubmit \n values: \n %o', values);
  }, []);

  return (
    <Enhanced locale={locale.current} onSubmit={onSubmit} isSubmitting={isSubmitting}>
      {children}
    </Enhanced>
  );
};

Form.Item = Item;

export default Form;
