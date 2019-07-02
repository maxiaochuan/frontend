// import { IObjectType, IRouteComponentProps } from '@mxcins/types';
// import { WrappedFormUtils } from 'antd/lib/form/Form';
// import React, { SFC, useRef } from 'react';
// import { withRouter } from 'react-router';

// import { getApi, request, ResponseError } from '@/common';

// import Form from '../Form';
// import { IFormCommonProps } from '../interface';

// type Mode = 'create' | 'update';

// export interface IRestFormProps extends IFormCommonProps, IRouteComponentProps {
//   mode: Mode;
//   params?: IObjectType<string | number>;
// }

// const handleSubmit = async (
//   props: IRestFormProps,
//   values: IObjectType,
//   form: WrappedFormUtils | undefined,
// ) => {
//   const { klass, mode, match, params } = props;
//   if (!klass) {
//     throw new Error('Form Rest Klass!!!');
//   }
//   try {
//     const resp = await request(getApi(klass, mode), {
//       method: mode === 'create' ? 'POST' : 'PATCH',
//       params: { ...match.params, ...params },
//       data: { [klass]: values },
//     });
//     return resp;
//   } catch (e) {
//     if (e.name === 'ResponseError') {
//       const error = e as ResponseError;
//       if (error.response.status === 422 && form) {
//         const data = error.data as IObjectType<string[]>;
//         const fieldsValue = form.getFieldsValue();
//         const fields = Object.keys(data).reduce<IObjectType>((prev, key) => {
//           prev[key] = {
//             value: fieldsValue[key],
//             errors: data[key].map(er => new Error(`${key} ${er}, `)),
//           };
//           return prev;
//         }, {});
//         form.setFields(fields);
//       }
//     }
//     throw e;
//   }
// };

// const RestForm: SFC<IRestFormProps> = props => {
//   const form = useRef<WrappedFormUtils>();
//   const onSubmit = (values: IObjectType) => handleSubmit(props, values, form.current);

//   return <Form {...props} onSubmit={onSubmit} formRef={form} />;
// };

// export default withRouter(RestForm);
