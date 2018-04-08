import React from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';
import { ListItem } from 'react-native-material-ui';
import * as constants from './../../config/styles/constants';
import * as env from './../../config/env';
import { Loader } from "../../components";
import qs from 'qs';
import PropTypes from 'prop-types';

export default class AutoCompleteList extends React.Component {
    state = {
        list: []
    };

    componentDidMount() {
        return fetch(this._getUrl())
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.predictions) {
                    console.log('set list');
                    this.setState({list: responseJson.predictions})
                }
            })
            .catch((error) => console.log(error))
    }

    _getUrl() {
        return 'https://maps.googleapis.com/maps/api/place/autocomplete/json?' + qs.stringify({
            key: env.GOOGLE_MAPS_API_KEY,
            language: 'en',
            types: ['geocode'],
            input: this.props.input
        });
    }

    _renderItem(item) {
        return (
            <ListItem
                divider
                onPress={() => this.props.onAddressSelected(item.description)}
                centerElement={item.description}
            />
        )
    }

    _renderContent() {
        if (this.state.list.length === 0) {
            return (
                <Loader/>
            )
        }

        return (
            <FlatList
                style={styles.list}
                data={this.state.list}
                keyExtractor={() => Math.random().toString(36).substr(2, 10)}
                renderItem={({item}) => this._renderItem(item)}
            />
        )
    }

    render() {
        return (
            <View style={styles.modal}>
                <View style={styles.listContainer}>
                    {this._renderContent()}
                    <View style={styles.footer}>
                        <Image source={require('./../../assets/img/powered_by_google_on_white.png')} />
                    </View>
                </View>
            </View>
        )
    }
}

AutoCompleteList.propTypes = {
    input: PropTypes.string.isRequired,
    onAddressSelected: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: constants.COLOR_WHITE,
        height: 400,
        borderRadius: 4,
        shadowColor: constants.COLOR_BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    listContainer: {
        flex: 1
    },
    list: {
        height: 350
    },
    footer: {
        flex: 0,
        height: 50,
        paddingRight: constants.PADDING_RIGHT,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});
