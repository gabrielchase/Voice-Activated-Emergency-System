import React from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { ApiConsumer } from '../providers/ApiProvider'
import io from 'socket.io-client'
import NotificationPanel from './NotificationPanel'
import { ROOT_URL, GOOGLE_API_KEY } from '../config/config'

import styled from 'styled-components'

const ControlsWrapper = styled.div`
    box-shadow: 0px 5px 50px rgba(0,0,0,0.25);
    position: absolute;
    top: 24px;
    left: 24px;
    bottom: 36px;
    width: 400px;
    z-index: 1000;
    background: #f8f8f8;
    border-radius: 25px;
    border: 1px solid rgba(0,0,0,0.25);
    font-family: 'Gilroy', sans-serif;
    overflow: hidden;
`;

const HeaderWrapper = styled.div`
    padding: 1.5rem 1.5rem 1rem;
    background: white;
    border-bottom: 1px solid rgba(0,0,0,0.1);

    h1 {
        padding: 0;
        margin: 0;
        margin-bottom: 0.25rem;
        font-size: 1.3rem;
    }
    
    p {
        margin: 0;
    }
`;

const NotificationsWrapper = styled.div`
    .tabs {
        display: flex;
        padding: 0.75rem 1.5rem;
        font-size: 0.8rem;

        .tab {
            flex: 0 0 auto;
            margin-right: 1rem;
            color: #ccc;
            font-weight: 700;
            text-decoration: none;
            text-transform: uppercase;

            &.active {
                color: #ffc107;
            }
        }

        .controls {
            flex: 1;
            display: flex;
            justify-content: flex-end;

            .clear {
                flex: 0 0 auto;
                padding: 0.25rem 0.5rem;
                margin: -0.25rem 0;
                color: #ffc107;
                font-weight: 700;
                text-decoration: none;
                text-transform: uppercase;
                border-radius: 3px;
    
                &:hover, &:focus {
                    background: #ffc107;
                    color: white;
                }
            }
        }
    }
`;

class Dashboard extends React.Component {
    state = {
        center: {
            lat: 14.6538,
            lng: 121.0685
        },
        zoom: 16,
        markers: [
            { lat: 14.6544438, lng: 121.0735988, timestamp: new Date() },
            { lat: 14.6574438, lng: 121.0715988, timestamp: new Date() },
            { lat: 14.6604438, lng: 121.0695988, timestamp: new Date() }
        ]
    }

    addNewEmergency = async (data) => {
        await this.setState({
            markers: [ ...this.state.markers, { lat: data.latitude, lng: data.longitude, timestamp: new Date() } ]
        })
    }

    render() {
        const { current_user, socket } = this.props
        socket.on('emergency', (data) => this.addNewEmergency(data))

        console.log(this.props.google.maps);

        return (
            <>
                <ControlsWrapper>
                    <HeaderWrapper>
                        <h1>Watchmen Dashboard</h1>
                        <p>Good day {current_user.name}</p>
                    </HeaderWrapper>

                    <NotificationsWrapper>
                        <div className="tabs">
                            <a href="javascript:void(0)" className="active tab">Recent Notifications</a>
                            <a href="javascript:void(0)" className="tab">Archive</a>
                            <div className="controls">
                                <a href="javascript:void(0)" className="clear">Clear</a>
                            </div>
                        </div>

                        { this.state.markers.map(m => <NotificationPanel google={this.props.google} lat={m.lat} lng={m.lng} time={m.timestamp} />) }
                    </NotificationsWrapper>
                </ControlsWrapper>

                <Map 
                    className={'google-map'}
                    google={this.props.google}
                    zoom={this.state.zoom}
                    initialCenter={this.state.center}
                    disableDefaultUI={true}
                    mapTypeControl={true}
                    rotateControl={true}
                    scaleControl={true}
                    zoomControl={true}
                    mapTypeControlOptions={{
                        position: this.props.google.maps.ControlPosition.CENTER,
                        style: this.props.google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                    }}
                >
                    { this.state.markers.map(m => <Marker position={{lat: m.lat, lng: m.lng }} />) }
                </Map>
            </>
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

