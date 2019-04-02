import React, { Component } from "react";

export default class Brand extends Component {
    render(){
        const h1Style = {
            color: '#e74c3c',
            fontSize: '28px',
            fontWeight: '600',
            textTransform: 'uppercase',
            textAlign: 'center'
        };

        return (
            <h1 style={h1Style}>Brand</h1>
        );
    }
}
