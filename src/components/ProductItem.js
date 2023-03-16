/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Icon} from 'native-base';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import Colors from '../constants/colors';
import {getResponsiveWidth, getResponsiveHeight} from '../helper/utils';
import IMAGES from '../constants/images';
import * as cartActions from '../store/cart/cart.actions';

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImage: false,
    };
  }

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
      addToCart,
      removeFromCart,
      updateInCart,
      productDetail,
      products,
      onImagePress = () => null,
    } = this.props;

    const cartProduct = products.find(
      (e) => e.product_id === productDetail.product_id,
    );

    return (
      <>
        <View style={[styles.itemContainer, {width: getResponsiveWidth(46)}]}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              productDetail?.image && onImagePress(productDetail?.image)
            }>
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
          </TouchableOpacity>
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>#{productDetail?.product_code}</Text>
            <Text style={styles.itemSubTitle}>
              Weight: {productDetail?.weight}gm
            </Text>
            <Text style={styles.itemSubTitle}>KT: {productDetail?.kt}</Text>
            <Text style={styles.itemSubTitle}>
              {productDetail?.category_id === 2 ? 'Touch' : `Diamond`}:{' '}
              {productDetail?.stone}
            </Text>
            <View style={styles.btnContainer}>
              {cartProduct ? (
                <View style={[styles.rowContent, {maxWidth: 250}]}>
                  <View style={styles.plusMinusContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        if (cartProduct.quantity === 1) {
                          return removeFromCart(productDetail.product_id);
                        }

                        return updateInCart(
                          productDetail.product_id,
                          cartProduct.quantity - 1,
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
                      <Text style={styles.qtyText}>{cartProduct.quantity}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        return updateInCart(
                          productDetail.product_id,
                          cartProduct.quantity + 1,
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
              ) : (
                <TouchableOpacity
                  style={styles.addtoCartBtn}
                  onPress={() => {
                    addToCart(productDetail);
                  }}>
                  <Icon
                    name="shopping-cart"
                    type="Feather"
                    style={styles.btnAddIcon}
                  />
                  <View style={styles.rowContent}>
                    <Text style={styles.addtoCartText}>ADD</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.White,
    borderRadius: getResponsiveWidth(2),
    marginHorizontal: getResponsiveWidth(1),
    paddingHorizontal: getResponsiveWidth(2),
    paddingTop: getResponsiveHeight(1.5),
    paddingBottom: getResponsiveHeight(1),
    marginVertical: getResponsiveHeight(0.5),
  },
  productImage: {
    height: getResponsiveWidth(40),
    width: '100%',
  },
  itemContent: {
    paddingVertical: getResponsiveHeight(1),
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
    height: 50,
    maxWidth: 250,
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
    height: 50,
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
    lineHeight: 35,
  },
  btnContainer: {
    paddingTop: getResponsiveHeight(1),
  },
});

const mapStateToProps = ({cart}) => ({
  products: cart.products,
});

const mapDispatchToProps = {...cartActions};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
