import '../styles/header.css';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {


    useEffect(() => {
    }, [])

    const toggleHighlight = (e: React.MouseEvent<HTMLButtonElement>) => {
        document.querySelector('.header-li.active')?.classList.remove('active');
        (e.target as HTMLElement)?.classList.add('active');
    }

    return (
        <header className="header flex sticky">
            <h1>TeamNet</h1>
            <div className=" header-list flex">
                <Link to='/'>
                    <button className="header-li active" onClick={(e) => { toggleHighlight(e) }}>Intro</button>
                </Link>
                
                <Link to='/Team_Profiles'>
                    <button className="header-li" onClick={(e) => { toggleHighlight(e) }}>Profiles</button>
                </Link>

                <Link to='/Task_Board'>
                    <button className="header-li" onClick={(e) => { toggleHighlight(e) }}>Board</button>
                </Link>

                <Link to='/Team_Updates'>
                    <button className="header-li" onClick={(e) => { toggleHighlight(e) }}>Updates</button>
                </Link>
            </div>
        </header>
    )
}

export default Header;