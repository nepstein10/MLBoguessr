import { VIDEO_HOST_LINK } from "../constants/textConstants";
import { getRandomVideoId } from "../constants/videoDB";

function GuessPage() {
  const randomId = getRandomVideoId()
  console.log(randomId)
  return (
    <div>
      <h1>
        When is this video from?
      </h1>
      <iframe src={`${VIDEO_HOST_LINK}/${randomId}`} width="580" height="325"></iframe>
    </div>
  )
}

export default GuessPage;