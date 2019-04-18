import { omit } from '@mxcins/utils';
import React, {
  AnchorHTMLAttributes,
  Component,
  DetailedHTMLProps,
  MouseEventHandler,
} from 'react';

export interface IAnchorProps
  extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  disabled?: boolean;
}

export default class Anchor extends Component<IAnchorProps> {
  public onClick: MouseEventHandler<HTMLAnchorElement> = e => {
    const { href, onClick } = this.props;
    if (href === '#' && onClick) {
      e.preventDefault();
      onClick(e);
    }
  };
  public render() {
    return <a onClick={this.onClick} {...omit(this.props, ['onClick'])} />;
  }
}
