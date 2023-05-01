import React from 'react';
import { findUniqueCallDetails } from '../../utils/helpers';
import { VOICEMAIL, MISSED, ANSWERED } from '../../utils/constants';
import { formatDistance, format } from 'date-fns';

const UniqueCall = ({ id, data }) => {

  const { to, from, via, duration, created_at: createdAt, call_type: callType, is_archived: isArchived, direction } = findUniqueCallDetails(id, data);

  const dateToFormat = new Date(createdAt);
  const currentDate = new Date();

  return (
    <div className="container-view">
      <h1>Call Details</h1>
      <div className="details-container">
        <p>{from} {callType === VOICEMAIL && <span>left a voicemail for </span>}{callType === MISSED && <span>tried to call </span>}{callType === ANSWERED && <span>called </span>}{to} {formatDistance(dateToFormat, currentDate, { addSuffix: true })}.</p>
      </div>
      <div className="call-detail">
        <p>Call Type:</p>
        <p>{callType.toUpperCase()}</p>
      </div>
      <div className="call-detail">
        <p>Direction:</p>
        <p>{direction.toUpperCase()}</p>
      </div>
      <div className="call-detail">
        <p>Date/Time:</p>
        <p>{format(dateToFormat, 'MM/dd/yy, h:mm aaa')}</p>
      </div>
      <div className="call-detail">
        <p>AirCall #:</p>
        <p>{via}</p>
      </div>
      <div className="call-detail">
        <p>Duration</p>
        <p>{duration}s</p>
      </div>
      <button className='archive-button'>{isArchived ? <span>Unarchive </span> : <span>Archive </span>}this call</button>
    </div>

  );
};

export default UniqueCall;
