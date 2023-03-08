import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function PostsListSkeleton(props){
	const count = (props.count) ? props.count : 10
	return(
		[...Array(count)].map((index, i) => (
		 	<div key={i} className={'one_item post skeleton article '}>
		 		<div className="post_image">
		 			<Skeleton height={100} style={{ borderRadius: 10 }}/>
		 		</div>
				<div className="post_data">
					<div className="post_top">
						<div className="post_title" style={{width: '100%', marginRight: '0'}}><Skeleton height={30} style={{ borderRadius: 10 }}/></div>
					</div>
					<div className="post_content_wrap">
						<div className="profile journalist_header">
							<div className="post_date"><Skeleton width={70} style={{ borderRadius: 10 }}/></div>
							<div className="expertise"><Skeleton width={70} style={{ borderRadius: 10 }}/></div>
						</div>
						<div className="post_content"><Skeleton count={3} style={{ borderRadius: 10 }}/></div>
					</div>
				</div>
				<div className="assignment_actions">
					<div style={{width: '100%'}}><Skeleton height={50} style={{ borderRadius: 10 }}/></div>
				</div>
			</div>
		))
	)
}
