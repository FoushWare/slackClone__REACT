import React from 'react';
import { Form, Button, Modal } from 'semantic-ui-react';
import Downshift from 'downshift';
import { graphql,compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import MultiSelectUsers from './MultiSelectUsers';
import {withFormik} from 'formik';
import gql from 'graphql-tag';





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

  <Modal open={open} onClose={onClose} >
    // eslint-disable-next-line
    <Modal.Header>DirectMessage 🔥🚬 </Modal.Header>
    {console.log('teamid is ' +teamId)}
    {console.log(getTeamMembers)}

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
            disabled={isSubmitting}
            fluid
            onClick={(e) => {
              resetForm();
              onClose(e);
            }}
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting} fluid onClick={handleSubmit}>
            Start Messaging
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);


const getOrCreateChannelMutation = gql`
  mutation($teamId: Int!, $members: [Int!]!) {
    getOrCreateChannel(teamId: $teamId, members: $members)
  }
`;

export default compose(
  withRouter,
  graphql(getOrCreateChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ members: [] }),
    handleSubmit: async ({ members }, { props: { onClose, teamId, mutate }, setSubmitting }) => {
      const response = await mutate({ variables: { members, teamId } });
      console.log(response);
      onClose();
      setSubmitting(false);
    },
  }),
)(DirectMessageModal);