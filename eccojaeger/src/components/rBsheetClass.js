/* eslint-disable prettier/prettier */
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { View, Image, Text, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { styles } from './components.style';
import { strings } from '../localization';
import normalize from 'react-native-normalize';
import { Component } from 'react';

export class RBSheetView extends Component {
    handleDropDown = (data) => {
        this[`rBSheet${this.props?.id}`].close();
        this.props?.setUnitPrice(data);
    }

    render() {
        return (
            <View>

                <Pressable disabled={this.props.disable} style={styles.unitBox}
                    onPress={() => this[`rBSheet${this.props?.id}`].open()}>
                    <Text style={styles.unitSelected}>{this.props?.unitPriceName}</Text>
                    <Icon
                        name="down"
                        type="antdesign"
                        size={(16)}
                        color="#222"
                    />
                </Pressable>

                <RBSheet
                    ref={ref => (
                        this[`rBSheet${this.props?.id}`] = ref
                    )}
                    height={(250)}
                    openDuration={200}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            paddingHorizontal: (30),
                            paddingTop: (20),
                        },
                    }}
                >
                    <Text style={styles.listName}>{strings.common.selectUnit}</Text>
                    <View style={styles.closeToggleSheet}>
                        <Icon
                            name="close"
                            type="antdesign"
                            size={(22)}
                            color="#000"
                            onPress={() => this[`rBSheet${this.props?.id}`].close()}
                        />
                    </View>
                    {this.props?.quantity?.map((data, index) => {
                        return (
                            <Pressable onPress={() => this.handleDropDown(data)} key={index}>
                                <Text style={styles.listItems}>{`${data?.name}`} {(data.default === data.factory && data.default === '1') ? null : `(${parseFloat(data?.unitPrices).toFixed(2)} ${props.defaultUnit})`} </Text>
                            </Pressable>
                        );
                    })

                    }
                </RBSheet>
            </View>
        );
    }

}
