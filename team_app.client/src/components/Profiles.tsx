import '../styles/profiles.css';
import { FaRocket, FaDatabase, FaWrench } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { BsTrash3Fill } from "react-icons/bs";

import Data from '../JSON/Team.json';
import axios from 'axios';
import uuid from 'react-uuid';

import { useEffect, useState } from 'react';

import Profile from './Profile.tsx'; 

const Profiles = () => {

    const [Team, setTeam] = useState(Array<object>);
    const baseURL = "http://localhost:5074";

    const [id, setId] = useState(Math.random());
    const [url, setURL] = useState("https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
    const [nameInp, setName] = useState("");
    const [roleInp, setRole] = useState("");
    const [bioInp, setBio] = useState("");
    const [salary, setSalary] = useState(1);

    const [custom, setCustom] = useState(false);
    const [customList, setCustomList] = useState(Array<object>);

    useEffect(() => {
        if (Team.length <= 0) { GetData(); }
    }, []);

    const GetData = async () => {
        await axios.get(baseURL + '/api/testdata/get')
        .then((response) => {   
            if (response.data.constructor === Object) { setEntries(Data); }
            else { setTeam(response.data); }
        });   
    }

    const setEntries = async (entries: Array<object>) => {
        ClearTable();
        await axios.post(baseURL + '/api/testdata/insertentries', entries);
        GetData();
    }

    const ClearTable = async () => {
        await axios.post(baseURL + '/api/testdata/clear');
        setTeam([]);
        setCustomList([]);
    }

    const handleChange = (e) => {
        if (e.target.className === 'name-input') { setName(e.target.value); }
        if (e.target.className === 'role-input') { setRole(e.target.value); }
        if (e.target.className === 'bio-input') { setBio(e.target.value); }
    }

    const handleAddEntry = async (e) => {
        e.preventDefault();

        const entry = {
            Id: Math.floor(Math.random() * (100 - 10 + 1) + 10),
            ProfileUrl: url,
            Name: nameInp,
            Role: roleInp,
            Bio: bioInp,
            Salary: salary
        }

        if (nameInp.length && roleInp.length && bioInp && !custom) {
            setTeam([entry, ...Team]);
            await axios.post(baseURL + '/api/testdata/insertentry', entry);
            setName(""); setRole(""); setBio("");
        }
        else if (nameInp.length && roleInp.length && bioInp && custom) {
            setTeam([entry, ...customList]);
            setCustomList([entry, ...customList]);
            setName(""); setRole(""); setBio("");
        }
        else { return; }
    }

    const handleDelete = async (id: number) => {

        const data = {
            Id: id
        }
        

        await axios.post(baseURL + '/api/testdata/deleteentry', data);
        setTeam(Team.filter(person => person.Id !== id));
    }

    const handleCustom = async(e) => {
        e.preventDefault();

        if (customList.length > 0) {
            setCustom(false);
            ClearTable();
            setEntries(customList);
            setTeam(customList);
            setCustomList([]);
        }
        else { return; }
    }

    return (
        <section className="profiles-section grid">

            <div className="profiles-actions grid">
                <button className="profiles-action load flex" onClick={() => { GetData(); setCustom(false); }}>
                    <span>Get Existing Data</span>
                    <div className="icon-wrapper">  <FaDatabase className="icon" /> </div>
                </button>
                <button className="profiles-action default flex" onClick={() => { setEntries(Data); setCustom(false) }}>
                    <span>Reset to Default</span>
                    <div className="icon-wrapper">  <GrPowerReset className="icon" /> </div>
                </button>

                <button className="profiles-action custom flex" onClick={() => { setCustom(true); setTeam([]); }}>
                    <span>Custom New List</span>
                    <div className="icon-wrapper">  <FaWrench className="icon" /> </div>
                </button>

                <button className="profiles-action clear flex" onClick={() => { ClearTable(); setCustom(false) }}>
                    <span>Clear Table</span>
                    <div className="icon-wrapper">  <BsTrash3Fill className="icon" /> </div>
                </button>
            </div>

            <h1 className="profiles-label flex">
                <div><span>Team </span>Members</div>
                <div className="icon-wrapper"> <FaRocket className="icon" /> </div>
            </h1>

            {(Team.length > 0 || custom === true) &&
                <div className="profile-create flex">
                    <input
                        className="name-input"
                        value={nameInp}
                        placeholder="Enter Fullname"
                        onChange={(e) => { handleChange(e) }}
                    />
                    <input
                        className="role-input"
                        value={roleInp}
                        placeholder="Enter Role"
                        onChange={(e) => { handleChange(e) }}
                    />
                    <input
                        className="bio-input"
                        value={bioInp}
                        placeholder="Enter Bio"
                        onChange={(e) => { handleChange(e) }}
                    />

                    <button onClick={(e) => { handleAddEntry(e) }}>Add Entry</button>
                </div>
            }

            {Team.length > 0 ?
                Team.map(person =>
                    <div className="profile flex">
                        <img className="profile-img" src={person.ProfileUrl} alt="" />
                        <h1 className="profile-name">{person.Name} </h1>
                        <h2 className="profile-role">{person.Role}</h2>
                        <p className="profile-bio">{person.Bio}</p>
                        <button onClick={() => { handleDelete(person.Id); }}>Delete</button>
                    </div>
                )
                :
                <h1 className="profiles-empty">No member containers exist. Please fill in entries of your team.</h1>
            }

            {(customList.length > 0 || custom === true) &&
                <div className="list-actions flex">
                    <button className="cancel-list" onClick={() => { setCustomList([]); setCustom(false); }}>
                        Cancel
                    </button>
                    <button className="submit-list" onClick={(e) => { handleCustom(e); }}>
                        Submit Your List
                    </button>
                </div>
            }
        </section>
    )
}

export default Profiles;