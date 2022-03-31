import {StartScreenStyles as styles} from "../styles";
import React from "react";
import {Picker} from "@react-native-picker/picker";

const SelectStylesDropdown = (props: {selectedFormat:string, setSelectedFormat:(value:string)=>void, formats:[string,string][]} ) => (
  <Picker selectedValue={props.selectedFormat} onValueChange={props.setSelectedFormat} style={styles.dropdown} >
    {props.formats.map((format, i) => { // formats come as format name, abbreviation
      return <Picker.Item label={format[0]} value={format[1]} key={i}/>
    })}
  </Picker>
);

export default SelectStylesDropdown;