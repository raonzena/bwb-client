import React from 'react';
import Map from './Map';

class Home extends React.Component{
  render() {
		return(
			<div style={{ margin: '100px' }}>
				<Map
					google={this.props.google}
					center={{lat: 37.536693, lng: 127.056139}}
					height='300px'
					zoom={15}
				/>
			</div>
		);
	}
}

export default Home;
