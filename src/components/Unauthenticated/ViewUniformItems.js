import React, {useState} from "react";
import ViewSizes from './ViewSizes';

function ViewUniformItems(props){

    const [uniform, setUniform] = useState(null);

    if(uniform){
        console.log(uniform)
    } else {
        console.log(uniform)
    }

    return(
        <div>
            <div className="uniformItemsContainer">
                {Object.keys(props.inventory).map(descriptions => {
                    let description = props.inventory[descriptions]
                    return <div className="uniformItems" key={description.description}>
                            <img className="itemImage" src={require('../../assets/images/tshirt.png')}/>
                            <h1>{description.description}</h1>
                        </div>
                })}
            </div>
        </div>
    )
}

export default ViewUniformItems;