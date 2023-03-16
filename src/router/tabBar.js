/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Platform, View, Text} from 'react-native';
import {Icon} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Dashboard from '../screens/dashboard';
import Products from '../screens/products';
import ProductsWithoutTab from '../screens/productsWithoutTab';
import Categories from '../screens/categories';
import Cart from '../screens/cart';
import Orders from '../screens/orders';
import DocumentView from '../screens/documentView';
import Settings from '../screens/settings';
import AboutDeveloper from '../screens/aboutDeveloper';

import Colors from '../constants/colors';

const screenOptionsStyle = {
  headerBackTitleVisible: false,
  headerTitleStyle: {
    color: Colors.White,
    fontFamily: 'Montserrat-Bold',
  },
  headerTintColor: Colors.White,
  headerStyle: {
    backgroundColor: Colors.TintColor,
  },
};

const AppTabs = createBottomTabNavigator();

const DashboardStack = createStackNavigator();
const DashboardScreen = () => (
  <DashboardStack.Navigator screenOptions={screenOptionsStyle}>
    <DashboardStack.Screen name="Dashboard" component={Dashboard} />
    <DashboardStack.Screen name="Categories" component={Categories} />
    <DashboardStack.Screen name="Products" component={Products} />
    <DashboardStack.Screen
      name="ProductsWithoutTab"
      component={ProductsWithoutTab}
    />
  </DashboardStack.Navigator>
);

const CartStack = createStackNavigator();
const CartScreen = () => (
  <CartStack.Navigator screenOptions={screenOptionsStyle}>
    <CartStack.Screen name="Cart" component={Cart} />
  </CartStack.Navigator>
);

const OrdersStack = createStackNavigator();
const OrdersScreen = () => (
  <OrdersStack.Navigator screenOptions={screenOptionsStyle}>
    <OrdersStack.Screen name="Orders" component={Orders} />
    <OrdersStack.Screen name="DocumentView" component={DocumentView} />
  </OrdersStack.Navigator>
);

const SettingsStack = createStackNavigator();
const SettingsScreen = () => (
  <SettingsStack.Navigator screenOptions={screenOptionsStyle}>
    <SettingsStack.Screen name="Settings" component={Settings} />
    <SettingsStack.Screen
      name="AboutDeveloper"
      component={AboutDeveloper}
      options={{title: 'About Developer'}}
    />
  </SettingsStack.Navigator>
);

class AppTabsScreen extends Component {
  badge = null;

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.badge &&
      prevProps.products.length !== this.props.products.length
    ) {
      this.badge.rubberBand(1000);
    }
  }

  render() {
    const {products} = this.props;
    return (
      <AppTabs.Navigator
        tabBarOptions={{
          showLabel: false,
          activeTintColor: Colors.TintColor,
          inactiveTintColor: Colors.InActiveTintColor,
          style: {
            height: Platform.OS === 'android' ? 80 : 100,
          },
          iconStyle: {
            width: Platform.OS === 'android' ? 80 : 100,
            height: Platform.OS === 'android' ? 80 : 100,
          },
        }}>
        <AppTabs.Screen
          name="Home"
          component={DashboardScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused}) => (
              <Icon
                name="home"
                type="Feather"
                style={{
                  color: focused ? Colors.TintColor : Colors.InActiveTintColor,
                  fontSize: 28,
                }}
              />
            ),
          }}
        />
        <AppTabs.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({focused}) => (
              <View>
                <Icon
                  name="shopping-cart"
                  type="Feather"
                  style={{
                    color: focused
                      ? Colors.TintColor
                      : Colors.InActiveTintColor,
                    fontSize: 28,
                  }}
                />
                {products.length > 0 && (
                  <View style={{position: 'absolute', top: -10, right: -10}}>
                    <Animatable.View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 50,
                        backgroundColor: Colors.TintColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      ref={(ref) => (this.badge = ref)}>
                      <Text style={{color: Colors.White}}>
                        {products.length}
                      </Text>
                    </Animatable.View>
                  </View>
                )}
              </View>
            ),
          }}
        />
        <AppTabs.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            tabBarLabel: 'Orders',
            tabBarIcon: ({focused}) => (
              <Icon
                name="list"
                type="Entypo"
                style={{
                  color: focused ? Colors.TintColor : Colors.InActiveTintColor,
                  fontSize: 32,
                }}
              />
            ),
          }}
        />
        <AppTabs.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({focused}) => (
              <Icon
                name="setting"
                type="AntDesign"
                style={{
                  color: focused ? Colors.TintColor : Colors.InActiveTintColor,
                  fontSize: 30,
                }}
              />
            ),
          }}
        />
      </AppTabs.Navigator>
    );
  }
}

const mapStateToProps = ({cart}) => ({
  products: cart.products || [],
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppTabsScreen);
