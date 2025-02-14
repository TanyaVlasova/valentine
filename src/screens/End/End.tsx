/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, type FC } from "react";
import styles from "./End.module.css";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const End: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);

  const handleClickSound = () => {
    if (!audioRef.current?.paused) {
      audioRef.current?.pause();
    } else {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      gsap.to(textRef.current, {
        ease: "none",
        text: {
          speed: 2,
          value:
            "Чтож, на этом пока что всё :с <br /> Это все, что я успела сделать за 2 ночи, жаль я не придумала это сделать раньше, т.к. у меня еще было очень много идей. Не буду тебе об этом говорить, жди новый релиз этого сайта)",
          oldClass: styles.old,
        },
      });
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!wrapper.current) return;
      wrapper.current.style.display = "block";

      gsap.to(textRef2.current, {
        ease: "none",
        text: {
          speed: 2,
          value:
            "И еще хочу сказать, что ты мне очень нравишься. Мне было приятно перечитывать сообщения, пересматривать фото и вспоминать проведенные моменты вместе. <br/> Я замечаю все, что ты делаешь. С тобой я ощущаю тепло и близость. А еще у меня впервые отношения и секс оказались вместе. Очень хочется вместе с тобой узнавать еще новые открытия ❤️❤️❤️❤️❤️❤️❤️",
          oldClass: styles.old,
        },
      });
    }, 15000);
  }, []);

  return (
    <div className={styles.page}>
      <video className={styles.video} autoPlay muted loop src="/end/road.mp4" />

      <div className={styles.textWrapper}>
        <div className={styles.text} ref={textRef}></div>
      </div>

      <div className={styles.textWrapper2} ref={wrapper}>
        <div className={styles.text2} ref={textRef2}></div>
      </div>

      <div className={styles.end}>THE END</div>

      <img className={styles.misha} src={"/misha.png"} alt="" />
      <img className={styles.tanya} src={"/tanya.png"} alt="" />
      <img className={styles.heart} src={"/heart.png"} alt="" />

      <audio ref={audioRef} autoPlay loop src="/end/music.mp3" />

      <img
        className={styles.volume}
        src="/sound.png"
        alt=""
        onClick={handleClickSound}
      />
    </div>
  );
};

export default End;
