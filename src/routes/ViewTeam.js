/* eslint-disable import/newline-after-import */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import Header from '../components/Header';
import Messages from '../components/Messages';
import Input from '../components/Input';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
export default () => (
  <AppLayout>
    <Teams teams={[{ id: 1, letter: 'B' }, { id: 2, letter: 'Q' }]} />
    <Channels
      teamName="Team name"
      username="Username"
      channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
      users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
    />
    <Header channelName="general" />
    <Messages>
      <ul className="message-list">
        <li />
        <li />
      </ul>
    </Messages>
    <Input>
      <input type="text" placeholder="CSS Grid Layout Module" />
    </Input>
    <SendMessage channelName="general" />

  </AppLayout>
);
