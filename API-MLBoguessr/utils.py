from datetime import datetime, date
import random
from .data_models import GuessDTO, VideoDTO, dateformat
from .fake_db.fake_db import video_db as db


def validate_id(id: str):
    ''' return True if id exists in db, else False '''
    return id in db.keys()


def random_id():
    return random.choice(list(db.keys()))


def convert_dayjs_to_datetime(dayjs: str):
    ''' return a datetime.date from the dayjs format '''
    return datetime.strptime(dayjs, dateformat).date()


def score_guess(guess: GuessDTO):
    ''' return the points for a Guess and a valid start date '''
    start_date = db[guess.start_id]["date"]
    days_away = (start_date - convert_dayjs_to_datetime(guess.datestring)).days
    # for now use linear scoring, based on 1000 max
    score = max(0, 1000 - abs(days_away))
    return score


def clean_date(video: VideoDTO):
        if type(video['date']) == date:
            video['date'] = datetime.strftime(video['date'], dateformat)
        return video