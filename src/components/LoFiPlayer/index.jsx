import React, { useEffect, useRef, useState } from "react";

const LoFiPlayer = () => {
  const tracks = [
    "/tracks/days-off-matrika-main-version-39449-02-56.mp3",
    "/tracks/pink-swan-qube-main-version-23975-02-30.mp3",
    "/tracks/wayfarer-color-parade-main-version-02-17-14023.mp3",
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef(new Audio(tracks[currentTrack]));
  const fadeDuration = 5;

  useEffect(() => {
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!isPlaying) return;

    const currentAudio = audioRef.current;
    let intervalId = null;

    const checkFade = () => {
      if (!currentAudio.duration) return;
      const remaining = currentAudio.duration - currentAudio.currentTime;

      if (remaining <= fadeDuration) {
        clearInterval(intervalId);

        const nextTrackIndex = (currentTrack + 1) % tracks.length;
        const nextAudio = new Audio(tracks[nextTrackIndex]);
        nextAudio.volume = 0;
        nextAudio.play();

        let step = 0.02;
        const crossfade = setInterval(() => {
          if (currentAudio.volume > 0) currentAudio.volume = Math.max(0, currentAudio.volume - step);
          if (nextAudio.volume < volume) nextAudio.volume = Math.min(volume, nextAudio.volume + step);

          if (currentAudio.volume <= 0 && nextAudio.volume >= volume) {
            clearInterval(crossfade);
            audioRef.current = nextAudio;
            setCurrentTrack(nextTrackIndex);
          }
        }, (fadeDuration * 1000 * step) / volume);
      }
    };

    intervalId = setInterval(checkFade, 200);
    return () => clearInterval(intervalId);
  }, [currentTrack, isPlaying, volume]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    audioRef.current.currentTime = audioRef.current.duration - fadeDuration;
    audioRef.current.dispatchEvent(new Event("timeupdate"));
  };

  const handlePrev = () => {
    const prevTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    setCurrentTrack(prevTrack);
    setIsPlaying(true);
    audioRef.current = new Audio(tracks[prevTrack]);
    audioRef.current.volume = volume;
    audioRef.current.play();
  };

  const handleVolumeChange = (e) => setVolume(parseFloat(e.target.value));

  return (
    <div>
      <div>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <div>
        <label>Volume: </label>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
      </div>
    </div>
  );
};

export default LoFiPlayer;
