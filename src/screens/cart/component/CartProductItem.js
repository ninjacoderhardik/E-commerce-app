/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {Icon} from 'native-base';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import Colors from '../../../constants/colors';
import {getResponsiveWidth, getResponsiveHeight} from '../../../helper/utils';
import * as cartActions from '../../../store/cart/cart.actions';
import Fonts from '../../../constants/fontStyles';

class CartProductItem extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const previousProduct = this.props.products.find(
      (e) => e.product_id === this.props.productDetail.product_id,
    );

    const nextPropsProduct = nextProps.products.find(
      (e) => e.product_id === this.props.productDetail.product_id,
    );

    if (previousProduct !== nextPropsProduct) {
      return true;
    }

    return false;
  }

  render() {
    const {
      removeFromCart,
      updateInCart,
      productDetail,
      onPressRemark,
    } = this.props;

    return (
      <View style={styles.itemContainer}>
        <FastImage
          source={
            productDetail?.image
              ? {
                  uri: productDetail?.image,
                }
              : IMAGES.LOGO
          }
          style={styles.productImage}
        />
        <View style={styles.itemContent}>
          <View style={[styles.rowContainer]}>
            <View style={styles.rowContent}>
              <Text style={styles.itemTitle}>
                #{productDetail?.product_code}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => removeFromCart(productDetail.product_id)}
              style={styles.btnDeleteIconContainer}>
              <Icon
                name="delete"
                type="AntDesign"
                style={styles.btnDeleteIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.rowContainer]}>
            <View style={styles.rowContent}>
              <Text style={styles.itemSubTitle}>
                Weight: {productDetail?.weight}gm
              </Text>
              <Text style={styles.itemSubTitle}>KT: {productDetail?.kt}</Text>
              <Text style={styles.itemSubTitle}>
                Diamond: {productDetail?.stone}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => onPressRemark(productDetail)}
              style={[styles.btnDeleteIconContainer, {marginTop: 10}]}>
              <Icon name="edit" type="AntDesign" style={styles.btnDeleteIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <View style={[styles.rowContent, {maxWidth: 250}]}>
              <View style={styles.plusMinusContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (productDetail.quantity === 1) {
                      return removeFromCart(productDetail.product_id);
                    }

                    return updateInCart(
                      productDetail.product_id,
                      productDetail.quantity - 1,
                    );
                  }}
                  style={styles.plusMinusContent}>
                  <Icon
                    name="minus"
                    type="Feather"
                    style={styles.plusMinusIcon}
                  />
                </TouchableOpacity>
                <View style={styles.qtyContainer}>
                  <Text style={styles.qtyText}>{productDetail.quantity}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    return updateInCart(
                      productDetail.product_id,
                      productDetail.quantity + 1,
                    );
                  }}
                  style={styles.plusMinusContent}>
                  <Icon
                    name="plus"
                    type="Feather"
                    style={styles.plusMinusIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    borderRadius: getResponsiveWidth(2),
    marginHorizontal: getResponsiveWidth(1),
    paddingHorizontal: getResponsiveWidth(2),
    paddingVertical: getResponsiveHeight(1.5),
    marginVertical: getResponsiveHeight(0.5),
  },
  productImage: {
    height: '100%',
    width: '30%',
    borderRadius: getResponsiveWidth(1),
  },
  itemContent: {
    flex: 1,
    paddingLeft: getResponsiveWidth(2),
  },
  listContent: {
    paddingHorizontal: getResponsiveWidth(2),
    paddingVertical: getResponsiveHeight(1),
  },
  itemTitle: {
    fontSize: Fonts.LARGE,
    fontWeight: '500',
    fontFamily: 'Montserrat-Bold',
    marginBottom: getResponsiveHeight(0.5),
    color: Colors.TextColor,
  },
  itemSubTitle: {
    fontSize: Fonts.SMALL,
    fontWeight: '400',
    fontFamily: 'Montserrat-Bold',
    color: Colors.ContrastTextColor,
  },

  addtoCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.TintColor,
    borderRadius: 8,
    height: 45,
  },
  addtoCartText: {
    fontSize: Fonts.LARGE,
    fontWeight: '500',
    fontFamily: 'Montserrat-Bold',
    color: Colors.White,
    textAlign: 'center',
  },
  btnAddIcon: {
    fontSize: 25,
    color: Colors.White,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContent: {
    flex: 1,
  },

  plusMinusContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.ContrastTextColor,
    borderWidth: 1,
    borderRadius: 8,
  },
  plusMinusContent: {
    flex: 0.3,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  plusMinusIcon: {
    color: Colors.TextColor,
    textAlign: 'center',
    fontSize: 20,
  },
  qtyContainer: {
    flex: 0.4,
    borderColor: Colors.ContrastTextColor,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingVertical: 5,
    height: '100%',
  },
  qtyText: {
    color: Colors.TextColor,
    fontWeight: '600',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    fontSize: Fonts.MEDIUM,
    lineHeight: 32,
  },
  btnContainer: {
    paddingTop: getResponsiveHeight(1),
  },

  btnDeleteIconContainer: {
    borderColor: Colors.LightGray,
    borderWidth: 2,
    borderRadius: getResponsiveHeight(4),
    height: getResponsiveHeight(5),
    width: getResponsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 55,
    maxHeight: 55,
  },
  btnDeleteIcon: {
    fontSize: 25,
    color: Colors.LightGray,
  },
});

const mapStateToProps = ({cart}) => ({
  products: cart.products,
});

const mapDispatchToProps = {...cartActions};

export default connect(mapStateToProps, mapDispatchToProps)(CartProductItem);
