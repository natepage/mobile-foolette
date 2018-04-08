import React from 'react';
import { Font } from 'expo';
import { StatusBar, StyleSheet, View } from 'react-native';
import { ThemeProvider } from 'react-native-material-ui';
import { Toolbar } from 'react-native-material-ui';

export default class AppContainer extends React.Component {
    state = {
        fontsLoaded: false
    };

    async componentDidMount() {
        // Load Fonts
        await Font.loadAsync({
            'Roboto': require('./../../assets/fonts/Roboto-Light.ttf')
        });

        this.setState({ fontsLoaded: true });
    }

    render() {
        return this.state.fontsLoaded ? (
            <ThemeProvider>
                <View style={styles.appContainer}>
                    <Toolbar centerElement={"Foolette"} />
                    {this.props.children}
                </View>
            </ThemeProvider>
        ) : null;
    }
}

const styles = StyleSheet.create({
    appContainer: {
        top: StatusBar.currentHeight,
        flex: 1
    }
});
