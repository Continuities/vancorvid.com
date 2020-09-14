/**
 * Renders a list of upcoming events
 * @author mtownsend
 * @since September 2020
 * @flow
 */

import React from 'react';
import { useEvents } from '../service/events';

export default () => {
  const events = useEvents();
  
  switch (events.status) {
  case 'LOADING': return 'LOADING...';
  case 'ERROR': return 'ERROR!';
  }

  return (
    <ul>
      {events.data.map(event => (
        <li key={event.id}>
          <div>{event.title}</div>
          <div>{event.description}</div>
          <div>{event.start.toLocaleDateString()}</div>
          <div>{event.end.toLocaleDateString()}</div>
        </li>
      ))}
    </ul>
  )
};
