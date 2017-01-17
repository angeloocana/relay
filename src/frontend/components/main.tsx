import React from 'react';
import API from '../api';
import LinkStore from '../stores/LinkStore';

console.log('Main');
console.log('LinkStore', LinkStore);

var _getAppState = () => {
	return { links: LinkStore.getAll()};
};

export default class Main extends React.Component<any, any>{

    static propTypes = {
        limit: React.PropTypes.number
    }

    static defaultProps = {
        limit: 4    
    }

	state = _getAppState();

    //using arrow function in order to remove the need to bind this: this.onChange = this.onChange.bind(this);
    onChange = () => {
		console.log('4. in View');
		this.setState(_getAppState());
	}

	componentWillMount(){
	}
	
	componentWillUnmount(){
		LinkStore.removeListener('change', this.onChange);
	}

	componentDidMount(){
		API.fetchLinks();
		LinkStore.on('change', this.onChange);
	}	

	render(){
		var content = this.state.links.slice(0, this.props.limit).map(link => {
			return <li key={link._id}>
				<a href={link.url}>{link.title}</a>
				</li>;
		});

		return (<div>
			<h3>Links</h3>
			<ul>
				{content}
			</ul>
			</div>);			        
	}
}

