/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SafeAreaView, View, Text, Pressable, InteractionManager, AppState, ActivityIndicator, Alert } from 'react-native';
import { Categories } from './components';
import { styles } from './homeNew.style';
import { SearchButton, NoInternet, Toasts, EmptyMessage } from '../../components';
import FilterIcon from '../../assets/images/filter.png';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { NAVIGATION } from '../../constants';
import { strings } from '../../localization';
import { getDBConnection, saveProductItems, createTable, checkIfTableExist, deleteItems } from '../../services/db-service';
import moment from 'moment';
import { CHECK_THRESHOLD, ONE_DAY, PAGE_SIZE } from '../../constants/constants';
import FastImage from 'react-native-fast-image'
import { Overlay, LinearProgress } from 'react-native-elements';
import SplashScreen from "react-native-splash-screen";

const HomeNewView = (props) => {
  const authState = useSelector(state => state.rootReducers?.authState);
  const productState = useSelector(state => state.rootReducers?.productState);
  const network = useSelector(state => state.rootReducers?.productState.network);
  const masterState = useSelector(state => state.rootReducers?.masterState);
  const buyingState = useSelector((state) => state.rootReducers?.buyingState);
  const [db, setDb] = useState(null)
  const [sort, setSort] = useState({
    id: 'default',
    name: strings.common.alphabet
  })
  const [type, setType] = useState(null)
  const [alertFlag, setAlert] = useState(false);
  const [message, setMessage] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const syncTimeRef = React.useRef(productState?.syncedTime);
  const pageRef = React.useRef(productState?.productListSyncedData?.metaData?.data?.paginationVariables)
  const [shopSwitch, setShopSwitch] = useState(false)
  const syncMessage = useRef(strings.common.syncMessage);

  const dbRef = useRef(null);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerBackVisible: false,
      headerRight: () => (
        <Pressable onPress={() => handleClickFilter()} >
          <FastImage source={FilterIcon} style={styles.filterIcon} />
        </Pressable>
      ),
    });
  });

  const loadDataCallback = (async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      dbRef.current = db
      setDb(db)
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    SplashScreen.hide();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === "active") {
        //callCategoryListAPI()
        checkResetThreshold()
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    syncTimeRef.current = productState?.syncedTime
  }, [productState?.syncedTime]);

  // useEffect(() => {
  //   loadDataCallback();
  // }, [loadDataCallback]);

  useEffect(() => {
    if (db) {
      checkResetThreshold()
    }
  }, [db])

  useEffect(() => {
    if (network?.isConnected && db) {
      pageRef.current = productState?.productListSyncedData?.metaData?.data?.paginationVariables
      loadProduct()
    }
  }, [db, productState?.productListSyncedData?.metaData, network?.isConnected]);


  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (buyingState?.buyingList?.data?.data) {
        buyingState?.buyingList?.data?.data.map((item) => {
          if (!buyingState?.item[item.id]) {
            props.actions.buyingProductListAction(item, 0);
          }
        })
      }
    })
  }, [buyingState?.buyingList]);

  useEffect(() => {
    if (authState?.accountID) {
      if (dbRef.current) {
        checkIfTableExist(dbRef.current, (resp) => {
          if (!resp) {
            loadDataCallback();
            props.actions.resetProductListPaginationInfo()
          } else {
            // Avoid Switching shop alert after logout and login again
            const metaDataOnLoad = productState?.productListSyncedData?.metaData?.data?.paginationVariables
            if (metaDataOnLoad && metaDataOnLoad.current === metaDataOnLoad.last && productState?.syncedTime[authState.accountID]) {
              syncMessage.current = strings.common.switchMessage
              syncShopData()
            } else {
              props.actions.resetProductListPaginationInfo()
            }
          }
        })
      } else {
        loadDataCallback();
      }
    } else {
      loadDataCallback();
    }
  }, [authState.accountID])

  useEffect(() => {
    if (dbRef.current && productState?.forceSyncUpdate && productState.forceSyncUpdate !== 0) {
      syncMessage.current = strings.common.syncMessage
      syncShopData()
    }
  }, [productState.forceSyncUpdate])

  const syncShopData = (page = 1) => {
    setShopSwitch(true)
    let obj = {
      producers: [],
      Brand: [],
      limit: PAGE_SIZE,
      page: page,
      category: '',
      Origin: [],
      vegan: 0,
      veggie: 0,
      Glutenfree: 0,
      Laktosefrei: 0,
      newProduct: 0,
      TK: 0,
      sort: sort,
      promotional: 0,
      time: Math.floor(new Date(productState?.syncedTime[authState.accountID]).getTime() / 1000)
    };
    //console.log(dbRef)
    props?.actions?.deltaSyncDataAction(obj, (data) => {
      if (data?.products) {
        if (data?.productsIds) {
          deleteItems(dbRef.current, data.productsIds.toString())
          //console.log("sync ShopData item deleted")
        }
        if (data.products.length > 0) {
          saveProductItems(dbRef.current, data.products, (resp) => {
            //console.log("sync ShopData saved")
            if (data?.paginationVariables) {
              if (data.paginationVariables.current < data.paginationVariables.last) {
                syncShopData(data.paginationVariables.current + 1)
              }
              if (data.paginationVariables.current === data.paginationVariables.last) {
                //console.log("sync ShopData completed")
                props.actions.saveProductListSyncedTime({ [authState?.accountID]: moment().toDate() })
                props?.actions?.sliderListAction();
                callCategoryListAPI()
                setShopSwitch(false)
              }
            }
          }, (err) => {
          });
        } else {
          setShopSwitch(false)
        }
      } else {
        Alert.alert("Information", strings.common.dataUpdated)
        setShopSwitch(false)
      }
    }, (error) => {
      setShopSwitch(false)
    })
  }

  const checkResetThreshold = () => {
    if (syncTimeRef?.current && syncTimeRef?.current[authState?.accountID]) {
      const metaDataOnLoad = pageRef.current
      if (metaDataOnLoad?.current === metaDataOnLoad?.last) {
        // check sync date is same as current date the check the difference with threshold
        if (moment().isSame(syncTimeRef.current[authState.accountID], 'date')) {
          var diff = moment().diff(syncTimeRef.current[authState.accountID], 'minute')
          //console.log("DIFF:", diff)
          if (diff >= CHECK_THRESHOLD) {
            syncShopData()
          }
        } else {
          // if date is different and start sync
          syncShopData()
        }
      }
    }
  }

  const loadProduct = () => {
    const metaDataOnLoad = productState?.productListSyncedData?.metaData?.data?.paginationVariables
    if (metaDataOnLoad) {
      if (productState?.network && metaDataOnLoad?.last > metaDataOnLoad?.current) {
        handleProductList(metaDataOnLoad?.current + 1)
      }
    } else {
      props?.actions?.sliderListAction();
      callCategoryListAPI()
      handleProductList(1)
    }

    /*
    This means all product synced and stored in database. Save a timestamp in redux and check if threshold passed;
    If threshold pass then reset 'productState?.productListSyncedData' to get fresh product list.
    */
  }

  const callCategoryListAPI = () => {
    props.actions.categoryListAction({}, (response) => {
      setIsFetching(false)
      getBuyingListProduct()
    }, (response) => {
      setIsFetching(false)
      getBuyingListProduct()
    });
  }

  const getBuyingListProduct = () => {
    if (buyingState?.buyingList?.data?.data) {
      buyingState?.buyingList?.data?.data.map((item) => {
        props.actions.buyingProductListAction(item, 0);
      })
    }
  }

  const handleProductList = async (page) => {
    let obj = {
      producers: [],
      Brand: [],
      limit: PAGE_SIZE,
      page: page,
      category: '',
      Origin: [],
      vegan: 0,
      veggie: 0,
      Glutenfree: 0,
      Laktosefrei: 0,
      newProduct: 0,
      TK: 0,
      sort: sort,
      promotional: 0
    };

    /*
    //March 5, 2023; To improve the performance comment the all item delete from DB;
    // Beacuse we use Insert/Update query to add record in DB
    if (page === 1) {
      await deleteAllItem(db)
    }*/
    InteractionManager.runAfterInteractions(() => {
      props.actions.productListLoadAction(obj, (response) => {
        saveProduct(response)
      }, (response) => {
        //console.log("Error:", response)
        alert("error")
      });
    });
  };

  const saveProduct = (response) => {
    InteractionManager.runAfterInteractions(() => {
      if (response.data.products?.length > 0) {
        saveProductItems(dbRef.current, response.data.products, (resp) => {
          props.actions.productListLoadSuccess(response)
        }, (err) => {
        });
      } else {
        props.actions.productListLoadSuccess(response)
      }

      if (response.data.paginationVariables.current === response.data.paginationVariables.last) {
        props.actions.saveProductListSyncedTime({ [authState?.accountID]: moment().toDate() })
      }
    });
  }

  const handleClickFilter = () => {
    props.navigation.navigate(NAVIGATION.homeFilter, { filter: true, search: false })
  };

  const handleCategories = (item) => {
    if (item?.sub?.length > 0) {
      props.navigation.push(NAVIGATION.homeNewChild, { item: item });
    } else {
      props.navigation.navigate(NAVIGATION.productLists, { item: item });
    }
  }

  const handleProductDetail = (data) => {
    props.actions.productDetailsAction(data, (response) => {
      props.navigation.navigate(NAVIGATION.productDetail, { data: response?.data?.product });
    }, (response) => {
      //console.log("ERROR", response)
      setAlert(true);
      setMessage(response.message)
      setType('error')
    });
  };

  const handleHide = () => {
    setAlert(false);
    setMessage('')
    setType(null)
  }

  const onRefresh = () => {
    setIsFetching(true)
    props?.actions?.sliderListAction()
    callCategoryListAPI()
  }

  const getView = () => {
    if (productState?.productList?.data?.sub && productState?.productList?.data?.sub.length > 0) {
      return (
        <Categories
          banner={true}
          bannerKey={0}
          onPress={(item) => handleCategories(item)}
          articles={masterState?.sliderList?.data?.data ? masterState?.sliderList?.data?.data : []}
          filterData={productState?.productList?.data?.sub.length > 0 ? productState?.productList?.data?.sub : null}
          handleProductDetail={handleProductDetail}
          onRefresh={onRefresh}
          isFetching={isFetching}
        />
      )
    } else {
      return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {
          productState?.productList?.loading ?
            <ActivityIndicator /> :
            <EmptyMessage title={strings.common.noData} />
        }
      </View>
    }
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      <SearchButton onPress={() => props.navigation.navigate(NAVIGATION.homeFilter, { filter: false, search: true })} />

      <Toasts message={message} type={type} show={alertFlag} handleHide={handleHide} />
      {
        !network?.isConnected && <NoInternet />
      }

      {
        getView()
      }

      <Overlay isVisible={(productState?.productListSyncedData?.metaData?.data?.paginationVariables?.current !== productState?.productListSyncedData?.metaData?.data?.paginationVariables?.last || !productState?.productListSyncedData?.metaData?.data?.paginationVariables?.current)}>
        <View style={{ width: 200, height: 80, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', color: '#000' }}>{strings.common.syncMessage}</Text>
          <LinearProgress
            style={{ marginTop: 20 }}
            value={productState?.productListSyncedData?.metaData?.data?.paginationVariables?.current ? (productState?.productListSyncedData?.metaData?.data?.paginationVariables?.current / productState?.productListSyncedData?.metaData?.data?.paginationVariables?.last) : 0.01}
            variant="determinate"
            color='rgba(224, 77, 1, 1)'
            trackColor='gray'
          />
        </View>
      </Overlay>

      <Overlay isVisible={shopSwitch}>
        <View style={{ width: 200, height: 80, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 5, textAlign: 'center', color: '#000' }}>{syncMessage?.current}</Text>
        </View>
      </Overlay>
    </SafeAreaView>
  );
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(HomeNewView);

