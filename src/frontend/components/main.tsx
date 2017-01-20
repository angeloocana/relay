import React from 'react';
import Relay from 'react-relay';

import Link from './Link';

class Main extends React.Component<any, any>{
 
    /* props validation example
    static propTypes = {
        limit: React.PropTypes.number
    }

    static defaultProps = {
        limit: 4    
    }
    */

    setLimit = (e) => {
        var newLimit = Number(e.target.value);
        this.props.relay.setVariables({limit: newLimit});
    }

	render(){
		var content = this.props.store.linkConnection.edges.map(edge => {
			return <Link key={edge.node.id} link={edge.node} />;
		});

		return (<div>
			<h3>Links</h3>
            <label htmlFor='pagination-limit'>Showing</label>
            <select id='pagination-limit' onChange={this.setLimit}>
                <option value="2">2</option>
                <option value="3" selected>3</option>
            </select>
			<ul>
				{content}
			</ul>
			</div>);			        
	}
}

Main = Relay.createContainer(Main, {
    initialVariables: {
        limit: 3
    },
    fragments: {
       store: () => Relay.QL`
        fragment on Store{
            linkConnection(first: $limit){
                edges{
                    node{
                        id,
                        ${Link.getFragment('link')}                
                    }
                }
            }
        }
       `
    }
});

export default Main;
