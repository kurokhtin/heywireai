import React from 'react'
import PostsItemSkeleton from 'components/parts/PostsItemSkeleton'

export default function PostsListSkeleton(props){
	const count = (props.count) ? props.count : 10
	return(
		[...Array(count)].map((index, i) => <PostsItemSkeleton key={i} /> )
	)
}
