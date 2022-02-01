import React, {useState} from "react";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import SignUp from './SignUp';

function SignIn(props){

    //<h3 onClick={() => {setSignUp(true)}} className="signUpButton">Create account?</h3>

    const [error, setError] = useState(null);
    const [signUp, setSignUp] = useState(false);
    let _email = null;
    let _password = null;
    let signUpForm = null;

    function signInFunction(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(_email.value, _password.value).then(function(user) {
            if(user){
                setError(null);
            }
        }).catch(error => {
            setError(error.message);
        })
    }

    if(signUp){
        signUpForm = <SignUp closeSignUp={() => {setSignUp(false)}}/>
    } else {
        signUpForm = 
        <div className="signInContainer">
            <div className="signInForm">
                <form onSubmit={signInFunction}>
                    <input placeholder="Email" type="email" ref={value => {_email = value}}/>
                    <br/>
                    <input placeholder="Password" type="password" ref={value => {_password = value}}/>
                    <br/>
                    <button type="submit">Sign in</button>
                    <p>{error}</p>
                </form>
                <button onClick={() => props.close()}>Cancel</button>
            </div>
        </div>;
    }

    return(
        <div className="signIn">
            {signUpForm}
        </div>
    )
}

export default SignIn;