import { IObjectType } from '@mxcins/types';
import { Button, Form as Base } from 'antd';
import { FormCreateOption, WrappedFormUtils } from 'antd/lib/form/Form';
import React, {
  Children,
  cloneElement,
  FormEventHandler,
  isValidElement,
  SFC,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { FormattedMessage } from '@/components';

import { handleSubmit } from './handlers';
import { IFormProps, IFormViewProps } from './interface';
import Item from './Item';

/**
 * children render, add props form && klass
 * @param props IFormViewProps
 */
const renderItems = (props: IFormViewProps) => {
  return Children.map(props.children || [], item => {
    if (isValidElement(item)) {
      return cloneElement(item, { form: props.form, klass: props.klass });
    }
    return null;
  });
};

const hasErrors = (fieldsError: IObjectType) => Object.keys(fieldsError).some(field => fieldsError[field]);

const FormView: SFC<IFormViewProps> = props => {
  const { formRef, form } = props;
  const { getFieldsError } = props.form;

  useImperativeHandle(formRef, () => form);

  const disabled = hasErrors(getFieldsError());

  return (
    <Base onSubmit={props.onSubmit}>
      {renderItems(props)}
      <Base.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button htmlType="submit" type="primary" style={{ width: '100%' }} disabled={disabled}>
          <FormattedMessage id="form.submit" />
        </Button>
      </Base.Item>
    </Base>
  );

};

interface IForm extends SFC<IFormProps> {
  Item: typeof Item;
}

const options: FormCreateOption<IFormViewProps> = {
  onValuesChange(props, values) {
    if (props.onValuesChange) {
      props.onValuesChange(values);
    } else if (props.onValueChange) {
      const keys = Object.keys(values);
      if (keys.length && keys.length === 1) {
        props.onValueChange(keys[0], values[keys[0]]);
      }
    }
  },
  onFieldsChange(props, _, fields) {
    props.onFieldsChange(fields);
  },
  mapPropsToFields(props) {
    const { fields } = props;
    return Object.keys(fields).reduce<IObjectType>((prev, k) => {
      const f = fields[k];
      const changedAfterServerError = f.serverError && f.touched;
      prev[k] = Base.createFormField({
        ...f,
        value: f.value,
        errors: changedAfterServerError ? undefined : f.errors,
      })
      return prev;
    }, {});
  }
};

const Form: IForm = props => {
  const component = useRef(Base.create(options)(FormView));
  const formRef = useRef<WrappedFormUtils>();
  const [fields, setFields] = useState<IObjectType>({});

  const onSubmit: FormEventHandler = useCallback(
    e => formRef.current && handleSubmit(e, formRef.current, props),
    [props.klass, props.onSubmit, props.onSuccess, props.onError],
  );

  return <component.current formRef={formRef} {...props} onSubmit={onSubmit} fields={fields} onFieldsChange={setFields} />;
};

Form.Item = Item;

export default Form;
// import { IObjectType } from '@mxcins/types';
// import { Button, Form as Base, message } from 'antd';
// import { FormCreateOption } from 'antd/lib/form';
// import { WrappedFormUtils } from 'antd/lib/form/Form';
// import React, { Children, cloneElement, FormEvent, FormEventHandler, isValidElement, SFC, useImperativeHandle } from 'react';

// import { formatMessage, FormattedMessage } from '@/components';
// import { IFormProps } from './interface';
// import Item from './Item';

// const validate = async (form: WrappedFormUtils) => new Promise<[IObjectType, IObjectType]>(resolve => form.validateFields((errors, values) => resolve([errors, values])))

// const handleError = (_: Error) => {
//   // TODO ;
//   return;
// }

// const handleSuccess = (_: any) => {
//   message.success(formatMessage({ id: 'form.submit.success' }))
//   return;
// }

// const handleSubmit = async (e: FormEvent, props: IFormProps) => {
//   e.preventDefault();
//   const [errors, values] = await validate(props.form);
//   if (errors) {
//     message.error(JSON.stringify(errors));
//     return;
//   }

//   if (!props.onSubmit) {
//     return;
//   }
//   const { onSuccess, onError } = props;

//   try {
//     const resp = await props.onSubmit(values);
//     if (onSuccess) {
//       return onSuccess(resp);
//     }
//   } catch (error) {
//     if (onError) {
//       return onError(error);
//     }
//   }
// };
// const hasErrors = (fieldsError: IObjectType) => Object.keys(fieldsError).some(field => fieldsError[field]);

// const Form: SFC<IFormProps> = props => {
//   const { formRef } = props;
//   const { getFieldsError } = props.form;

//   const disabled = hasErrors(getFieldsError());

//   useImperativeHandle(formRef, () => props.form);

//   const onSubmit: FormEventHandler = e => handleSubmit(e, props);

//   return (
//     <Base onSubmit={onSubmit}>
//       {renderItems(props)}
//       <Base.Item wrapperCol={{ offset: 4, span: 14 }}>
//         <Button htmlType="submit" type="primary" style={{ width: '100%' }} disabled={disabled}>
//           <FormattedMessage id="form.submit" />
//         </Button>
//       </Base.Item>
//     </Base>
//   )
// }


// const WrappedForm = Base.create<IFormProps>(options)(Form);

// WrappedForm.defaultProps = {
//   onSuccess: handleSuccess,
//   onError: handleError,
// }

// const Exported = WrappedForm as typeof WrappedForm & { Item: typeof Item };
// Exported.Item = Item;

// export default Exported;
