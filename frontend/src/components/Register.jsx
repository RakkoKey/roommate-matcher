
import {useState, useEffect} from 'react'
function Register(){

    const [newUser, setUser] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    })

    function changeUser(e){
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })) 
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
            <button type="submit" id="createAccountButton" className="button">
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