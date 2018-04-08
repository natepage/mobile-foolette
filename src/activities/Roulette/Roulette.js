import React from 'react';
import { StyleSheet, View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-material-ui';
import * as constants from './../../config/styles/constants';
import AutoCompleteList from "./AutoCompleteList";

export default class Roulette extends React.Component {
    state = {
        address: null,
        showAutoCompleteList: false
    };

    _onAddressChange(address) {
        console.log('address change');

        this.setState({
            address: address,
            showAutoCompleteList: address.length >= 5
        });
    }

    _renderFormBody() {
        if (this.state.showAutoCompleteList) {
            return (
                <AutoCompleteList
                    input={this.state.address}
                    onAddressSelected={(address) => this.setState({address: address, showAutoCompleteList: false})}
                />
            );
        }

        return (
            <Button raised primary text={'Search'} onPress={() => this.setState({showAutoCompleteList: true})} />
        );
    }

    render() {
        return (
            <TouchableWithoutFeedback style={{flex: 1}} onPress={() => this.setState({showAutoCompleteList: false})}>
                <View style={styles.activity}>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.autocomplete}
                            placeholder={"Enter a location"}
                            value={this.state.address}
                            onChangeText={(text) => this._onAddressChange(text)}
                        />
                        {this._renderFormBody()}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    activity: {
        flex: 1,
        paddingTop: constants.PADDING_TOP,
        paddingLeft: constants.PADDING_LEFT,
        paddingRight: constants.PADDING_RIGHT
    },
    form: {
        flex: 1
    },
    autocomplete: {
        height: 50
    }
});
