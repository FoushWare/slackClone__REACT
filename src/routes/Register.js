import React from 'react';
import { Message,Button,Container, Header,Input } from 'semantic-ui-react';
import {gql,graphql} from 'react-apollo';

class Register extends React.Component{
    state = {
        username:'',
        usernameError:'',
        email:'',
        emailError:'',
        password:'',
        passwordError:''
    };
    onChange = e=>{
        const {name,value}= e.target;
        // [name] => if name= email it get the input of email 
        this.setState({[name]:value});
    };
    onSubmit = async() =>{
        this.setState({
            usernameError:'',
            emailError:'',
            passwordError:''
        });
        const {username,email,password} = this.state;
        const response = await this.props.mutate({
            variables: {username,email,password},
        });
        const {ok, errors} = response.data.register;
        if(ok){
            this.props.history.push('/');
        }else{
            const err = {};
            errors.forEach(({path,message})=>{
                err[`${path}Error`] = message;
            });
            this.setState(err)
        }
        // console.log(response);
        // this.setState({username:'',email:'',password:''});

    };
    render(){
        const {username,email,password,usernameError,emailError,passwordError}= this.state;
        const errorList = [];
        if(usernameError){
            errorList.push(usernameError);
        }
        if(emailError){
            errorList.push(emailError);

        }
        if(passwordError){
            errorList.push(passwordError);
        }
       return(
        <Container text>
            <Header as='h2'>Register</Header>
            <Input error={!!usernameError}  name='username' onChange={this.onChange} focus   value={username} placeholder='UserName' fluid />
            <Input error={!!emailError}     name='email' onChange={this.onChange} focus   value={email}    type="email" placeholder='email' fluid />
            <Input  error={!!passwordError} name='password' onChange={this.onChange} focus   value={password} type="password" placeholder='password' fluid />
            <Button primary onClick={this.onSubmit}>Submit</Button>


          { usernameError || emailError || passwordError ? (
              <Message
              error
              header='There was some errors with your submission'
              list={ errorList
                }
                />
                ):null }
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
