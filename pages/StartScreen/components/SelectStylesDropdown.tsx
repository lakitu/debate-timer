import {StartScreenStyles as styles} from "../styles";
import React, {useEffect, useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {db} from "../../../App"

export const SelectStylesDropdown = (props: {selectedFormat:string, setSelectedFormat:(value:string)=>void} ) => {
  const [formats, setFormats] = useState<[string, string][]>([["loading","load"]]);
  useEffect(() => {
    if (db === undefined) return;
    db.collection("formats").get()
      .then(collection => setFormats( collection.docs.map(doc => [doc.data().format, doc.data().abbreviation]) ));
  }, [db]);

  return (
    <Picker selectedValue={props.selectedFormat} onValueChange={props.setSelectedFormat} style={styles.dropdown}>
      {formats.map((format, i) => { // formats come as format name, abbreviation
        return <Picker.Item label={format[0]} value={format[1]} key={i}/>
      })}
    </Picker>
  );
}