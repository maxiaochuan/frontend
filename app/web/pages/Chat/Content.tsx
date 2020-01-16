import React, { SFC, useState, ChangeEvent, KeyboardEvent } from 'react';
import { Input } from 'antd';
import moment from 'moment';
import styles from './style.less';
import { IMSG } from './context';

export const MessageList: SFC<{ messages: IMSG[] }> = props => {
  const { messages } = props;
  return (
    <div className={styles.MessageList}>
      {messages.map(msg => (
        <div key={msg.time} className={styles.Msg}>
          <div>
            <span>{msg.from.name}</span>
            <span>:</span>
            <span>{msg.txt}</span>
          </div>
          <div>
            <span>{moment(msg.time).format('YYYY-MM-MM HH:mm:ss')}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export const EnterMessage: SFC<{ send: (txt: string) => void }> = props => {
  const [input, setInput] = useState('');
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  const onPressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    props.send(input);
    setInput('');
  };

  return (
    <div className={styles.EnterMessage}>
      <Input.TextArea rows={5} value={input} onChange={onChange} onPressEnter={onPressEnter} />
    </div>
  );
};

const Content: SFC = props => <div className={styles.Content}>{props.children}</div>;
export default Content;
