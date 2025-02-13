"use client";
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import { useRef, useState, type FC } from "react";
import cn from "classnames";
import styles from "./Start.module.css";
import Notify from "@/ui/Notify";

const Start: FC = () => {
  const router = useRouter();
  const [clickedNext, setClickedNext] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [sound, setSound] = useState(false);

  const handleClickNext = () => {
    if (clickedNext) return;

    setClickedNext(true);

    setTimeout(() => {
      router.push("/field");
    }, 6000);
  };

  const handleSoundOn = () => {
    if (!audioRef.current) return;

    audioRef.current.play();
    setSound(true);
  };

  return (
    <div className={styles.page}>
      <img className={styles.background} src="/gradient.jpg" alt="" />

      <div className={styles.content}>
        <div className={styles.text}>
          Добро пожаловать, мистер Кот 😊 <br />
          Вы готовы отправиться в небольшое путешествие в нашу с тобой историю?
        </div>
        <button className={styles.button} onClick={handleClickNext}>
          Готов
        </button>
      </div>

      <img className={styles.hen1} src="/hen1.gif" alt="" />
      <img className={styles.hen2} src="/hen2.gif" alt="" />

      <img
        className={cn(styles.funny, { [styles.clicked]: clickedNext })}
        src="/funny.webp"
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
      <audio ref={audioRef} autoPlay loop src="/start.mp3" />
    </div>
  );
};

export default Start;
