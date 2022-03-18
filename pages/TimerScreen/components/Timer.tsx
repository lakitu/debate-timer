import {FormatData, MAX_SPEECH_LENGTH, RoomData, timeToDisplay} from "../../../interfaces";
import React, {useEffect, useState} from "react";
import {View, Text, Vibration} from "react-native";
import {timerStyles as styles} from "../styles";


const Timer = (props: {formatData: FormatData, roomData: RoomData}) => {
  const [displayTime, setDisplayTime] = useState("");

  useEffect(() => {
    setDisplayTime(timeToDisplay(props.roomData.speechTime));
    if (props.roomData.speechTime <= MAX_SPEECH_LENGTH) return; // if paused, don't do an interval
    const interval = setInterval(() => {
      const newDisplayTime = timeToDisplay(props.roomData.speechTime);
      setDisplayTime(newDisplayTime);
      if (newDisplayTime === "0:00.0") {
        Vibration.vibrate(Array(5).fill(1000));
        clearInterval(interval);
      }
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [props.roomData]);

  const speechName = props.roomData.code === '' || props.formatData.times.length === 1 ? "" : props.formatData.times[props.roomData.speechNum][0];
  return (
    <View style={[styles.container]}>
      <Text style={[styles.speechName]}> {speechName} </Text>
      <Text style={[styles.count]}> {displayTime} </Text>
    </View>
  );
}

export default Timer;