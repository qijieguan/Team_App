import '../styles/task.css';

import { useEffect } from 'react';

const Task = ({ task }) => {

    useEffect(() => {

    }, [task])

    const CheckColor = (value) => {
        if (value <= 15) {
            return 'red'
        }
        if (value <= 25) {
            return 'orange'
        }
        if (value <= 50) {
            return 'blue'
        }
        if (value <= 75) {
            return 'green'
        }
        return 'red';
    }

    return (
        <div className="task flex">
            <h2 className="task-title">{task.Title}</h2>
            <span className="task-description">{task.Description}</span>
            <div className="task-progress flex">
                <div className="task-assign flex">
                    {task.Assign.length > 0 &&
                        task.Assign.map(person =>
                            <span className="task-person">{person}</span>
                        )
                    }
                </div>
              
                <span className="task-status flex" style={{ color: CheckColor(task.Status) }}>{task.Status}%</span>
            </div>
        </div>
    )
}

export default Task;