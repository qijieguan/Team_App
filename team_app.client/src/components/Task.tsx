import '../styles/task.css';
import { FaMinusCircle } from "react-icons/fa";

import { useEffect, useState } from 'react';

import uuid from 'react-uuid';

const Task = ({ task, taskId }) => {

    const [title, setTitle] = useState(task.Title);
    const [description, setDescription] = useState(task.Description);
    const [assign, setAssign] = useState(task.Assign);
    const [status, setStatus] = useState(task.Status);
    const [lockKey, setLockKey] = useState(true);

    useEffect(() => {
        adjustInpWidth();
        checkColor(status);
     
        document.addEventListener('click', (e) => { outsideClick(e); });
    }, [taskId]);


    const adjustInpWidth = () => {
        const status = document.getElementById(taskId)?.getElementsByClassName('task-status')[0];
        if (status) { status.style.width = (status.value.length) + 'ch'; }
    }

    const checkColor = (value: number) => {
        const status_wrapper = document.getElementById(taskId)?.getElementsByClassName('task-status-wrapper')[0];
        const status = status_wrapper?.getElementsByClassName('task-status')[0];

        let color = 'rgb(180, 180, 180)'

        if (value <= 15) { color = 'red'; }
        else if (value <= 35) { color = 'blue'; }
        else if (value <= 65) { color = 'orange'; }
        else if (value <= 100) { color = 'green'; }

        if (status_wrapper) { status_wrapper.style.color = color; }
        if (status) { status.style.color = color; }
    }

    const outsideClick = (e) => {
        const currTask = document.getElementById(taskId);

        if (!currTask?.contains(e.target as HTMLElement)) {
            resetDefault();
            handleOffEdit();
            document.removeEventListener('click', (e) => { outsideClick(e); });
        }
    }

    const resetDefault = () => {
        setTitle(task.Title);
        setDescription(task.Description);
        setAssign(task.Assign);
        setStatus(task.Status);
    }

    const handleSubmitEdits = (e) => {
        e.preventDefault();

        const list: string[] = [];
        const group = document?.getElementById(taskId)?.querySelectorAll('.task-person');
        group?.forEach(person => { list.push(person.value); });

        setAssign(list);

        const edits = {
            Id: taskId,
            Title: title,
            Description: description,
            Assign: list,
            Status: Number(status)
        }
    }

    const handleOnEdit = () => {
        document.querySelector('.task.editing')?.classList.remove('editing');
        setLockKey(false);
    }

    const handleOffEdit = () => {
        document.getElementById(taskId)?.classList.remove('editing');
        setLockKey(true);
    }

    const handleChange = (e) => {
        if (e.target.name === "title") { setTitle(e.target.value); }
        else if (e.target.name === "description") { setDescription(e.target.value); }
        else {
            if (Number(e.target.value) >= 0 && Number(e.target.value) <= 100) {
                setStatus(e.target.value);
                adjustInpWidth();
                checkColor(Number(e.target.value));
            }
        }
    }

    const handleDelete = (index: number) => {
        setAssign(assign.filter((person, i) => index !== i));
    }

    return (
        <div className={!lockKey ? "task flex editing" : "task flex"} id={taskId}>
            <div className="task-header grid">
                <input className="task-title"
                    name="title"
                    onChange={(e) => { handleChange(e) }}
                    placeholder="Enter title"
                    value={title}
                    disabled={lockKey}
                />
                <button className="edit-btn" onClick={() => { handleOnEdit(); }}>Edit</button>
                
            </div>
            <textarea className="task-description"
                name="description"
                onChange={(e) => { handleChange(e) }}
                placeholder="Enter description"
                value={description}
                disabled={lockKey}
            />
            <div className="task-progress flex">
                <div className="task-assign flex">
                    {assign.length > 0 &&
                        assign.map((person, index) =>
                            <div className="task-person-wrapper flex" key={uuid()}>
                                <input className="task-person" 
                                    defaultValue={person}
                                    disabled={lockKey}
                                />
                                <div className="icon-wrapper" onClick={() => { handleDelete(index); }}><FaMinusCircle className="icon" /></div>
                            </div>
                        )
                    }
                </div>
              
                <div className="task-status-wrapper flex">
                    <input className="task-status"
                        style={{ boxSizing: 'content-box' }}
                        onChange={(e) => { handleChange(e); }}
                        value={status}
                        disabled={lockKey}
                    />
                    <span>%</span>
                </div>
            </div>
      
            <button className="submit-edit-btn" onClick={(e) => { handleSubmitEdits(e); handleOffEdit(); }}>Make Changes</button>
        </div>
    )
}

export default Task;