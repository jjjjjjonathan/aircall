import React from 'react';

const CallListItem = ({ direction, id, duration, from, to, via, call_type }) => {
  return <p>this is a call list item with id of {id}</p>;
};

const CallList = ({ data, heading, handleCallClick }) => {
  return (
    <div className='container-view'>
      <h1>{heading}</h1>
      {data.length > 0 && data.map((call) => (
        <CallListItem
          key={call.id}
          handleCallClick={handleCallClick}
          {...call}
        />
      ))}
    </div>
  );
};

export default CallList;
