import {Pressable, Text, View} from "react-native"
import React from 'react';
import {hostStyles as styles} from "../styles"
import {MAX_SPEECH_LENGTH} from "../../../interfaces";

const HostTools = (props: {pauseSpeech:(action:string)=>void, nextSpeech:(next:number)=>void, speechTime: number }) => {
  const paused = props.speechTime <= MAX_SPEECH_LENGTH;
  const pauseColor = (pressed: boolean) => {
    if (!paused) { // playing
      if (!pressed) return "#F33"; // playing and pressed
      return "#FA8072"; // playing but not pressed
    }
    if (!pressed) return "#70E070"; // paused but not pressed
    return "#A0FEA0"; // paused but pressed
  }

  return (
    <View style={[styles.wrapperCustom]}>
      {/*Pause Button*/}
      <View style={[styles.sides]}>
        <Pressable onPress={()=>props.pauseSpeech(paused?"play":"pause")} style={({pressed}) => [styles.button, {backgroundColor: pauseColor(pressed), borderRightWidth:1}]}>
          <Text style={styles.innerText} selectable={false}>
            {(paused ? "Play" : "Pause")}
          </Text>
        </Pressable>
      </View>
      {/*Next and Previous Speech*/}
      <View style={[styles.sides, {borderLeftWidth:1}]}>
        {/*Next Speech*/}
        <ChangeSpeechButton nextSpeech={props.nextSpeech} direction={1}/>
        {/*Previous Speech*/}
        <ChangeSpeechButton nextSpeech={props.nextSpeech} direction={-1}/>
      </View>
    </View>
  );
}

function ChangeSpeechButton (props: { nextSpeech:(dir:number)=>void, direction:number }) {
  const nextColor = (pressed:boolean) => pressed ? "skyblue" : "deepskyblue";
  const nextTextColor = (pressed:boolean) => pressed ? "rgb(20,20,20)" : "rgb(20,20,20)";
  const borderSide = props.direction === 1 ? "borderBottomWidth" : "borderTopWidth";

  return <Pressable onPress={()=>props.nextSpeech(props.direction)}
             style={({pressed}) => [styles.button, {backgroundColor: nextColor(pressed), [borderSide]: 1}]}
             children={({pressed}) => (
               <Text style={[styles.innerText, {color:nextTextColor(pressed)}]} selectable={false}>{props.direction===1?"Next":"Prev"}</Text>
             )}
  />;
}

export default HostTools;