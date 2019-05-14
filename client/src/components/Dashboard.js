import React from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { ApiConsumer } from '../providers/ApiProvider'
import io from 'socket.io-client'

import { ROOT_URL, GOOGLE_API_KEY } from '../config/config'

import styled from 'styled-components'

const HeaderWrapper = styled.div `
    box-shadow: 0px 5px 50px rgba(0,0,0,0.25);
    position: absolute;
    top: 0;
    right: 50%;
    z-index: 1000;
    background: white;
    border-radius: 0 0 50px 50px;
    padding: 0 1.5rem 0 1.5rem;
    transform: translateX(50%);

    h1 {
        padding: 1rem;
        margin: 0;
        text-align: center;
    }
    
    p {
        padding: 0rem 0 1rem 1rem;
        margin: 0;
        text-align: center;
    }
`;

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
            markers: [ ...this.state.markers, <Marker position={{lat:  data.latitude, lng: data.longitude }} /> ]
        })
    }

    render() {
        const { current_user, socket } = this.props
        socket.on('emergency', (data) => this.addNewEmergency(data))
        return (
            <div>
                <HeaderWrapper>
                    <h1>Watchmen Dashboard </h1>
                    <p>Good day {current_user.name}</p>
                </HeaderWrapper>
                <Map 
                    className={'google-map'}
                    google={this.props.google} 
                    zoom={this.state.zoom} 
                    initialCenter={this.state.center}
                    mapTypeControl = {true}
                    mapTypeControlOptions={{
                        position: this.props.google.maps.ControlPosition.BOTTOM_LEFT
                    }}
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

