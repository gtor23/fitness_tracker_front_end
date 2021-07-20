import React, {useState, useEffect} from 'react'

import {createRoutines, allRoutines} from '../api'


const MakeRoutines = (props) =>{

    const {newRoutine, setNewRoutine} = props

    const handleMake = async (event) => {
        event.preventDefault();

        const [name, goal] = event.target;

        if(name.value && goal.value){
            const addRoutine = {
                name: name.value,
                goal: goal.value,
                isPublic: true
            };

            try{
            const response = await createRoutines(addRoutine);
            setNewRoutine(response);
            // setNewRoutine([response, ...newRoutine]);

            } catch (error){
                console.error(error)
            }

        }else{
            alert('All fields must be filled in')
        }
    }

        return (
            <>
            <div className = 'makeroutine'>
            <h1 className = 'createrotuinetitle'> Create Routine</h1>
            <form className = 'routineform' onSubmit = {handleMake}>
                <div className = 'u1'>
                    <label className = 'r2'>Name:</label>
                    <input type ='text' />
                </div>

                <div className = 'u2'>
                    <label className = 'r2'>Goal:</label>
                    <input type ='text' />
                </div>

                <button className = 'createsub' type ='submit'>Submit</button>
            </form>
            </div>
            </>
        )

}

export default MakeRoutines