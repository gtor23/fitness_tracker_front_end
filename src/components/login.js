import React, {useState} from 'react'
import {storeToken} from '../auth'


const Login = (props) => {

    const [user, setUser] = useState('');
    const {setCurrentUser, loggedIn, setIsLoggedIn} = props;


    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        })

        const result = await response.json();
 
        if (result.user){
            alert(result.message);
            setIsLoggedIn(result.token);
            storeToken(result.token);
            window.location.reload()
        }else{
            alert(result.message)
        }
    }
    

    return (
        <form className = 'formlog' onSubmit = {handleLogin}>


            <label className = 'd1'> Log-In: </label>
            <div className = 'logger'>
                <input type ='text' className = 'credential1' 
                placeholder = 'username' onChange = {(event) => setUser({...user, username:event.target.value})} />

                <input type ='password' className = 'credential2' 
                placeholder = 'password' onChange = {(event) =>  {setUser({...user, password:event.target.value}); setCurrentUser(user.username) } } />
                
                <button className = 'b1' type ='submit'> Sign-in </button>
            </div>
        </form>
    )
}

export default Login;