/**
 * Fetches upcoming events
 * @author mtownsend
 * @since September 2020
 * @flow
 */

import { useEffect, useState } from 'react';

export type RemoteData<T> = {|
  status: 'LOADING'
|} | {|
  status: 'LOADED',
  data: T
|} | {|
  status: 'ERROR'
|}

export type Event = {|
  id: string,
  title: string,
  description: string,
  start: Date,
  end: Date
|}

const CALENDAR_ID = `1hu8b508dpep2sffkn62hs6iis%40group.calendar.google.com`;
const API_KEY = `AIzaSyBOpAhn00gphjGxyFSGu23BK3wtVi97qpA`;

const fetchEvents = async (signal:AbortSignal): Promise<Array<Event>> => {
  const fetchUri = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;
  const response = await fetch(fetchUri, { signal });
  if (!response.ok) {
    throw response.status;
  }
  const json = await response.json();
  return json
    .items
    .map(e => ({
      id: e.id,
      title: e.summary,
      description: e.description,
      start: new Date(e.start.dateTime),
      end: new Date(e.end.dateTime)
    }))
    .sort((a, b) => a.start - b.start);
};

export const useEvents = ():RemoteData<Array<Event>> => {

  const [ events, setEvents ] = useState({ status: 'LOADING' });
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchEvents(signal)
      .then(events => setEvents({ status: 'LOADED', data: events }))
      .catch(() => setEvents({ status: 'ERROR' }));
    return () => { controller.abort(); };
  }, []);

  return events;
};
