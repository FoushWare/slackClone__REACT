/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Form, Message, Button, Container, Header, Input } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
class Register extends React.Component {
    // eslint-disable-next-line react/state-in-constructor
    state = {
      username: '',
      usernameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
    };

    onChange = (e) => {
      const { name, value } = e.target;
      // [name] => if name= email it get the input of email
      this.setState({ [name]: value });
    };

    onSubmit = async () => {
      this.setState({
        usernameError: '',
        emailError: '',
        passwordError: '',
      });
      const { username, email, password } = this.state;
      const response = await this.props.mutate({
        variables: { username, email, password },
      });
      const { ok, errors } = response.data.register;
      if (ok) {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.history.push('/');
      } else {
        const err = {};
        errors.forEach(({ path, message }) => {
          err[`${path}Error`] = message;
        });
        this.setState(err);
      }
      // console.log(response);
      // this.setState({username:'',email:'',password:''});
    };

    render() {
      const {
        username, email, password, usernameError, emailError, passwordError,
      } = this.state;
      const errorList = [];
      if (usernameError) {
        errorList.push(usernameError);
      }
      if (emailError) {
        errorList.push(emailError);
      }
      if (passwordError) {
        errorList.push(passwordError);
      }
      return (
        <Container text>
          <Form>
            <Header as="h2">Register</Header>
            <Form.Field error={!!usernameError}>
              <Input name="username" onChange={this.onChange} focus value={username} placeholder="UserName" fluid />
            </Form.Field>
            <Form.Field error={!!emailError}>
              <Input name="email" onChange={this.onChange} focus value={email} type="email" placeholder="email" fluid />
            </Form.Field>
            <Form.Field error={!!passwordError}>
              <Input name="password" onChange={this.onChange} focus value={password} type="password" placeholder="password" fluid />
            </Form.Field>
            <Button primary onClick={this.onSubmit}>Submit</Button>


          </Form>
          { errorList.length ? (
            <Message
              error
              header="There was some errors with your submission"
              list={errorList}
            />
          ) : null }

        </Container>
      );
    }
}
const registerMutation = gql`
        mutation($username:String!,$email:String!,$password:String!) {
            register(username:$username,email:$email,password:$password){
                ok
                errors{
                    path
                    message
                }
            }
        } 
    `;


export default graphql(registerMutation)(Register);
