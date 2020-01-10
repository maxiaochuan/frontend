import React, {
  SFC,
  useState,
  FormEvent,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
} from 'react';
import { Form as AntForm, Button } from 'antd';
import { FormProps, FormComponentProps } from 'antd/es/form/Form';
import { handlers } from '@/helpers';
import { IOnSubmitOpts } from '@/helpers/handlers';
import { FormattedMessage } from '@/common';

export interface IFormProps
  extends FormComponentProps,
    Omit<FormProps, 'form' | 'onError'>,
    Omit<IOnSubmitOpts, 'form'> {
  submitNode?: ReactElement;
}

const DefaultSubmit: SFC<{ loading?: boolean; disabled?: boolean }> = props => (
  <AntForm.Item>
    <Button style={{ width: '100%' }} type="primary" htmlType="submit" {...props}>
      <FormattedMessage id="form.submit" />
    </Button>
  </AntForm.Item>
);

const hasError = (fieldsError: { [x: string]: string[] | undefined }) =>
  Object.keys(fieldsError).some(field => fieldsError[field]);

const Form: SFC<IFormProps> = props => {
  const { form, children, submitNode, onSuccess, onError, klass, action, ...others } = props;
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    try {
      setSubmitting(true);
      await handlers.onSubmit(e, { form, onSuccess, onError, klass, action });
    } catch (error) {
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const extra = {
    loading: isSubmitting,
    disabled: hasError(form.getFieldsError()),
  };

  const submit = submitNode ? (
    cloneElement(submitNode, { ...submitNode.props, ...extra })
  ) : (
    <DefaultSubmit {...extra} />
  );

  return (
    <AntForm {...others} onSubmit={onSubmit}>
      {Children.map(children, c => {
        if (isValidElement(c)) {
          return cloneElement(c, { form, isSubmitting });
        }
        return null;
      })}
      {submit}
    </AntForm>
  );
};

export default AntForm.create<IFormProps>()(Form);
