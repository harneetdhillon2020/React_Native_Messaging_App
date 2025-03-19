import React from 'react';
import Main from './src/Main.js';
import ViewModel from './src/Model/ViewModel.js';

const App = () => {
  return (
    <ViewModel>
      <Main />
    </ViewModel>
  );
};

export default App;
