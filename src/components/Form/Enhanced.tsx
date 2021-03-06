import { IObjectType } from '@mxcins/types';
import { Form as Base } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import Debug from 'debug';
import React, {
  Children,
  cloneElement,
  FormEvent,
  isValidElement,
  ReactElement,
  ReactNode,
  SFC,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button } from '@/components';
import { TAIL_FORM_ITEM_LAYOUT } from './const';
import { IFields, IFormItemProps, IInnerFormProps } from './interface';
import Item from './Item';

const debug = Debug('form:enhanced');

const hasError = (fieldsError: { [x: string]: string[] | undefined }) => {
  debug('hasError: \n errors: %o\n', fieldsError);
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

const validate = async (form: WrappedFormUtils) =>
  new Promise<[any, any]>(resolve => form.validateFields((e, v) => resolve([e, v])));

const itemsRender = (children: ReactNode, props: IInnerFormProps) =>
  Children.map(children, child => {
    if (!isValidElement(child)) {
      return null;
    }

    const c = child as ReactElement<IFormItemProps>;
    const { form, locale } = props;
    const extra: Partial<IFormItemProps> = {
      form,
      label:
        props.label &&
        (c.props.label || (locale && formatMessage({ id: `${locale}.${c.props.name}` }))),
    };
    return cloneElement(c, extra);
  });

const InnerForm: SFC<IInnerFormProps> = props => {
  const { children, form, locale, label, control, formRef, ...others } = props;
  const [isSubmitting, setSubmitting] = useState(false);

  useImperativeHandle(formRef, () => form);

  const onSubmit = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();
      if (!props.onSubmit) {
        return;
      }
      setSubmitting(true);

      const [e, v] = await validate(form);
      if (e) {
        return setSubmitting(false);
      }

      const { errors, values } = await props.onSubmit(v);
      if (errors) {
        const fields = Object.keys(errors).reduce<IObjectType>((prev, key) => {
          prev[key] = { value: v[key], errors: [new Error(`${key} ${errors[key].join(', ')}`)] };
          return prev;
        }, {});
        form.setFields(fields);
      }
      if (values) {
        form.setFieldsValue(values);
      }

      return setSubmitting(false);
    },
    [props.onSubmit],
  );

  const ctl = control ? (
    cloneElement(control as ReactElement, {
      disabled: isSubmitting || hasError(form.getFieldsError()),
      loading: isSubmitting,
    })
  ) : (
    <Item {...TAIL_FORM_ITEM_LAYOUT}>
      <Button
        type="primary"
        htmlType="submit"
        style={{ width: '100%' }}
        disabled={isSubmitting || hasError(form.getFieldsError())}
        loading={isSubmitting}
      >
        <FormattedMessage id="form.submit" />
      </Button>
    </Item>
  );

  return (
    <Base {...others} onSubmit={onSubmit}>
      {itemsRender(children, props)}
      {ctl}
    </Base>
  );
};

/**
 * with antd form create
 */
const EnhancedForm = Base.create<IInnerFormProps>({
  // withRef: true,
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
