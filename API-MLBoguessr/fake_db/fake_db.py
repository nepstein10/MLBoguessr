from datetime import date
from copy import copy

video_db = {
  "1": {
    "id": "1",
    "date": date(2020, 1, 2),
    "url": "https://streamable.com/m/logan-allen-ball-to-rafael-devers-1nujnw",
    "prev": None,
    "next": "2"
  },
  "2": {
    "id": "2",
    "date": date(2020, 1, 3),
    # Savant search with flag for last pitch, open video in new tab, use that link
    "url": "https://sporty-clips.mlb.com/TkFWdkJfWGw0TUFRPT1fQmxKV1ZWWUNWQWNBQ2xWWFZBQUhVd1JXQUFBSEJWZ0FBbE5XVWdBQkFnc0JCZ0Jm.mp4",
    "prev": "1",
    "next": None
  }
}

def video_by_id(id: str):
    return copy(video_db[id]) if id in video_db.keys() else None