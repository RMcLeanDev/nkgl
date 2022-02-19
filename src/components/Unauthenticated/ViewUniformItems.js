import React from "react";

function ViewUniformItems(props){

    console.log(props)
    
    return(
        <div>
            <div className="uniformItemsContainer">
                {Object.keys(props.inventory).map(items => {
                    let item = props.inventory[items]
                    console.log(item)
                })}
            </div>
        </div>
    )
}

export default ViewUniformItems;