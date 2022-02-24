import React, {useState} from "react";
import ViewSizes from './ViewSizes';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

function ViewUniformItems(props){

    const [uniform, setUniform] = useState(null);
    let viewSizes;

    if(uniform){
        viewSizes = <ViewSizes item={uniform} close={setUniform}/>
        disableBodyScroll(document)
    } else {
        viewSizes = null;
        enableBodyScroll(document)
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