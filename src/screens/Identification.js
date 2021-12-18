import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, Image, StyleSheet, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, SIZES } from '../constant/theme';

const Identification = ({navigation}) => {

    const [names, setNames ] = useState('');
    const [phone, setPhone ] = useState('');

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
            <View style={{
                flex: 1,
                paddingVertical: 40,
                paddingHorizontal: 16,
                backgroundColor: COLORS.background,
                position: 'relative'
            }}>

                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <TextInput
                        placeholder="Names"
                        placeholderTextColor={COLORS.accent}
                        autoFocus
                        style={styles.textField}
                        value={names}
                        onChangeText = {(names)=>setNames(names)}
                    />

                    <TextInput
                        placeholder="Phone number"
                        placeholderTextColor={COLORS.accent}
                        style={styles.textField}
                        autoCapitalize= "none"
                        keyboardType="phone-pad"
                        value = {phone}
                        onChangeText= {(phone)=> setPhone(phone)}
                    />

                    <TouchableOpacity 
                    onPress={()=>navigation.navigate('Survey')}
                    style={{
                        backgroundColor: COLORS.accent,
                        height: SIZES.height * .08,
                        borderRadius: 10,
                        justifyContent: 'center',
                        marginTop: 20
                    }}>

                        <Text style={{ color: COLORS.white, fontSize: 30, textAlign: 'center' }}>Start</Text>
                    </TouchableOpacity>
                </View>

                {/* Background Image */}
                <Image
                    source={require('../../assets/images/DottedBG.png')}
                    style={{
                        width: SIZES.width,
                        height: 130,
                        zIndex: -1,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        opacity: 0.5
                    }}
                    resizeMode={'contain'}
                />


            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textField: {
        color: COLORS.white,
        fontSize: 25,
        borderBottomColor: COLORS.secondary,
        borderBottomWidth: 1,
        marginVertical: 20,
        padding: 10
    }
})

export default Identification
