import '../styles/home.css';

import axios from 'axios';

import { useEffect } from 'react';

const Home = () => {

    useEffect(() => { CallObserver(); });

    const url_1 = "https://cdn.pixabay.com/photo/2024/05/20/16/24/ai-generated-8775742_1280.png";
    const url_2 = "https://cdn.pixabay.com/photo/2021/11/09/09/05/meeting-6781073_1280.png";

    const CallObserver = () => {
        const options: object = {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: 0
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    entry.target?.classList.add('intersected');
                }
                else {
                    entry.target?.classList.remove('intersected');
                }
            })
        }, options);

        const allTargets = document.querySelectorAll('.animate');

        allTargets.forEach(target => {
            observer.observe(target)
        })
        
    }

    return (
        <div className="home">

            <section className="intro-section home-section flex">
                <div className="intro-content flex">
                    <h1 className="animate">Team solutions and productivity</h1>
                    <p className="animate">
                        Gain control on managing your team workflow and productivity.
                        Keep track of member profiles to grow your team.
                    </p>
                    <button className="animate">Try Demo</button>
                </div>

                <img className="intro-image" src={url_1} alt="" />
            </section>

            <section className="team-section flex">
                <img className="team-bg" src={url_2} alt="" />
                <div className="team-content flex">
                    <h1 className="animate">
                        Less Ambiquity in Team Collaboration
                    </h1>
                    <h1 className="animate">
                        Outline daily tasks for Team members
                    </h1>
                    <h1 className="animate">
                        Secure database to manage team records and budget
                    </h1>
                </div>
            </section>

            <section className="features-section home-section grid">
                <h1 className="feature-label">
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