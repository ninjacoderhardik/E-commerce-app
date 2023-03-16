/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Container} from 'native-base';
import connect from './connect';
import globalStyles from '../../constants/globalStyles';
import {TabView, TabBar} from 'react-native-tab-view';
import Colors from '../../constants/colors';
import {WIDTH} from '../../helper/utils';
import Fonts from '../../constants/fontStyles';
import KT18Route from './kt18Route';
import KT22Route from './kt22Route';

const initialLayout = {width: WIDTH};

class ProductsScreen extends Component {
  constructor(props) {
    super(props);
    const {category = {}} = this.props.route.params;

    this.props.navigation.setOptions({
      title: category?.name,
    });

    this.state = {
      category,
      index: 0,
      routes: [
        {key: 'KT18', title: '18KT'},
        {key: 'KT22', title: '22KT'},
      ],
    };
  }

  renderTabBar = (props) => (
    <TabBar
      {...props}
      getLabelText={({route}) => route.title}
      labelStyle={{
        fontSize: Fonts.LARGE,
        fontFamily: 'Montserrat-Bold',
      }}
      indicatorStyle={{backgroundColor: Colors.White}}
      style={{backgroundColor: Colors.TintColor}}
    />
  );

  render() {
    const {category, index, routes} = this.state;
    const renderScene = ({route, jumpTo}) => {
      switch (route.key) {
        case 'KT18':
          return (
            <KT18Route
              ref={(ref) => {
                this.KT18RouteRef = ref;
              }}
              jumpTo={jumpTo}
              category={category}
              {...this.props}
            />
          );
        case 'KT22':
          return (
            <KT22Route
              ref={(ref) => {
                this.KT22RouteRef = ref;
              }}
              jumpTo={jumpTo}
              category={category}
              {...this.props}
            />
          );
      }
    };

    return (
      <Container style={globalStyles.container}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={(index) => this.setState({index})}
          initialLayout={initialLayout}
          renderTabBar={this.renderTabBar}
        />
      </Container>
    );
  }
}

export default connect(ProductsScreen);
