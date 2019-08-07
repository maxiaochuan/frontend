import { ReactElement } from 'react';
import { IFormItemProps } from './Item';

export type IFormChildren = ReactElement<IFormItemProps> | Array<ReactElement<IFormItemProps>>;
