import React from 'react';
import { graphql,compose} from 'react-apollo';
import findIndex from 'lodash/findIndex';
import { Redirect } from 'react-router-dom';
import DirectMessageContainer from '../containers/DirectMessageContainer';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';
import { meQuery } from '../graphql/team';
import  gql from 'graphql-tag';
import Header from '../components/Header';



const ViewTeam = ({ mutate,data: { loading,me,getUser }, match: { params: { teamId, userId } } }) => {
  if (loading) {
    return null;
  }

  // const teams = [...ownedTeams,...myinvitedTeams];
  const {teams,username} = me ;
  
  if (!teams.length) {
    return <Redirect to="/create-team" />;
  }

  const teamIdInteger = parseInt(teamId, 10);
  const teamIdx = teamIdInteger ? findIndex(teams, ['id', teamIdInteger]) : 0;
  const team = teamIdx === -1 ? teams[0]:teams[teamIdx];
  console.log("team is : "+team.id);

  const userIdx= parseInt(userId,10);


  return (
    <AppLayout>
      <Sidebar
        teams={teams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team}
        username={username}
      />
       <Header channelName={getUser.username} />
       <DirectMessageContainer teamId={team.id} userId={userIdx} />
            <SendMessage 
            placeholder={userId}
             onSubmit={async(text)=>{
               const response = await mutate({
                 variables:{
                   text,
                   receiverId: userIdx,
                   teamId:team.id,
                 },
                 optimisticResponse: {
                  createDirectMessage: true,
                },
                update: (store) => {
                  const data = store.readQuery({ query: meQuery });
                  const teamIdx2 = findIndex(data.me.teams, ['id', team.id]);
                  const notAlreadyThere = data.me.teams[teamIdx2].directMessageMembers.every(member => member.id !== parseInt(userId, 10));
                  if (notAlreadyThere) {
                    data.me.teams[teamIdx2].directMessageMembers.push({
                      __typename: 'User',
                      id: userIdx,
                      username: getUser.username,
                    });
                    store.writeQuery({ query: meQuery, data });
                  }
                }, 
                })
                console.log(response);

             }}/>
    </AppLayout>
  );
};
const directMessageMeQuery = gql`
  query($userId: Int!) {
    getUser(userId: $userId) {
      username
    }
    me {
      id
      username
      teams {
        id
        name
        admin
        directMessageMembers {
          id
          username
        }
        channels {
          id
          name
        }
      }
    }
  }
`;

const createDirectMessageMutation = gql`

    mutation($receiverId: Int!,$text: String!,$teamId: Int!){
        createDirectMessage(receiverId:$receiverId,text:$text,teamId:$teamId)
        
    
    }


`;
export default compose(

graphql(directMessageMeQuery, {
  options: props => ({
    variables: { userId:  parseInt(props.match.params.userId,10) },
    fetchPolicy: 'network-only',
  }),
}),
graphql(createDirectMessageMutation),
)(ViewTeam);