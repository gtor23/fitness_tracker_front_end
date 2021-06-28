import React, {useState, useEffect} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {userRoutines, updateRoutine, deleteRoutine, addActivityToRoutine, updateRoutineActivity, deleteRoutineActivity} from '../api'
import EditRoutine from './editroutine'
const MyRoutines = (props) => {

    const [theUserRoutines, setTheUserRoutines] = useState([]);
    const [activityId, setActivityId] = useState();
    const [durationCount, setDurationCount] = useState();
    const [routineId, setRoutineId] = useState();

    // const [showEdit, setShowEdit] = useState(false);
    // const [hack, setHack] = useState(1)

    const {loggedIn, currentUser, activities} = props;

    // console.log('trap',theUserRoutines)

    console.log('dddd', activityId)

    // const makeEdit = async () => {
    //     setShowEdit(true)
    // }

    const handleUpdate = async (name, goal, id) => {
        try{
            const routines = await updateRoutine(name, goal, id);
            window.location.reload()
        } catch(error){
            console.error
        }
    }


    const handleDeleteRoutine = async (id) => {
        try{
            const routines = await deleteRoutine(id);
            window.location.reload()
        }catch (error){
            console.error(error)
        }
    }

    const handleActivityAdd = async (event) =>{
        event.preventDefault();

        const {duration, count} = durationCount;

        try{

            const response = await addActivityToRoutine(routineId, activityId, count, duration);

            if(!response.id){
                return alert('Error')
            }

            setRoutineId(null);
            setDurationCount(null);
            setActivityId(null)

            window.location.reload()

        } catch(error){
            console.error(error)
        }
    }

    const handleActivityUpdate = async (routineId, count, duration) => {
        try{
            const routines = await updateRoutineActivity(routineId, count, duration);
            window.location.reload()
        }catch (error){
            console.error(error);
        }
    }

    const handleActivityDelete = async (id) => {
        try{
            const activity = await deleteRoutineActivity(id);
            window.location.reload()
        } catch (error){
            console.error(error);
        }
    }

    const getUserRoutines = async () => {
        if(!currentUser || !activities){
            return;
        }
        try{
            const routines = await userRoutines(currentUser);
            // console.log('hhhh', routines)
            setTheUserRoutines(routines);
            // console.log('pop',theUserRoutines)
        }catch (error) {
            console.error(error);
        }
    }
    
    useEffect(getUserRoutines, [currentUser, activities])
    


    if(!loggedIn){
        alert('Log in to view My Routines')
        return <Redirect to ='/' />;
    }else{

    return(
        <>
        {/* <div> */}
        <h1 className = 'myroutinestitle'>My Routines</h1>
        {/* </div> */}


        {/* {showEdit ? <EditRoutine showEdit = {showEdit} setShowEdit = {setShowEdit}/> : null} */}

        <div className = 'myroutines'>
        {theUserRoutines ? (
            theUserRoutines.map((routine, index) => {
                return (
                    <div className = 'myroutinecell' key = {index}>
                        <h2>{routine.name}</h2>
                        <h3>{routine.goal}</h3>
                    
                
                {/* <button type = 'button' className = 'edit' onClick = {() => makeEdit()}> */}
                <button type = 'button' className = 'edit' onClick = {() => handleUpdate(routine.name, routine.goal, routine.id)}>
                    Edit Routine Name or Goal
                </button>

                <button type ='button' className = 'delete' 
                onClick = {() => handleDeleteRoutine(routine.id)}
                >
                    Delete Routine
                </button>


                {routine.activities[0] ? (
                    routine.activities.map((activity, index) => {
                        return(
                            <ul className = 'details' key={index}>
                                <li> <span>Activity: {activity.name}</span> </li>
                                <li><span>ID: {activity.routineActivityId }</span></li>
                                <li><span>Description: {activity.description} </span></li>
                                <li><span> Duration: {activity.duration}</span> </li>
                                <li><span>Count: {activity.count} </span></li>

                                <button type = 'button' 
                                onClick = {() =>handleActivityUpdate(activity.routineActivityId, activity.duration, activity.count)}>
                                    Update Duration or Count
                                </button>

                                <button type = 'button'
                                onClick = {() => handleActivityDelete(activity.routineActivityId)}>
                                    Delete Routine Activity
                                </button>

                            </ul>
                        )
                    })
                ) : <h3>No activities for this routine</h3>}
                

                
                <form onSubmit = {handleActivityAdd}>
                    <label>Add Routine Activity:</label>
                    <select name ='Activities' id = 'selectactivity' 
                    value = {activityId} 
                    onChange = {(event) => {setRoutineId(routine.id); setActivityId(event.target.value); return}}>
                        
                        <option className = 'dropdown' value ='null'>Select Activity</option>
                        {
                            activities.map((activity, index) => {
                                return (
                                    <option key = {index} value = {activity.id}>
                                        {activity.name}
                                    </option>
                                )
                            })
                        }

                    </select>

                    <label>Count:</label>
                    <input type = 'number' min = '1' placeholder ='Count' 
                    onChange = {(event) => setDurationCount({...durationCount, count: event.target.value})}
                    />
                    


                    <label>Duration:</label>
                    <input type = 'number' min = '1' placeholder = 'Duration'
                    onChange = {(event) => setDurationCount({...durationCount, duration: event.target.value})}
                    />
                    
                    <button className = 'addroutine' type = 'submit'>Submit</button>
                </form>

                </div>
                
                )
            })
        ): <h2>No routines made by you</h2>}

        </div>

        </>
    )
}
}
export default MyRoutines;