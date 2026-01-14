from pydantic import BaseModel
from datetime import date

class Guess(BaseModel):
    date: date # should this be a str for coming in?


class GuessDTO(BaseModel):
    datestring: str
    start_id: str


class ReducedVideoDTO(BaseModel):
    id: str
    prev: str   # id of previous video
    next: str   # id of next video


class VideoDTO(ReducedVideoDTO):
    date: date
    url: str    # url for the iframe


dateformat = "%Y-%m-%dT%H:%M:%S.%fZ"