// import libaries 
import React from 'react';
import ReactDOM from 'react-dom';

// import css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-utilities.css';
import './index.css';

// import components
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
       <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
