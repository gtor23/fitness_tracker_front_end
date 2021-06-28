import React, {useState, useEffect} from 'react'

import {createRoutines, allRoutines} from '../api'

import {Redirect} from 'react-router-dom'


const MakeRoutines = () =>{

    const [newRoutine, setNewRoutine] = useState();
    const [finished, setFinished] = useState(false);

    const handleMake = (event) => {
        event.preventDefault();

        const [name, goal] = event.target;

        if(name.value && goal.value){
            const addRoutine = {
                name: name.value,
                goal: goal.value,
                isPublic: true
            };

            setNewRoutine(addRoutine);
        }else{
            alert('All fields must be filled in')
        }
    }

    useEffect(async () => {
        if (newRoutine){
            try{
                const response = await createRoutines(newRoutine);
                console.log('cap',response)
                setFinished(true)
            }catch (error){
                console.error(error)
            }finally{
                // <Redirect to = '/' />
                window.location.reload()
            }
        }
    }, [newRoutine])
    
    if (finished){
        // return <Redirect to ='/' />
        window.location.reload()
    }else{

        return (
            <>
            <div className = 'makeroutine'>
            <h1 className = 'createrotuinetitle'> Create Routine</h1>
            <form className = 'routineform' onSubmit = {handleMake}>
                <label>Name:</label>
                <input type ='text' />

                <label>Goal:</label>
                <input type ='text' />

                <button type ='submit'>Submit</button>
            </form>
            </div>
            </>
        )
    }

}

export default MakeRoutines