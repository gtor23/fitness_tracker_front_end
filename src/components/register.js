import React, { useState } from 'react';



const Register = (props) => {
    const {loggedIn, setIsLoggedIn} = props;
    const [user, setUser] = useState('')
    
    const handleRegister = async (event) => {
        event.preventDefault();
      const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/register', {
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


        if (result.token){
                alert('Thank you for signing up!');
                setIsLoggedIn(result.token)
            }else{
                alert(result.message)
            }
    }


    return(
        <form className = 'formreg' onSubmit = {handleRegister} >

            <label className = 'd2'> Register: </label>
            <div className = 'registration'>
                <input type ='text' className = 'credential1' 
                placeholder = 'username' onChange = {(event) => setUser({...user, username:event.target.value})} />

                <input type ='password' className = 'credential2' 
                placeholder = 'password'  onChange = {(event) => setUser({...user, password:event.target.value})}/>
                
                <button className = 'b1' type ='submit'> Create </button>
            </div>
        </form>
    )

    }
export default Register