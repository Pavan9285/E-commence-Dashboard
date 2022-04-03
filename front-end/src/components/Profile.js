import React, { useEffect, useState } from "react";

const Profile = () => {
    let [user, setUser] = useState();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
        console.log(user)
    }, [])

    const dStyle = {
        padding: "20px",
        textAlign: "center",
        margin: "30px",
        color: "blueviolet",
    }

    return (
        <div style={dStyle}>
            <p>Username: <b>{user?.username}</b></p>
            <p></p>
            <p>Email: <b>{user?.email}</b></p>
        </div>
    )
}

export default Profile;