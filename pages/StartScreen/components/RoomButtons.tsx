import {Button, View} from "react-native";
import {StartScreenStyles as styles} from "../styles";
import React from "react";

export const RoomButtons = (props: {setRoom:()=>void, createRoom:()=>void}) => {
  return (
    <View style={{paddingTop: 5}}>
      <View style={styles.inputs}>
        <Button title={"Join Room"} onPress={props.setRoom} />
      </View>
      <View style={styles.inputs}>
        <Button title={"Create Room"} onPress={props.createRoom} />
      </View>
    </View>
  )
}