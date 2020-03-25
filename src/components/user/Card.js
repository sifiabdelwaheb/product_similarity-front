import React from 'react';
import PropTypes from 'prop-types';

import IntlMessages from '../../helpers/IntlMessages';
import {
  Card,
  Col,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
} from 'reactstrap';
function Cards(props) {
  return (
    <Col
      onClick={props.onClickCard}
      className={props.Col}
      xs={props.xs}
      sm={props.sm}
      md={props.md}
    >
      <Card className={props.Card}>
        {props.withImgCard && (
          <CardImg top width="100%" src={props.packageImg} />
        )}
        <CardBody>
          <CardTitle>
            {' '}
            <IntlMessages id={props.package || ''} />
          </CardTitle>
          <CardSubtitle>{props.subtitle}</CardSubtitle>
          <CardText>{props.description}</CardText>
          <CardText>{props.price}</CardText>
          {props.children}
        </CardBody>
      </Card>
    </Col>
  );
}

Cards.propTypes = {
  package: PropTypes.string,
  packageImg: PropTypes.string,
  description: PropTypes.string,
  subtitle: PropTypes.string,
};
Cards.defaultProps = {
  package: '',
  packageImg: '',
  description: '',
  subtitle: '',
};

export default Cards;
