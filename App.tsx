import React, {useEffect, useState} from 'react';
import StartScreen from "./pages/StartScreen/StartScreen";
import TimerScreen from "./pages/TimerScreen/TimerScreen";
import {BlankFormatData, BlankRoomData, FormatData, RoomData} from "./interfaces";
import {useFonts} from "expo-font"
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, onSnapshot, QueryDocumentSnapshot, getDocs } from "firebase/firestore"
import { getAuth, signInAnonymously } from "firebase/auth/";

//region Firebase Config
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBkTDE1G6uNZ--DPdI2PnGbez5Q3KqkpdA",
  authDomain: "debate-timer-backend.firebaseapp.com",
  projectId: "debate-timer-backend",
  storageBucket: "debate-timer-backend.appspot.com",
  messagingSenderId: "47969277947",
  appId: "1:47969277947:web:8ad910238718c08fa99d5e",
  measurementId: "G-1EEJVY9E3G"
});
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
//endregion
export let offline = false;

// TODO: Custom times (big project)
// TODO: Dark mode
// TODO: Create special link for app
// TODO: Set up sharing to go directly to app
// TODO: Add non-anonymous login
export default function App () {
  //region initialize state
  const [formatData, setFormatData] = useState<FormatData>(BlankFormatData); // makes the formatData
  const [roomData, setRoomData] = useState<RoomData>(BlankRoomData);
  const [room, setRoom] = useState<string>(''); // stores room code
  const [isHost, setHost] = useState(false);
  const [uid, setUid] = useState<string>('');
  const [formats, setFormats] = useState<[string,string][]>([["Loading","Load"]]);
  const [offline, setOffline] = useState(false);
  //endregion
  const joinRoom = (room: string, isHost: boolean) => {
    setRoom(room);
    if (isHost) setHost(isHost);
    if (room.toLowerCase().includes("offline")) {
      setOffline(true);
      return;
    }
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
  const restartApp = () => {
    setFormatData(BlankFormatData);
    setRoomData(BlankRoomData);
    setRoom("");
    setHost(false);
    setUid("");
  };

  // region firebase
  useEffect(() => {
    if (uid !== "") return;
    signInAnonymously(auth)
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    auth.onAuthStateChanged(user => user && setUid(user.uid));
  }, [uid]); // auth
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
        if (room.toLowerCase().includes("offline") && room.length >= 7) {
          const formatCode = room.toLowerCase().split("offline")[1];
          let tempFormatData = require("./assets/formats.json")[formatCode];
          tempFormatData.times = Object.entries(tempFormatData.times) // gets an array of times (ex [arraya, [1AC, 4]])
            .sort((a, b) => a[0].localeCompare(b[0])) // sort the array by key name (so arraya goes before arrayb)
            .map(val => val[1]); // return only the values (so get rid of the arraya thing, keep only [1AC, 4])
          delete tempFormatData.__collections__

          const tempRoomData: RoomData = {
            code: "OFFLINE",
            format: formatCode,
            speechNum: 0,
            speechTime: tempFormatData.times[0][1] * 60 * 1000,
            prep: [tempFormatData.prep * 60 * 1000, tempFormatData.prep * 60 * 1000],
          }
          setRoomData(tempRoomData);
          setFormatData(tempFormatData);
          return;
        }
        const roomDoc = doc(db, "rooms", room).withConverter(RoomDataConverter);
        const roomSnapshot = await getDoc(roomDoc);
        const tempRoomData = roomSnapshot.data() as RoomData;
        if (typeof(tempRoomData) === "undefined") {
          throw "bad room data" //TODO: handle bad room data
        }

        const formatDoc = doc(db, "formats", tempRoomData.format.toLowerCase()).withConverter(FormatDataConverter);
        const formatSnapshot = await getDoc(formatDoc); // get format doc
        const tempFormatData = formatSnapshot.data() as FormatData;
        if (typeof(tempFormatData) === "undefined") {
          throw "bad format data" //TODO: handle bad format data
        }
        setRoomData(tempRoomData);
        setFormatData(tempFormatData);
        //endregion

        onSnapshot(roomDoc, (doc) => {
          const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          const newData = doc.data() as RoomData;
          if (source === "Server") setRoomData(newData);
        })
      })();
    }
  }, [room]); // firestore updates and initial data
  // endregion
  //region set format values
  useEffect(() => {
    if (formats.length > 1) return;
    getDocs(collection(db, "formats"))
      .then(collection => collection.docs.map(doc => [doc.data().format, doc.data().abbreviation] as [string,string]) )
      .then(unsorted => unsorted.sort((a, b) => a[0].localeCompare(b[0])) )
      .then(arr => setFormats(arr));
  }, [db]); // get initial formats
  useEffect(() => { // if offline, set the formats like this
    if (formats.length > 1) return;
    if (offline) {
      const docs = Object.values(require("./assets/formats.json") as {[key:string]:FormatData})
        .map(doc => [doc.format, doc.abbreviation] as [string,string])
        .sort((a, b) => a[0].localeCompare(b[0]))
      setFormats(docs);
    }
  }, [offline]); // get initial formats if offline
  // endregion

  //region loading fonts
  const [loaded, error] = useFonts({
    'RobotoMono': require('./assets/fonts/RobotoMono/RobotoMono-VariableFont_wght.ttf'),
    'MontserratAlternate': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-Regular.ttf'),
  });
  if(error) console.log(error);
  // if (!loaded) return <AppLoadingPlaceholder />
  //endregion

  // no output if fonts not loaded
  if (room === '') return (
    // <Suspense fallback={<AppLoadingPlaceholder />} >
      <StartScreen uid={uid} joinRoom={joinRoom} formats={formats} offline={offline} setOffline={setOffline}/>
    // </Suspense>
  );
  return (
    // <Suspense fallback={<AppLoadingPlaceholder />} >
      <TimerScreen isHost={isHost} uid={uid} formatData={formatData} roomData={roomData} restartApp={restartApp} setRoomData={setRoomData}/>
    // </Suspense>
  );
}