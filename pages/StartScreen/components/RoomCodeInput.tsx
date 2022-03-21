import React from "react";
import {TextInput, View} from "react-native";
import {StartScreenStyles as styles} from "../styles";

export function RoomCodeInput(props: {setRoom:()=>void, changeRoomCode:(code:string)=>void}) {
  return (
    <View style={styles.inputs}>
      <TextInput
        onChangeText={props.changeRoomCode}
        style={styles.roomInput}
        placeholder={"Room Code"}
        onSubmitEditing={props.setRoom}
        autoCapitalize={"none"}
        autoCorrect={false}
        autoCompleteType={"off"}
        maxLength={7}
      />
    </View>
  )
}