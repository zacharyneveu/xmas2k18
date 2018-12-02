import Weather from './Weather';
import Image from './Image';
import React from 'react';
import { styles } from './styles';
import Pexel from './Pexel';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.setColor = this.setColor.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.state = {
            color: 'green',
            description: 'wet'
        }
    }

    setColor(color) {
        this.setState({ color: color });
    }

    setDescription(desc) {
        this.setState({ description: desc });
        console.log(desc);
    }
    render() {
        let bgprop = { background: this.state.color };
        return (
            <div style={Object.assign({}, styles.page_style, bgprop)}>
                <Pexel onNew={this.setColor} description={this.state.description}>
                    <center>
                        <Weather color={this.state.color} onChange={this.setDescription} />
                    </center>
                </Pexel>
            </div>
        )
    }
}