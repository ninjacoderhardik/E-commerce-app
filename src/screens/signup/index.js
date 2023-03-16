import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import connect from './connect';
import styles from './styles';
import globalStyles from '../../constants/globalStyles';
import Colors from '../../constants/colors';
import LoaderLayout from '../../components/LoaderLayout';
import IMAGES from '../../constants/images';
import { handleClickURL } from '../../helper/utils';

class SignupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        const { } = this.state;

        return (
            <Container style={globalStyles.container}>
                <Text>Signup</Text>
            </Container>
        );
    }
}

export default connect(SignupScreen);