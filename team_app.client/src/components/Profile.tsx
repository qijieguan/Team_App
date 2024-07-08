import '../styles/profile.css';

import { useState, useEffect } from 'react';

const Profile = ({ person, handleEdit, handleDelete }) => {

    const [name, setName] = useState(person.Name);
    const [role, setRole] = useState(person.Role);
    const [bio, setBio] = useState(person.Bio);

    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        document.addEventListener('click', (e) => { outsideClick(e); }); 
    }, [person.Id]);

    const outsideClick = (e) => {
        const currProfile = document.getElementById(person.Id);

        if (!currProfile?.contains(e.target as Node)) {
            resetDefault();
            setEditing(false);
            document.removeEventListener('click', (e) => { outsideClick(e); })
        }
    }

    const handleChange = (e) => {
        if (e.target.name === "name") { setName(e.target.value); }
        else if (e.target.name === "role") { setRole(e.target.value); }
        else { setBio(e.target.value); }
    }

    const handleOnEdit = (e) => {
        const profile = document.getElementById(person.Id);
        document.querySelector('.profile.editing')?.classList.remove('editing');
        
        setEditing(true);

        if (profile) {
            profile.getElementsByClassName('profile-name')[0].disabled = false;
            profile.getElementsByClassName('profile-role')[0].disabled = false;
            profile.getElementsByClassName('profile-bio')[0].disabled = false;
        }
    }

    const handleOffEdit = (e) => {

        const profile = document.getElementById(person.Id);

        setEditing(false);

        if (profile) {
            profile.getElementsByClassName('profile-name')[0].disabled = true;
            profile.getElementsByClassName('profile-role')[0].disabled = true;
            profile.getElementsByClassName('profile-bio')[0].disabled = true;
        }
    }

    const handleSubmitEdit = () => {
        const edits = {
            editId: person.Id,
            editName: name,
            editRole: role,
            editBio: bio
        }

        return handleEdit(edits)
    }

    const resetDefault = () => {
        setName(person.Name);
        setRole(person.Role);
        setBio(person.Bio);
    }

    return (
        <div className={isEditing ? "profile flex editing" : "profile flex"} id={person.Id}>
            <div className="profile-header flex">
                <img className="profile-img" src={person.ProfileUrl} alt="" />
                <input className="profile-name" name="name" value={name} onChange={(e) => { handleChange(e) }} disabled />
            </div>
    
            <input className="profile-role" name="role" value={role} onChange={(e) => { handleChange(e) }} disabled />
            <textarea className="profile-bio" name="bio" value={bio} onChange={(e) => { handleChange(e) }} disabled />
            <div className="profile-buttons flex">
                {isEditing === false ?
                    <button className="profile-edit" onClick={(e) => { handleOnEdit(e) }}>Edit</button>
                    :
                    <button className="profile-edit" onClick={(e) => { handleOffEdit(e); handleSubmitEdit(); }}>Done</button>
                }
                {isEditing === false ?
                    <button className="profile-delete" onClick={() => { return handleDelete(person.Id); }}>Delete</button>
                    :
                    <button className="profile-cancel" onClick={(e) => { handleOffEdit(e); resetDefault() }}>Cancel</button>
                }
            </div>
        </div>
    )
}

export default Profile;