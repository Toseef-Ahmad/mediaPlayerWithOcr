import logo from './logo.svg';
import React, {useRef} from 'react';
import './App.css';
import VideoSnapshot from 'video-snapshot';
import ReactPlayer from 'react-player'


function App() {
  const [imgSrc, setImgSrc] = React.useState('');
  const [videoSrc, setVideoSrc] = React.useState('');
  const videoRef = useRef();
  const fileRef = useRef();

  const handleClick = async (e) => {
      const snapshoter = new VideoSnapshot(e.target.files[0]);
      const previewSrc = await snapshoter.takeSnapshot();
      setVideoSrc(URL.createObjectURL(e.target.files[0]));
      console.log(e.target.files[0].name)
      setImgSrc(previewSrc);


      // img.src = previewSrc;
      //
      // document.body.appendChild(img);
  }

  const handleTakeSnapShot = async () => {
      const file = fileRef.current.files[0];
      console.log(file)
      const snapshoter = new VideoSnapshot(file);
      const previewSrc = await snapshoter.takeSnapshot(file.currentTime);
      // setVideoSrc(URL.createObjectURL(e.target.files[0]));
      // console.log(e.target.files[0].name)
      setImgSrc(previewSrc);
  }
  return (
    <div className="App">
        <ReactPlayer url={videoSrc} playing={true} controls={true} />
        <input type="file" ref={fileRef} onChange={handleClick}/>
        <img src={imgSrc} />
        <button onClick={handleTakeSnapShot}>take snapshot</button>
    </div>
  );
}

export default App;
