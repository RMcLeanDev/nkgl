import React from 'react';

function EditEmployee(props){
    return(
        <div className="editFormContainer">
            <div className="editForm">
                <button className="closeBtn" onClick={() => props.closeEditForm()}>Close</button>
                <h3>I'm sorry but this feature is not yet avaliable. Please check back at a later time.</h3>
                <hr/>
                <h3>This feature is currently under construction and not ready for use.</h3>
            </div>
        </div>
    )
}

export default EditEmployee;