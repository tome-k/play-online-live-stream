import React from "react";
import { styles } from "../page/styles";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AppMocData from "../../../share/data/MocData";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

function GamePlayHeader({ running, backPage }) {

  const onBackPress= ()=> {
      if(running)
        return;
      backPage('GameJoin');
  };

  return (
    <View style={styles.header_view}>
      <TouchableOpacity onPress={()=>onBackPress()}>
        <Image
          style={{
            width: wp("5"),
            height: wp("5"),
            transform: [
              {
                scaleX: running ? 1 : -1
              },
              {
                scaleY: 1
              }
            ]
          }}
          source={AppMocData.game.header.amber}
        />
      </TouchableOpacity>
      <View style={styles.header_middle_view}>
        <Image
          style={styles.game_mark_icon}
          source={AppMocData.bottomBar.gameActive}/>
        <Text style={styles.game_header_title}>
          ZENDUJA LIVE
        </Text>
      </View>
      <Image
        style={styles.header_user_img}
        source={AppMocData.game.header.user}
      />
    </View>
  );
}

export default GamePlayHeader;
