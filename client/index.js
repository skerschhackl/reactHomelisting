import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/base.css';

import HomeListing from './components/HomeListing.jsx';
import App from './components/App.jsx';

ReactDOM.render(
	<App />, document.getElementById('headline')
);

ReactDOM.render(
	<HomeListing url="homes.json" savesUrl="saves.json" pollInterval={2000} />, 
	document.getElementById('content')
);



