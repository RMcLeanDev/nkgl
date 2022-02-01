import React from 'react';
import '../scss/App.scss';
import Error404 from './Error404';
import Home from './Home';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './Header';
import SignIn from './SignIn';
import Uniforms from './Authenticated/UniformsMain';

function App(props) {

  let display;

  if(props.authUser){
    display = <div>
    <Header history={props.history}/>
    <Switch>
      <Route exact path ='/' component={Home}/>
      <Route exact path ='/uniforms' component={Uniforms}/>
      <Route component={Error404}/>
    </Switch></div>
  } else if (props.authUser === false) {
    display = <div><Switch>
    <Route exact path ='/' component={SignIn}/>
    <Route component={Error404}/>
  </Switch></div>
  } else {
    display = 
    <div className="loader"><img src={require('../assets/images/loading.gif')}/></div>
  }

  return (
    <div className="App">
      {display}
    </div>
  );
}

const mapStateToProps = state => ({
  authUser: state.authState
})

export default connect(mapStateToProps)(App);
