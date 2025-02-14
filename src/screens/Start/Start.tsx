"use client";
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FC } from "react";
import cn from "classnames";
import styles from "./Start.module.css";
import Notify from "@/ui/Notify";
import TextPlugin from "gsap/TextPlugin";
import gsap from "gsap";

gsap.registerPlugin(TextPlugin);

const Start: FC = () => {
  const router = useRouter();
  const [clickedNext, setClickedNext] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [sound, setSound] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const handleClickNext = () => {
    if (clickedNext) return;

    setClickedNext(true);

    setTimeout(() => {
      router.push("/field");
    }, 5000);
  };

  const handleSoundOn = () => {
    if (!audioRef.current) return;

    audioRef.current.play();
    setSound(true);
  };

  const handleClickSound = () => {
    if (!audioRef.current?.paused) {
      audioRef.current?.pause();
    } else {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (sound) {
      gsap.to(textRef.current, {
        ease: "none",
        text: {
          speed: 2,
          value: `Добро пожаловать, мистер Кот 😊 <br /> Вы готовы отправиться в небольшое путешествие <br /> в нашу с тобой историю?`,
        },
      });
    }
  }, [sound]);

  return (
    <div className={styles.page}>
      <img className={styles.background} src="/start/gradient.jpg" alt="" />

      <div className={styles.content}>
        <div className={styles.text} ref={textRef} />
        <button className={styles.button} onClick={handleClickNext}>
          Готов
        </button>
      </div>

      <img className={styles.hen1} src="/start/hen1.gif" alt="" />
      <img className={styles.hen2} src="/start/hen2.gif" alt="" />

      <img
        className={cn(styles.funny, { [styles.clicked]: clickedNext })}
        src="/start/funny.webp"
        alt=""
      />

      {!sound && (
        <Notify>
          <div>Для начала включи звук</div>
          <img
            className={styles.sound}
            src="/sound.png"
            onClick={handleSoundOn}
            alt=""
          />
        </Notify>
      )}
      <audio ref={audioRef} autoPlay loop src="/start/start.mp3" />
      <img
        className={styles.volume}
        src="/sound.png"
        alt=""
        onClick={handleClickSound}
      />
    </div>
  );
};

export default Start;
