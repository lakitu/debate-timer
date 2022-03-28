import React, {useState} from 'react'
import {SafeAreaView, Text} from 'react-native'
import {StartScreenStyles as styles} from "./styles";
import RoomCodeInput from "./components/RoomCodeInput";
import RoomButtons from "./components/RoomButtons";
import SelectStylesDropdown from "./components/SelectStylesDropdown";

export const StartScreen = (props: {uid:string, joinRoom:(room:string,isHost:boolean)=>void, formats:[string,string][] }) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("CDA");
  let [roomCode, changeRoomCode] = useState("");
  const setRoom = () => roomCode.length === 7 && props.joinRoom(roomCode, false);
  const createRoom = () => {
    fetch(`https://us-central1-debate-timer-backend.cloudfunctions.net/createRoom?uid=${props.uid}&format=${selectedFormat}`)
      .then(r => r.json()) // assigns room code to roomCode
      .then(obj => props.joinRoom(obj.message.code, true))
      .catch(error => console.log(error)); // moves to the timer page
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Live Debate Timer</Text>
      <RoomCodeInput changeRoomCode={changeRoomCode} setRoom={setRoom} />
      <RoomButtons setRoom={setRoom} createRoom={createRoom}/>
      <SelectStylesDropdown selectedFormat={selectedFormat} setSelectedFormat={setSelectedFormat} formats={props.formats}/>
    </SafeAreaView>
  );
}