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

  const updateCall = async (id, isArchived) => {
    try {
      setLoaded(false);
      const response = await fetch(`https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          is_archived: !isArchived
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      if (response.status === 200) {
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
        setLoaded(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateAllCalls = async (newStatus) => {
    try {
      setLoaded(false);
      const callsToUpdate = callData.filter((call) => call.is_archived !== newStatus);

      const response = await Promise.all(callsToUpdate.map((call) => fetch(`https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${call.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          is_archived: newStatus
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })));

      if (response.filter((res) => res.status === 200).length === callsToUpdate.length) {
        setCallData((prev) => prev.map((prevCall) => prevCall.is_archived !== newStatus ? {
          id: prevCall.id,
          created_at: prevCall.created_at,
          direction: prevCall.direction,
          from: prevCall.from,
          to: prevCall.to,
          via: prevCall.via,
          duration: prevCall.duration,
          is_archived: newStatus,
          call_type: prevCall.call_type
        } : prevCall));
        setLoaded(true);
      }

    } catch (error) {
      console.error(error.message);
    }

  };

  // Some calls in the server are missing data such as direction, to, from, via, and call_type. I've filtered those out as I should expect the server to return data with all fields present
  const fetchData = async () => {
    try {
      const response = await fetch('https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities');
      const data = await response.json();
      setCallData(data.filter((call) => checkCallObject(call)));
      setLoaded(true);
    } catch (error) {
      console.error(error.message);
    }
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
          updateAllCalls={updateAllCalls}
        />
      )}
      {tab === ARCHIVE && (
        <CallList
          data={callData.filter((call) => call.is_archived)}
          handleCallClick={handleCallClick}
          tab={tab}
          loaded={loaded}
          updateAllCalls={updateAllCalls}
        />
      )}
      {tab === UNIQUE_CALL && !!uniqueCallId && (
        <UniqueCall
          id={uniqueCallId}
          data={callData}
          updateCall={updateCall}
          loaded={loaded}
        />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
