import React from "react";
import {Switch, View, Text} from "react-native";
import {OfflineToggleStyles as styles} from "../styles";


const OfflineToggle = (props: {offline:boolean, setOffline:(newState:boolean)=>void}) => (
  <View style={styles.container}>
    <Text style={styles.text}>Offline</Text>
    <Switch
      trackColor={{"false": "gray", "true": "#1f1fff"}}
      thumbColor={"white"}
      //@ts-ignore
      activeThumbColor={"white"} // this is an actual prop on rn web
      onValueChange={(newState:boolean)=>props.setOffline(newState)}
      value={props.offline}
    />
  </View>
)

export default OfflineToggle;