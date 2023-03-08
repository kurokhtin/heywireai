import React, { useState, useEffect } from 'react'
import moment from 'moment';


export default function PostsItem(props){
	// useEffect(() => {
    //     console.log(props)
    // }, [])
	return(
	 	<div className={'one_item post article'}>
	 		<div className="post_image" style={props.data.media && props.data.media.length > 0 ? {backgroundImage: `url(${props.data.media[Math.floor(Math.random() * props.data.media.length)]})` } : {}}>
	 			
	 		</div>
			<div className="post_data">
				<div className="post_top">
					<div className="post_title" style={{width: '100%', marginRight: '0'}}>
						{props.data.title}
					</div>
				</div>
				<div className="post_content_wrap">
					<div className="profile journalist_header">
						<div className="post_date">
							<>
							{(props.data.author.name !== null || props.data.author.name !== '') ? 'by '+  props.data.author.name + '\n' : '' }
							{moment(new Date(props.data.published_at.replace(/-/g, "/"))).format('MMMM D YYYY, h:mm a')}
							</>
						</div>
						<div className="expertise">
							
						</div>
					</div>
					<div className="post_content">
						{props.data.summary.sentences.join('')}
					</div>
				</div>
			</div>
			<div className="assignment_actions">
				<div className="apply_btn button add_new_btn">
					<span>Read more</span>
				</div>
			</div>
		</div>
	)
}
