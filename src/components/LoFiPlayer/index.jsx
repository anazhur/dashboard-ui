import React, { useEffect, useRef, useState } from "react";
import s from "./index.module.scss";

const LoFiPlayer = () => {
  const tracks = [
    `${process.env.PUBLIC_URL}/tracks/days-off-matrika-main-version-39449-02-56.mp3`,
    `${process.env.PUBLIC_URL}/tracks/pink-swan-qube-main-version-23975-02-30.mp3`,
    `${process.env.PUBLIC_URL}/tracks/wayfarer-color-parade-main-version-02-17-14023.mp3`,
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isManualSkip, setIsManualSkip] = useState(false);

  const audioRef = useRef(null);
  const fadeDuration = 5;

  useEffect(() => {
    const audio = new Audio(tracks[currentTrack]);
    audio.volume = volume;

    audioRef.current = audio;

    if (isPlaying) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.pause();
    };
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!isPlaying || isManualSkip || !audioRef.current) return;

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
        nextAudio.play().catch(() => {});

        let step = 0.02;

        const crossfade = setInterval(() => {
          currentAudio.volume = Math.max(0, currentAudio.volume - step);
          nextAudio.volume = Math.min(volume, nextAudio.volume + step);

          if (currentAudio.volume <= 0 && nextAudio.volume >= volume) {
            clearInterval(crossfade);

            currentAudio.pause();

            audioRef.current = nextAudio;
            setCurrentTrack(nextTrackIndex);
          }
        }, (fadeDuration * 1000 * step) / volume);
      }
    };

    intervalId = setInterval(checkFade, 200);
    return () => clearInterval(intervalId);
  }, [currentTrack, isPlaying, volume, isManualSkip]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    setIsManualSkip(true);

    const nextTrackIndex = (currentTrack + 1) % tracks.length;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setCurrentTrack(nextTrackIndex);

    setTimeout(() => setIsManualSkip(false), 300);
  };

  const handlePrev = () => {
    setIsManualSkip(true);

    const prevTrack = (currentTrack - 1 + tracks.length) % tracks.length;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setCurrentTrack(prevTrack);

    setTimeout(() => setIsManualSkip(false), 300);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className={s.player}>
      <div className={s.main}>
        <div className={s.vinylWrapper}>
          <div className={`${s.vinyl} ${isPlaying && s.spin}`}>
            <div className={s.label} />
          </div>

          <div className={`${s.tonearmWrapper} ${isPlaying && s.playing}`}>
            <div className={s.tonearmBase} />
            <div className={s.tonearm}>
              <div className={s.cartridge} />
            </div>
          </div>
        </div>
      </div>

      <div className={s.side}>
        <div className={s.controlsWrapper}>
          <div className={s.volume}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>

          <div className={s.controls}>
            <button onClick={handlePrev}>⏮</button>
            <button onClick={handlePlayPause}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button onClick={handleNext}>⏭</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoFiPlayer;