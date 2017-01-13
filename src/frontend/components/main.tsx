import React from 'react';
import API from '../api';
import LinkStore from '../stores/LinkStore';

console.log('Main');
console.log('LinkStore', LinkStore);

export default class Main extends React.Component<any, any>{
	componentWillMount(){
	}
	
	componentDidMount(){
		API.fetchLinks();
	}	

	render(){
		return (<div>
			<h3>Links</h3>
			<ul>
				<li></li>
			</ul>
			</div>);			        
	}
}

