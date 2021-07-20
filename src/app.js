import React, {useState, useEffect} from 'react'
import { HashRouter as Router, Route, Link, Switch} from 'react-router-dom'

import {Home, Login, Register, MyRoutines,Activities, Rotuines, MakeRoutines} from './components'
import {getToken, clearToken} from './auth'

import {meUserData, allActivities} from './api'


const App = () =>{
    
    const [loggedIn, setIsLoggedIn] = useState(getToken());
    const [currentUser, setCurrentUser] = useState('');

    const [activities, setActivities] = useState([]);
    const [newRoutine, setNewRoutine] = useState();

    useEffect( async() => {
        if (loggedIn){
            try{
                const data = await meUserData();

                setCurrentUser(data.username)

            } catch (error){
                console.error(error)
            }
        }
    }, [loggedIn])

    useEffect ( async () => {
                        
        const getActivities = await allActivities();

        setActivities(getActivities);

    }, [])


    return (
        
        <>
        <Router>

        <nav className = 'navi'>
            <div className = 'essentials'>
                <Link className = 'links' to = '/'>Home</Link>
                <Link className = 'links' to = '/routines'>Routines</Link>
                <Link className = 'links' to = '/myroutines'>My Routines</Link>
                <Link className = 'links' to = '/activities'>Activities</Link>
            </div>
            <div className = 'logreg'>
                { !loggedIn ? (<Register loggedIn = {loggedIn} setIsLoggedIn = {setIsLoggedIn} />) : null}
                { !loggedIn ? (<Login loggedIn = {loggedIn} setIsLoggedIn = {setIsLoggedIn} setCurrentUser = {setCurrentUser}/> ): null}
                
                {loggedIn ? <button className = 'off' onClick = {() => {
                    clearToken();
                    setIsLoggedIn('');
                    setCurrentUser('');
                    alert('You have been logged out!')
                    location.assign('/')
                }}> Log-out</button> : null}
            </div>

        </nav>
         
            <main>
                
                <Switch>

                    <Route exact path = '/'> 
                    < Home /> 
                    
                    
                    </Route>

                    <Route path = '/routines'>
                        <Rotuines />
                    </Route>


                    <Route path = '/myroutines'>
                        <MakeRoutines newRoutine = {newRoutine} setNewRoutine = {setNewRoutine}/>
                        <MyRoutines loggedIn = {loggedIn} currentUser = {currentUser} activities = {activities} newRoutine = {newRoutine} setNewRoutine = {setNewRoutine}/>
                    </Route>
                    
                    <Route path = '/activities'>
                        <Activities loggedIn = {loggedIn} activities = {activities} setActivities = {setActivities}/>
                    </Route>

                </Switch>
            </main>  
        </Router>
        </>
    )

}

export default App