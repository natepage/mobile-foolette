import React from 'react';
import { AppContainer } from './src/components';
import { Roulette } from './src/activities';

export default class App extends React.Component {
    render() {
        return (
            <AppContainer>
                <Roulette />
            </AppContainer>
        );
    }
}
