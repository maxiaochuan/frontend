import { Form as Base } from 'antd';
import Debug from 'debug';
import React, { Children, cloneElement, isValidElement, ReactElement, ReactNode, SFC } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';

import { Button } from '@/components';
import { TAIL_FORM_ITEM_LAYOUT } from './const';
import { IFields, IFormItemProps, IInnerFormProps } from './interface';
import Item from './Item';

const debug = Debug('form:enhanced');

const map = (children: ReactNode, props: IInnerFormProps) =>
  Children.map(children, child => {
    if (!(isValidElement(child) && (child.type as any).__FORM_ITEM)) {
      return null;
    }

    const c = child as ReactElement<IFormItemProps>;
    debug('map children: \n %o', c.props);
    const { form, locale } = props;
    const extra: Partial<IFormItemProps> = {
      form,
      label: c.props.label || (locale && formatMessage({ id: `${locale}.${c.props.name}` })),
    };
    return cloneElement(c, extra);
  });

const InnerForm: SFC<IInnerFormProps> = props => {
  const { children, form, locale, label, ...others } = props;

  return (
    <Base {...others}>
      {map(children, props)}
      <Item name="submit" {...TAIL_FORM_ITEM_LAYOUT}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          <FormattedMessage id="form.submit" />
        </Button>
      </Item>
    </Base>
  );
};

const EnhancedForm = Base.create<IInnerFormProps>({
  onFieldsChange(props, fields: IFields, all: IFields) {
    debug('onFieldsChange\n props: %o\n fields: %o\n all: %o\n', props, fields, all);
    if (props.onFieldsChange && Object.values(fields).every(f => !(f && f.validating))) {
      props.onFieldsChange(fields, all);
    }
  },
  onValuesChange(props, values, all) {
    debug('onValuesChange\n props: %o\n values: %o\n all: %o\n', props, values, all);
    if (props.onValuesChange) {
      props.onValuesChange(values);
    } else if (props.onValueChange) {
      const keys = Object.keys(values);
      if (keys.length && keys.length === 1) {
        props.onValueChange(keys[0], values[keys[0]]);
      }
    }
  },
})(InnerForm);

export default EnhancedForm;
