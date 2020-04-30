import gql from 'graphql-tag';

export const allTeamsQuery = gql`
  {
    ownedTeams{
      id
      name
      channels {
        id
        name
      }
    }

    myinvitedTeams {
        id
        name
        channels {
          id
          name
        }
  }

  }
`;