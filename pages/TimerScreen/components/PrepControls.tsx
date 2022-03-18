import React from "react";
import {View, Text, Pressable} from "react-native"
import {MAX_SPEECH_LENGTH} from "../../../interfaces";
import {prepStyles as styles} from "../styles";

const PrepControls = (props: {prep: [number, number], togglePrep:(side:number)=>void}) => {
  const paused = props.prep.map((v) => v < MAX_SPEECH_LENGTH); // if paused, true. if playing, false
  const buttonStyles = (i:number, pressed:boolean) => {
    if (pressed) return "yellow";
    if (paused[i]) return "lightgreen"
    return "red";
  }
  return (
    <View style={[styles.container, styles.pauseButton]} >
      {
        paused.map((v, i) => {
          return (
            <Pressable key={i} onPress={()=>props.togglePrep(i)}
                       style={({pressed}) => [styles.sideContainer, styles.pauseButton, {backgroundColor: buttonStyles(i, pressed)}]} >
              <Text style={styles.pauseButtonText}>{paused[i]?"Play":"Pause"}</Text>
            </Pressable>
          )
        })
      }
    </View>
  )
}

export default PrepControls;