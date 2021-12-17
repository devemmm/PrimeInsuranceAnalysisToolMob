import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constant/theme';
import questionnaire from '../api/primeApi';

const SurveyScreen = () => {

    const allQuetions = questionnaire;
    const [currentQuetionIndex, setCurrentQuetionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);

    const validateAnswer = (selectedOption)=>{

        console.log(selectedOption)
        let correct_option = allQuetions[currentQuetionIndex]['correct_option']
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);

        if(selectedOption === correct_option){
            // setScore
            setScore(score+1);
        }

        // show next Button

    }

    const renderQuetion = () => {
        return (
            <View>
                {/* Quetion Counder */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{ color: COLORS.white, fontSize: 20, opacity: 0.5, marginRight: 2}}>{currentQuetionIndex + 1}</Text>
                    <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.6}}>/ {allQuetions.length}</Text>
                </View>

                {/* Quetion */}
                <Text style={{
                    color: COLORS.white,
                    fontSize: 30
                }}>{allQuetions[currentQuetionIndex]?.question}</Text>
            </View>
        );
    };

    const renderOption = ()=>{
        return(
            <View>
                {
                    allQuetions[currentQuetionIndex]?.option.map(option => (
                        <TouchableOpacity
                            onPress= {()=> validateAnswer(option)}
                            // onPress= {()=> console.log(option)}
                            key= {option}
                            style={{
                                borderWidth: 3, borderColor: COLORS.secondary + '40', 
                                backgroundColor: COLORS.secondary + '20',
                                height: 60, borderRadius: 10,
                                flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20, marginVertical: 10
                            }}
                        >
                            <Text style={{fontSize: 20, color: COLORS.white}}>{option}</Text>
                            
                            {/* Show Check or cross Icon based on correct Answer */}
                            {
                                option == correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}> 
                                        <MaterialCommunityIcons name="check" size={30} color={COLORS.white} />
                                    </View>
                                ): (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}> 
                                        <MaterialCommunityIcons name="close" size={30} color={COLORS.white} />
                                    </View>
                                )
                            }
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
            <View style={{
                flex: 1,
                paddingVertical: 40,
                paddingHorizontal: 16,
                backgroundColor: COLORS.background,
                position: 'relative'
            }}>

                {/* ProgreeBar*/}

                {/* Quetion */}
                {renderQuetion()}

                {/* Option */}
                {renderOption()}

                {/* Next Button */}

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
    quetion:{
        borderWidth: 3, borderColor: COLORS.secondary + '40', 
                            backgroundColor: COLORS.secondary + '20',
                            height: 60, borderRadius: 10,
                            flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20, marginHorizontal: 10
    }
});

export default SurveyScreen;
