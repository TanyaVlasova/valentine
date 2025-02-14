/* eslint-disable @next/next/no-img-element */
"use client";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import styles from "./Rave.module.css";
import clamp from "@/utils/clamp";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const text = [
  `6 декабря<br />Мы с тобой познакомились в Twinby<br />А на следующий день мы встретились в БК<br />А ночью пошли на рейв на Фабрику<br />А еще ты создал плейлист ТехноТаня :з`,
  `Вот такие <br/> приятные <br /> сообщения`,
  `Потом еще ходили на рейвы <br /><br /> Правда я не особо танцевала.. <br/> Я просто стесняюсь..<br /> Мы же завтра пойдем?)`,
];

const assets = [
  [
    { src: "/rave/afisha.jpg", width: "300px", type: "image" },
    { src: "/rave/techno-tanya.jpg", width: "300px", type: "image" },
    { src: "/rave/twinby.jpg", width: "250px", type: "image" },
  ],
  [
    { src: "/rave/tg1.jpg", width: "500px", type: "image" },
    { src: "/rave/tg2.jpg", width: "400px", type: "image" },
    { src: "/rave/tg3.jpg", width: "400px", type: "image" },
  ],
  [
    { src: "/rave/misha.jpg", width: "300px", type: "image" },
    { src: "/rave/tanya.jpg", width: "300px", type: "image" },
    { src: "/rave/love.mp4", width: "400px", type: "video" },
  ],
];

const Rave: FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const mishaRef = useRef<HTMLImageElement>(null);
  const tanyaRef = useRef<HTMLImageElement>(null);
  const [mishaShift, setMishaShift] = useState(0);
  const [tanyaShift, setTanyaShift] = useState(150);
  const minShift = useRef(0);
  const maxShift = useRef(1900);
  const audioRef = useRef<HTMLAudioElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const handleNext = () =>
    setStep((prev) => clamp(0, prev + 1, text.length - 1));
  const handlePrev = () =>
    setStep((prev) => clamp(0, prev - 1, text.length - 1));

  const handleMove = useCallback(
    (event: KeyboardEvent) => {
      if (mishaRef.current) {
        if (event.code === "KeyD") {
          const newMishaShift = clamp(
            minShift.current,
            mishaShift + 10,
            maxShift.current
          );
          mishaRef.current.style.transform = `translateX(${newMishaShift}px)`;
          setMishaShift(newMishaShift);
        }
        if (event.code === "KeyA") {
          const newMishaShift = clamp(
            minShift.current,
            mishaShift - 10,
            maxShift.current
          );
          mishaRef.current.style.transform = `translateX(${newMishaShift}px) rotateY(180deg)`;
          setMishaShift(newMishaShift);
        }
      }

      if (tanyaRef.current) {
        if (event.code === "ArrowRight") {
          const newTanyaShift = clamp(
            minShift.current,
            tanyaShift + 10,
            maxShift.current
          );
          tanyaRef.current.style.transform = `translateX(${newTanyaShift}px) rotateY(180deg)`;
          setTanyaShift(newTanyaShift);
        }
        if (event.code === "ArrowLeft") {
          const newTanyaShift = clamp(
            minShift.current,
            tanyaShift - 10,
            maxShift.current
          );
          tanyaRef.current.style.transform = `translateX(${newTanyaShift}px)`;
          setTanyaShift(newTanyaShift);
        }
      }
    },
    [mishaShift, tanyaShift]
  );

  const handleClickSound = () => {
    if (!audioRef.current?.paused) {
      audioRef.current?.pause();
    } else {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (step === 2) return audioRef.current?.pause();

    audioRef.current?.play();
  }, [step]);

  useEffect(() => {
    window.addEventListener("keydown", handleMove);

    return () => window.removeEventListener("keydown", handleMove);
  }, [handleMove]);

  useEffect(() => {
    if (tanyaShift === maxShift.current && mishaShift === maxShift.current) {
      router.push("/memories");
    }
  }, [mishaShift, router, tanyaShift]);

  useEffect(() => {
    gsap.to(textRef.current, {
      ease: "none",
      text: {
        speed: 2,
        value: text[step],
        oldClass: styles.old,
      },
    });
  }, [step]);

  return (
    <div className={styles.page}>
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        src="/rave/rave.mp4"
      />

      <div className={styles.text}>
        <div className={styles.arrows}>
          <img
            className={styles.arrow}
            src="/arrow.png"
            onClick={handlePrev}
            style={{ transform: "rotateY(180deg)" }}
            alt=""
          />
          <img
            className={styles.arrow}
            src="/arrow.png"
            onClick={handleNext}
            alt=""
          />
        </div>

        <div ref={textRef}></div>
      </div>

      {assets[step] && (
        <div className={styles.assets}>
          {assets[step].map((asset) => {
            return asset.type === "image" ? (
              <img
                key={asset.src}
                src={asset.src}
                style={{ width: asset.width }}
                alt=""
              />
            ) : (
              <video
                key={asset.src}
                src={asset.src}
                style={{ width: asset.width }}
                autoPlay
                loop
              />
            );
          })}
        </div>
      )}

      <img className={styles.misha} ref={mishaRef} src={"/misha.png"} alt="" />
      <img className={styles.tanya} ref={tanyaRef} src={"/tanya.png"} alt="" />

      <audio ref={audioRef} autoPlay loop src="/rave/parallax.mp3" />

      <img
        className={styles.volume}
        src="/sound.png"
        alt=""
        onClick={handleClickSound}
      />
    </div>
  );
};

export default Rave;
