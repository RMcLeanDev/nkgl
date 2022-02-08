import React from "react";

function MaleSizes(props){

    console.log(props.inventory.shirts)
    
    return(
        <div>
            <h1>Male Sizes</h1>
            {Object.keys(props.inventory.shirts).map(items => {
                let item = props.inventory.shirts[items];
                return <div>
                        <h1>{item.size}</h1>
                    </div>
            })}
        </div>
    )
}

export default MaleSizes;