

// Format: {
// id: {
//   date: Date,
//   url: string,
//   prev: idstring,
//   next: idstring
//   }
// }
const video_db  = {
  "1": {
    "date": new Date("01-02-2020"),
    "url": "https://streamable.com/m/logan-allen-ball-to-rafael-devers-1nujnw",
    "prev": null,
    "next": "2"
  },
  "2": {
    "date": new Date("01-03-2020"),
    // Savant search with flag for last pitch, open video in new tab, use that link
    "url": "https://sporty-clips.mlb.com/TkFWdkJfWGw0TUFRPT1fQmxKV1ZWWUNWQWNBQ2xWWFZBQUhVd1JXQUFBSEJWZ0FBbE5XVWdBQkFnc0JCZ0Jm.mp4",
    "prev": "1",
    "next": null
  }
}

// Returns the video object for a given id
export const getVideoById = (id) => video_db[id]

// Returns a random valid video id
export const getRandomVideoId = () => Object.keys(video_db)[Math.floor(Math.random() * Object.keys(video_db).length)]