import React, { Fragment } from 'react';
import { findUniqueCallDetails } from '../../utils/helpers';
import { VOICEMAIL, MISSED, ANSWERED } from '../../utils/constants';
import { formatDistance, format } from 'date-fns';
import Loading from '../Loading/index.jsx';

const UniqueCall = ({ id, data, updateCall, loaded }) => {

  const { to, from, via, duration, created_at: createdAt, call_type: callType, is_archived: isArchived, direction } = findUniqueCallDetails(id, data);

  const currentDate = new Date();

  return (
    <div className="container-view">
      <h1>Call Details</h1>
      {!loaded && <Loading message={`We're almost ready! We just have to ${isArchived ? 'un' : ''}archive this call for you.`} />}
      {loaded && (
        <Fragment>
          <div className="details-container">
            <p>{from} {callType === VOICEMAIL && <span>left a voicemail for </span>}{callType === MISSED && <span>tried to call </span>}{callType === ANSWERED && <span>called </span>}{to} {formatDistance(new Date(createdAt), currentDate, { addSuffix: true })}.</p>
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
            <p>{format(new Date(createdAt), 'MM/dd/yy, h:mm aaa')}</p>
          </div>
          <div className="call-detail">
            <p>AirCall #:</p>
            <p>{via}</p>
          </div>
          <div className="call-detail">
            <p>Duration</p>
            <p>{duration}s</p>
          </div>
          <button
            className='archive-button'
            onClick={() => updateCall(id, isArchived)}
          >{isArchived ? <span>Unarchive </span> : <span>Archive </span>}this call</button>
        </Fragment>
      )}
    </div>

  );
};

export default UniqueCall;
