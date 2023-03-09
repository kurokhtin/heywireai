import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import moment from 'moment';
import ImageIcon from 'components/icons/ImageIcon'
import { Modal } from 'react-responsive-modal';
import ModalClose from 'components/parts/ModalClose'

export default function PostsItem(props){
	const [open, setOpen] = useState(false);
	const closeModal = () => {
 		setOpen(false)
  	}
  	const elRef = useRef(null)
  	const elRef2 = useRef(null)
	
	useLayoutEffect(() => {
		if (open == true) {
			setTimeout(() =>{
				const element1Height = elRef.current.clientHeight;
	    		elRef2.current.style.maxHeight = `${element1Height}px`;
			}, 10)
    	}
	}, [open]);
	
	return(
		<>
	 	<div onClick={e => setOpen(true)} className={'one_item post article'}>
	 		<div className="post_image" style={props.data.media && props.data.media.length > 0 ? {backgroundImage: `url(${props.data.media[Math.floor(Math.random() * props.data.media.length)]})` } : {}}>
	 			{props.data.media.length == 0 ? <ImageIcon /> : null}
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
							{(props.data.author.name !== null && props.data.author.name !== '') ? 'by '+  props.data.author.name + '\n' : '' }
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
		<Modal 
	    	open={open} 
	    	onClose={closeModal} 
	    	center={true} 
	    	classNames={{
	    		overlayAnimationOut: 'modal-overlay-out',
	    		root: 'modal_article',
	    		modalAnimationOut: 'modal-popup-out',
	    	}}
	    	showCloseIcon={false} 
	    	closeOnOverlayClick={true} 
	    	closeOnEsc={true}
	    >
	        <h2 className="modal_title">
	        	{props.data.title}
	        	<ModalClose onChange={closeModal}/>
	        </h2>
	        <div className="modal_content modal_article_content post">
	        	<div className="article_content_left" ref={elRef}>
	        		{props.data.media && props.data.media.length > 0 ?
		        		<img className="post_thumb" src={props.data.media[0]}/>
		        	: null}
		        	<div className="post_date">
						<>
						{(props.data.author.name !== null && props.data.author.name !== '') ? 'by '+  props.data.author.name + '\n' : '' }
						{moment(new Date(props.data.published_at.replace(/-/g, "/"))).format('MMMM D YYYY, h:mm a')}
						</>
					</div>
		        	<div className="modal_content_article" dangerouslySetInnerHTML={{__html: props.data.body}}></div>
		        	{props.data.links.permalink ? 
			        	<div className="article_sources">
			        		Source: <a href={props.data.links.permalink} target="_blank">{props.data.links.permalink}</a>
			        	</div>
			        :null}
	        	</div>
	        	<div className="article_data_right" ref={elRef2}>
	        		<h2 className="article_data_title">Data</h2>
	        		<div className="article_data_wrap">
		        		<div className="article_data_item">
		        			ID: <span>{props.data.id}</span>
		        		</div>
		        		<div className="article_data_item">
		        			Source: <span>{props.data.source}</span>
		        		</div>
		        		<div className="article_data_item">
		        			Words count: <span>{props.data.words_count}</span>
		        		</div>
		        		<div className="article_data_item">
		        			Sentences count: <span>{props.data.sentences_count}</span>
		        		</div>
		        		<div className="article_data_item">
		        			Characters count: <span>{props.data.characters_count}</span>
		        		</div>
		        		<div className="article_data_item">
		        			Thumbnail: <span>{props.data.media.length > 0 ? 'True' : 'False'}</span>
		        		</div>
		        		<div className="article_data_item list">
		        			Sentiment: <ul>
		        				<li>Title: <span>{props.data.sentiment.title.polarity} ({props.data.sentiment.title.score})</span></li>
		        				<li>Body: <span>{props.data.sentiment.body.polarity} ({props.data.sentiment.body.score})</span></li>
		        			</ul>
		        		</div>
		        		<div className="article_data_item list">
		        			Categories: <ul>{props.data.categories.map((item) => <li>{item}</li>)}</ul>
		        		</div>
	        		</div>
	        	</div>
	        </div>
	        

	    </Modal>
	    </>
	)
}
