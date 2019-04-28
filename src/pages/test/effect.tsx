import React, { SFC, useEffect, useState } from 'react';

export interface IEffectTestProps {
  one?: any;
}

const Inner: SFC = () => {
  useEffect(() => {
    return () => {
      window.alert('1');
    };
  }, []);
  return <div>Inner</div>;
};

const EffectTest: SFC<IEffectTestProps> = () => {
  const [show, changeShow] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      changeShow(false);
    }, 2000);
  }, []);
  return <div>{show ? <Inner /> : null}</div>;
};

export default EffectTest;
