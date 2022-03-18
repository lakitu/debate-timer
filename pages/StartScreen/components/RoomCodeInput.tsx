import React from "react";
import {TextInput, View} from "react-native";
import {StartScreenStyles as styles} from "../styles";

export function RoomCodeInput(props: {setRoom:()=>void, changeRoomCode:(code:string)=>void}) {
  return (
    <View style={styles.inputs}>
      <TextInput
        onChangeText={code => props.changeRoomCode(code)}
        style={styles.roomInput}
        placeholder={"Room Code"}
        onSubmitEditing={props.setRoom} // needs stuff
        autoCapitalize={"none"}
        autoCorrect={false}
        autoCompleteType={"off"}
      />
    </View>
  )
}