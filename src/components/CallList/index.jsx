import React, { Fragment } from 'react';
import {
  HiOutlinePhoneArrowDownLeft,
  HiOutlinePhoneArrowUpRight,
} from 'react-icons/hi2';
import { MdOutlineVoicemail } from 'react-icons/md';
import { INBOX, ARCHIVE, VOICEMAIL, MISSED, ANSWERED, INBOUND, OUTBOUND } from '../../utils/constants';
import { format } from 'date-fns';

const CallListItem = ({ direction, id, duration, from, to, via, call_type: callType, handleCallClick, created_at: createdAt }) => {

  let iconColor = '';
  if (callType === MISSED) iconColor = '#792122';
  if (callType === ANSWERED) iconColor = 'green';
  const dateToFormat = new Date(createdAt);

  return (
    <div
      tabIndex={0}
      className='call-item-container'
      onClick={() => handleCallClick(id)}
    >
      {callType === VOICEMAIL && <MdOutlineVoicemail size={30} style={{ flexShrink: 0 }} />}
      {callType !== VOICEMAIL && direction === INBOUND && <HiOutlinePhoneArrowDownLeft size={30} color={iconColor} />}
      {callType !== VOICEMAIL && direction === OUTBOUND && <HiOutlinePhoneArrowUpRight size={30} color={iconColor} />}
      <div className='call-item'>
        <div className="call-info">
          {direction === INBOUND && <p className='main-call-number'>{from}</p>}
          {direction === OUTBOUND && <p className='main-call-number'>{to}</p>}
          <p>tried to call on {via}</p>
        </div>
        <div className="time-info">
          <p className='time'>{format(dateToFormat, 'MM/dd/yy')}</p>
          <p className='time'>{format(dateToFormat, 'h:mm aaa')}</p>
        </div>
      </div>
    </div>
  );
};

const CallList = ({ data, tab, handleCallClick, loaded }) => {
  return (
    <div className='container-view'>
      {tab === INBOX && <h1>Your recent AirCalls</h1>}
      {tab === ARCHIVE && <h1>Your archived AirCalls</h1>}
      {data.length === 0 && !loaded && <p>Loading your AirCalls...</p>}
      {data.length === 0 && loaded && <p>You have no {tab === ARCHIVE && <span>archived </span>}AirCalls.</p>}
      {data.length > 0 && (
        <Fragment>
          <div className="call-item-container" tabIndex={0}>
            {tab === INBOX && <span className='main-call-number'>Archive all calls</span>}
            {tab === ARCHIVE && <span className='main-call-number'>Unarchive all calls</span>}
          </div>
          {data.length > 0 && data.map((call) => (
            <CallListItem
              key={call.id}
              handleCallClick={handleCallClick}
              {...call}
            />
          ))}
        </Fragment>)}
    </div>
  );
};

export default CallList;
