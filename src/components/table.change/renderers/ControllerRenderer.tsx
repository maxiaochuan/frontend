import { IObjectType, IRouteComponentProps } from '@mxcins/types';
import { Col, Popconfirm, Row } from 'antd';
import React, { Fragment, SFC, useContext } from 'react';
import { withRouter } from 'react-router';

import { Anchor } from '@/components';
import { Context } from '../context';
import { IDefaultRendererProps } from './default';

export interface IControllerRendererProps<T extends IObjectType = IObjectType>
  extends IDefaultRendererProps<T>,
    IRouteComponentProps<IObjectType> {}

const ControllerRenderer: SFC<IControllerRendererProps> = props => {
  const {
    state: { editKey, rowKey },
    refetch,
    dispatch,
    form,
  } = useContext(Context);
  const id = props.item[rowKey];
  const isEditCurrent = editKey === id;

  const onEdit = () => dispatch({ type: 'EDIT', payload: id });
  const onCancel = () => dispatch({ type: 'EDIT', payload: '' });

  const onEditSubmit = () =>
    form &&
    form.onUpdate(
      { params: { id } },
      {
        onSuccess: refetch,
        onFinally: onCancel,
      },
    );
  const onDestory = () =>
    form &&
    form.onDestory(
      { params: { id } },
      {
        onSuccess: refetch,
        onFinally: onCancel,
      },
    );

  return (
    <Row type="flex" gutter={12} style={{ justifyContent: 'space-around' }}>
      {isEditCurrent ? (
        <Fragment>
          <Col>
            <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={onEditSubmit}>
              <Anchor href="#">Save</Anchor>
            </Popconfirm>
          </Col>
          <Col>
            <Anchor href="#" onClick={onCancel}>
              Cancel
            </Anchor>
          </Col>
        </Fragment>
      ) : (
        <Fragment>
          <Col>
            <Anchor href="#" disabled={!!editKey} onClick={onEdit}>
              Edit
            </Anchor>
          </Col>

          <Col>
            <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={onDestory}>
              <Anchor href="#" disabled={!!editKey}>
                Delete
              </Anchor>
            </Popconfirm>
          </Col>
        </Fragment>
      )}
    </Row>
  );
};

export default withRouter(ControllerRenderer);
// class ControllerRenderer extends Component<any> {
//   constructor(props: any) {
//     super(props);
//     console.log('constructor');
//   }

//   public onEdit = () => console.log('edit');
//   public onCancel = () => console.log('cancel');
//   public onEditSubmit = () => console.log('submit');
//   public onDestory = () => console.log('destory');

//   public render() {
//   // const {
//   //   state: { editKey, rowKey },
//   //   dispatch,
//   // } = useContext(Context);
//   const { editKey, rowKey } = this.props.state;
//   const props = this.props;
//   const isEditCurrent = editKey === props.item[rowKey];

//   // const onEdit = () => dispatch({ type: 'EDIT', payload: props.item[rowKey] });
//   // const onCancel = () => dispatch({ type: 'EDIT', payload: '' });
//   return (
//     <Row type="flex" gutter={12} style={{ justifyContent: 'space-around' }}>
//       {isEditCurrent ? (
//         <Fragment>
//           <Col>
//             <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={onEditSubmit}>
//               <Anchor href="#">Save</Anchor>
//             </Popconfirm>
//           </Col>
//           <Col>
//             <Anchor href="#" onClick={this.onCancel}>
//               Cancel
//             </Anchor>
//           </Col>
//         </Fragment>
//       ) : (
//         <Fragment>
//           <Col>
//             <Anchor href="#" disabled={!!editKey} onClick={this.onEdit}>
//               Edit
//             </Anchor>
//           </Col>

//           <Col>
//             <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={onDestory}>
//               <Anchor href="#" disabled={!!editKey}>
//                 Delete
//               </Anchor>
//             </Popconfirm>
//           </Col>
//         </Fragment>
//       )}
//     </Row>
//   );
//   }
// }

// export default (props: any) => {
//   return (
//     <Context.Consumer>
//       {v => <ControllerRenderer dispatch={v.dispatch} state={v.state} {...props} />}
//     </Context.Consumer>
//   )
// }
