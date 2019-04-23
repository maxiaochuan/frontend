import { isObject } from '@mxcins/lodash';
import React from 'react';
import HighlightWords from 'react-highlight-words';
import { DefaultRenderGenerator, IRenderOpts } from '../interface';

export const highlightRender = <T extends {}>(input: string | number, opts: IRenderOpts<T>) => {
  return (
    <HighlightWords
      key={opts.complicated.key}
      highlightStyle={{ backgroundColor: 'transparent', padding: 0, color: 'rgb(252, 110, 91)' }}
      searchWords={opts.searchWords || []}
      textToHighlight={typeof input === 'number' ? `${input}` : input}
    />
  );
};

// export const linkRender = <T extends {}>(
//   input: string | number,
//   props: ISmartLinkProps,
//   opts: IRenderOpts<T>,
// ) => <Link {...props}>{highlightRender(input, opts)}</Link>;

export const unknownRender = <T extends {}>(input: unknown, opts: IRenderOpts<T>) => {
  const text = null;
  if (input === null || typeof input === undefined) {
    return text;
  }

  if (Array.isArray(input)) {
    throw new Error('table render error, array of array is not supported.');
  }

  if (isObject(input)) {
    const v = input as { id: string; name?: string; content?: string };
    if (v.id) {
      // const props: ISmartLinkProps = { name: opts.complicated.key as string, params: { id: v.id } };
      // return linkRender(v.name, props, opts);
      return highlightRender(v.name || v.content || '', opts);
    }
  }

  // if (opts.complicated.link) {
  //   return linkRender(input as string, opts.complicated.link, opts);
  // }

  return highlightRender(typeof input === 'string' ? input : JSON.stringify(input), opts);
};

export const arrayRender = <T extends {}>(items: any[], opts: IRenderOpts<T>) => {
  return items.map(item => unknownRender(item, opts));
};

export const renderGenerator: DefaultRenderGenerator = opts => {
  return text => (Array.isArray(text) ? arrayRender(text, opts) : unknownRender(text, opts));
};
