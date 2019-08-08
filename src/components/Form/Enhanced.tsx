import { Form as Base } from 'antd';
import Debug from 'debug';
import React, { Children, cloneElement, isValidElement, ReactElement, SFC } from 'react';
import { FormattedMessage } from 'umi/locale';

import { Button } from '@/components';
import { FORM_ITEM_LAYOUT, NO_LABEL_FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from './const';
import { IFields, IFormItemProps, IInnerFormProps } from './interface';
import Item from './Item';

const debug = Debug('form:enhanced');

const InnerForm: SFC<IInnerFormProps> = props => {
  const { children, form, locale, noLabel, ...others } = props;

  return (
    <Base
      layout="horizontal"
      {...(noLabel ? NO_LABEL_FORM_ITEM_LAYOUT : FORM_ITEM_LAYOUT)}
      {...others}
    >
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<IFormItemProps>, { form, noLabel, locale });
        }
        return null;
      })}
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
