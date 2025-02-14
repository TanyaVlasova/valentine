/* eslint-disable @next/next/no-img-element */
"use client";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import styles from "./Memories.module.css";
import clamp from "@/utils/clamp";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const messages = [
  "/memories/message0.jpg",
  "/memories/message1.jpg",
  "/memories/message2.jpg",
  "/memories/message3.jpg",
  "/memories/message4.jpg",
  "/memories/message5.jpg",
  "/memories/message6.jpg",
  "/memories/message7.jpg",
  "/memories/message8.jpg",
  "/memories/message9.jpg",
  "/memories/message10.jpg",
  "/memories/message11.jpg",
  "/memories/message12.jpg",
];

const Memories: FC = () => {
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
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
  };

  const handleNext = () => {
    if (!opened) return;
    setStep((prev) => clamp(0, prev + 1, messages.length - 1));
  };
  const handlePrev = () => {
    if (!opened) return;
    setStep((prev) => clamp(0, prev - 1, messages.length - 1));
  };

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
    setTimeout(() => {
      gsap.to(textRef.current, {
        ease: "none",
        text: {
          speed: 2,
          value:
            "А теперь посмотрим, <br /> что ещё у нас интересного было <br /> в переписочках",
          oldClass: styles.old,
        },
      });
    }, 1000);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleMove);

    return () => window.removeEventListener("keydown", handleMove);
  }, [handleMove]);

  useEffect(() => {
    if (tanyaShift === maxShift.current && mishaShift === maxShift.current) {
      router.push("/end");
    }
  }, [mishaShift, router, tanyaShift]);

  return (
    <div className={styles.page}>
      <img className={styles.background} src={"/memories/stray.jpg"} alt="" />

      <div className={styles.text} ref={textRef}></div>

      <div className={styles.box}>
        <div className={styles.container}>
          {!opened && (
            <div className={styles.open} onClick={handleOpen}>
              Открыть
            </div>
          )}
          {opened && messages[step] && (
            <img className={styles.message} src={messages[step]} alt="" />
          )}
        </div>
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
      </div>

      <img className={styles.misha} ref={mishaRef} src={"/misha.png"} alt="" />
      <img className={styles.tanya} ref={tanyaRef} src={"/tanya.png"} alt="" />

      <audio ref={audioRef} autoPlay loop src="/memories/sound.mp3" />

      <img
        className={styles.volume}
        src="/sound.png"
        alt=""
        onClick={handleClickSound}
      />
    </div>
  );
};

export default Memories;
