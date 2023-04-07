/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './components.style';
import GraphData from '../assets/mocData/graphData.json';
import { strings } from '../localization';

export default function ProductGraph(props) {

    var arr = [];
    Object.keys(props.data.monthsArray).map(function (data) {
        var lArr = [];
        props.data.seasonCh.map((item, index) => {
            if (data === item) {
                lArr.push(<MonthItem key={`ch${index}`} backgroundColor="#5292e1" />);
            }
        })
        props.data.seasonEu.map((item, index) => {
            if (data === item) {
                lArr.push(<MonthItem key={`eu${index}`} backgroundColor="#d5773f" />);
            }
        })
        props.data.seasonOs.map((item, index) => {
            if (data === item) {
                lArr.push(<MonthItem key={`os${index}`} backgroundColor="#b5b5b5" />);
            }
        })
        arr.push(
            <View key={data} style={{ height: 30 }}>
                <Text style={styles.monthName}>{props.data.monthsArray[data]}</Text>
                <View style={styles.innerContainerGraph} >
                    {
                        lArr
                    }
                </View>
            </View>
        )
    });

    return (
        <View>
            <View style={styles.graphContainer}>
                {
                    arr
                }

            </View>
            <View style={{ alignSelf: 'center', marginTop: 25, flexDirection: 'row' }}>
                <BarType name={strings.chart.swiss} color="#5292e1" />
                <BarType name={strings.chart.europe} color="#d5773f" />
                <BarType name={strings.chart.overseas} color="#b5b5b5" />
            </View>
        </View>
    );
}

const MonthItem = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: props.backgroundColor, height: 25, }} />
    );
};

const BarType = (props) => {
    return (
        <View style={{ marginRight: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 10, height: 10, backgroundColor: props.color }} />
            <Text style={styles.barName}>{props.name}</Text>
        </View>
    )
}
