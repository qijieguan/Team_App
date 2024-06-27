import '../styles/profile.css';

import { useEffect } from 'react';

const Profile = ({ person, handleDelete }) => {

    useEffect(() => {

    }, [person]);

    return (
        <div className="profile flex">
            <img className="profile-img" src={person.ProfileUrl} alt="" />
            <h1 className="profile-name">{person.Name} </h1>
            <h2 className="profile-role">{person.Role}</h2>
            <p className="profile-bio">{person.Bio}</p>
            <button onClick={() => { return handleDelete(person.Id); }}>Delete</button>
        </div>
    )
}

export default Profile;