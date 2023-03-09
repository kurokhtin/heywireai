import React from 'react'
import EmptyList from 'components/icons/EmptyList'

export default function NoProjects(props){
	return(
		<div className="empty_block_wrap">
			<div className="empty_block_icon"><EmptyList /></div>
			<div className="empty_block_text">
				{props.text ? props.text :
					<>No generted articles in this type yet.</>
				}
			</div>
		</div>
	)
}