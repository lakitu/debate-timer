import {Image, Pressable, SafeAreaView, Text, View} from "react-native";
import {upperBarStyles as styles} from "../styles";
import {setStringAsync} from "expo-clipboard";
import React from "react";

const UpperBar = (props: {formatName: string, roomCode: string, restartApp: ()=>void}) => (
  <View>
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
        <Pressable onPress={props.restartApp}>
          <Image source={require("../../../assets/backArrow.png")} style={styles.backArrow} />
        </Pressable>
        <Text style={styles.text}>{props.formatName}</Text>
      </View>

      {/*Room code */}
      <Pressable onPress={()=> {!["loading", "offline"].includes(props.roomCode) && setStringAsync(props.roomCode);}} style={{justifyContent: "flex-end"}}>
        <Text style={styles.text} selectable={true}>{props.roomCode === '' ? "loading" : props.roomCode}</Text>
      </Pressable>
    </SafeAreaView>
  </View>
);

export default UpperBar