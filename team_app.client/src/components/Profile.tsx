import '../styles/profile.css';
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";

import { useState, useEffect } from 'react';

const Profile = ({ person, handleEdit, handleDelete }) => {

    const [name, setName] = useState(person.Name);
    const [role, setRole] = useState(person.Role);
    const [bio, setBio] = useState(person.Bio);
    const [lock, setLock] = useState(true);


    useEffect(() => {
        document.addEventListener('click', (e) => { outsideClick(e); }); 
    }, [person.Id]);

    const outsideClick = (e) => {
        const currProfile = document.getElementById(person.Id);

        if (!currProfile?.contains(e.target as Node)) {
            resetDefault();
            handleOffEdit();
            document.removeEventListener('click', (e) => { outsideClick(e); })
        }
    }

    const handleChange = (e) => {
        if (e.target.name === "name") { setName(e.target.value); }
        else if (e.target.name === "role") { setRole(e.target.value); }
        else { setBio(e.target.value); }
    }

    const handleOnEdit = () => {
        document.querySelector('.profile.editing')?.classList.remove('editing');
        setLock(false);
    }

    const handleOffEdit = () => {
        document.getElementById(person.id)?.classList.remove('editing');
        setLock(true);
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
        <div className={!lock ? "profile flex editing" : "profile flex"} id={person.Id}>

            <div className="profile-header flex">
                <div className="icon-wrapper flex">
                    <BsThreeDotsVertical className="icon" />
                </div>

                <div className="profile-buttons flex">
                    {!lock === false ?
                        <button className="profile-edit" onClick={() => { handleOnEdit() }}>Edit Mode</button>
                        :
                        <button className="profile-edit" onClick={() => { handleOffEdit(); handleSubmitEdit(); }}>Confirm Edits</button>
                    }
                    {!lock === false ?
                        <button className="profile-delete" onClick={() => { return handleDelete(person.Id); }}>Remove</button>
                        :
                        <button className="profile-cancel" onClick={() => { handleOffEdit(); resetDefault() }}>Go Back</button>
                    }
                </div>

                <img className="profile-img" src={person.ProfileUrl} alt="" />

            </div>
            <input className="profile-name" name="name" value={name} onChange={(e) => { handleChange(e) }} disabled={lock} />
            <input className="profile-role" name="role" value={role} onChange={(e) => { handleChange(e) }} disabled={lock} />
            <textarea className="profile-bio" name="bio" value={bio} onChange={(e) => { handleChange(e) }} disabled={lock}/>
           
        </div>
    )
}
export default Profile;