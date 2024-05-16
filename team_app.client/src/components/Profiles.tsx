import '../styles/profiles.css';
import { FaRocket } from "react-icons/fa6";
import Data from '../JSON/Team.json';
import uuid from 'react-uuid';

import { useEffect } from 'react';

const Profiles = () => {

    const Team: Array<object> = Data.Team;

    useEffect(() => {
        //console.log(Team);
    })

    return (
        <section className="profiles-section grid">
            <h1 className="profiles-label flex">
                <div><span>Team </span>Members</div>
                <div className="icon-wrapper">
                    <FaRocket className="icon" />
                </div>
            </h1>
            {Team.length > 0 &&
                Team.map(profile => 
                    <div className="profile flex" key={ uuid() }>
                        <img src={profile.profile_url} className="profile-img" alt="" />
                        <h1 className="profile-name">{profile.name} </h1>
                        <h2 className="profile-role">{profile.role}</h2>
                        <p className="profile-bio">{profile.bio}</p>
                    </div>
                )
            }
        </section>
    )
}

export default Profiles;