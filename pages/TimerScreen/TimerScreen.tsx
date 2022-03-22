import React from 'react'
import {FormatData, RoomData} from '../../interfaces'
import {View} from "react-native";
import {useKeepAwake} from "expo-keep-awake";
import Timer from "./components/Timer";
import UpperBar from "./components/UpperBar";
import HostTools from "./components/HostTools";
import PrepTimers from "./components/PrepTimers";
import PrepControls from "./components/PrepControls";

export const TimerScreen = (props: {isHost:boolean, uid:string, formatData:FormatData, roomData:RoomData, restartApp:()=>void}) => {
  useKeepAwake();

  return (
    <View style={{flexDirection: "column"}}>
      <UpperBar formatName={props.formatData.abbreviation} roomCode={props.roomData.code} restartApp={props.restartApp}/>
      {props.roomData.code ? <Timer formatData={props.formatData} roomData={props.roomData}/> : null}
      {props.isHost && props.roomData.code ? <HostTools speechTime={props.roomData.speechTime} nextSpeech={nextSpeech(props.uid, props.roomData.code)} pauseSpeech={pauseSpeech(props.uid, props.roomData.code)} /> : null}
      {props.formatData.prep ? <PrepTimers prepTime={props.roomData.prep} sides={props.formatData.sides}/> : null}
      {props.isHost && props.formatData.prep ? <PrepControls prep={props.roomData.prep} togglePrep={togglePrep(props.uid, props.roomData.code)} /> : null}
    </View>
  );
}

function nextSpeech(uid: string, room: string) {
  return () => fetch(`https://us-central1-debate-timer-backend.cloudfunctions.net/nextSpeech?uid=${uid}&room=${room}`)
    .catch(err => console.log("error getting next room", err));
}
function pauseSpeech(uid: string, room: string) {
  return () => fetch(`https://us-central1-debate-timer-backend.cloudfunctions.net/togglePause?uid=${uid}&room=${room}`)
    .catch(err => console.log("error toggling pause", err));
}
function togglePrep(uid: string, room: string) {
  return (sideIndex:number) => {
    const side = sideIndex === 0 ? "prop":"opp";
    fetch(`https://us-central1-debate-timer-backend.cloudfunctions.net/togglePrep?uid=${uid}&room=${room}&side=${side}`)
      .catch(err => console.log(err));
  }
}