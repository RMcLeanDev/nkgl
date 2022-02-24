import React, {useState, useEffect} from 'react';
import { NavLink, withRouter  } from 'react-router-dom';
import '../../scss/Header.scss';
import OrderUniform from './OrderUniform';
import SignIn from '../SignIn';

function UnauthHeader(){

    let display;
    let headerDisplay;
    let login;

    const[showHide, setShowHide] = useState(false);
    const[showSignIn, setShowSignIn] = useState(false);
    
    function showLogin(){
        setShowSignIn(true);
        setShowHide(false);
    }

    function useWindowSize() {
      const isClient = typeof window === 'object';
    
      function getSize() {
        return {
          width: isClient ? window.innerWidth : undefined,
          height: isClient ? window.innerHeight : undefined
        };
      }
    
      const [windowSize, setWindowSize] = useState(getSize);
    
      useEffect(() => {
        if (!isClient) {
          return false;
        }
        
        function handleResize() {
          setWindowSize(getSize());
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      return windowSize;
    }
  
    if(showHide === false){
      headerDisplay = {header: "hide", menu: "hide"};
    } else if(showHide){
      headerDisplay = {header: "open", menu: "show"};
    }
  
    function toggleNav(){
      if(showHide){
        setShowHide(false)
      } else {
        setShowHide(true)
      }
    }

    if(showSignIn){
        login = <SignIn close={() => setShowSignIn(false)}/>
    } else {
        login = null;
    }
  
    const windowSize = useWindowSize();
    if(windowSize){
      if(windowSize.width >=800){
        display = <div className="header">
          <NavLink exact to='/' activeClassName="active"><h3>Home</h3></NavLink>
          <NavLink to='/uniforms' activeClassName="active"><h3>Uniforms</h3></NavLink>
          <button onClick={showLogin} className="signIn">Sign In</button>
        </div>;
      } else if(windowSize.width < 800){
        display = <div className="headerMbl">
          <div className="showHide">
            <div onClick={toggleNav} id="nav-icon2" className={headerDisplay.header}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={headerDisplay.menu}>
            <NavLink exact to='/' onClick={() => setShowHide(false)}><h3>Home</h3></NavLink>
            <NavLink to='/uniforms' onClick={() => setShowHide(false)}><h3>Uniforms</h3></NavLink>
            <button onClick={showLogin}>Sign In</button>
          </div>
      </div>;
      } 
    } else {
      display = <h1>Getting Screen Size.</h1>
    }

    return(
        <div>
            {display}
            {login}
        </div>
    )
}

export default UnauthHeader;