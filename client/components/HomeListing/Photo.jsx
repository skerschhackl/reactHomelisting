import React from 'react';

var Photo = (props) => {
	return (
		<div className="homePhoto">
		<img src={props.src} />
		</div>
	);
}
export default Photo;