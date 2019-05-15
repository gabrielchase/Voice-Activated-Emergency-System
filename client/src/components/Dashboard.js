import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

import { ApiConsumer } from '../providers/ApiProvider'
import NotificationPanel from './NotificationPanel'
import { GOOGLE_API_KEY, API_URL } from '../config/config'


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
        ],
        historical_markers: [],
        mode: 'RECENT'
    }

    getHistoricalMarkers = async (data) => {
        const res = await axios.get(`${API_URL}/emergencies`)
        console.log('historical markers: ', res.data)
        if (res.data.success)
            await this.setState({ mode: 'HISTORICAL', historical_markers: res.data.values })
    }

    addNewEmergency = async (data) => {
        console.log('data: ', data)
        await this.setState({
            markers: [ ...this.state.markers, { from_pi: true, lat: data.latitude, lng: data.longitude, timestamp: new Date(), location_name: data.location_name } ]
        })
    }

    clearMarkers = async () => {
        console.log('clearmerrs')
        await this.setState({ 
            markers: []
        })
    }

    render() {
        const { current_user, socket } = this.props
        // console.log('socket: ', socket)
        socket.on('emergency', (data) => this.addNewEmergency(data))

        console.log(this.props.google.maps);

        return (
            <>
                <ControlsWrapper>
                    <HeaderWrapper>
                        <h1>Watchmen Dashboard</h1>
                        <p>Good day {current_user.name}</p>
                        {this.state.mode}
                    </HeaderWrapper>

                    <NotificationsWrapper>
                        <div className="tabs">
                            <a onClick={() => this.setState({ mode: 'RECENT'})} className="tab">Recent Notifications</a>
                            <a onClick={() => this.getHistoricalMarkers() } className="tab">Archive</a>
                            <div className="controls">
                                <a onClick={() => this.clearMarkers()} className="clear">Clear</a>
                            </div>
                        </div>

                        
                        { 
                            this.state.mode === 'RECENT' ? 
                                this.state.markers.map(m => <NotificationPanel google={this.props.google} lat={m.lat} lng={m.lng} time={m.timestamp} m={m} from_pi={m.from_pi} />) 
                                : 
                                <div></div>                                
                        }
                        { 
                            this.state.mode === 'HISTORICAL' ? 
                                this.state.historical_markers.map(m => <NotificationPanel google={this.props.google} lat={m.lat} lng={m.lng} time={m.timestamp} m={m} from_pi={m.from_pi} />) 
                                : 
                                <div></div>                                
                        }
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
                    { 
                        this.state.mode === 'RECENT' ? 
                            this.state.markers.map(m => <Marker position={{lat: m.lat, lng: m.lng }} />) 
                            :
                            <div></div>                                
                        }
                        { 
                            this.state.mode === 'HISTORICAL' ? 
                                this.state.historical_markers.map(m => <NotificationPanel google={this.props.google} lat={m.lat} lng={m.lng} time={m.timestamp} m={m} from_pi={m.from_pi} />) 
                                : 
                                <div></div>                                
                        }
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

