import '../styles/header.css';

const Header = () => {
    return (
        <header className="header flex sticky">
            <h1>VeeChat</h1>
            <div className=" header-list flex">
                <button className="active">Intro</button>
                <button>Members</button>
                <button>Updates</button>
            </div>
        </header>
    )
}

export default Header;