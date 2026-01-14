import { useEffect, useState } from "react";
import axios from "axios";
import ControlBar from "../components/ControlBar";
import GuessBar from "../components/GuessBar";
import { VIDEO_HOST_LINK, API_URL } from "../constants/textConstants";
// import { getRandomVideo, getVideoById } from "../constants/videoDB";
// import { View, Text } from "react-native"

function GuessPage() {
  const [initialVideo, setInitialVideo] = useState(undefined)

  const [activeVideo, setActiveVideo] = useState(undefined)
  const [score, setScore] = useState(undefined)

  useEffect(() => {
    console.log("initial run", initialVideo)
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
  const switchVideo = (direction) => {
    axios.get(`${API_URL}/videos/reduced`)
    .then((response) => {
      setActiveVideo(response?.data?.video)
    })
    .catch((err) => console.log(err))
    // setActiveVideo(getVideoById(activeVideo?.[direction]));
  }

  const submitGuess = (guessDate) => {
    console.log("Guess submitted: " + guessDate + "\nAnswer: " + initialVideo?.date);
    const postBody = {
      datestring: guessDate,
      start_id: initialVideo?.id
    }
    axios.post(`${API_URL}/guess`, postBody)
      .then((response) => setScore(response.data.score))
      .catch((err) => console.log("ERROR", err))
  }

  
  return (
    <div>
      {
        console.log(activeVideo)}{
        console.log(initialVideo)
      } 
      <h1>
        When is this video from?
      </h1>
      {
        console.log(typeof(activeVideo), activeVideo, activeVideo?.id, activeVideo ? Object.keys(activeVideo) : null )
      }
      {
        activeVideo?.id
        ? <iframe src={`${VIDEO_HOST_LINK}/${activeVideo?.id}`} width="580" height="325" />
        : <div width="580" height="325"><p>foobar</p></div>
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