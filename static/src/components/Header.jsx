import React from 'react'

export default function Header(){
	return (
		<header className="dashboard">
			<div className="left_header">
				<a id="logo" href="/">
				<svg width="139" height="27" viewBox="0 0 139 27" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.83105 24V6.54395H5.06592V13.7461H13.6719V6.54395H16.9067V24H13.6719V16.5537H5.06592V24H1.83105ZM35.4067 6.54395V9.32715H26.6665V13.7217H34.9917V16.6147H26.6299V21.1924H35.5776V24H23.4561V6.54395H35.4067ZM39.9175 6.54395H43.3965L48.3037 14.9546L52.918 6.54395H56.2749L49.854 17.8965V24H46.6191V17.8965L39.9175 6.54395Z" fill="white"></path>
					<path d="M58.7837 6.54395H62.0674L63.9351 19.0806L68.4761 6.54395H71.5889L75.8369 18.5923L77.8145 6.54395H81.0005L77.7168 24H74.6406L69.8433 10.3037L64.6919 24H61.6523L58.7837 6.54395ZM89.3687 6.54395V24H86.1338V6.54395H89.3687ZM95.918 23.9756V6.54395H103.853C107.417 6.54395 109.199 8.10238 109.199 11.2192C109.199 13.327 107.812 15.0726 105.037 16.4561L110.566 24H106.489L101.179 16.395V14.918C104.272 14.389 105.818 13.1886 105.818 11.3169C105.818 10.0311 105.094 9.38818 103.645 9.38818H99.2139V23.9756H95.918ZM126.93 6.54395V9.32715H118.19V13.7217H126.515V16.6147H118.153V21.1924H127.101V24H114.979V6.54395H126.93Z" fill="#6182F4"></path>
					<circle cx="48" cy="2" r="2" fill="white"></circle></svg></a>
			</div>
			<div className="menu_items">
				<ul className="">
					{/*<li><a href="/dashboard/assignments/"><span>Assignments</span></a></li>
					<li><a href="/dashboard/pitches/"><span>Pitches</span></a></li>
					<li><a href="/dashboard/users/"><span>Users</span></a></li>
					<li><a href="/dashboard/projects/"><span>My Projects</span></a></li>
					<li><a href="/dashboard/chats/"><span>Chats</span></a></li>
					<li><a aria-current="page" className="active" href="/dashboard/profile/">
					<span>My Profile</span></a></li>*/}
				</ul>
				<div id="menu_toggle_wrap" className=""><span></span><span></span><span></span></div>
			</div>
			<div className="right_header logged">
				<div className="top_right_header">
					<div className="welcome_user"><h3>Hi, Alex</h3>
						<span>Administrator</span>
					</div>
				</div>
			</div>
		</header>
	)
}