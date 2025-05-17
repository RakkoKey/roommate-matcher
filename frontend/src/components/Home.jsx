import {useState, useEffect} from 'react'


function Home(){
    const user = JSON.parse(localStorage.getItem("user_data"))
    console.log(localStorage.getItem("user_data"))
    console.log(user.firstName)
    return(<>
        <h1>Hello {user.firstName} {user.lastName}</h1>
    
    </>)


}

export default Home;