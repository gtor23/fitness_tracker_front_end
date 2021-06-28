import {useState} from 'react'
import {allActivities, createActivity} from '../api'

const Activities = (props) => {
    const {loggedIn, activities, setActivities } = props;
    const [addActivity, setAddActivity] = useState();

    // console.log('bur', addActivity)
    // console.log('gggg', activities)

    const handleCreateActivity = async (event) =>{
        try{
            event.preventDefault()
            const creation = await createActivity(addActivity);

            if (creation.id){
                // alert('Activity created')
                setActivities(await allActivities())
                window.location.reload()
            }else{
                alert(creation.message)
            }

        }catch (error) {
            console.error(error)
        }
    }





    return (
        <> 
        <h1 className = 'activitiestitle'>Activities</h1>
        {/* form */}

        
        <div className = 'activities'>
        <div className = 'creationactivity'>
        {loggedIn ?

            <form className = 'activityform' onSubmit = {handleCreateActivity}>
                <h2>Create Activity</h2>
                <div className = 's1'>
                <label>Activity:</label>
                <input ctype = 'text' className = 'activityname' 
                onChange = { (event) => {  setAddActivity({...addActivity, name: event.target.value})  }  }/>
                </div>
                
                <div className = 's2'>
                <label>Description:</label>
                <input type = 'text' className = 'activitydescription' 
                onChange = { (event) => {  setAddActivity({...addActivity, description: event.target.value})  }  }/>
                </div>

                <button className = 'activitybutton' type = 'submit' > Submit </button>

            </form>
            : null}
        </div>


        

        {activities.map(activity => {
            return (
                <div className ='activitycell' key = {activity.id}> 
                
                <h2 className = 'z1'> Activty: {activity.name} </h2>
                <h3 className = 'z2'>Description:  {activity.description} </h3>

                </div>
            )
        })}
    
    </div>

        </>
    )
}

export default Activities