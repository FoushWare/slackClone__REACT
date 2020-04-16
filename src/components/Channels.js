/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-unresolved */
import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;
const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;
const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;
const paddingLeft = 'padding-left: 10px';
const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;
const SideBarListHeader = styled.li`${paddingLeft};`;
const PushLeft = styled.div`${paddingLeft};`;

const Green = styled.span`color: #38978d;`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');

const channel = ({ id, name }, teamId) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <SideBarListItem>
      #
      {' '}
      {name}
    </SideBarListItem>
  </Link>
);
const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble />
    {' '}
    {name}
  </SideBarListItem>
);

export default ({
  teamName, userName, channels, users, onAddChannelClick, teamId
}) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>
        {teamName}
      </TeamNameHeader>
      {userName}
    </PushLeft>
    <div>

      <SideBarList>
        <SideBarListHeader>Channels <Icon onClick={onAddChannelClick} name="add circle" /></SideBarListHeader>
        {channels.map( c => channel(c,teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>Direct Messages</SideBarListHeader>
        {users.map(user)}
      </SideBarList>
    </div>

  </ChannelWrapper>
);
