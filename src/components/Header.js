/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-unresolved
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';
import React from 'react';

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
`;
export default ({ channelName }) => (
  <HeaderWrapper>
    <Header textAlign="center">
      #
      {channelName}
    </Header>

  </HeaderWrapper>
);
