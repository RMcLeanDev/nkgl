import React, {useState} from "react";
import ViewSizes from './ViewSizes';

function ViewUniformItems(props){

    const [uniform, setUniform] = useState(null);
    let viewSizes;

    if(uniform){
        viewSizes = <ViewSizes item={uniform} close={setUniform}/>
        document.getElementsByTagName("body")[0].style = "position: fixed; width: 100vw;";
    } else {
        viewSizes = null;
        document.getElementsByTagName("body")[0].style = "position: none";
    }

    return(
        <div>
            {viewSizes}
            <div className="uniformItemsContainer">
                {Object.keys(props.inventory).map(descriptions => {
                    let description = props.inventory[descriptions]
                    return <div className="uniformItems" key={description.description} onClick={() => setUniform(description)}>
                            <img className="itemImage" src={require('../../assets/images/tshirt.png')}/>
                            <h1>{description.description}</h1>
                        </div>
                })}
            </div>
        </div>
    )
}

export default ViewUniformItems;