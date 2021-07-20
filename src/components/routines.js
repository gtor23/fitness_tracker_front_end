import React, {useState, useEffect} from 'react'
import {allRoutines} from '../api'

const Routines = () => {

    const [gotRoutines, setGotRoutines] = useState([]);
      
    const getAllRoutines = async () => {
        try{

            const routines = await allRoutines();
            setGotRoutines(routines);


        }catch (error){
            console.error(error)
        }
    }

    useEffect( getAllRoutines, [])

    return(
        <>
        
        <h1 className = 'routinestitle'> Routines </h1>
        <div className = 'routines'>
        {gotRoutines.map(routine => {
            return(
                <div className = 'routinecell' key = {routine.id}>
                    <h2 className = 'a1'> Routine: {routine.name} </h2>
                    <h3 className = 'a2'> Goal: {routine.goal} </h3>
                    <h4 className = 'a3'>Creator: {routine.creatorName} </h4>

                <div className = 'activityinfo'>
                    {routine.activities[0] ? 
                    
                    routine.activities.map((anActivity, index) => {

                        return(
                            
                            <h5  key = {index}> 
                                <ul className = 'creatorsactivities'>
                                    <li><span>Activity: {anActivity.name}</span></li>
                                    <li><span>Description: {anActivity.description}</span></li>
                                    <li><span>Duration: {anActivity.duration}</span></li>
                                    <li><span>Count: {anActivity.count}</span></li>
                                </ul>

                            </h5>
                           
                        )
                    }) : <p className = 'none'>No activities for this routine</p>
                    
                         
                    }
                </div>

                </div>
            )
        })};
        
        </div>
        </>
    )
}

export default Routines