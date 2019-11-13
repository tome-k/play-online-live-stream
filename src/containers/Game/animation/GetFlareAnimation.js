import {Image, View, Animated} from "react-native";
import React, {useRef} from "react";
import AppMocData from "../../../share/data/MocData";
import {FlareType} from "../../../share/data/gamePlay/FlareType";
import {heightPercentageToDP as hp, widthPercentageToDP as wp}
  from "react-native-responsive-screen";
import {Text} from "native-base";

function GetFlareBox({size, body, spinInfoData, mark, navigation, gamePause, setGameHitData}) {
  /* User State init */
  const m_mark = mark;
  const rotateValue = new useRef(new Animated.Value(0)).current;
  const saveRotateValue = rotateValue.interpolate({
    inputRange: [0, 0.5],
    outputRange: ['0deg', '360deg']
  });

  const fadeValue = new useRef(new Animated.Value(1)).current;
  const saveOpacity = fadeValue.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1]
  });

  const fadeValue_text = new useRef(new Animated.Value(1)).current;
  const saveOpacity_text = fadeValue.interpolate({
    inputRange: [0, 1, 1],
    outputRange: [0, 1, 0]
  });

  const transYValue_text = new useRef(new Animated.Value(0)).current;
  const saveTransY_text = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -150]
  });

  React.useEffect(() => {

    fadeValue.setValue(1);
    rotateValue.setValue(0);
    fadeValue_text.setValue(1);
    Animated.parallel([
      Animated.timing(transYValue_text, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      }),
      Animated.timing(fadeValue_text, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true
      })
    ]).start();
    transYValue_text.setValue(0);
    Animated.parallel([
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(fadeValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start();
  }, [spinInfoData]);

  const width = size[0];
  const height = size[1];
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;
  const {spinType, spinNumber, spinColor, spinSize, spinTextSize, megaType, userType} = spinInfoData;
  let flareType = spinType;

  const targetImage = AppMocData.game.gameplay.target;
  let ty = spinSize / 8;
  if (spinType === FlareType.spinType.triangle)
    ty = spinSize / 20;
  else if (spinType === FlareType.spinType.ellipse) {
    ty = spinSize / 8;
  }
  if (spinNumber === 0 && megaType !== 'lock') { ////mega type
    ty = spinSize / 6;
  } else if (spinNumber <= 0) {
    ty = spinSize / 8.6;
  }

  // Glow Ball bonus
  let bonusText = '';
  let glowBall = false;
  let survey = false;
  if(spinInfoData.spinNumber === 0 &&
    spinInfoData.spinSize === FlareType.spinSize.big &&
    megaType !== FlareType.spinType.mega.mega &&
    spinType !== FlareType.spinType.survey) {
    glowBall = true;
    flareType = FlareType.spinType.glow;
    switch (spinColor) {
      case FlareType.spinColor.amber:
        bonusText = '3 Flares';
        break;
      case FlareType.spinColor.white:
        bonusText = '3 Flares';
        break;
      case FlareType.spinColor.orange:
        bonusText = '10 Flares';
        break;
      case FlareType.spinColor.red:
        bonusText = '25 Flares';
        break;
    }
  } else if(spinType === FlareType.spinType.survey) {
    glowBall = true;
    survey = true;
    flareType = FlareType.spinType.survey;
    bonusText = '3 Flare Survey';
    // setTimeout(()=> {
    //   setGameHitData({});
    //   gamePause();
    //   navigation.navigate('NikiQuestion', {getFlare: getFlare});
    // }, 1000)
  }
  return (
    <View style={{
      left: x,
      top: y,
      position: "absolute",
      zIndex: 4,
      marginLeft: width * -0.5,
      width: width * 2,
      height: height
    }}>
      {
        (m_mark !== 0 || glowBall) && <Animated.Text style={{
          fontFamily: 'Antonio-Bold',
          fontSize: survey ? wp('5') : glowBall ? wp('7'): wp('10'),
          marginTop: survey ? wp('-10') : glowBall ? wp('-9') : wp('-17'),
          paddingBottom: survey ? wp('5') : 0,
          color: 'white',
          textAlign: 'center',
          opacity: saveOpacity_text,
          transform: [
            {
              translateY: saveTransY_text
            }
          ]
        }}>
          {glowBall ? bonusText : (m_mark === 1000 ? '50' : m_mark > 1000 ? `50+${m_mark - 1000}` : m_mark > 0 ? m_mark : '')}
        </Animated.Text>
      }
      <Animated.View style={{
        transform: [
          {
            rotateY: saveRotateValue
          }
        ],
        opacity: saveOpacity,
        display: "flex",
        justifyContent: "center",
        height: hp(spinSize),
        flexDirection: "row",
        marginTop: hp(spinSize / -6)
      }}>

        <Image source={spinNumber === -1 ? AppMocData.game.users[userType.userImage] : targetImage[flareType][spinColor]} style={{
          width: wp(spinSize),
          height: wp(spinSize)
        }}/>
        {
          (spinNumber > 0) ?
            <Text style={{
              position: "absolute",
              fontSize: wp(spinTextSize),
              marginTop: hp(ty),
              fontFamily: "Antonio-Bold",
              color: "white"
            }}>{spinNumber}</Text> : (spinNumber !== -1 && spinType !== FlareType.spinType.survey) &&
            <Image
              source={spinNumber === 0 ? targetImage.mega[megaType] : AppMocData.game.users[userType]} style={{
              position: "absolute",
              width: spinNumber === 0 && megaType !== 'lock' ? wp(spinSize * 0.4) : wp(spinSize * 0.6),
              height: spinNumber === 0 && megaType !== 'lock' ? wp(spinSize * 0.4) : wp(spinSize * 0.6),
              marginTop: hp(ty),
              zIndex: 0
            }}/>
        }
      </Animated.View>
    </View>
  );
}

export {GetFlareBox};
