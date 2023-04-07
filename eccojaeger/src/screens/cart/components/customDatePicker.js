/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
// import { styles } from '../cart.style';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import GlobalStyle from '../../../style/globalstyle';
import moment from 'moment';
import { useSelector } from 'react-redux';

export default function CustomDatePicker(props) {
  const authState = useSelector(state => state.rootReducers?.authState);
  const [date, setDate] = useState(new Date(props?.date));
  const [open, setOpen] = useState(false);

  if (authState.language === 'de') {
    LocaleConfig.defaultLocale = 'de';
  } else {
    LocaleConfig.defaultLocale = 'en';
  }

  const d = new Date();
  const [firstDay, setFirstDate] = useState(new Date(d.getFullYear(), d.getMonth(), 1));
  const [lastDay, setLastDay] = useState(new Date(d.getFullYear(), d.getMonth() + 1, 0));

  const handleDateData = (_startDate, _endDate) => {
    let markedDates = {};
    let currentDate = moment(firstDay);
    let endDate = moment(lastDay);
    let dataWeekend = [0, 1, 2, 3, 4, 5, 6];
    let mark = {};

    props?.holidayData?.map((data) => {
      return mark[moment(data, "DD-MM-YYYY")?.format('YYYY-MM-DD')] = {
        disabled: true,
        dots: []
      };
    })
    let final = dataWeekend.filter((data) => !props?.accountDeliverDays?.includes(data.toString()));
    while (currentDate <= endDate) {
      const day = currentDate.day();
      const currentDateFormatted = currentDate.format('YYYY-MM-DD');

      let markup = {};

      if (final?.includes(day)) {
        markup.disabled = true;
      }

      markup.dots = [];
      markedDates[currentDateFormatted] = markup;

      currentDate = moment(currentDate).add(1, 'days');
    }
    let merged = { ...markedDates, ...mark };
    return merged;
  };

  const getDateFormatted = () => {
    return authState.language === 'de' ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` :
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <>
      <Pressable style={styles.dateBox} onPress={() => setOpen(true)}>
        <Text
          style={styles.dateInput}
        >
          {getDateFormatted()}
        </Text>
        <Icon
          name="calendar-o"
          type="font-awesome"
          color="#fff"
          size={(19)}
          style={styles.dateIcon}
        />
      </Pressable>

      <Overlay
        isVisible={open}
        onBackdropPress={() => setOpen(false)}
        backdropStyle={styles.backdropContainer}
        overlayStyle={styles.innerOverlay}>
        <Calendar
          firstDay={authState.language === 'de' ? 1 : 0}
          markingType={'periods'}
          markedDates={
            handleDateData(firstDay, lastDay)
          }
          minDate={moment(props?.date).format('YYYY-MM-DD')}
          disableAllTouchEventsForDisabledDays={true}
          onMonthChange={month => {
            let date = new Date(month?.dateString);
            setFirstDate(new Date(date?.getFullYear(), date?.getMonth(), 1));
            setLastDay(new Date(date?.getFullYear(), date?.getMonth() + 1, 0));
          }}
          theme={{
            selectedDayBackgroundColor: '#00adf5',
          }}
          onDayPress={day => {

            setDate(new Date(day?.dateString));
            setOpen(false);
            props.onDateSelect(day?.dateString)
          }}
          current={date}
        />
      </Overlay>
    </>
  );
}

export const styles = StyleSheet.create({
  dateBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    // width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: (10),
    flex: 1,
  },
  dateInput: {
    color: '#222222',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingBottom: 0,
    paddingLeft: (10),
    paddingRight: (5),
    paddingTop: (7),
    flex: 1,
    height: (30),
  },
  dateIcon: {
    // backgroundColor: '#009640',
    backgroundColor: '#E04D01CC',
    paddingTop: (7),
    height: (31),
    width: (41),
  },
  backdropContainer: {
    backgroundColor: '#43464B',
    opacity: 0.65,
  },
  innerOverlay: {
    backgroundColor: '#fff',
    width: '93%',
    paddingHorizontal: (20),
  },
});