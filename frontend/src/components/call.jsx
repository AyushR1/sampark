-import React, { useContext } from 'react';
-import { Grid, Typography } from '@mui/material';
-import { Button } from '@mui/material';
-import { SocketContext } from '../Context';
-import logo from '../assests/logo.png';
-
const VideoPlayer = () => {
 const {
    name,
    callAccepted,
   userVideo,
    callEnded,
   stream,
    myVideo,
    camera,
    audio,
    call,
  } = useContext(SocketContext);
  return (
    <div className="callContainer" style={{ display: renderCall() }}>
        <Suspense fallback={<div>Loading...</div>}>
        </Suspense>
        <div className="partnerVideoContainer">
          {PartnerVideo}
        </div>
        <div className="userVideoContainer">
          {UserVideo}
        </div>
        <div className="controlsContainer flex">
          {audioControl}
          {videoControl}
          {screenShare}
          {fullscreenButton}
          {hangUp}
        </div>
      </div>
  );
};

-export default VideoPlayer;