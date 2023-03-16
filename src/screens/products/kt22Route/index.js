import React, {Component} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Modal,
  View,
  RefreshControl,
} from 'react-native';
import {Container, Icon} from 'native-base';
import FastImage from 'react-native-fast-image';
import styles from '../styles';
import globalStyles from '../../../constants/globalStyles';
import {CircleFade} from 'react-native-animated-spinkit';
import ImageViewer from 'react-native-image-zoom-viewer';
import Colors from '../../../constants/colors';
import ProductItem from '../../../components/ProductItem';
import EmptyLoader from '../../../components/EmptyLoader';
import EmptyMessage from '../../../components/EmptyMessage';

export default class KT22Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: true,
      isRefreshing: false,
      loadingMore: false,
      showImage: false,
      zoomImage: [{url: ''}],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async (page = 1) => {
    const {_doProducts, category} = this.props;
    const {productData, isRefreshing} = this.state;

    const params = {
      page,
      sub_category_id: category?.sub_category_id,
      kt: 22,
    };

    const response = await _doProducts(params);

    if (response && response?.data) {
      if (isRefreshing) {
        this.setState({
          productData: response?.data || [],
        });
      } else {
        this.setState({
          productData: productData.concat(response?.data || []),
        });
      }
      this.setState({
        totalPages: response?.meta?.last_page || 1,
        isLoading: false,
        loadingMore: false,
        isRefreshing: false,
      });
    } else {
      this.setState({
        isLoading: false,
        loadingMore: false,
        isRefreshing: false,
      });
    }
  };

  _renderItem = ({item}) => {
    return (
      <ProductItem
        productDetail={item}
        onImagePress={(url) =>
          this.setState({zoomImage: [{url}]}, () =>
            this.setState({showImage: true}),
          )
        }
      />
    );
  };

  handleLoadMore = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      const {currentPage, totalPages} = this.state;
      if (currentPage < totalPages) {
        this.setState(
          (prevState) => ({
            currentPage: prevState.currentPage + 1,
            loadingMore: true,
          }),
          () => {
            this.getProducts(this.state.currentPage);
          },
        );
      }
    }

    this.onEndReachedCalledDuringMomentum = true;
  };

  renderFooter = () => {
    if (!this.state.loadingMore) {
      return null;
    }

    return (
      <View style={styles.spinner}>
        <CircleFade size={50} color={Colors.Black} />
      </View>
    );
  };

  render() {
    const {
      productData,
      isLoading,
      isRefreshing,
      zoomImage,
      showImage,
    } = this.state;

    return (
      <Container style={globalStyles.container}>
        {isLoading ? (
          <EmptyLoader />
        ) : productData?.length === 0 ? (
          <EmptyMessage message="No Product Found" />
        ) : (
          <FlatList
            data={productData}
            numColumns={2}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                tintColor={Colors.tintColor}
                onRefresh={() =>
                  this.setState({isRefreshing: true}, () => this.getProducts())
                }
              />
            }
            contentContainerStyle={styles.listContent}
            renderItem={this._renderItem}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            onEndReached={this.handleLoadMore}
            ListFooterComponent={this.renderFooter}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item?.product_id?.toString()}
          />
        )}
        <Modal animationType="fade" visible={showImage} transparent={true}>
          <ImageViewer
            imageUrls={zoomImage}
            useNativeDriver={true}
            enableSwipeDown={true}
            loadingRender={() => <CircleFade size={50} color={Colors.White} />}
            onSwipeDown={() => this.setState({showImage: false})}
            renderImage={(props) => <FastImage {...props} />}
            renderHeader={(currentIndex) => (
              <TouchableOpacity
                style={globalStyles.closeContainer}
                onPress={() => this.setState({showImage: false})}>
                <Icon
                  name="close"
                  type="AntDesign"
                  style={globalStyles.closeIcon}
                />
              </TouchableOpacity>
            )}
          />
        </Modal>
      </Container>
    );
  }
}
