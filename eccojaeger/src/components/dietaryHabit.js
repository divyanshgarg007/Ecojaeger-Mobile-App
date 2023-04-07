/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { strings } from '../localization';
import { styles } from './components.style';

export default function DietaryHabit(props) {
    return (
        <View style={styles.dietData}>
            <Text style={styles.labelData}>{strings.common.aboutProduct}</Text>
            <View style={styles.dataTable}>
                <CheckBox
                    checked={props?.data?.glutenfree}
                    checkedIcon={
                        <View style={styles.uncheck}>
                            <View style={styles.check} />
                        </View>
                    }
                    uncheckedIcon={<View style={styles.uncheck} />}
                    style={styles.check}
                    containerStyle={styles.checkbox}
                />
                <Text style={[styles.labelData, styles.innerData]}>{strings.common.glutenFree}</Text>
            </View>
            <View style={styles.dataTable}>
                <CheckBox
                    checked={props?.data?.laktosefrei}
                    checkedIcon={
                        <View style={styles.uncheck}>
                            <View style={styles.check} />
                        </View>
                    }
                    uncheckedIcon={<View style={styles.uncheck} />}
                    style={styles.check}
                    containerStyle={styles.checkbox}
                />
                <Text style={[styles.labelData, styles.innerData]}>{strings.common.lactoseFree}</Text>
            </View>
            <View style={styles.dataTable}>
                <CheckBox
                    checked={props?.data?.tk}
                    checkedIcon={
                        <View style={styles.uncheck}>
                            <View style={styles.check} />
                        </View>
                    }
                    uncheckedIcon={<View style={styles.uncheck} />}
                    style={styles.check}
                    containerStyle={styles.checkbox}
                />
                <Text style={[styles.labelData, styles.innerData]}>{strings.common.frozen}</Text>
            </View>
            <View style={styles.dataTable}>
                <CheckBox
                    checked={props?.data?.vegan}
                    checkedIcon={
                        <View style={styles.uncheck}>
                            <View style={styles.check} />
                        </View>
                    }
                    uncheckedIcon={<View style={styles.uncheck} />}
                    style={styles.check}
                    containerStyle={styles.checkbox}
                />
                <Text style={[styles.labelData, styles.innerData]}>{strings.common.vegan}</Text>
            </View>
            <View style={styles.dataTable}>
                <CheckBox
                    checked={props?.data?.veggie}
                    checkedIcon={
                        <View style={styles.uncheck}>
                            <View style={styles.check} />
                        </View>
                    }
                    uncheckedIcon={<View style={styles.uncheck} />}
                    style={styles.check}
                    containerStyle={styles.checkbox}
                />
                <Text style={[styles.labelData, styles.innerData]}>{strings.common.veggie}</Text>
            </View>
        </View>
    );
}
