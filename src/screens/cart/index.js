/* eslint-disable no-shadow */
import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import {Container, Icon} from 'native-base';
import {OutlinedTextField} from 'react-native-material-textfield';
import {CircleFade} from 'react-native-animated-spinkit';
import connect from './connect';
import styles from './styles';
import globalStyles from '../../constants/globalStyles';
import Colors from '../../constants/colors';
import CartProductItem from './component/CartProductItem';
import EmptyMessage from '../../components/EmptyMessage';

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      remark: '',
      errors: {},
      currentProduct: {},
      isLoading: false,
      errorMessage: '',
    };

    this.remarkRef = this.updateRef.bind(this, 'remark');
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  onPressRemark = (product) => {
    this.setState(
      {currentProduct: product, remark: product?.remark || ''},
      () => {
        this.setState({isShowModal: true});
      },
    );
  };

  _renderItem = ({item}) => {
    return (
      <CartProductItem
        productDetail={item}
        onPressRemark={this.onPressRemark}
      />
    );
  };

  _doUpdateRemarkForProduct = () => {
    const {updateInCartRemark} = this.props;
    const {currentProduct, remark} = this.state;

    updateInCartRemark(currentProduct.product_id, remark);
    this.setState({isShowModal: false});
  };

  _doPlaceOrderConfirm = () => {
    Alert.alert(
      'Order',
      'Do you really want to place order?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this._doOrder()},
      ],
      {cancelable: false},
    );
  };

  _doOrder = async () => {
    const {_doOrder, clearCart, user, products} = this.props;

    this.setState({isLoading: true});

    let productsArr = [];
    products.forEach((e) => {
      productsArr.push({
        product_id: e.product_id,
        qty: e.quantity,
        note: e.remark,
      });
    });

    const formData = new FormData();
    formData.append('user_id', user?.user?.id);
    formData.append('products', JSON.stringify(productsArr));

    const response = await _doOrder(formData);

    if (response) {
      if (response.status === true) {
        clearCart();
      }
      Alert.alert(
        response?.message ||
          'Sorry, something has gone wrong, please try again',
      );
    } else {
      Alert.alert('Sorry, something has gone wrong, please try again');
    }
    this.setState({isLoading: false});
  };

  render() {
    const {products} = this.props;
    const {
      errors = {},
      remark,
      isShowModal,
      currentProduct,
      isLoading,
    } = this.state;

    return (
      <Container style={globalStyles.container}>
        {products?.length === 0 ? (
          <EmptyMessage message="Your cart is Empty!" />
        ) : (
          <FlatList
            data={products}
            contentContainerStyle={styles.contentContainer}
            renderItem={this._renderItem}
            keyExtractor={(item) => item?.product_id?.toString()}
          />
        )}
        {products.length > 0 && (
          <TouchableOpacity
            style={globalStyles.btnContainer}
            onPress={() => this._doPlaceOrderConfirm()}>
            {isLoading ? (
              <CircleFade size={23} color={Colors.White} />
            ) : (
              <Text style={globalStyles.btnText}>Place Order</Text>
            )}
          </TouchableOpacity>
        )}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isShowModal}
          onRequestClose={() => {
            this.setState({isShowModal: false});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <View style={styles.container}>
                  <Text style={styles.headerText}>
                    #{currentProduct?.product_code}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.setState({isShowModal: false})}>
                  <Icon
                    name="close"
                    type="AntDesign"
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={styles.modalcontentContainer}>
                <Text style={styles.modalText}>
                  You can add product specific remark here.
                </Text>
                <View style={styles.textInputContent}>
                  <OutlinedTextField
                    ref={this.remarkRef}
                    label="Remark"
                    multiline
                    numberOfLines={4}
                    style={globalStyles.textInput}
                    labelTextStyle={globalStyles.textInput}
                    titleTextStyle={globalStyles.textInput}
                    tintColor={Colors.Black}
                    baseColor={Colors.Black}
                    errorColor={Colors.Black}
                    value={remark}
                    onChangeText={(remark) => this.setState({remark})}
                    error={errors.remark}
                  />
                </View>
                <View style={styles.content}>
                  <TouchableOpacity
                    style={globalStyles.btnContainer}
                    onPress={() => this._doUpdateRemarkForProduct()}>
                    <Text style={globalStyles.btnText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

export default connect(CartScreen);
