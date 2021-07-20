import React, {useState, useEffect} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {userRoutines, updateRoutine, deleteRoutine, addActivityToRoutine, updateRoutineActivity, deleteRoutineActivity} from '../api'
const MyRoutines = (props) => {

    const [theUserRoutines, setTheUserRoutines] = useState([]);
    const [activityId, setActivityId] = useState();
    const [durationCount, setDurationCount] = useState();
    const [routineId, setRoutineId] = useState();

    const [rend, setRend] = useState(1)

    const {loggedIn, currentUser, activities, newRoutine} = props;

    const handleUpdate = async (name, goal, id) => {
        try{
            const routines = await updateRoutine(name, goal, id);
            setRend(rend + 1)
        } catch(error){
            console.error
        }
    }


    const handleDeleteRoutine = async (id) => {
        try{
            const routines = await deleteRoutine(id);
            setRend(rend + 1)
        }catch (error){
            console.error(error)
        }
    }

    const handleActivityAdd = async (event) =>{

    if (durationCount == undefined ){
        return alert('Count and Duration required')
    }

        const {duration, count} = durationCount;
   

        try{

            const response = await addActivityToRoutine(routineId, activityId, count, duration);

 
            if(!response.id){
                return alert('Error')
            }

            setRend(rend + 1)
            setRoutineId(null);
            setDurationCount(null);
            setActivityId(null)

        } catch(error){
            console.error(error)
        }
    }

    const handleActivityUpdate = async (routineId, count, duration) => {
        try{
            const routines = await updateRoutineActivity(routineId, count, duration);
            setRend(rend + 1)
  
        }catch (error){
            console.error(error);
        }
    }

    const handleActivityDelete = async (id) => {
        try{
            const activity = await deleteRoutineActivity(id);
            setRend(rend + 1)
 
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

            setTheUserRoutines(routines);

        }catch (error) {
            console.error(error);
        }
    }
    


    useEffect(() => {
        getUserRoutines()

    }, [currentUser, rend, newRoutine])
    


    if(!loggedIn){
        alert('Log in to view My Routines')
        return <Redirect to ='/' />;
    }else{

    return(
        <>

        <h1 className = 'myroutinestitle'>My Routines</h1>

        <div className = 'myroutines'>
        {theUserRoutines ? (
            theUserRoutines.map((routine, index) => {
                return (
                    <div className = 'myroutinecell' key = {index}>
                        <h2 className = 't1'>{routine.name}</h2>
                        <h3 className = 't2'>{routine.goal}</h3>

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

                                <button className = 'edit' type = 'button' onClick = {() =>handleActivityUpdate(activity.routineActivityId, activity.duration, activity.count)}>
                                    Update Duration or Count
                                </button>

                                <button className = 'delete' type = 'button' onClick = {() => handleActivityDelete(activity.routineActivityId)}>
                                    Delete Routine Activity
                                </button>

                            </ul>
                        )
                    })
                ) : <h3 className = 't2 none'>No activities for this routine</h3>}


                <form className = 'foradd' >
                    
                    <label className = 't3' >Add Routine Activity:</label>
                    <select name ='Activities' id = 'selectactivity' 
                    onChange = {(event) => {setRoutineId(routine.id); setActivityId(event.target.value); return}}>
                    
                        
                        <option className = 'dropdown'  value ='null'>Select Activity</option>
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


                    
                        <div className = 'forcount'>
                            <label className = 't4'>Count:</label>
                            <input className = 'counter' type = 'number' min = '1' placeholder ='Count' 
                            onChange = {(event) => setDurationCount({...durationCount, count: event.target.value})}
                            />
                        </div>

                        <div className = 'forduration'>
                            <label className = 't4'>Duration:</label>
                            <input className = 'duration' type = 'number' min = '1' placeholder = 'Duration'
                            onChange = {(event) => setDurationCount({...durationCount, duration: event.target.value})}
                            />
                        </div>
                    
                        <button className = 'addroutine' type = 'button' onClick = {(event) => handleActivityAdd(event)}>Submit</button>
                  
                </form>
                </div>
                
                )
            })
        ): <h2 className = 'none'>No routines made by you</h2>}

        </div>

        </>
    )
}
}
export default MyRoutines;