import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import CallList from './components/CallList/index.jsx';
import { INBOX } from './utils/constants.js';


const App = () => {

  const [tab, setTab] = useState(INBOX);

  const handleTab = (tabName) => {
    if (tabName !== tab) setTab(tabName);
  };

  return (
    <div className='container'>
      <Header tab={tab} handleTabChange={handleTab} />
      <CallList />
    </div>

  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
