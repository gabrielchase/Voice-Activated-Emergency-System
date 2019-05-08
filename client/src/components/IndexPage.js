import React from 'react'

import { withRouter } from 'react-router'

class IndexPage extends React.Component {
    componentDidMount = () => {
        console.log('hello')
        this.props.history.push('/login')
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default withRouter(IndexPage)