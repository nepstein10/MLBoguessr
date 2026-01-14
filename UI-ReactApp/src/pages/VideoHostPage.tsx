import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { API_URL } from "../constants/textConstants";

export const VideoHostPage = () => {
  let { video_id } = useParams<{ video_id: string }>();

  const [activeUrl, setActiveUrl] = useState<string>("")

  useEffect(() => {
    if (video_id) {
      console.log("sending with id: ", video_id)
      axios.get(`${API_URL}/videos/url?id=${video_id}`)
      .then((response) => {
        setActiveUrl(response?.data?.url)
      })
      .catch((err) => console.log(err))
    }
  }, [video_id])

  console.log(video_id);

  return (
    <VideoHostFrame url={activeUrl}/>
  )
}

interface VideoHostFrameProps {
  url: string;
}

const VideoHostFrame = ({url}: VideoHostFrameProps) => {
  return (
    <>
    {url && <iframe src={url} width="560" height="315"></iframe>}
    </>
  )
}
