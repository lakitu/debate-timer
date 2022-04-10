import React from 'react'
import {FormatData, RoomData} from '../../interfaces'
import {View} from "react-native";
import Timer from "./components/Timer";
import UpperBar from "./components/UpperBar";
import HostTools from "./components/HostTools";
import PrepTimers from "./components/PrepTimers";
import PrepControls from "./components/PrepControls";

export const TimerScreen = (props: {isHost:boolean, uid:string, formatData:FormatData, roomData:RoomData, restartApp:()=>void}) => {
  //region functions to interface with firebase
  const nextSpeech = (next: number) => {
    fetch(`https://us-central1-debate-timer-backend.cloudfunctions.net/nextSpeech?uid=${props.uid}&room=${props.roomData.code}&next=${(next+props.roomData.speechNum).toString()}`)
      .catch(err => console.log("error getting next room", err));
  }
  const pauseSpeech = (action:string) => {
    fetch(`https://us-central1-debate-timer-backend.cloudfunctions.net/togglePause?uid=${props.uid}&room=${props.roomData.code}&action=${action}`)
      .catch(err => console.log("error toggling pause", err));
  }
  const togglePrep = (uid: string, room: string) => {
    return (sideIndex:number) => {
      const side = sideIndex === 0 ? "prop":"opp";
      fetch(`https://us-central1-debate-timer-backend.cloudfunctions.net/togglePrep?uid=${uid}&room=${room}&side=${side}`)
        .catch(err => console.log(err));
    }
  }
  // req.query includes uid, room, newTime
  const setTime = (minutes:string, seconds:string, tenths:string) => {
    const time = ((Number(minutes)*60 + Number(seconds))*10 + Number(tenths))*100;
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
      {props.isHost && props.formatData.prep ? <PrepControls prep={props.roomData.prep} togglePrep={togglePrep(props.uid, props.roomData.code)} /> : null}
    </View>
  );
}

