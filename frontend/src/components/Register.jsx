
import {useState, useEffect} from 'react'
import LOCALHOST_PORT from '../../config'
function Register(){

    const [newUser, setUser] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    })
    const [message, setMessage] = useState('');
    function changeUser(e){
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })) 
    }

    async function registerUser(e){
        e.preventDefault();
        try{
            const response = await fetch(LOCALHOST_PORT + '/api/registerUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            })

            const result = await response.json();
            if (response.ok) {
                setMessage('Account created successfully!');
                setTimeout(() => {
                    window.location.href = '/'; // Redirect to the login page or home
                }, 2000);
            } else {
                alert(`Error: ${result.error}`);
            }
        }catch(error){

        }

    }


    useEffect(() =>{
        console.log(newUser);
    },[newUser])
    return(<>
    
        <form>
            <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="textField"
                
                onChange={changeUser}
            />
            <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="textField"
                
                onChange={changeUser}
            />
            <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                className="textField"
                
                onChange={changeUser}
            />
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                className="textField"
                
                onChange={changeUser}
            />
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="textField"
                
                onChange={changeUser}
            />
            <button type="submit" id="createAccountButton"  onClick={registerUser} className="button">
                Create Account
            </button>
            {/* <button
                type="button"
                id="cancelButton"
                className="button"
                onClick={cancelCreation}
            >
                Cancel
            </button> */}
            

        </form>
    </>)
}


export default Register;