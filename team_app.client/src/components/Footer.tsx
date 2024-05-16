import '../styles/footer.css';

import { FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhoneInTalk } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {

	const linkedIn_Url: string = "https://www.linkedin.com/in/qi-jie-guan-002924201/";


	return (
		<footer className="footer flex">
			<div className="footer-intro flex">
				<h2>TeamNet</h2>
				<span>Powered by React-Asp.net Platform</span>
				<span>Make team workflow easy</span>
			</div>

			<div className="footer-contact">
				<h2>Contact</h2>
				<div className="footer-icons flex">
					<div>
						<FaLinkedin className="icon" onClick={() => { window.open(linkedIn_Url)}} />
					</div>
					<div><MdEmail className="icon" onClick={() => { alert('qijieguan7@gmail.com')}} /></div>
					<div><FaLocationDot className="icon" onClick={() => { alert('Los Angeles County, CA') }} /></div>
					<div><MdPhoneInTalk className="icon" onClick={() => { alert('(626) 757-2356') }} /></div>
				</div>
			</div>
		</footer>
	)
}

export default Footer;