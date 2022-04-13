import React, {useState} from 'react'
import {SafeAreaView, Text} from 'react-native'
import {StartScreenStyles as styles} from "./styles";
import RoomCodeInput from "./components/RoomCodeInput";
import RoomButtons from "./components/RoomButtons";
import SelectStylesDropdown from "./components/SelectStylesDropdown";
import OfflineToggle from "./components/OfflineToggle";

interface PropsInterface {
  uid: string,
  joinRoom: (room: string,isHost: boolean) => void,
  formats: [string,string][],
  offline: boolean,
  setOffline: (newState:boolean) => void
}

export const StartScreen = (props: PropsInterface) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("CDA");
  let [roomCode, changeRoomCode] = useState("");
  const setRoom = () => {
    if (roomCode.toLowerCase() === "offline") props.joinRoom(`${roomCode}${selectedFormat}`, true);
    else if (roomCode.length === 7) props.joinRoom(roomCode, false);
  }
  const createRoom = () => {
    if (props.offline) {
      props.joinRoom(`offline${selectedFormat.toLowerCase()}`, true);
      return;
    }
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
      <OfflineToggle offline={props.offline} setOffline={props.setOffline} />
      <SelectStylesDropdown selectedFormat={selectedFormat} setSelectedFormat={setSelectedFormat} formats={props.formats}/>
    </SafeAreaView>
  );
}