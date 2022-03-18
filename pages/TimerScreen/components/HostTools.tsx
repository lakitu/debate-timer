import {Pressable, Text, View} from "react-native"
import React from 'react';
import {hostStyles as styles} from "../styles"
import {MAX_SPEECH_LENGTH} from "../../../interfaces";

const HostTools = (props: {pauseSpeech:()=>void, nextSpeech:()=>void, speechTime: number }) => {
  const paused = props.speechTime <= MAX_SPEECH_LENGTH;
  const pauseColor = (pressed: boolean) => pressed ? "yellow" : paused ? "lime" : "red"
  return (
    <View style={styles.wrapperCustom}>
      {/*Pause Button*/}
      <Pressable onPress={props.pauseSpeech} style={({pressed}) => [styles.button, {backgroundColor: pauseColor(pressed)}]}>
        <Text style={styles.innerText}>
          {(paused ? "Play" : "Pause")}
        </Text>
      </Pressable>
      {/*Next Speech*/}
      <Pressable onPress={props.nextSpeech} style={({pressed}) => [styles.button, {backgroundColor: pressed ? "lime" : "deepskyblue"}]} >
        <Text style={styles.innerText}>Next Speech</Text>
      </Pressable>
    </View>
  );
}

export default HostTools;