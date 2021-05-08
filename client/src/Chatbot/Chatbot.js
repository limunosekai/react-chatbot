import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../_actions/message_actions';
import Axios from 'axios';
import Message from './Sections/Message';
import CardMessage from './Sections/CardMessage';

function Chatbot() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);

  useEffect(() => {
    eventQuery('welcomeToWesite');
  }, []);

  const textQuery = async (text) => {
    // 보낸 메세지를 저장
    let conversation = {
      who: 'user',
      content: {
        text: {
          text,
        },
      },
    };

    dispatch(saveMessage(conversation));

    // 메세지를 화면에 출력
    const textQueryVariable = {
      text,
    };

    try {
      // server의 textQuery에 axios 요청
      const response = await Axios.post(
        '/api/dialogflow/textQuery',
        textQueryVariable
      );
      for (let content of response.data.fulfillmentMessages) {
        conversation = {
          who: 'bot',
          content: content,
        };
        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      conversation = {
        who: 'bot',
        content: {
          text: {
            text: '에러 발생',
          },
        },
      };
      dispatch(saveMessage(conversation));
    }
  };

  const eventQuery = async (event) => {
    // 메세지를 화면에 출력
    const eventQueryVariable = {
      event,
    };

    try {
      // server의 eventQuery에 axios 요청
      const response = await Axios.post(
        '/api/dialogflow/eventQuery',
        eventQueryVariable
      );
      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: 'bot',
          content: content,
        };
        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      let conversation = {
        who: 'bot',
        content: {
          text: {
            text: '에러 발생',
          },
        },
      };
      dispatch(saveMessage(conversation));
    }
  };

  const keyPressHandler = (e) => {
    if (e.key === 'Enter') {
      if (!e.target.value) {
        return alert('메세지를 입력하세요.');
      }

      // textQuery Route에 메세지 전달
      textQuery(e.target.value);
      e.target.value = '';
    }
  };

  const renderOneMessage = (msg, i) => {
    // 일반 메세지 & 카드 메세지 분기
    if (msg.content && msg.content.text && msg.content.text.text) {
      return <Message who={msg.who} text={msg.content.text.text} key={i} />;
    } else if (
      msg.content &&
      msg.content.payload &&
      msg.content.payload.fields.card
    ) {
      return (
        <CardMessage
          who={msg.who}
          text={msg.content.text}
          values={msg.content.payload.fields.card.listValue.values}
          key={i}
        />
      );
    }
  };

  const renderMessage = (returnMessagess) => {
    if (returnMessagess) {
      return returnMessagess.map((msg, index) => {
        return renderOneMessage(msg, index);
      });
    } else {
      return null;
    }
  };

  return (
    <div
      style={{
        height: '700px',
        width: '700px',
        border: '3px solid black',
        borderRadius: '7px',
      }}
    >
      <div style={{ height: '644px', width: '100%', overflow: 'auto' }}>
        {renderMessage(messages)}
      </div>
      <input
        style={{
          margin: 0,
          width: '100%',
          height: '50px',
          borderRadius: '4px',
          padding: '5px',
          fontSize: '1rem',
        }}
        placeholder='메세지를 입력하세요.'
        type='text'
        onKeyPress={keyPressHandler}
      />
    </div>
  );
}

export default Chatbot;
