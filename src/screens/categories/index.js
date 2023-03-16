import React, {Component} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  RefreshControl,
} from 'react-native';
import {Container, Icon} from 'native-base';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import connect from './connect';
import styles from './styles';
import globalStyles from '../../constants/globalStyles';
import {CircleFade} from 'react-native-animated-spinkit';
import Colors from '../../constants/colors';
import IMAGES from '../../constants/images';
import EmptyLoader from '../../components/EmptyLoader';
import EmptyMessage from '../../components/EmptyMessage';

class CategoriesScreen extends Component {
  constructor(props) {
    super(props);
    const {category = {}} = this.props.route.params;

    this.props.navigation.setOptions({
      title: category?.name,
    });

    this.state = {
      category,
      categoryData: [],
      isLoading: true,
      isRefreshing: false,
      showImage: false,
      zoomImage: [{url: ''}],
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories = async () => {
    const {category} = this.state;
    const {getSubCategories} = this.props;

    const params = {
      id: category?.category_id,
    };

    const response = await getSubCategories(params);

    if (response && response?.status === true) {
      this.setState({
        categoryData: response.data,
        isLoading: false,
        isRefreshing: false,
      });
    } else {
      this.setState({isLoading: false, isRefreshing: false});
    }
  };

  _renderItem = ({item}) => {
    const {category} = this.state;
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          this.props.navigation.navigate(
            category?.category_id === 2 ? 'ProductsWithoutTab' : 'Products',
            {
              category: item,
            },
          )
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

  render() {
    const {
      categoryData,
      isLoading,
      isRefreshing,
      zoomImage,
      showImage,
    } = this.state;

    return (
      <Container style={globalStyles.container}>
        {isLoading ? (
          <EmptyLoader />
        ) : categoryData?.length === 0 ? (
          <EmptyMessage message="No Sub Category Found" />
        ) : (
          <FlatList
            data={categoryData}
            numColumns={2}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                tintColor={Colors.tintColor}
                onRefresh={() =>
                  this.setState({isRefreshing: true}, () =>
                    this.getCategories(),
                  )
                }
              />
            }
            contentContainerStyle={styles.listContent}
            renderItem={this._renderItem}
            keyExtractor={(item) => item?.category_id?.toString()}
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

export default connect(CategoriesScreen);
