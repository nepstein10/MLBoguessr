from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .fake_db import fake_db as db
import json
from . import data_models, utils

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:1234",
        "https://localhost:1234"
    ],
    allow_methods=['*'],
    allow_headers=['*']
)


# Not in use
@app.get("/")
async def root():
    return {"message": "foo"}


# Return a random videoId
@app.get("/videos/random_video_id")
async def get_random_video_id():
    id = utils.random_id()
    return {"message": "Success", "videoId": id}


# Return a ReducedVideo, random if no id provided
# 503 if error with video object
@app.get("/videos/reduced")
async def get_reduced_video(id: str = None):
    id = id if id else utils.random_id()
    video = db.video_by_id(id)
    if "date" in video.keys(): del video["date"]
    if "url" in video.keys(): del video["url"]
    try:
        json_video = json.dumps(video)
    except Exception as e:
        raise HTTPException(status_code=503, detail="Video object issue") 
    return {"message": "Success", "video": video}


@app.get("/videos/url")
async def get_video_url(id: str):
    if not utils.validate_id(id):
        raise HTTPException(status_code=404, detail="Invalid id.")
    video = db.video_by_id(id)
    return {"message": "Success", "url": video['url']}


# Return a random VideoDTO object
# 503 if error with form of video object
@app.get("/videos/random_video")
async def get_random_video():
    id = utils.random_id()
    video = db.video_by_id(id)
    utils.clean_date(video)
    try:
        json_video = json.dumps(video)
        print(json_video)
    except Exception as e:
        print("reached exception ", e)
        raise HTTPException(status_code=503, detail="Video object issue")
    return {"message": "Success", "video": json_video}


# Return the VideoDTO object baased on the given id
# 404 if videoId can't be found in db
# 503 if error with form of video object
@app.get("/videos/video_by_id/{video_id}")
async def get_video_by_id(video_id: str):
    if not utils.validate_id(video_id):
        raise HTTPException(status_code=404, detail="Item not found")
    video = db.video_by_id(video_id)
    try:
        json_video = json.dumps(video)
    except Exception as e:
        raise HTTPException(status_code=503, detail="Video object issue")
    return {"message": "Success", "video": json_video}


# Takes a GuessDTO and responds with the score for that guess
@app.post("/guess")
async def submit_guess(guess: data_models.GuessDTO):
    # validate start id
    if not utils.validate_id(guess.start_id):
        raise HTTPException(status_code=404, detail="Invalid start date")
    # score guess
    score = utils.score_guess(guess)
    return {"message": "Success", "score": score}