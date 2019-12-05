import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import Toolbar from 'src/components/Toolbar';
import Viewer from 'src/components/Viewer';
import Header from 'src/components/Header';

const StyledContainer = styled.div`
  > .container-fluid {
    padding: 0;
  }
`;

export default function Editor () {
  return (
    <StyledContainer>
      <Container fluid={true}>
        <Row noGutters={true}>
          <Col xs={12}>
            <Header />
          </Col>
        </Row>
        <Row noGutters={true}>
          <Col xs={'auto'}>
            <Toolbar />
          </Col>
          <Col>
            <Viewer />
          </Col>
        </Row>
      </Container>
    </StyledContainer>
  );
}