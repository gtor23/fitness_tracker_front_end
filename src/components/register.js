import React, { useState } from 'react';



const Register = (props) => {
    const {loggedIn, setIsLoggedIn} = props;
    const [user, setUser] = useState('')
    // const [ password, setPassword] = useState('')

    // console.log('blah',user);


    
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
        // }).then(response => response.json())
        // .then(result => {
        //     console.log(result);

        //     if (result.token){
        //         alert('Thank you for signing up!');
        //         setIsLoggedIn(result.token)
        //         // setAuthorized(true)
        //     }else{
        //         alert(result.message)
        //     }
        // })
        // .catch(console.error);


        })

        const result = await response.json();
        // console.log(result)

        if (result.token){
                alert('Thank you for signing up!');
                setIsLoggedIn(result.token)
                // setAuthorized(true)
            }else{
                alert(result.message)
            }
    }


    return(
        <form className = 'formreg' onSubmit = {handleRegister} >

            {/* <h1> Register</h1> */}
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