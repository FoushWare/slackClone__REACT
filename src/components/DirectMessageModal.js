import React from 'react';
import { Form, Button, Modal,Divider } from 'semantic-ui-react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import findIndex from 'lodash/findIndex';

import MultiSelectUsers from './MultiSelectUsers';
import { meQuery } from '../graphql/team';

const DirectMessageModal = ({
  open,
  onClose,
  teamId,
  currentUserId,
  values,
  handleSubmit,
  isSubmitting,
  resetForm,
  setFieldValue,
}) => (
  <Modal open={open} onClose={onClose}    style={{height: 'auto',marginTop:100,width:'90%',margin:'auto',display:'flex'}}
  >
    <Modal.Header>Direct Messaging</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <MultiSelectUsers
            value={values.members}
            handleChange={(e, { value }) => setFieldValue('members', value)}
            teamId={teamId}
            placeholder="select members to message"
            currentUserId={currentUserId}
          />
        </Form.Field>
        <Form.Group>
        
          <Button
           style={{margin:5}}
            disabled={isSubmitting}
            fluid
            onClick={(e) => {
              resetForm();
              onClose(e);
            }}
          >
            Cancel
          </Button>
         

          <Button 
           color='purple'
           style={{margin:5}}
           
          disabled={isSubmitting} fluid onClick={handleSubmit}>
            Start Messaging
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const getOrCreateChannelMutation = gql`
  mutation($teamId: Int!, $members: [Int!]!) {
    getOrCreateChannel(teamId: $teamId, members: $members) {
      id
      name
    }
  }
`;

export default compose(
  withRouter,
  graphql(getOrCreateChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ members: [] }),
    handleSubmit: async (
      { members },
      {
        props: {
          history, onClose, teamId, mutate,
        }, resetForm, setSubmitting,
      },
    ) => {
      const response = await mutate({
        variables: { members, teamId },
        update: (store, { data: { getOrCreateChannel } }) => {
          const { id, name } = getOrCreateChannel;

          const data = store.readQuery({ query: meQuery });
          const teamIdx = findIndex(data.me.teams, ['id', teamId]);
          const notInChannelList = data.me.teams[teamIdx].channels.every(c => c.id !== id);

          if (notInChannelList) {
            data.me.teams[teamIdx].channels.push({
              __typename: 'Channel',
              id,
              name,
              dm: true,
            });
            store.writeQuery({ query: meQuery, data });
          }
          history.push(`/view-team/${teamId}/${id}`);
        },
      });
    },
  }),
)(DirectMessageModal);
