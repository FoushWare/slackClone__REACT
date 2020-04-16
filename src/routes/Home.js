import React from 'react';
import { graphql } from 'react-apollo';
// eslint-disable-next-line import/newline-after-import
import gql from 'graphql-tag';
const Home = ({ data: { allUsers = [] } }) => allUsers.map(u => <h1 key={u.id}>{u.email}</h1>);

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

export default graphql(allUsersQuery)(Home);
