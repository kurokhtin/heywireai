import React from 'react';

function ModalClose(props){
	const handleClose = () =>{
		props.onChange()
	}
	return(
		<button onClick={() => handleClose()} className="modal_close_btn">
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2 2L9 9M9 9L16 16M9 9L2 16M9 9L16 2" stroke="#51556A" strokeWidth="3"/>
			</svg>
        </button>
	)
}
export default ModalClose