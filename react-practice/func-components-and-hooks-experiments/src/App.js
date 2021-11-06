// Here I practice/play/experiment using react components and hooks; no backend connections

// import React from 'react';
import DragAndDropList from './DragAndDropList';
import TicTacToeFun from './TicTacToeFun';

import './styling.css';
import Modal from './Modal';

function App() {
  return (
    <>
      <Modal />
      <hr />
      <DragAndDropList />
      <hr />
      <TicTacToeFun />
    </>
  )
};

export default App;
