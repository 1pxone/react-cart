import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cart from './containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Cart />, document.getElementById('root'));
registerServiceWorker();
