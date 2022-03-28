import React, {useEffect, useState} from "react"
import {View, Text, Vibration} from "react-native"
import {prepStyles as styles} from "../styles"
import {MAX_SPEECH_LENGTH, timeToDisplay} from "../../../interfaces";

const PrepTimers = (props: {prepTime: [number, number], sides: [string, string] }) => {
  return (
    <View style={[styles.container, {marginTop: 20}]}>
      { props.prepTime.map((time, i) => {
        return <PrepTimer key={i} prepTime={time} side={props.sides[i]} index={i}/>
      }) }
    </View>
  )
}

const PrepTimer = (props: {prepTime: number, side: string, index:number}) => {
  const [prepTime, setPrepTime] = useState("");
  
  useEffect(() => {
    setPrepTime( timeToDisplay(props.prepTime).slice(0, -2) );
    if (props.prepTime < MAX_SPEECH_LENGTH) {
      return;
    }
    const tick = setInterval(() => {
      const newPrepTime = timeToDisplay(props.prepTime).slice(0, -2);
      setPrepTime( newPrepTime );
      if (newPrepTime.substr(-2, 2) === "00") {
        Vibration.vibrate();
      }
    }, 990);
    return () => clearInterval(tick);
  }, [props.prepTime]);
  
  return (
    <View style={[styles.sideContainer]} >
      <Text style={styles.sideName}>{props.side}</Text>
      <Text style={styles.timer}>{prepTime}</Text>
    </View>
  )
}

export default PrepTimers;