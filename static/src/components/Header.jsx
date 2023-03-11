import React from 'react'
import Logo from 'assets/img/heywire_logo.svg'

export default function Header(){
	return (
		<header className="dashboard">
			<div className="left_header">
				<a id="logo" href="/">
					<img src={Logo} height="27" title="HeyWire" alt="logo"/>
				</a>
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