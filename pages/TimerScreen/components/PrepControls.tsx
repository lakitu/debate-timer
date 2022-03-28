import React from "react";
import {View, Text, Pressable} from "react-native"
import {MAX_SPEECH_LENGTH} from "../../../interfaces";
import {prepStyles as styles} from "../styles";

const PrepControls = (props: {prep: [number, number], togglePrep:(side:number)=>void}) => {
  const paused = props.prep.map((v) => v < MAX_SPEECH_LENGTH); // if paused, true. if playing, false
  const buttonStyles = (paused:boolean, pressed:boolean) => {
    if (!paused) { // playing
      if (!pressed) return "#F33"; // playing and pressed
      return "#FA8072"; // playing but not pressed
    }
    if (!pressed) return "#70E070"; // paused but not pressed
    return "#A0EEA0"; // paused but pressed
  }
  const borderProperty = (i:number) => {
    return i === 0 ? "borderRightWidth" : "borderLeftWidth";
  }
  return (
    <View style={[styles.container, styles.pauseButton]} >
      {
        paused.map((v, i) => {
          return (
            <Pressable key={i} onPress={()=>props.togglePrep(i)}
                       style={({pressed}) => [styles.sideContainer, styles.pauseButton,
                         {backgroundColor: buttonStyles(v, pressed), borderColor:"black", [borderProperty(i)]: 1} ]}
            >
              <Text style={styles.pauseButtonText}>{paused[i]?"Play":"Pause"}</Text>
            </Pressable>
          )
        })
      }
    </View>
  )
}

export default PrepControls;