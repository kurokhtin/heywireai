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

  	const filteredMedia = props.data.media.filter(media => media !== null)
  	// const randomMediaIndex = Math.floor(Math.random() * filteredMedia.length);
	
	useLayoutEffect(() => {
		if (open == true) {
			setTimeout(() =>{
				const element1Height = elRef.current.clientHeight;
	    		elRef2.current.style.maxHeight = `${element1Height}px`;
			}, 100)
    	}
	}, [open]);

	const TextWithParagraphs = ({ text }) => {
		const paragraphs = text.split('\n');
		return (
			<>
				{paragraphs.map((paragraph, index) => (
					<p key={index}>{paragraph}</p>
				))}
			</>
		);
	}
	
	return(
		<>
		 	<div onClick={e => setOpen(true)} className={'one_item post article'}>
		 		<div className="post_image" style={filteredMedia && filteredMedia.length > 0 && filteredMedia[0] !== null ? {backgroundImage: `url(${filteredMedia[0]})` } : {}}>
		 			{filteredMedia.length == 0 ? <ImageIcon /> : null}
		 		</div>
				<div className="post_data">
					<div className="post_top">
						<div className="post_title" style={{width: '100%', marginRight: '0'}}>
							{props.typeGPT == false ? props.data.title : props.data.title.replace(/"/g, '')}
						</div>
					</div>
					<div className="post_content_wrap">
						<div className="profile journalist_header">
							<div className="post_date">
								{props.typeGPT == false ?
									<>
										{(props.data.author.name !== null && props.data.author.name !== '') ? 'by '+  props.data.author.name + '\n' : '' }
										{moment(new Date(props.data.published_at.replace(/-/g, "/"))).format('MMMM D YYYY, h:mm a')}
									</>
								:
									<>
										<div>by AI</div>
										{moment().format('MMMM D YYYY, h:mm a')}
									</>
								}
								
							</div>
						</div>
						<div className="post_content">
							{props.typeGPT == false ? props.data.summary.sentences.join('') : props.data.text}
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
		        	{props.typeGPT == false ? props.data.title : props.data.title.replace(/"/g, '')}
		        	<ModalClose onChange={closeModal}/>
		        </h2>
		        <div className="modal_content modal_article_content post">
		        	<div className="article_content_left" ref={elRef}>
		        		{filteredMedia && filteredMedia.length > 0 && filteredMedia[0] !== null ?
			        		<img className="post_thumb" src={filteredMedia[0]}/>
			        	: null}
			        	<div className="post_date">
							{props.typeGPT == false ?
								<>
									{(props.data.author.name !== null && props.data.author.name !== '') ? 'by '+  props.data.author.name + '\n' : '' }
									{moment(new Date(props.data.published_at.replace(/-/g, "/"))).format('MMMM D YYYY, h:mm a')}
								</>
							:
								<>
									<div>by AI</div>
									{moment().format('MMMM D YYYY, h:mm a')}
								</>
							}
						</div>
						{props.typeGPT == false ?
			        		<div className="modal_content_article"><TextWithParagraphs text={props.data.body} /></div>
			        	:
			        		<div className="modal_content_article"><TextWithParagraphs text={props.data.text} /></div>
			        	}
			        	{props.data.links ? 
				        	<div className="article_sources">
				        		{props.typeGPT == false ?
				        			<>Source: <a href={props.data.links.permalink} target="_blank">{props.data.links.permalink}</a></>
				        		:   <>Sources: <ul>{props.data.links.map((item, index) => <li key={index}><a href={item} key={index + Math.random()} target="_blank">{item}</a></li>)}</ul></>
				        		}
				        	</div>
				        :null}
		        	</div>
		        	<div className="article_data_right" ref={elRef2}>
		        		<h2 className="article_data_title">Data</h2>
		        		<div className="article_data_wrap">
			        		<div className="article_data_item">
			        			{props.typeGPT == false ? <>ID:</> : <>Original ID:</>}
			        			<span>{props.data.id}</span>
			        		</div>
			        		{props.typeGPT == false ? 
			        			<div className="article_data_item">
				        			Source: <span>{props.data.source}</span>
				        		</div>
			        		: 
			        			<div className="article_data_item">
				        			Time created: <span>{props.data.response_time}s</span>
				        		</div>
			        		}
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
			        			Thumbnail: <span>{filteredMedia.length > 0 ? 'True' : 'False'}</span>
			        		</div>
			        		<div className="article_data_item list">
			        			Sentiment: <ul>
			        				<li>Title: <span>{props.data.sentiment.title.polarity} ({props.data.sentiment.title.score})</span></li>
			        				<li>Body: <span>{props.data.sentiment.body.polarity} ({props.data.sentiment.body.score})</span></li>
			        			</ul>
			        		</div>
			        		{props.typeGPT == true ? 
			        			<div className="article_data_item list">
				        			Entities: <ul>{props.data.entities.map((item, index) => <li key={index + Math.random()}><b>{item[0]}</b> -&gt; {item[1]}</li>)}</ul>
				        		</div>
			        		: null}
			        		{props.typeGPT == false ? 
				        		<div className="article_data_item list">
				        			Categories: <ul>{props.data.categories.map((item, index) => <li key={index}>{item}</li>)}</ul>
				        		</div>
			        		: null}
		        		</div>
		        	</div>
		        </div>  
		    </Modal>
	    </>
	)
}
