import React, {Component} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  RefreshControl,
} from 'react-native';
import {Container, Icon, Content} from 'native-base';
import FastImage from 'react-native-fast-image';
import connect from './connect';
import styles from './styles';
import globalStyles from '../../constants/globalStyles';
import {SliderBox} from 'react-native-image-slider-box';
import {CircleFade} from 'react-native-animated-spinkit';
import ImageViewer from 'react-native-image-zoom-viewer';
import Colors from '../../constants/colors';
import IMAGES from '../../constants/images';
import {getResponsiveHeight} from '../../helper/utils';
import EmptyLoader from '../../components/EmptyLoader';
import ProductItem from '../../components/ProductItem';
import EmptyMessage from '../../components/EmptyMessage';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderImages: [],
      categoryData: [],
      productData: [],
      isLoading: true,
      isRefreshing: false,
      showImage: false,
      zoomImage: [{url: ''}],
    };
  }

  componentDidMount() {
    this.getDashboard();
  }

  getDashboard = async () => {
    const {getDashboard} = this.props;

    const response = await getDashboard();

    if (response && response?.status === true) {
      if (response?.slider.length > 0) {
        let arrImg = [];

        response?.slider?.forEach((element) => {
          arrImg.push(element.image);
        });

        this.setState({
          sliderImages: arrImg,
        });
      }
      this.setState({
        categoryData: response.category,
        productData: response.products,
        isLoading: false,
        isRefreshing: false,
      });
    } else {
      this.setState({isLoading: false, isRefreshing: false});
    }
  };

  _renderItemCategory = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          this.props.navigation.navigate('Categories', {category: item})
        }
        style={styles.itemContainer}>
        <FastImage
          source={
            item?.image
              ? {
                  uri: item?.image,
                }
              : IMAGES.LOGO
          }
          style={styles.categoryImage}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.categoryText}>{item?.name}</Text>
        </View>
      </TouchableOpacity>
    );
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

  render() {
    const {
      isLoading,
      isRefreshing,
      sliderImages,
      categoryData,
      productData,
      zoomImage,
      showImage,
    } = this.state;

    return (
      <Container style={globalStyles.container}>
        {isLoading ? (
          <EmptyLoader />
        ) : sliderImages.length === 0 &&
          categoryData.length === 0 &&
          productData.length === 0 ? (
          <EmptyMessage message="No Data Found" />
        ) : (
          <Content
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                tintColor={Colors.tintColor}
                onRefresh={() =>
                  this.setState({isRefreshing: true}, () => this.getDashboard())
                }
              />
            }>
            {sliderImages.length > 0 && (
              <SliderBox
                ImageComponent={FastImage}
                images={sliderImages}
                sliderBoxHeight={getResponsiveHeight(30)}
                autoplay
                circleLoop
                disableOnPress
                ImageComponentStyle={{backgroundColor: Colors.LightGray}}
                dotColor={Colors.TintColor}
                inactiveDotColor={Colors.White}
                imageLoadingColor={Colors.TintColor}
              />
            )}
            <View style={styles.listTitle}>
              <View style={styles.content}>
                <Text style={styles.itemTitle}>Categories</Text>
              </View>
              {/* <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Categories')}>
                <Text style={styles.itemLink}>View all</Text>
              </TouchableOpacity> */}
            </View>
            <FlatList
              data={categoryData}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={this._renderItemCategory}
              keyExtractor={(item) => item?.category_id?.toString()}
            />
            <View style={styles.listTitle}>
              <Text style={styles.itemTitle}>Popular Product</Text>
            </View>
            <FlatList
              bounces={false}
              data={productData}
              numColumns={2}
              contentContainerStyle={styles.listContent}
              renderItem={this._renderItem}
              keyExtractor={(item) => item?.product_id?.toString()}
            />
          </Content>
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

export default connect(DashboardScreen);
