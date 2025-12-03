import { useParams } from "react-router";
import { getVideoById } from "../constants/videoDB"

export const VideoHostPage = () => {
  let { video_id } = useParams();
  console.log(video_id);
  const video = getVideoById("" + video_id);
  console.log(video)
  
  return (
    <VideoHostFrame video={video}/>
  )
}

const VideoHostFrame = ({video}) => {
  console.log(video)
  return (
    <>
    {video && <iframe src={video.url} width="560" height="315"></iframe>}
    </>
  )
}