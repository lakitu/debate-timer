import {View} from "react-native";
import {StartScreenStyles as styles} from "../styles";
import {Picker} from "@react-native-picker/picker";
import {formats} from "../../../assets/formats/formats";
import React from "react";

export const SelectStyleDropdown = (props: { selectedFormat:string, setSelectedFormat: (value: string) => void }) => {
  return (
    <View style={styles.inputs}>
      <Picker selectedValue={props.selectedFormat} onValueChange={value => props.setSelectedFormat(value)}>
        {formats.map((format, i) => {
          return <Picker.Item label={format[0]} value={format[1]} key={i}/>
        })}
      </Picker>
    </View>
  )
}