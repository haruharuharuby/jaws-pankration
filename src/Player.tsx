import React, {CSSProperties, useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

function endEffect() {
  const n = document.querySelector("#effect");
  if (n) {
    // @ts-ignore
    n.style.visibility = "hidden";
    // @ts-ignore
    document.querySelector("#bgm1").pause()
  }
}

function trigger(metadata: string) {
  const el = document.querySelector('.metadata')
  // @ts-ignore
  el.innerHTML = metadata
  const d = JSON.parse(metadata)
  if (d.effect === "givemecheers") {
    const n = document.querySelector("#effect")
    if (n) {
      // @ts-ignore
      n.style.visibility = "visible";
      setTimeout(endEffect, 5000)
      // @ts-ignore
      document.querySelector("#bgm1").play()
      // @ts-ignore
      new p5(give_me_cheers, n);
    }
  }
}

const Player = () => {
  const playerRef = useRef()

  useEffect(() =>  {
    const audio1 = document.createElement("audio")
    audio1.id = 'bgm1'
    audio1.preload = "auto"
    const source = document.createElement("source")
    source.src = 'https://resources.hugtech.io/sound/audience.mp3'
    audio1.appendChild(source)
    document.body.appendChild(audio1)

    const p5js = document.createElement("script")
    p5js.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js'
    document.body.appendChild(p5js)
    const effect1 = document.createElement("script")
    effect1.src = 'https://resources.hugtech.io/js/fuhahahahahaha.js'
    document.body.appendChild(effect1)

    const script = document.createElement("script");
    script.src =
      "https://player.live-video.net/1.2.0/amazon-ivs-videojs-tech.min.js";
    document.body.appendChild(script);

    const css = document.createElement("link");
    css.rel = "stylesheet"
    css.href = "https://resources.hugtech.io/stylesheets/p5js.css"
    document.head.appendChild(css)
  
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

      // @ts-ignore
      const ivsPlayer = player.getIVSPlayer();
      // Log and display timed metadata
      // @ts-ignore
      ivsPlayer.addEventListener('PlayerTextMetadataCue', (cue) => {
      const metadataText = cue.text;
      const position = ivsPlayer.getPosition().toFixed(2);
      console.log(
        `Player Event - TEXT_METADATA_CUE: "${metadataText}". Observed ${position}s after playback started.`
      );
      trigger(metadataText);
    });

      //@ts-ignore
      playerRef.current = player;
    })

    return () => {
      //@ts-ignore
      playerRef.current.dispose();
      document.body.removeChild(script);
    };
  }, [])

  const metadataStyle: CSSProperties = {
    zIndex: 99,
    fontSize: 50,
    color: 'white'
  }
  return (
    <div>
      <div className='metadata' style={metadataStyle}></div>
      <video
        id="amazon-ivs-videojs"
        className="video-js vjs-4-3 vjs-big-play-centered"
        controls
        autoPlay
        playsInline
        muted
      ></video>
      <div id='effect'></div>
    </div>
  );
}

export default Player
