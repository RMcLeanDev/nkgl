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
      <h1>Welcome to my dispatch tool.</h1>
      <hr/>
      <p>My name is Ryan McLean. Creator of this app. I currently work as a dispatch manager for a third party Amazon Dispatch Company. I created this app to help with:</p>
      <ul>
        <li>Keeping track of employees instead of using a spreadsheet.</li>
        <li>Keep track of active vans and any rentals we may have and if we have any vans offsite for oil changes or repairs.</li>
        <li>Be able to upload images and keep track of damages.</li>
        <li>Upload documents for employees if their is a incident that occurs.</li>
      </ul>
      <hr/>
      <p>Future goals:</p>
      <ul>
        <li>Have a schedule section.</li>
        <li>Incorperate a employee login so they can view only their schedule. Be able to make uniform requests. Update address that will be approved by a admin account. Upload documents to their account if needed.</li>
      </ul>
      <hr/>
      <p>Enjoy what has been created so far. But be aware not everything is finished.</p>
    </div>
  )
}

export default Home;
