import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import CallList from './components/CallList/index.jsx';
import { INBOX, ARCHIVE, UNIQUE_CALL } from './utils/constants.js';


const App = () => {
  const [tab, setTab] = useState(INBOX);
  const [inboxData, setInboxData] = useState([]);
  const [archivedData, setArchivedData] = useState([]);
  const [uniqueCall, setUniqueCall] = useState(null);

  const handleTab = (tabName) => {
    setUniqueCall(null);
    if (tabName !== tab) setTab(tabName);
  };

  const handleCallClick = (callId) => {
    setUniqueCall(callId);
    setTab(UNIQUE_CALL);
  };

  const fetchData = () => {
    fetch('https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities').then((response) => {
      response.json().then((data) => {
        setInboxData(data.filter((call) => !call.is_archived));
        setArchivedData(data.filter((call) => call.is_archived));
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container'>
      <Header tab={tab} handleTabChange={handleTab} />
      {tab === INBOX && (
        <CallList
          data={inboxData}
          heading={"Your recent AirCalls"}
          handleCallClick={handleCallClick}
        />
      )}
      {tab === ARCHIVE && (
        <CallList
          data={archivedData}
          heading={"Your archived AirCalls"}
          handleCallClick={handleCallClick}
        />
      )}
    </div>

  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
