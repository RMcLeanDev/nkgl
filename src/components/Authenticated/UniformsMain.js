import React from 'react';
import {connect} from 'react-redux';
import '../../scss/Uniforms.scss';

function UniformsMain(props){

    console.log(props);

    return(
        <div className="uniformMain">
            <h1>Uniforms</h1>
        </div>
    )
}

const mapStateToProps = state => ({
    inventState: state.inventoryState
})

export default connect(mapStateToProps)(UniformsMain);