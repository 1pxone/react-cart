import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FetchDemo from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<FetchDemo subreddit="reactjs"/>, document.getElementById('root'));
registerServiceWorker();
