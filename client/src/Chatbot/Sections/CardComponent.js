import React from 'react';
import { Card, Icon } from 'antd';

const { Meta } = Card;

function CardComponent(props) {
  return (
    <Card
      style={{ width: '300px' }}
      cover={<img alt='#' src={props.cardInfo.fields.image.stringValue} />}
      actions={[
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={props.cardInfo.fields.link.stringValue}
        >
          <Icon type='ellipsis' key='ellipsis' />
        </a>,
      ]}
    >
      <Meta
        title={props.cardInfo.fields.stack.stringValue}
        description={props.cardInfo.fields.description.stringValue}
      />
    </Card>
  );
}

export default CardComponent;
