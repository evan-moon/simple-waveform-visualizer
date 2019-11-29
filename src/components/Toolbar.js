import React from 'react';
import styles from './Toolbar.module.css';
import { Button } from 'react-bootstrap';

export default function Toolbar () {
  return (
    <aside className={styles.toolbar}>
      <Button>Add Audio</Button>
    </aside>
  );
}