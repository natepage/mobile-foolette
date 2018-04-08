import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default class Loader extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={"large"} color={this.context.uiTheme.palette.primaryColor} />
            </View>
        )
    }
}

Loader.contextTypes = {
    uiTheme: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
