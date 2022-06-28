import React, {useState} from 'react';
import {connect} from 'react-redux';
import '../../../scss/Uniforms.scss';
import UniformOrders from './UniformOrders';
import UniformInventory from './UniformInventory';

function UniformsMain(props){

    let view;

    const[tabActive, setTab] = useState("Orders");

    if(tabActive === "Orders"){
        view = <UniformOrders />
    } else if (tabActive === "Inventory"){
        view = <UniformInventory />
    }

    return(
        <div className="uniformMain">
            <div className="tabs">
                <button className={`${tabActive==="Orders" ? "active" : ""}`} onClick={() => setTab("Orders")}>Orders</button>
                <button className={`${tabActive==="Inventory" ? "active" : ""}`} onClick={() => setTab("Inventory")}>Inventory</button>
            </div>
            {view}
        </div>
    )
}

const mapStateToProps = state => ({
    inventState: state.inventoryState
})

export default connect(mapStateToProps)(UniformsMain);