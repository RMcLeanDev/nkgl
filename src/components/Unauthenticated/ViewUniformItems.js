import React from "react";

function ViewUniformItems(props){

    console.log(props)

    return(
        <div>
            <div className="uniformItemsContainer">
                {Object.keys(props.inventory).map(descriptions => {
                    let description = props.inventory[descriptions]
                    console.log(description)
                    return <div className="uniformItems">
                            <h1>{description.description}</h1>
                        </div>
                })}
            </div>
        </div>
    )
}

export default ViewUniformItems;