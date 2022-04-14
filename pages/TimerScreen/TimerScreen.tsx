import React from 'react'
import {FormatData, MAX_SPEECH_LENGTH, RoomData} from '../../interfaces'
import {View} from "react-native";
import Timer from "./components/Timer";
import UpperBar from "./components/UpperBar";
import HostTools from "./components/HostTools";
import PrepTimers from "./components/PrepTimers";
import PrepControls from "./components/PrepControls";

const TimerScreen = (props: {isHost:boolean, uid:string, formatData:FormatData, roomData:RoomData, restartApp:()=>void, setRoomData:(newRoomData:RoomData)=>void}) => {
  //region functions to interface with firebase
  const nextSpeech = (next: number) => {
    if (props.roomData.code === "OFFLINE") {
      offlineNextSpeech(props.roomData, props.formatData, props.setRoomData, next);
      return;
    }
    fetch(`https://us-central1-debate-timer-backend.cloudfunctions.net/nextSpeech?uid=${props.uid}&room=${props.roomData.code}&next=${(next+props.roomData.speechNum).toString()}`)
      .catch(err => console.log("error getting next room", err));
  }
  const pauseSpeech = (action:string) => {
    if (props.roomData.code === "OFFLINE") {
      offlinePauseSpeech(props.roomData, props.setRoomData, action);
      return;
    }
    fetch(`https://us-central1-debate-timer-backend.cloudfunctions.net/togglePause?uid=${props.uid}&room=${props.roomData.code}&action=${action}`)
      .catch(err => console.log("error toggling pause", err));
  }
  const togglePrep = (sideIndex:number) => {
    if (props.roomData.code === "OFFLINE") {
      offlineTogglePrep(props.roomData, props.setRoomData, sideIndex);
      return;
    }
    fetch(`https://us-central1-debate-timer-backend.cloudfunctions.net/togglePrep?
      uid=${props.uid}&
      room=${props.roomData.code}&
      side=${sideIndex === 0 ? "prop":"opp"}
    `)
      .catch(err => console.log(err));
  }
  // req.query includes uid, room, newTime
  const setTime = (minutes:string, seconds:string, tenths:string) => {
    const time = ((Number(minutes)*60 + Number(seconds))*10 + Number(tenths))*100;
    if (props.roomData.code === "OFFLINE") {
      offlineSetTime(props.roomData, props.setRoomData, time);
      return;
    }
    fetch(`https://us-central1-debate-timer-backend.cloudfunctions.net/setTime?uid=${props.uid}&room=${props.roomData.code}&newTime=${time}`)
      .catch(err => console.log(err));
  };
  //endregion

  return (
    <View style={{flexDirection: "column"}}>
      <UpperBar formatName={props.formatData.abbreviation} roomCode={props.roomData.code} restartApp={props.restartApp}/>
      {/*Timer*/}
      {props.roomData.code ? <Timer formatData={props.formatData} roomData={props.roomData} isHost={props.isHost} setTime={setTime}/> : null}
      {/*Host Tools*/}
      {props.isHost && props.roomData.code ? <HostTools speechTime={props.roomData.speechTime}
                                                        nextSpeech={(next)=>nextSpeech(next)}
                                                        pauseSpeech={(action:string) => pauseSpeech(action)}
      /> : null}
      {/*Prep Timers*/}
      {props.formatData.prep ? <PrepTimers prepTime={props.roomData.prep} sides={props.formatData.sides}/> : null}
      {/*Prep Controls*/}
      {props.isHost && props.formatData.prep ? <PrepControls prep={props.roomData.prep} togglePrep={togglePrep} /> : null}
    </View>
  );
}

function offlineNextSpeech(roomData: RoomData, formatData: FormatData, setRoomData:(newRoomData:RoomData)=>void, increment:number) {
  if (roomData.speechNum + increment >= formatData.times.length || roomData.speechNum + increment < 0) return;
  const newRoomData = pauseAll(roomData);
  newRoomData.speechNum += increment;
  newRoomData.speechTime = formatData.times[newRoomData.speechNum][1] * 60 * 1000;
  setRoomData(newRoomData);
}
function offlinePauseSpeech(roomData: RoomData, setRoomData:(newRoomData:RoomData)=>void, action:string) {
  const newRoomData = pauseAll(roomData);
  if (action === "play") {
    newRoomData.speechTime += Date.now();
  }
  setRoomData(newRoomData);
}
function offlineTogglePrep(roomData: RoomData, setRoomData:(newRoomData:RoomData)=>void, side:number) {
  const pause = roomData.prep[side] > MAX_SPEECH_LENGTH; // says if we want to pause or not
  const newRoomData = pauseAll(roomData);
  if (!pause) {
    newRoomData.prep[side] += Date.now();
  }
  setRoomData(newRoomData);
}
function offlineSetTime(roomData: RoomData, setRoomData:(newRoomData:RoomData)=>void, newTime:number) {
  const newRoomData = pauseAll(roomData);
  newRoomData.speechTime = newTime;
  setRoomData(newRoomData);
}
function pauseAll(roomData:RoomData):RoomData {
  const newRoomData = JSON.parse(JSON.stringify(roomData)) as RoomData;
  for (let i = 0; i < roomData.prep.length; i++) {
    if (roomData.prep[i] > MAX_SPEECH_LENGTH) newRoomData.prep[i] -= Date.now();
  }
  if (roomData.speechTime > MAX_SPEECH_LENGTH) newRoomData.speechTime -= Date.now();
  return newRoomData;
}

export default TimerScreen;