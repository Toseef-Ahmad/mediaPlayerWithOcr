import logo from "./logo.svg";
import React, { useRef } from "react";
import "./App.css";
import VideoSnapshot from "video-snapshot";
import ReactPlayer from "react-player";
import PerformOcr from "./PerformOcr";

function App() {
  const [imgSrc, setImgSrc] = React.useState("");
  const [videoSrc, setVideoSrc] = React.useState("");
  const [videoDuration, setVideoDuration] = React.useState("");

  const videoRef = useRef();
  const fileRef = useRef();

  const handleClick = async (e) => {
    const snapshoter = new VideoSnapshot(e.target.files[0]);
    const previewSrc = await snapshoter.takeSnapshot();
    setVideoSrc(URL.createObjectURL(e.target.files[0]));
    // console.log(e.target.files[0].name)
    setImgSrc(previewSrc);
  };

  const handlePause = (duration) => {
    // console.log(duration.srcElement.duration.toFixed(2), ' duration')
    // setVideoDuration(duration.srcElement.duration.toFixed(2));
    console.log(videoRef.current.getCurrentTime().toFixed(2), " time");
    setVideoDuration(videoRef.current.getCurrentTime().toFixed(2));
  };

  const handleTakeSnapShot = async () => {
    const file = fileRef.current.files[0];
    const snapshoter = new VideoSnapshot(file);
    const previewSrc = await snapshoter.takeSnapshot(Number(videoDuration));
    console.log(videoDuration, " dfdsfads");
    // console.log(previewSrc, ' asf');
    // console.log(videoRef.getDuration())
    // setVideoSrc(URL.createObjectURL(e.target.files[0]));
    // console.log(e.target.files[0].name)
    setImgSrc(previewSrc);
    console.log(imgSrc);
  };

  return (
    <div className="App">
      <ReactPlayer
        ref={videoRef}
        url={videoSrc}
        playing={true}
        controls={true}
        onPause={handlePause}
      />
      <input type="file" ref={fileRef} onChange={handleClick} />
      <img src={imgSrc} alt="img" />
      <button onClick={handleTakeSnapShot}>take snapshot</button>
      <PerformOcr image={imgSrc} />
    </div>
  );
}

export default App;
