import {Pressable, Text, View} from "react-native";
import {StartScreenStyles as styles} from "../styles";
import React from "react";

const textStyle = (pressed:boolean) => pressed ? "gray" : "blue";

const RoomButtons = (props: {setRoom:()=>void, createRoom:()=>void}) => (
  <View style={styles.buttonContainer}>
    <Pressable style={styles.roomButton} onPress={props.setRoom} children={ ({pressed}) => (
      <Text style={[styles.buttonText, {color: textStyle(pressed)}]}>Join Room</Text>
    )} />
    <Pressable style={styles.roomButton} onPress={props.createRoom} children={ ({pressed}) => (
      <Text style={[styles.buttonText, {color: textStyle(pressed)}]}>Create Room</Text>
    )} />
  </View>
);

export default RoomButtons;