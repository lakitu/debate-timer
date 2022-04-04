export interface FormatData {
  format: string,
  abbreviation: string,
  prep: number,
  sides: [string, string],
  grace?: number,
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

export const MAX_SPEECH_LENGTH = 60 * 60 * 1000;