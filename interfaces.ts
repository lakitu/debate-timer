export interface FormatData {
  format: string,
  abbreviation: string,
  prep: number,
  sides: [string, string],
  grace?: number,
  times: Array<[string, number]>
}

export const BlankFormatData:FormatData = Object.freeze({
  format: '',
  abbreviation: '',
  prep: 0,
  sides: ["Proposition", "Opposition"],
  times: [["Loading", 0]],
});

export interface RoomData {
  code: string,
  format: string,
  speechNum: number,
  speechTime: number, // if < 30*60*1000, it's paused. otherwise it's playing
  prep: [number, number], // if prep > 12*60*1000, it must be playing b/c then it is a timestamp. If prep <= 12*60*1000, it's got to be paused
}

export const BlankRoomData:RoomData = Object.freeze({
  code: '',
  format: '',
  speechNum: 0,
  speechTime: 0,
  prep: [0, 0],
});

export const MAX_SPEECH_LENGTH = 100 * 60 * 1000;

export function timeToDisplay(speechTime: number, grace?: number | undefined): string {
  // if speechTime > MAX_SPEECH_LENGTH, it's playing, so find the elapsed time between the end and now. If it's paused, just return the current time remaining
  let time = (speechTime > MAX_SPEECH_LENGTH ? speechTime - Date.now() : speechTime);
  if (time <= 0) {
    if (grace === undefined) return "0:00.0";
    if (time < -grace * 1000) return `-0:${grace}.0`;
  }
  const sign = time > 0 ? "" : "-";
  time = Math.abs(time);
  const actualSeconds = time / 1000;
  const minutes = Math.floor(actualSeconds / 60);
  const seconds = Math.floor(actualSeconds % 60);
  const displaySeconds = (String)(seconds).padStart(2, "0");
  // const displaySeconds = ("0" + (String)(seconds)).slice(-2); // gets final two digits in the string
  const tenths = Math.floor((time / 100) % 10);
  return (sign + minutes + ":" + displaySeconds + "." + tenths);
}