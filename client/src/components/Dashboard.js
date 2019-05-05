import React from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { ApiConsumer } from '../providers/ApiProvider'

import { GOOGLE_API_KEY } from '../config/config'

class Dashboard extends React.Component {
    state = {
        center: {
            lat: 14.6538,
            lng: 121.0685
        },
        zoom: 16
    }

    render() {
        const { current_user } = this.props
        console.log('curent_user: ', current_user)
        return (
            <div>
                <p>Dashboard Page</p>
                <p>Good day {current_user.name}</p>
                <Map 
                    className={'google-map'}
                    google={this.props.google} 
                    zoom={this.state.zoom} 
                    initialCenter={this.state.center}
                />
            </div>
        )
    }
}

const ConnectedDashboard = props => (
    <ApiConsumer >
        {({ current_user }) => (
            <Dashboard 
                {...props}
                current_user={current_user}
            />
        )}
    </ApiConsumer>
)

export default GoogleApiWrapper({
    apiKey: (GOOGLE_API_KEY)
})(ConnectedDashboard)

