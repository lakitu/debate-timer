import {Button, View} from "react-native";
import {StartScreenStyles as styles} from "../styles";
import React from "react";

export const JoinRoomButton = (props: {setRoom:()=>void}) => {
  return (
    <View style={styles.inputs}>
      <Button title={"Join Room"} onPress={props.setRoom}/>
    </View>
  )
}