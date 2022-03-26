import {Pressable, Text, View} from "react-native"
import React from 'react';
import {hostStyles as styles} from "../styles"
import {MAX_SPEECH_LENGTH} from "../../../interfaces";

const HostTools = (props: {pauseSpeech:()=>void, nextSpeech:(next:number)=>void, speechTime: number }) => {
  const paused = props.speechTime <= MAX_SPEECH_LENGTH;
  const pauseColor = (pressed: boolean) => pressed ? "yellow" : paused ? "lightgreen" : "red"
  const nextColor = (pressed:boolean) => pressed ? "lime" : "deepskyblue";
  return (
    <View style={styles.wrapperCustom}>
      {/*Pause Button*/}
      <Pressable onPress={props.pauseSpeech} style={({pressed}) => [styles.button, {backgroundColor: pauseColor(pressed), height:150}]}>
        <Text style={styles.innerText}>
          {(paused ? "Play" : "Pause")}
        </Text>
      </Pressable>
      {/*Next Speech*/}
      <View style={{height:150}}>
        <Pressable onPress={()=>props.nextSpeech(1)} style={({pressed}) => [styles.button, {backgroundColor:nextColor(pressed), borderBottomWidth: 1}]} >
          <Text style={styles.innerText}>Next</Text>
        </Pressable>
        <Pressable onPress={()=>props.nextSpeech(-1)} style={({pressed}) => [styles.button, {backgroundColor:nextColor(pressed), borderTopWidth: 1}]} >
          <Text style={styles.innerText}>Previous</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default HostTools;