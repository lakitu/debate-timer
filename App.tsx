import React, {useEffect, useState} from 'react';
import AppLoading from 'expo-app-loading'
import {StartScreen} from "./pages/StartScreen/StartScreen";
import {TimerScreen} from "./pages/TimerScreen/TimerScreen";
import {BlankFormatData, BlankRoomData, FormatData, RoomData} from "./interfaces";
import {useFonts} from "expo-font"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

//region Firebase Config
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBkTDE1G6uNZ--DPdI2PnGbez5Q3KqkpdA",
  authDomain: "debate-timer-backend.firebaseapp.com",
  projectId: "debate-timer-backend",
  storageBucket: "debate-timer-backend.appspot.com",
  messagingSenderId: "47969277947",
  appId: "1:47969277947:web:8ad910238718c08fa99d5e",
  measurementId: "G-1EEJVY9E3G"
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
//endregion
export let offline = false;

//TODO: Feature to edit times
//TODO: Offline app features
//TODO: Create special link for app
//TODO: Set up sharing to go directly to app
//TODO: Add non-anonymous login
export default function App () {
  //region initialize state
  const [formatData, setFormatData] = useState<FormatData>(BlankFormatData); // makes the formatData
  const [roomData, setRoomData] = useState<RoomData>(BlankRoomData);
  const [room, setRoom] = useState<string>(''); // stores room code
  const [isHost, setHost] = useState(false);
  const [uid, setUid] = useState<string>('');
  const [formats, setFormats] = useState<[string,string][]>([["Loading","Load"]]);
  const joinRoom = (room: string, isHost: boolean) => {
    setRoom(room);
    if (isHost) setHost(isHost);
    else {
      fetch(`https://us-central1-debate-timer-backend.cloudfunctions.net/checkHost?uid=${uid}&room=${room}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.result === "failure") {
            setHost(false);
            return;
          }
          setHost(data.message.isHost);
        });
    }
  }
  //endregion
  const restartApp = () => {
    setFormatData(BlankFormatData);
    setRoomData(BlankRoomData);
    setRoom("");
    setHost(false);
    setUid("");
  };

  //region Firebase Auth
  useEffect(() => {
    if (uid !== "") return;
    auth.signInAnonymously()
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    auth.onAuthStateChanged(user => user && setUid(user.uid));
  }, [uid])
  //endregion
  useEffect(() => {
    db.collection("formats").get()
      .then(collection => collection.docs.map(doc => [doc.data().format, doc.data().abbreviation] as [string,string]) )
      .then(unsorted => unsorted.sort((a, b) => a[0].localeCompare(b[0])) )
      .then(arr => setFormats(arr));
  }, [db])
  useEffect(() => {
    const RoomDataConverter = {
      toFirestore: (data: RoomData) => data,
      fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as RoomData,
    }
    const FormatDataConverter = {
      toFirestore: (data: FormatData) => data,
      fromFirestore: (snap: QueryDocumentSnapshot) => {
        const data = snap.data();
        data.times = Object.entries(data.times) // gets an array of times (ex [arraya, [1AC, 4]])
          .sort((a, b) => a[0].localeCompare(b[0])) // sort the array by key name (so arraya goes before arrayb)
          .map(val => val[1]); // return only the values (so get rid of the arraya thing, keep only [1AC, 4])
        return data as FormatData
      },
    }
    if (room !== '' && roomData.code === '') { //TODO: add promise function functionality so code reruns if bad data is received
      (async () => {
        // region initialData
        const roomSnapshot = await db.doc(`/rooms/${room}`).withConverter(RoomDataConverter).get();
        const tempRoomData = roomSnapshot.data() as RoomData;
        if (typeof(tempRoomData) === "undefined") {
          throw "bad room data" //TODO: handle bad room data
        }

        const formatSnapshot = await db.doc(`/formats/${tempRoomData.format.toLowerCase()}`).withConverter(FormatDataConverter).get() // get format doc
        const tempFormatData = formatSnapshot.data() as FormatData;
        if (typeof(tempFormatData) === "undefined") {
          throw "bad format data" //TODO: handle bad format data
        }
        setRoomData(tempRoomData);
        setFormatData(tempFormatData);
        //endregion

        db.doc(`/rooms/${room}`).withConverter(RoomDataConverter).onSnapshot((doc) => {
          const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          const newData = doc.data() as RoomData;
          if (source === "Server") setRoomData(newData);
        });
      })();
    }
  }, [room]); // firestore updates and initial data

  //region loading fonts
  const [loaded, error] = useFonts({
    'RobotoMono': require('./assets/fonts/RobotoMono/RobotoMono-VariableFont_wght.ttf'),
    'MontserratAlternate': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-Regular.ttf'),
  });
  if(error) console.log(error);
  if (!loaded) return <AppLoading />;
  //endregion

  // no output if fonts not loaded
  if (room === '') return <StartScreen uid={uid} joinRoom={joinRoom} formats={formats}/>;
  return <TimerScreen isHost={isHost} uid={uid} formatData={formatData} roomData={roomData} restartApp={restartApp}/>;
}