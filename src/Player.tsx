import React, {useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const Player = () => {
  const playerRef = useRef()

  useEffect(() =>  {
    const script = document.createElement("script");
    script.src =
      "https://player.live-video.net/1.2.0/amazon-ivs-videojs-tech.min.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      const PLAYBACK_URL = 'https://ea1c51b185e6.us-east-1.playback.live-video.net/api/video/v1/us-east-1.623357820778.channel.E4ERzgPEOY2t.m3u8'
      // @ts-ignore
      registerIVSTech(videojs)

      // Initialize player
      const player = videojs(
        "amazon-ivs-videojs",
        {
          techOrder: ["AmazonIVS"],
        },
        () => {
          console.log("Player is ready to use!");
          player.src(PLAYBACK_URL);
        }
      );

      //@ts-ignore
      playerRef.current = player;
    })

    return () => {
      //@ts-ignore
      playerRef.current.dispose();
      document.body.removeChild(script);
    };
  }, [])

  return (
    <div>
      <video
        id="amazon-ivs-videojs"
        className="video-js vjs-4-3 vjs-big-play-centered"
        controls
        autoPlay
        playsInline
        muted
      ></video>
    </div>
  );
}

export default Player
