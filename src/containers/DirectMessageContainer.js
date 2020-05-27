import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Comment } from 'semantic-ui-react';

import Messages from '../components/Messages';

const newDirectMessageSubscription = gql`
subscription($teamId: Int!, $userId: Int!) {
  newDirectMessage(teamId: $teamId, userId: $userId) {
      id
      text
      sender {
        username
      }
     createdAt
    }
  }
`;

// eslint-disable-next-line react/prefer-stateless-function
class DirectMessageContainer extends React.Component {
  componentWillMount() {
    console.log('componentwillmount');
    this.unsubscribe = this.subscribe(this.props.teamId, this.props.userId);
  }

  componentWillReceiveProps({ teamId, userId }) {
    console.log('componentWillReceiveProps');
    console.log(" cwrp teamid : "+this.props.teamId );
    console.log("cwrp userid : "+this.props.userId );

    if (this.props.teamId !== teamId || this.props.userId !== userId) {
      if (this.unsubscribe) {
        this.unsubscribe();
        console.log("cancel subscrition");
      }
      console.log("we will subscribe");
      this.unsubscribe = this.subscribe(teamId, userId);
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe = (teamId, userId) =>{
// eslint-disable-next-line
    console.log("subscribe function" + "teamId is : "+ teamId);
    // eslint-disable-next-line
    console.log("subscribe function" + "userId is : "+ userId);
     this.props.data.subscribeToMore({
      document: newDirectMessageSubscription,
      variables: {
        teamId,
        userId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev.directMessages);
        console.log("subscriptionData : " + subscriptionData.data.newDirectMessage);
      if (!subscriptionData) {
        return prev;
      }
              console.log("New Messages froush");

      
      
      return {
        ...prev,
        directMessages: [...prev.directMessages, subscriptionData.data.newDirectMessage],
      };
    },
  });

  console.log("sub to more ");
}
  
  render() {
    const { data: { loading, directMessages } } = this.props;

    return loading ? null : (
      <Messages>
        <Comment.Group>
          { directMessages && directMessages.map(m => (
            <Comment key={`${m.id}-direct-message`}>
              <Comment.Content>
                <Comment.Author as="a">{m.sender.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{m.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{m.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Messages>
    );
  }
}

const directMessagesQuery = gql`
  query($teamId: Int!, $userId: Int!) {
    directMessages(teamId: $teamId, otherUserId: $userId) {
      id
      sender {
        username
      }
      text
      createdAt
    }
  }
`;

export default graphql(directMessagesQuery, {
  
  options:props =>({
    fetchPolicy: 'network-only',
    variables:{
    teamId: props.teamId,
    userId: props.userId,
  },
  }),
})(DirectMessageContainer);