import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import CallList from './components/CallList/index.jsx';
import { INBOX, ARCHIVE, UNIQUE_CALL } from './utils/constants.js';
import { checkCallObject } from './utils/helpers.js';


const App = () => {
  const [tab, setTab] = useState(INBOX);
  const [inboxData, setInboxData] = useState([]);
  const [archivedData, setArchivedData] = useState([]);
  const [uniqueCall, setUniqueCall] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const handleTab = (tabName) => {
    setUniqueCall(null);
    if (tabName !== tab) setTab(tabName);
  };

  const handleCallClick = (callId) => {
    setUniqueCall(callId);
    setTab(UNIQUE_CALL);
  };

  // Some calls in the server are missing data such as direction, to, from, via, and call_type. I've filtered those out as I should expect the server to return data with all fields present
  const fetchData = () => {
    fetch('https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities').then((response) => {
      response.json().then((data) => {
        setInboxData(data.filter((call) => !call.is_archived && checkCallObject(call)));
        setArchivedData(data.filter((call) => call.is_archived && checkCallObject(call)));
        setLoaded(true);
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
          handleCallClick={handleCallClick}
          tab={tab}
          loaded={loaded}
        />
      )}
      {tab === ARCHIVE && (
        <CallList
          data={archivedData}
          handleCallClick={handleCallClick}
          tab={tab}
          loaded={loaded}
        />
      )}
      {tab === UNIQUE_CALL && !!uniqueCall && (
        <p>{uniqueCall} page</p>
      )}
    </div>

  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
