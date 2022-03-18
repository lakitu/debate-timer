import {Button, View} from "react-native";
import {StartScreenStyles as styles} from "../styles";
import React from "react";

export const CreateRoomButton = (props: {createRoom:()=>void}) => {
  return (
    <View style={styles.inputs}>
        <Button title={"Create Room"} onPress={props.createRoom} />
    </View>
  )
}