import React, {useState} from 'react';
import {store} from '../index';
import {testFunction} from '../actions/index';

function Home(props){

  function testRedux(){
    let hash = encodeURIComponent(btoa("hello"))
    console.log(hash)
    let check = atob(decodeURIComponent(hash))
    console.log(check)
  }

  return(
    <div style={{"color": "white", "padding": "5px", "background-color": "rgba(0,0,0,0.5)"}}>
      <h1>Only thing active currently is vans tab.</h1>
    </div>
  )
}

export default Home;
