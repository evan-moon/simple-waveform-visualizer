import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Toolbar from 'src/components/Toolbar';
import Viewer from 'src/components/Viewer';
import styles from './Editor.module.css';

export default function Editor () {
  return (
    <Container className={styles.editor} fluid={true}>
      <Row noGutters={true}>
        <Col xs={'auto'}>
          <Toolbar />
        </Col>
        <Col>
          <Viewer />
        </Col>
      </Row>
    </Container>
  );
}