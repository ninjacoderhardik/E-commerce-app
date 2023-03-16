import React, {Component} from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Container} from 'native-base';
import moment from 'moment';
import styles from './styles';
import connect from './connect';
import globalStyles from '../../constants/globalStyles';
import Colors from '../../constants/colors';
import EmptyLoader from '../../components/EmptyLoader';
import EmptyMessage from '../../components/EmptyMessage';

class OrdersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: true,
      isRefreshing: false,
      loadingMore: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;

    this._unsubscribe = navigation.addListener('focus', () => {
      this.getOrders();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getOrders = async (page = 1) => {
    const {getOrders, user} = this.props;

    const params = {
      page,
      id: user?.user?.id,
    };

    const response = await getOrders(params);

    if (response && response?.data) {
      this.setState({
        orderData: response?.data || [],
        isLoading: false,
        isRefreshing: false,
      });
    } else {
      this.setState({
        isLoading: false,
        isRefreshing: false,
      });
    }
  };

  _renderItem = ({item}) => {
    let backgroundColor = Colors.White;

    if (item?.status === 'Pending') {
      backgroundColor = 'rgba(255, 255, 0, .2)';
    } else if (item?.status === 'Confirmed') {
      backgroundColor = 'rgba(0, 255, 0, .2)';
    } else if (item?.status === 'Cancelled') {
      backgroundColor = 'rgba(255, 0, 0, .2)';
    }

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('DocumentView', {documentDetail: item})
        }
        style={[styles.itemContainer, {backgroundColor}]}>
        <View style={styles.rowContainer}>
          <View style={styles.content}>
            <Text style={styles.itemTitle}>{item?.order_no}</Text>
          </View>
          <Text style={styles.itemSubTitle}>{item?.status}</Text>
        </View>
        <Text style={styles.itemDate}>
          {moment(item?.order_date).format('DD MMM YYYY hh:mm A')}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {orderData, isLoading, isRefreshing} = this.state;

    return (
      <Container style={globalStyles.container}>
        {isLoading ? (
          <EmptyLoader />
        ) : orderData?.length === 0 ? (
          <EmptyMessage message="No Product Found" />
        ) : (
          <FlatList
            data={orderData}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                tintColor={Colors.tintColor}
                onRefresh={() =>
                  this.setState({isRefreshing: true}, () => this.getOrders())
                }
              />
            }
            contentContainerStyle={styles.listContent}
            renderItem={this._renderItem}
            keyExtractor={(item) => item?.order_id?.toString()}
          />
        )}
      </Container>
    );
  }
}

export default connect(OrdersScreen);
