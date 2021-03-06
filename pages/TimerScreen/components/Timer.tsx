import {FormatData, MAX_SPEECH_LENGTH, RoomData, timeToDisplay} from "../../../interfaces";
import React, {useEffect, useState} from "react";
import {Text, TextInput, Vibration, View} from "react-native";
import {timerStyles as styles} from "../styles";
import {activateKeepAwake, deactivateKeepAwake} from "expo-keep-awake";

const Timer = (props: {formatData: FormatData, roomData: RoomData, isHost: boolean, setTime:(mins:string,secs:string,tens:string)=>void}) => {
  //region initializing state
  const [displayTime, setDisplayTime] = useState("");
  const [paused, setPause] = useState(true);
  const [willVibrate, setWillVibrate] = useState(true);
  const [tick, setTick] = useState(false);
  const [onTime, setOnTime] = useState(Date.now());
  //endregion

  useEffect(() => {
    setDisplayTime(timeToDisplay(props.roomData.speechTime, props.formatData.grace));
    setPause(props.roomData.speechTime <= MAX_SPEECH_LENGTH);
    if (paused) return; // if paused, don't do an interval
    const grace = props.formatData.times[props.roomData.speechNum][0] === "Prep" ? undefined : props.formatData.grace;
    const endTime = props.formatData.grace?"-":"" + "0:" + props.formatData.grace??"00" + ".0";
    const interval = setInterval(() => {
      const newDisplayTime = timeToDisplay(props.roomData.speechTime, grace);
      setDisplayTime(newDisplayTime);
      // check if speech is done and if the phone will vibrate.
      if (newDisplayTime === endTime && willVibrate) {
        Vibration.vibrate(Array(5).fill(1000));
        clearInterval(interval);
        setWillVibrate(false);
      }
    }, 80);
    return () => {
      clearInterval(interval);
    };
  }, [props.roomData, paused]);
  useEffect(() => {
    const tickInterval = setTimeout(() => setTick(!tick), 500);
    if (Date.now() - 20*60*1000 > onTime) deactivateKeepAwake();
    return () => {
      clearInterval(tickInterval);
    }
  }, [tick]);
  useEffect(() => {
    setWillVibrate(true);
    setTick(false);
    setOnTime(Date.now());
    activateKeepAwake();
    return () => {
      deactivateKeepAwake();
    }
  }, [props.roomData.speechNum]);

  if (displayTime === undefined || displayTime === "") return null;

  // region special styles
  const displaySpeech = !(props.roomData.code === '' || props.formatData.times.length === 1);
  const flashText = tick && !paused && displayTime.includes(`${props.formatData.grace?"-":""}0:${props.formatData.grace??"00"}.0`);
  const textStyle = [styles.count, flashText ? styles.finishedRed : styles.finishedBlack];
  // endregion
  return (
    <View style={[styles.container]}>
      <Text style={[styles.speechName]}> {displaySpeech && props.formatData.times[props.roomData.speechNum][0]} </Text>
      {(!paused || !props.isHost) && <Text style={textStyle} selectable={false}>{displayTime}</Text>}
      {paused && props.isHost && <EditableTime displayTime={displayTime} textStyle={textStyle} paused={paused} setTime={props.setTime}/>}
    </View>
  );
}

function EditableTime(props: {displayTime:string, textStyle: Array<Object>, paused:boolean, setTime:(mins:string,secs:string,tens:string)=>void}) {
  const [minutes, setMinutes] = useState(splitTime(props.displayTime)[0]);
  const [seconds, setSeconds] = useState(splitTime(props.displayTime)[1]);
  const [tenths, setTenths] = useState(splitTime(props.displayTime)[2]);
  useEffect(() => {
    const split = splitTime(props.displayTime);
    setMinutes(split[0]);
    setSeconds(split[1]);
    setTenths(split[2]);
  }, [props.displayTime]);
  const setTime = () => props.setTime(minutes, seconds, tenths);

  return (
    <View style={{"flexDirection":"row",alignItems:"center",}}>
      {/*Minutes*/}
      <TextInput style={[props.textStyle, {maxWidth:minutes.length*36.5,textAlign:"right"}]}
                 value={minutes} editable={props.paused} maxLength={2}
                 onChangeText={(newMinutes)=>setMinutes(newMinutes.replace(/[^0-9]/g, ''))}
                 onBlur={setTime} keyboardType={"number-pad"}/>

      <Text style={[props.textStyle]} selectable={false}>:</Text>

      {/*Seconds*/}
      <TextInput style={[props.textStyle, {maxWidth:73,textAlign:"center",}]}
                 value={seconds} editable={props.paused} maxLength={2}
                 onChangeText={(newSeconds)=>setSeconds(newSeconds.replace(/[^0-9]/g, ''))}
                 onBlur={setTime} keyboardType={"number-pad"}/>
      <Text style={[props.textStyle]} selectable={false}>.</Text>

      {/*Tenths*/}
      <TextInput style={[props.textStyle, {maxWidth:36,textAlign:"left"}]}
                 value={tenths} editable={props.paused} maxLength={1}
                 onChangeText={(newTenths)=>setTenths(newTenths.replace(/[^0-9]/g, ''))}
                 onBlur={setTime} keyboardType={"number-pad"}/>
    </View>
  );
}

function splitTime (displayTime:string):[string,string,string] {
  if (displayTime === "") return ["","",""];
  return [
    displayTime.split(":")[0],
    displayTime.split(":")[1].split(".")[0],
    displayTime.split(".")[1],
  ]
}

export default Timer;