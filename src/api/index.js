import { getToken} from "../auth";
const aToken = getToken();
const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api/' ;

export const meUserData = async () => {

    try{
        const response = await fetch(`${BASE_URL}users/me`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${aToken}`
              }
        });

        const meData = await response.json();
        return meData

    }catch (error){
        console.error(error);
    }

}

export const userRoutines = async (username) => {
    try{
        const response = await fetch (`${BASE_URL}users/${username}/routines`, {
            headers: {
                'Content-Type': 'application/json',
              }
        });

        const userData = await response.json();

        return userData
        
    }catch (error){
        console.error(error)
    }
}

export const allActivities = async () => {

    try{

        const response = fetch(`${BASE_URL}activities`, {
            headers: {
              'Content-Type': 'application/json',
            }
          });

          const activitiesData = await (await response).json();
          return activitiesData

    }catch (error){
        console.error(error)
    }


}

export const createActivity = async (activity) => {
    try{
        const response = await fetch(`${BASE_URL}activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${aToken}`
            },
            body: JSON.stringify(activity) 
            
        });
        const activityData = await response.json();

        return activityData

    }catch (error){
        console.error(error)
    }
}

export const allRoutines = async () => {
    try{

        const response = await fetch(`${BASE_URL}routines`, {
            headers: {
                "Content-Type": "application/json",
              }
        });

        const allRotuinesData = await response.json();

        return allRotuinesData

    }catch (error){
        console.error(error);
    }
}

export const createRoutines = async (routine) => {
    try{

        const response = await fetch(`${BASE_URL}routines`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${aToken}`,
            },
            body: JSON.stringify(routine),
          });
          const createRoutinesData = await response.json();
      
          return createRoutinesData;

    }catch (error){
        console.error(error)
    }
}



export const updateRoutine = async (name, goal, routineId) => {
    let fields = {}

    let editName = prompt('Name:', name);
    
    let editGoal = prompt('Goal:', goal);

    if (editName){
        fields.name = editName;
    }
    if (editGoal){
        fields.goal = editGoal;
    }

    try{
        const response = await fetch(`${BASE_URL}routines/${routineId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${aToken}`,
            },
            body: JSON.stringify(fields),
        });
    }catch(error){
        console.error(error)
        alert(error)
    }
}

export const deleteRoutine = async (id) => {
    try {
        const response = await fetch (`${BASE_URL}routines/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${aToken}`,
            },
        });

    } catch(error){
        console.error(error);
        alert(error);
    }
}

export const addActivityToRoutine = async ( routineId, activityIdR, countR, durationR) =>{
    
    try{

        const response = await fetch (`${BASE_URL}routines/${routineId}/activities`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                activityId: activityIdR,
                count: countR,
                duration: durationR,
              })
        });

        const data = await response.json();
        return data;
    }catch(error){
        console.error(error);
    }

}


export const updateRoutineActivity = async (id, count, duration) => {
    let fields = {};
    let newCount = prompt('Count', count);
    let newDuration = prompt('Duration', duration);
   
    if (newCount){
        fields.count = newCount;
    }
    if (newDuration){
        fields.duration = newDuration;
    }

    try{

        const response = await fetch(`${BASE_URL}/routine_activities/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${aToken}`,
            },
            body: JSON.stringify(fields),
        });

        const data = await response.json();
        return data
    } catch (error){
        console.error(error);
        alert(error);
    }
}

export const deleteRoutineActivity = async (id) => {

    try {
        const response = await fetch(`${BASE_URL}/routine_activities/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${aToken}`,
          },
        });
        const data = await response.json();
        return data;
      } catch (error) {
        alert(error);
      }

}