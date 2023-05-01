import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import CallList from './components/Calls/index.jsx';
import UniqueCall from './components/Calls/UniqueCall.jsx';
import { INBOX, ARCHIVE, UNIQUE_CALL } from './utils/constants.js';
import { checkCallObject } from './utils/helpers.js';


const App = () => {
  const [tab, setTab] = useState(INBOX);
  const [callData, setCallData] = useState([]);
  const [uniqueCallId, setUniqueCallId] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const handleTab = (tabName) => {
    if (uniqueCallId !== null) setUniqueCallId(null);
    if (tabName !== tab) setTab(tabName);
  };

  const handleCallClick = (callId) => {
    setUniqueCallId(callId);
    setTab(UNIQUE_CALL);
  };

  const updateCall = (id, isArchived) => {
    setLoaded(false);
    fetch(`https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        is_archived: !isArchived
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then((response) => {
      if (response.status === 200) {
        console.log(`successfully updated ${id}`);
        setCallData((prev) => prev.map((prevCall) => prevCall.id === id ? {
          id: prevCall.id,
          created_at: prevCall.created_at,
          direction: prevCall.direction,
          from: prevCall.from,
          to: prevCall.to,
          via: prevCall.via,
          duration: prevCall.duration,
          is_archived: !prevCall.is_archived,
          call_type: prevCall.call_type
        } : prevCall));
      }
    });
  };

  // Some calls in the server are missing data such as direction, to, from, via, and call_type. I've filtered those out as I should expect the server to return data with all fields present
  const fetchData = () => {
    fetch('https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities').then((response) => {
      response.json().then((data) => {
        setCallData(data.filter((call) => checkCallObject(call)));
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
          data={callData.filter((call) => !call.is_archived)}
          handleCallClick={handleCallClick}
          tab={tab}
          loaded={loaded}
        />
      )}
      {tab === ARCHIVE && (
        <CallList
          data={callData.filter((call) => call.is_archived)}
          handleCallClick={handleCallClick}
          tab={tab}
          loaded={loaded}
        />
      )}
      {tab === UNIQUE_CALL && !!uniqueCallId && (
        <UniqueCall
          id={uniqueCallId}
          data={callData}
          updateCall={updateCall}
        />
      )}
    </div>

  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
