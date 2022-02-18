import React from "react";

function MaleSizes(props){
    
    return(
        <div>
            <h1>Male Sizes</h1>
            {Object.keys(props.inventory.shirts).map(items => {
                let item = props.inventory.shirts[items];
                return <div>
                        <h1>{item.size}</h1>
                        <button onClick={() => props.addToOrder(item)}>Add to Order</button>
                    </div>
            })}
        </div>
    )
}

export default MaleSizes;