import '../styles/home.css';

import { useEffect } from 'react';

const Home = () => {

    useEffect(() => {  });

    return (
        <div className="home">
            <section className="intro-section home-section flex">
                <div className="intro-content flex">
                    <h1>Team solutions and productivity</h1>
                    <p>
                        Gain control on managing your team workflow and productivity.
                        Keep track of member profiles to grow your team.
                    </p>
                </div>

                <div className="intro-image"/>
            </section>

            <section className="team-section ">
                <div className="team-bg flex">
                    <h1>
                        Less Ambiquity in Team Collaboration
                    </h1>
                    <h1>
                        Outline daily tasks for Team members
                    </h1>
                    <h1>
                         Secure database to manage team records and budget
                    </h1>
                </div>
            </section>

            <section className="features-section home-section grid">
                <h1>
                    System Features
                </h1>
                <div className="feature-li">
                    <h1>Team Presentation</h1>
                    <p>
                        Showcase talents that are members of the team.
                        Create enticing profiles for your team members.
                    </p>
                </div>

                <div className="feature-li">
                    <h1>Edit Team Content</h1>
                    <p>
                        Take direct control on editing team profiles.
                        All data are backed up safely on a database.
                    </p>
                </div>

                <div className="feature-li">
                    <h1>Outline Workflow</h1>
                    <p>
                        Team members roles and tasks are delegated in a few clicks.
                        Admin can keep members up-to-date on changes to workflow.
                    </p>
                </div>

                <div className="feature-li">
                    <h1>Database and Backups</h1>
                    <p>
                        Keep track of team roles and workflow. A postgreSQL database is
                        used to preserve internal data of the team.
                    </p>
                </div>

                <div className="feature-li">
                    <h1>Future Backlogs</h1>
                    <p>
                        Incorporate a system for assigning tasks to each member. Potential to 
                        record attendance of each member for productivity.
                    </p>
                </div>
               
            </section>
        </div>
    )
}

export default Home;