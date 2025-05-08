
import {useState, useEffect} from 'react'
import LOCALHOST_PORT from '../../config'

function Login(){
    const [loginInfo, setLogin] = useState({
        username: "",
        password: "",
    })

    function changeLogin(e){
        setLogin((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })) 
    }

    async function doLogin(e){
        e.preventDefault();

        const js = JSON.stringify(loginInfo);
        
        try{
            const response = await fetch( LOCALHOST_PORT + '/api/login',
                {
                    method: 'POST', body: js, headers: {'Content-Type': 'application/json'}
            });
            
            const res = JSON.parse(await response.text());
            console.log(res);

            if(res.id <= 0){
                alert('User/Password combination incorrect');
            }
            else{
                const user = {firstName:res.firstName, lastName:res.lastName, id:res.id};
                localStorage.setItem('user_data', JSON.stringify(user));

                
                
            }
        }catch(error){
            alert(error.toString());
            return;
        }
        
    }

    // useEffect(() => {
    //     console.log(loginInfo);
    // }, [loginInfo])

    return(<>
    
        <h1>Ready to find your next roommate?</h1>
        <form className='loginForm'>
            <label for='username'>Username</label>
            <input name='username' placeholder='Enter Username' onChange={changeLogin}></input>

            <label for='password'>Password</label>
            <input name='password' placeholder='Enter Password' onChange={changeLogin}></input>

            <button type="submit" onClick={doLogin}  >Login</button>

        </form>
    </>)

}

export default Login;