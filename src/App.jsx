import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import CallList from './components/CallList/index.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header />
      <CallList />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
