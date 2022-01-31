import React, {useState} from 'react';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

function SignUp(props){

    const [passwordError, setPasswordError] = useState(false);

    let _name = null;
    let _email = null;
    let _passwordOne = null;
    let _passwordTwo = null;
    let _botProtection = null;

    function signUpFunction(e){
        e.preventDefault();
        if(_botProtection.value === ''){
            if(_passwordOne.value !== _passwordTwo.value){
                _passwordOne.value = '';
                _passwordTwo.value = '';
                return setPasswordError("Your passwords doesn't match. Please try again.")
            } else {
                firebase.auth().createUserWithEmailAndPassword(_email.value, _passwordOne.value).then(user => {
                    let userId = user.user.uid;
                    firebase.database().ref(`users/${userId}`).set({user_id: userId, name: _name.value, email: _email.value, notification: true}).catch(error => {
                        console.log(error)
                    })
                }).catch(error => {
                    setPasswordError(error.message)
                })
            }
        } else {
            console.log('no')
        }
    }

    // <h1>This is not yet avaliable for employees. If you are a admin or dispatch please contact Ryan McLean to make you a profile. <span onClick={props.closeSignUp} className="signUpClick">Click Here To Go Back!</span></h1>

    return(
        <div className="signInContainer">
            <div className="signInForm">
                <form onSubmit={signUpFunction}>
                    <input type="text" placeholder='Name' ref={value => {_name = value}}/><br />
                    <input type="email" placeholder='Email' ref={value => {_email = value}}/><br />
                    <input type="password" placeholder="Password" ref={value => {_passwordOne = value}}/><br />
                    <input type="password" placeholder="Confirm Password" ref={value => {_passwordTwo = value}}/><br />
                    {passwordError}
                    <input placeholder="bot" style={{display: "none"}} ref={value => {_botProtection = value}} />
                    <br />
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have a account? <span onClick={props.closeSignUp} className="signUpClick">Click Here!</span></p>
            </div>
        </div>
    )
}

export default SignUp;