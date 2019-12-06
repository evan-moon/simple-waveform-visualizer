import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import Header from 'src/components/Header';
import SubHeader from 'components/SubHeader';
import TrackBars from 'components/TrackBars';

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
        <SubHeader />
        <TrackBars />
      </Container>
    </StyledContainer>
  );
}