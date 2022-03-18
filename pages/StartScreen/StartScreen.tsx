import React, {useState} from 'react'
import {SafeAreaView, Text} from 'react-native'
import {StartScreenStyles as styles} from "./styles";
import {RoomCodeInput} from "./components/RoomCodeInput";
import {JoinRoomButton} from "./components/JoinRoomButton";
import {CreateRoomButton} from "./components/CreateRoomButton";
import {SelectStyleDropdown} from "./components/SelectStyleDropdown";

export const StartScreen = (props: {uid: string, joinRoom: (room: string, isHost: boolean) => void}) => {
  // const [roomCode, changeRoomCode] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>("CDA");
  let roomCode = "";
  const changeRoomCode = (code: string) => roomCode = code;
  const setRoom = () => props.joinRoom(roomCode, false);
  const createRoom = () => {
    fetch(`https://us-central1-debate-timer-backend.cloudfunctions.net/createRoom?uid=${props.uid}&format=${selectedFormat}`)
      .then(r => r.json()) // assigns room code to roomCode
      .then(obj => props.joinRoom(obj.message.code, true))
      .catch(error => console.log(error)); // moves to the timer page
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Live Debate Timer</Text>
      <RoomCodeInput changeRoomCode={changeRoomCode} setRoom={setRoom} />
      <JoinRoomButton setRoom={setRoom}/>
      <CreateRoomButton createRoom={createRoom}/>
      <SelectStyleDropdown selectedFormat={selectedFormat} setSelectedFormat={setSelectedFormat}/>
    </SafeAreaView>
  )
}