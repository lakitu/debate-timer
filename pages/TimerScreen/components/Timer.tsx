import {FormatData, MAX_SPEECH_LENGTH, RoomData} from "../../../interfaces";
import React, {useEffect, useState} from "react";
import {Text, Vibration, View} from "react-native";
import {timerStyles as styles} from "../styles";
import {timeToDisplay} from "../TimerScreen";
import {activateKeepAwake, deactivateKeepAwake} from "expo-keep-awake";

const Timer = (props: {formatData: FormatData, roomData: RoomData}) => {
  const [displayTime, setDisplayTime] = useState("");
  const [willVibrate, setWillVibrate] = useState(true);
  const [tick, setTick] = useState(false);
  const [onTime, setOnTime] = useState(Date.now());

  useEffect(() => {
    setDisplayTime(timeToDisplay(props.roomData.speechTime, true));
    if (props.roomData.speechTime <= MAX_SPEECH_LENGTH) return; // if paused, don't do an interval
    const interval = setInterval(() => {
      const newDisplayTime = timeToDisplay(props.roomData.speechTime, true);
      setDisplayTime(newDisplayTime);
      if (newDisplayTime === "0:00.0" && willVibrate) {
        Vibration.vibrate(Array(5).fill(1000));
        clearInterval(interval);
        setWillVibrate(false);
      }
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [props.roomData]);
  useEffect(() => {
    setTimeout(() => setTick(!tick), 500);
    if (Date.now() - 20*60*1000 > onTime) deactivateKeepAwake();
  }, [tick])
  useEffect(() => {
    setWillVibrate(true);
    setTick(false);
    setOnTime(Date.now());
    activateKeepAwake();
  }, [props.roomData.speechNum]);

  return (
    <View style={[styles.container]}>
      <Text style={[styles.speechName]}> {(props.roomData.code === '' || props.formatData.times.length === 1) ? "" : props.formatData.times[props.roomData.speechNum][0]} </Text>
      <Text style={[styles.count, (tick && displayTime.charAt(0) === "-") ? styles.finishedRed : styles.finishedBlack]}> {displayTime} </Text>
    </View>
  );
}

export default Timer;