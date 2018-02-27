import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/base.css';

import HomeListing from './components/HomeListing.jsx';
import DonationBox from './components/DonationBox.jsx';
import App from './components/App.jsx';

ReactDOM.render(
	<App />, document.getElementById('headline')
);

ReactDOM.render(
	<DonationBox url="donations.json" pollInterval={2000} />, document.getElementById('donationContent')
);

ReactDOM.render(
	<HomeListing url="homes.json" savesUrl="saves.json" pollInterval={2000} />, 
	document.getElementById('homeContent')
);



