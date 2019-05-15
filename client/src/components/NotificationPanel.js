import React from 'react'
import * as moment from 'moment'
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0.5rem 1rem;
    margin: 0 1rem 0.5rem;
    background: white;
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 5px;

    .title {
        margin-bottom: 0.15rem;
        font-weight: 700;
    }

    .subtitle {
        color: #888;
        font-size: 0.8rem;
    }
`;

export default class NotificationPanel extends React.Component {
    state = {
        loading: true,
        latlng: null,
        location: ''
    };

    constructor(props) {
        super(props);
        this.geocoder = new this.props.google.maps.Geocoder();
    }

    async componentDidMount() {
        console.log('props: ', this.props)
        // if (!this.props.from_pi)
        await this.fetchLocation()
      
    }

    componentDidUpdate() {
        if (!this.state.loading && this.state.latlng !== `${this.props.lat},${this.props.lng}`) this.fetchLocation();
    }

    fetchLocation = () => {
        if (this.props.m.latitude && this.props.m.longitude) {
            console.log('hello hello')
            this.setState(prevState => ({ ...prevState, loading: false, latlng: `${this.props.m.latitude},${this.props.m.longitude}`, location: `${this.props.m.location_name}` }));
        } else {
            this.geocoder.geocode(
                { location: new this.props.google.maps.LatLng(this.props.lat, this.props.lng) },
                (locations, status) => {
                    if (status !== 'OK') {
                        console.error(`Failed to geocode location at (${this.props.lat}, ${this.props.lng}).`);
                        this.setState(prevState => ({ ...prevState, loading: false, location: `${this.props.lat}, ${this.props.long}` }));
                    } else {
                        console.log(this.props.m)
                        if (this.props.from_pi) {
                            this.setState(prevState => ({ ...prevState, loading: false, latlng: `${this.props.m.lat},${this.props.m.lng}`, location: `${this.props.m.location_name}` }));
                        }
                        else 
                            this.setState(prevState => ({ ...prevState, loading: false, location: `${locations[0].address_components[0].short_name}, ${locations[0].address_components[1].short_name}, ${locations[0].address_components[2].short_name}` }));
                    }
                }
            );
        }
        this.setState(prevState => ({ ...prevState, loading: true, latlng: `${this.props.lat},${this.props.lng}` }));
    }

    render() {
        return (
            <Wrapper>
                <div className="title">
                    {
                        this.state.location
                    }
                </div>
                <div className="subtitle">{this.props.m.created_on ? this.props.m.created_on : moment(this.props.time).fromNow()}</div>
            </Wrapper>
        );
    }
}
