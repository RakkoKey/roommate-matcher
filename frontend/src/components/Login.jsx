import {useState} from 'react'

function Login(){


    return(<>
    
        <h1>Ready to find your next roommate?</h1>
        <form className='loginForm'>
            <label for='username'>Username</label>
            <input name='username' placeholder='Enter Username'></input>

            <label for='password'>Password</label>
            <input name='password' placeholder='Enter Password'></input>

        </form>
    </>)

}

export default Login;