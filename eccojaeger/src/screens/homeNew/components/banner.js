/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import normalize from 'react-native-normalize';
import BannerImages from './bannerImages';

const Banner = React.memo((props) => {
  return (
    <>
      <View style={styles.bannerBox}>
        <SliderBox
          ImageComponent={(item) => <BannerImages item={item} handleProductDetail={props?.handleProductDetail} />}
          images={props?.articles ? props?.articles : []}
          dotColor="#E04D01B2"
          inactiveDotColor="#A0A3BD"
          autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
          paginationBoxStyle={styles.dotSlideBox}
          dotStyle={styles.dotSlide}
          LoaderComponent={() => null}
          ImageComponentStyle={styles.sliderWrap}
        />
      </View>
      {/* 
      <View style={styles.sortingBox}>
        <Text style={styles.sortLabel}>{strings.common.sortBy}</Text>
        <SortDropDown data={props.data} value={props.value} setSort={props.setSort} />
      </View> */}

    </>
  );
})

export default Banner;

export const styles = StyleSheet.create({
  sliderWrap: {
    borderRadius: (0),
    flex: 1,
  },
  dotSlide: {
    width: (7),
    height: (7),
    borderRadius: (50),
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: '#000',
  },
  dotSlideBox: {
    position: 'absolute',
    bottom: (-14),
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
  },
  bannerBox: {
    marginBottom: (30),
    marginTop: (15),
  },
})