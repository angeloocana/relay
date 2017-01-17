import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import Main from './components/main';

console.log('Hello js 3');

ReactDOM.render(<Main limit={4} />, document.getElementById('react'));

console.log(
    Relay.QL`
        query Test{
            links{
                title
            }
        }
    `
);
