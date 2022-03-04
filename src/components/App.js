import React from 'react';
import '../scss/App.scss';
import Error404 from './Error404';
import Home from './Home';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './Header';
import Uniforms from './Authenticated/Uniforms/UniformsMain';
import UnauthenticatedMain from './Unauthenticated/UnauthenticatedMain';
import OrderUniform from './Unauthenticated/OrderUniform';
import UnauthHeader from './Unauthenticated/UnauthHeader';
import VansMain from './Authenticated/Vans/VansMain';

function App(props) {

  let display;

  const responseGoogle = (response) => {
    console.log(response)
  }

  const responseError = (error) => {
    console.log(error)
  }

  if(props.authUser){
    display = <div>
    <Header history={props.history}/>
    <Switch>
      <Route exact path ='/' component={Home}/>
      <Route exact path ='/uniforms' component={Uniforms}/>
      <Route exact path ='/vans' component={VansMain}/>
      <Route component={Error404}/>
    </Switch></div>
  } else if (props.authUser === false) {
    display = <div>
      <UnauthHeader />
      <Switch>
        <Route exact path ='/' component={UnauthenticatedMain}/>
        <Route exact path ='/uniforms' component={OrderUniform}/>
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
