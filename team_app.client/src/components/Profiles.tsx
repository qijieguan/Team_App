import '../styles/profiles.css';
import { FaRocket } from "react-icons/fa6";
import Data from '../JSON/Team.json';
import axios from 'axios';
import uuid from 'react-uuid';

import { useEffect, useState } from 'react';

const Profiles = () => {

    const [Team, setTeam] = useState(Array<object>);
    const baseURL = "http://localhost:5074";

    useEffect(() => {
        
    }, []);

    const GetTestData = async () => {
        /*
        await axios.get(baseURL + '/api/testdata/get')
        .then((response) => {
             
            if (response.data.constructor === Object) { 
                LoadSampleData();
            }
            else {
                setTeam(response.data);
            }
        });
        */

        setTeam(Data);
    }

    const LoadSampleData = async () => {
        console.log("Called Load!");

        await axios.post(baseURL + '/api/testdata/insertmany', Data);

        await axios.get(baseURL + '/api/testdata/get')
        .then((response) => {
            setTeam(response.data);
        });
    }


    const ClearTable = async () => {
        console.log("Called Clear!")

        //await axios.post(baseURL + '/api/testdata/clear', Data);
        setTeam([]); 
    }

    return (
        <section className="profiles-section grid">

            <div className="profile-actions grid">
                {Team.length <= 0 && <button className="profiles-action load" onClick={() => { GetTestData(); }}>Load Sample Data</button>}
                <button className="profiles-action clear" onClick={() => { ClearTable(); }}>Clear Table</button>
            </div>

            <h1 className="profiles-label flex">
                <div><span>Team </span>Members</div>
                <div className="icon-wrapper">
                    <FaRocket className="icon" />
                </div>
            </h1>

            {Team.length > 0 ?
                Team.map(person =>
                    <div className="profile flex" key={uuid()}>
                        <img className="profile-img" src={person.ProfileUrl} alt=""/>
                        <h1 className="profile-name">{person.Name} </h1>
                        <h2 className="profile-role">{person.Role}</h2>
                        <p className="profile-bio">{person.Bio}</p>
                    </div>
                )
                :
                <h1 className="profiles-empty">No containers for member profiles for view. Please fill in member details of your team. </h1>
            }
        </section>
    )
}

export default Profiles;