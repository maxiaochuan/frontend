import { IObjectType } from '@mxcins/types';
import React, { SFC, useContext } from 'react';
import HighlightWords from 'react-highlight-words';

import { isObject } from '@mxcins/lodash';
import { Context } from '../context';
import {} from '../interface';

export interface IDefaultRendererProps<T extends IObjectType = IObjectType> {
  active: string;
  text: unknown;
  item: T;
  index: number;
}

const HighlightRender: SFC<{ active: string; text: string | number }> = props => {
  const {
    state: { searchWords },
  } = useContext(Context);
  return (
    <HighlightWords
      key={props.active}
      highlightStyle={{ backgroundColor: 'transparent', padding: 0, color: 'rgb(252, 110, 91)' }}
      searchWords={searchWords}
      textToHighlight={typeof props.text === 'number' ? `${props.text}` : props.text}
    />
  );
};

interface IHashRenderProps {
  active: string;
  text: IObjectType;
}

const has = (obj: object, property: string) =>
  Object.prototype.hasOwnProperty.call(obj, property) && (obj as IObjectType)[property];

const HashRender: SFC<IHashRenderProps> = props => {
  const { text, ...others } = props;
  if (has(text, 'id')) {
    const t = has(text, 'name')
      ? (text as IObjectType).name
      : has(text, 'content')
      ? (text as IObjectType).content
      : '';
    return <HighlightRender {...others} text={t} />;
  }
  return <HighlightRender {...others} text={JSON.stringify(text)} />;
};

interface ISingularRenderProps {
  active: string;
  text: any;
}

const SingularRender: SFC<ISingularRenderProps> = props => {
  const { text, ...others } = props;
  if (isObject(text)) {
    return <HashRender {...others} text={text} />;
  }
  if (text == null) {
    return null;
  }
  return <HighlightRender {...others} text={text} />;
};

interface IArrayRenderProps {
  active: string;
  text: unknown[];
}

const ArrayRender: SFC<IArrayRenderProps> = props => {
  return (
    <ul>
      {props.text.map((t, i) => {
        return (
          <li key={`${props.active}-${i}`}>
            {Array.isArray(t) ? (
              <ArrayRender {...props} text={t} />
            ) : (
              <SingularRender {...props} text={t} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

const DefaultRenderer: SFC<IDefaultRendererProps> = props => {
  const { text, ...others } = props;
  if (Array.isArray(text)) {
    return <ArrayRender {...others} text={text} />;
  }
  if (typeof text !== 'string') {
    return null;
  }

  return <HighlightRender {...others} text={text} />;
};

export default DefaultRenderer;
