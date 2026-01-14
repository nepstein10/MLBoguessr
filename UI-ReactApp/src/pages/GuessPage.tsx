import { useEffect, useState } from "react";
import axios from "axios";
import ControlBar from "../components/ControlBar";
import GuessBar from "../components/GuessBar";
import { VIDEO_HOST_LINK, API_URL } from "../constants/textConstants";
import { Dayjs } from "dayjs";

interface Video {
  id: string;
  prev?: string | null;
  next?: string | null;
  date?: string;
}

function GuessPage() {
  const [initialVideo, setInitialVideo] = useState<Video | undefined>(undefined)

  const [activeVideo, setActiveVideo] = useState<Video | undefined>(undefined)
  const [score, setScore] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (!initialVideo) {
      axios.get(`${API_URL}/videos/reduced`)
      .then((response) => {
        setInitialVideo(response?.data?.video)
      })
      .catch((err) => console.log(err))
    }
  }, [])

  useEffect(() => {
    console.log("setting active")
    setActiveVideo(initialVideo)
  }, [initialVideo])

  // direction: "prev" or "next"
  const switchVideo = (direction: "prev" | "next") => {
    axios.get(`${API_URL}/videos/reduced`)
    .then((response) => {
      setActiveVideo(response?.data?.video)
    })
    .catch((err) => console.log(err))
    // setActiveVideo(getVideoById(activeVideo?.[direction]));
  }

  const submitGuess = (guessDate: Dayjs | null) => {
    console.log("Guess submitted: " + guessDate + "\nAnswer: " + initialVideo?.date);
    const postBody = {
      datestring: guessDate?.format("YYYY-MM-DD") || "",
      start_id: initialVideo?.id || ""
    }
    axios.post(`${API_URL}/guess`, postBody)
      .then((response) => setScore(response.data.score))
      .catch((err) => console.log("ERROR", err))
  }

  
  return (
    <div>
      <h1>
        When is this video from?
      </h1>
      {
        activeVideo?.id
        ? <iframe src={`${VIDEO_HOST_LINK}/${activeVideo?.id}`} width="580" height="325" />
        : <div style={{width: "580px", height: "325px"}}><p>foobar</p></div>
      }
      <ControlBar
        setFunc={switchVideo}
        first={activeVideo?.prev == null}
        last={activeVideo?.next == null}
      />
      <GuessBar submitGuess={submitGuess} />
      { score && 
      <div>
        <p>Your guess scored: <span>{score}</span></p>
      </div>
      }
    </div>
  )
}

export default GuessPage;
