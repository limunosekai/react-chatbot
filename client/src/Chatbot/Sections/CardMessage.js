import React from 'react';
import { List, Icon, Avatar } from 'antd';
import CardComponent from './CardComponent';

function CardMessage(props) {
  const AvatarSrc =
    props.who === 'bot' ? <Icon type='robot' /> : <Icon type='smile' />;

  const renderCards = (cards) => {
    return cards.map((card, i) => (
      <CardComponent key={i} cardInfo={card.structValue} />
    ));
  };

  return (
    <List.Item style={{ padding: '1rem' }}>
      <List.Item.Meta
        avatar={<Avatar icon={AvatarSrc} />}
        title={props.who}
        description={renderCards(props.values)}
      />
    </List.Item>
  );
}

export default CardMessage;
