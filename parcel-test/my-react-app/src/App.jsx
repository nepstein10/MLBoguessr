import './App.css';
import GuessPage from "./pages/GuessPage"
import { VideoHostPage } from './pages/VideoHostPage';
import { BrowserRouter, Routes, Route } from "react-router"
import { VIDEO_HOST_LINK } from './constants/textConstants';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuessPage />} />
        <Route path={`${VIDEO_HOST_LINK}/:video_id`} element={<VideoHostPage />} />
        <Route path="*" element={<div>OOPS</div>} />
      </Routes>
    </BrowserRouter>
  );
}
