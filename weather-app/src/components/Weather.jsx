import React from 'react';
import './styles.css';
import { Card } from 'semantic-ui-react'

const Weather = ({weatherData}) => (
    <Card>
        <Card.Content>
            <Card.Header className="header">{weatherData.name}</Card.Header>
        </Card.Content>
    </Card>
)

export default Weather;