export interface FormatData {
  format: string,
  abbreviation: string,
  prep: number,
  sides: [string, string],
  times: Array<[string, number]>
}

export const BlankFormatData:FormatData = {
  format: '',
  abbreviation: '',
  prep: 0,
  sides: ["Proposition", "Opposition"],
  times: [["Loading", 0]],
}

export interface RoomData {
  code: string,
  format: string,
  speechNum: number,
  speechTime: number, // if < 30*60*1000, it's paused. otherwise it's playing
  prep: [number, number], // if prep > 12*60*1000, it must be playing b/c then it is a timestamp. If prep <= 12*60*1000, it's got to be paused
}

export const BlankRoomData:RoomData = {
  code: '',
  format: '',
  speechNum: 0,
  speechTime: 0,
  prep: [0, 0],
}

export const MAX_SPEECH_LENGTH = 30 * 60 * 1000;

export function timeToDisplay(speechTime: number): string {
  // if speechTime > MAX_SPEECH_LENGTH, it's playing, so find the elapsed time between the end and now. If it's paused, just return the current time remaining
  let time = (speechTime > MAX_SPEECH_LENGTH ? speechTime - Date.now() : speechTime);
  if (time <= 0) return "0:00.0";
  const actualSeconds = time / 1000;
  const minutes = Math.floor(actualSeconds / 60);
  const seconds = Math.floor(actualSeconds % 60);
  const displaySeconds = ("0" + (String)(seconds)).slice(-2); // gets final two digits in the string
  const tenths = Math.floor((time / 100) % 10);
  return (minutes + ":" + displaySeconds + "." + tenths);
}