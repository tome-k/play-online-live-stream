import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Images from "../../../../MocData";
import { styles } from "./styles";
import RoundPannel from "./RoundPannel";

function GameMegaRound({megaSpinCount, navigation, getSpinListItems}) {
  let gameRoundState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let j = megaSpinCount > 9 ? 9 : megaSpinCount;
  if (megaSpinCount === 9) {
    setTimeout(() => {
      navigation.navigate("NikiQuestion");
    }, 1500);
  }
  for (let i = 0; i < j; i++) {
    gameRoundState[i] = 1;
  }
  const resumeGame = ()=> {
    navigation.goBack(null);
  };
  return (
    <View style={styles.megaRoundParent}>
      <View style={styles.header_view}>
      {
        getSpinListItems.length>0 ?
        <TouchableOpacity onPress={()=>resumeGame()}>
          <Image
            style={styles.header_arrow_btn}
            source={Images.public.close}
          />
        </TouchableOpacity>: <View/>
      }

        <View style={styles.header_middle_view}>
          <Image
            style={styles.game_mark_icon}
            source={Images.bottomBar.gameActive}/>
          <Text style={styles.game_header_title}>
            ZENDUJA LIVE
          </Text>
        </View>
        <Image
          style={styles.header_user_img}
          source={Images.game.header.user}
        />
      </View>
      <View style={styles.topSection}>
        <Image source={Images.game.page.mega.megaTopMark}
               style={styles.topMarkImage}/>
        <Image source={Images.game.page.mega.megaBig}
               style={styles.megaUnlockImage}/>
        <Image source={Images.game.page.roundBgRed}
               style={styles.topCirclebgImage}/>
        <Text style={styles.topSectionTitle}>BLUZAG</Text>
        <Text style={styles.roundLocktxt}>49 / 1000 LEFT</Text>
      </View>
      <View style={styles.bottomRoundSection}>
        <View style={styles.bottomRoundText}>
          <Text style={styles.roundTitletext}>COLLECT ALL </Text>
          <Text style={styles.roundTitleBoldtext}>9 BADGES</Text>
          <Text style={styles.roundTitletext}> TO REDEEM YOUR PRIZE!</Text>
        </View>
        <RoundPannel roundState={gameRoundState} type="mega"/>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    megaSpinCount: state.game.score.megaSpin,
    getSpinListItems: state.game.getSpinListItems
  };
};

export default connect(mapStateToProps, null)(GameMegaRound);
