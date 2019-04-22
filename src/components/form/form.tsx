import request from '@mxcins/request';
import { IRouteComponentProps } from '@mxcins/types';
import { Button, Form as BasicForm, message } from 'antd';
import { FormComponentProps, FormProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, {
  Children,
  cloneElement,
  Component,
  FormEventHandler,
  isValidElement,
  ReactElement,
  SFC,
} from 'react';
import withRouter from 'umi/withRouter';

import Item, { IFormItemProps } from './item';

type Items = Array<ReactElement<IFormItemProps | null>> | ReactElement<IFormItemProps> | null;

export interface IFormProps extends FormProps {
  children?: Items;
  action?: any;
  fetch?: string;
  onSuccess?: () => void;
  onValueChange?: (key: string, value: any) => void;
  onValuesChange?: (values: any) => void;
  formRef?: {
    current?: WrappedFormUtils | null;
  };
  params?: { [x: string]: any };
}

export interface IFormHandlers {
  submit: FormEventHandler<any>;
}

const itemsRender = (props: IFormProps & FormComponentProps) => {
  return Children.map(props.children || [], item => {
    if (isValidElement(item)) {
      return cloneElement(item, { form: props.form });
    }
    return null;
  });
};

class Base extends Component<
  IFormProps & FormComponentProps & IRouteComponentProps<{ id?: string }>
> {
  public componentDidMount() {
    const props = this.props;
    if (props.match.params.id && props.fetch) {
      request(props.fetch, {
        params: { ...props.match.params, ...(props.params || {}) },
      }).then(values => {
        props.form.setFieldsValue(values);
      });
    }
    if (props.formRef) {
      if (typeof props.formRef === 'object') {
        props.formRef.current = props.form;
      }
    }
  }
  public render() {
    return (
      <BasicForm onSubmit={this.onSubmit} layout="horizontal">
        {itemsRender(this.props)}
        <BasicForm.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
            Submit
          </Button>
        </BasicForm.Item>
      </BasicForm>
    );
  }

  private onSubmit: FormEventHandler<any> = async event => {
    const { form, action, match, params: p = {}, onSuccess } = this.props;
    event.preventDefault();
    const [errors, values] = await new Promise(resolve => {
      form.validateFields((e, v) => resolve([e, v]));
    });
    if (errors) {
      message.error(JSON.stringify(errors));
      return;
    }
    if (!action) {
      message.error('action');
      return;
    }
    const params = { ...match.params, ...p };
    try {
      if (typeof action === 'function') {
        await action();
      } else {
        const resp = await request(action, {
          data: values,
          method: params.id ? 'PATCH' : 'POST',
          params,
        });
        message.success(JSON.stringify(resp));
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (error && error.response) {
        message.error(JSON.stringify(error.data));
        return;
      }
    }
  };
}

const WrappedBase = withRouter(
  BasicForm.create<IFormProps>({
    onValuesChange(props, values) {
      if (props.onValuesChange) {
        props.onValuesChange(values);
      }
      if (props.onValueChange) {
        const keys = Object.keys(values);
        if (keys.length && keys.length === 1) {
          props.onValueChange(keys[0], values[keys[0]]);
        }
      }
    },
  })(Base),
);

interface IFormSFC extends SFC<IFormProps> {
  _VITAL_FORM: boolean;
  Item: typeof Item;
}

const Form: IFormSFC = props => <WrappedBase {...props} />;
Form._VITAL_FORM = true;
Form.Item = Item;

export default Form;
