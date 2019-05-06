import React from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { ApiConsumer } from '../providers/ApiProvider'
import io from 'socket.io-client'

import { ROOT_URL, GOOGLE_API_KEY } from '../config/config'


class Dashboard extends React.Component {
    state = {
        center: {
            lat: 14.6538,
            lng: 121.0685
        },
        zoom: 16,
        markers: []
    }

    addNewEmergency = async (data) => {
        await this.setState({
            markers: [ ...this.state.markers, <Marker position={{lat: data.latitude, lng: data.longitude }} /> ]
        })
    }

    render() {
        const { current_user, socket } = this.props
        socket.on('emergency', (data) => this.addNewEmergency(data))
        return (
            <div>
                <p>Dashboard Page</p>
                <p>Good day {current_user.name}</p>
                <Map 
                    className={'google-map'}
                    google={this.props.google} 
                    zoom={this.state.zoom} 
                    initialCenter={this.state.center}
                >
                    {this.state.markers}
                </Map>
            </div>
        )
    }
}

const ConnectedDashboard = props => (
    <ApiConsumer>
        {({ current_user, socket }) => (
            <Dashboard 
                {...props}
                current_user={current_user}
                socket={socket}
            />
        )}
    </ApiConsumer>
)

export default GoogleApiWrapper({
    apiKey: (GOOGLE_API_KEY)
})(ConnectedDashboard)

