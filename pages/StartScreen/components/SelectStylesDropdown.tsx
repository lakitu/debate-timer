import {StartScreenStyles as styles} from "../styles";
import React, {useEffect, useState} from "react";
import {db} from "../../../App";
import {Picker} from "@react-native-picker/picker";

export const SelectStylesDropdown = (props: {selectedFormat:string, setSelectedFormat:(value:string)=>void} ) => {
  const [formats, setFormats] = useState<Array<[string, string]>>([["loading","load"]]);
  useEffect(() => {
    db.collection("formats").get()
      .then(collection => setFormats( collection.docs.map(doc => [doc.data().format, doc.data().abbreviation]) ));
  }, []);


  return (
    <Picker selectedValue={props.selectedFormat} onValueChange={props.setSelectedFormat} style={styles.dropdown}>
      {formats.map((format, i) => {
        return <Picker.Item label={format[0]} value={format[1]} key={i}/>
      })}
    </Picker>
  )
}