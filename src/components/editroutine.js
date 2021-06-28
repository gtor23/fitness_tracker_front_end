import React, {useEffect, useState} from 'react'

const EditRoutine = (props) => {

       const {showEdit, setShowEdit} = props;


    return (
        <>

        {showEdit ?

        <form>
        
        <h3> Edit Routine</h3>

        <label className = 'newname'> Name: </label>
        <input className= 'newnamefield' type = 'text' /> 
        
        <label className = 'nedescription'> Description: </label>
        <input className= 'newdescriptionfield' type = 'text' /> 

        
        <button type = 'submit' className = 'editsubmit'>Submit</button>
        
        <button type = 'submit' className = 'cancel' onClick = {() => setShowEdit(false)}>
            Close
        </button>

        </form>

        : null}
        </>
    )
}

export default EditRoutine