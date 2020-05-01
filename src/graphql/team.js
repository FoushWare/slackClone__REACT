import gql from 'graphql-tag';

export const allTeamsQuery = gql`
  {
    ownedTeams{
      id
      name
      owner
      channels {
        id
        name
      }
    }

    myinvitedTeams {
        id
        name
        owner
        channels {
          id
          name
        }
  }

  }
`;