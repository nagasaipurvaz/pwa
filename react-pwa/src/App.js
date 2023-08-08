import React from 'react';
import Forms from './form';
import Anagram from './anagram';

import './App.css'

const App = () => {


  return (


    <div className="app">
      <h1>Insert the data</h1>
      <Forms/>
      <Anagram />
    </div>
  );
};

export default App;