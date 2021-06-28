import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link, Switch} from 'react-router-dom'

import {Home, Login, Register, Logout, MyRoutines,Activities, Rotuines, MakeRoutines} from './components'
import {getToken, clearToken} from './auth'

import {meUserData, allActivities} from './api'

// import {HashRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'

const App = () =>{
    
    const [loggedIn, setIsLoggedIn] = useState(getToken());
    const [currentUser, setCurrentUser] = useState('');
    // console.log('-----',loggedIn)
    console.log('---CU-----' ,currentUser);
    // const [authorized, setAuthorized] = useState(false);
    // console.log('zap', authorized)

    // const data = await meUserData();
    // console.log('zappy', data)

    //had to use an empty array, but why if an array is returned from allActivities?
    const [activities, setActivities] = useState([]);

    useEffect( async() => {
        if (loggedIn){
            try{
                const data = await meUserData();
                // console.log('zappy', data)
                setCurrentUser(data.username)

            } catch (error){
                console.error(error)
            }
        }
    }, [loggedIn])

    useEffect ( async () => {
                        
        const getActivities = await allActivities();
        // console.log('rap', getActivities)
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

        {/* <h1> Fitness Tracker</h1> */}
        
        
        {/* {loggedIn ? <button onClick = {() => {
            clearToken();
            setIsLoggedIn('');
            setCurrentUser('');
            alert('You have been logged out!')
            location.assign('/')
        }}> Log-out</button> : null} */}
       
       
            <main>
                
                <Switch>

                    <Route exact path = '/'> 
                    < Home /> 
                    
                    
                    </Route>

                    {/* <Route path = '/login'>  */}
                        {/* <Login loggedIn = {loggedIn} setIsLoggedIn = {setIsLoggedIn} setCurrentUser = {setCurrentUser}/>  */}
                    {/* </Route> */}

                    {/* <Route path = '/register'> */}
                        {/* <Register loggedIn = {loggedIn} setIsLoggedIn = {setIsLoggedIn} /> */}
                    {/* </Route> */}

                    <Route path = '/routines'>
                        <Rotuines />
                    </Route>


                    <Route path = '/myroutines'>
                        <MakeRoutines />
                        <MyRoutines loggedIn = {loggedIn} currentUser = {currentUser} activities = {activities}/>
                    </Route>
                    
                    <Route path = '/activities'>
                        <Activities loggedIn = {loggedIn} activities = {activities} setActivities = {setActivities}/>
                    </Route>

                    {/* <Route path = '/createroutine'> */}
                        {/* <MakeRoutines /> */}
                    {/* <Route path = '/createroutine'> */}

                </Switch>
            </main>  
        </Router>
        </>
    )

}

export default App