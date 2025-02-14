"use client";
/* eslint-disable @next/next/no-img-element */
import Notify from "@/ui/Notify";
import styles from "./Field.module.css";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
} from "react";
import cn from "classnames";
import clamp from "@/utils/clamp";
import { useRouter } from "next/navigation";

const firstMessages = [
  "Это поле боя!",
  "Сейчас будет файт!",
  "Шучу..",
  "Как называется этот сайт?",
  "Go to love!",
  "Это не место для боя..",
  "Это место для любви!",
  "Поэтому.. принеси мне сердечко)",
  "Держи! ❤️",
];

const secondMessages = [
  "Спасибо, мистер Кот!",
  "Я знала, что ты подаришь мне своё сердечко 🥹",
  "Конечно же, я подарю тебе в ответ своё..",
  "Держи! ❤️",
  "Теперь я хочу тебе напомнить, как все начиналось..",
  "Пошли со мной..",
];

const Field: FC = () => {
  const router = useRouter();
  const [firstStep, setFirstStep] = useState(0);
  const [secondStep, setSecondStep] = useState(0);
  const mishaRef = useRef<HTMLDivElement>(null);
  const tanyaRef = useRef<HTMLDivElement>(null);
  const [mishaShift, setMishaShift] = useState(0);
  const [tanyaShift, setTanyaShift] = useState(0);
  const minMishaShift = useRef(-50);
  const maxMishaShift = useRef(1250);
  const minTanyaShift = useRef(-1550);
  const maxTanyaShift = useRef(360);
  const audioRef = useRef<HTMLAudioElement>(null);

  const mishaKeaboardEnable = useMemo(
    () => !firstMessages[firstStep],
    [firstStep]
  );
  const tanyaKeaboardEnable = useMemo(
    () => !secondMessages[secondStep],
    [secondStep]
  );

  const handleClickFirstArrow = () => setFirstStep((prev) => prev + 1);
  const handleClickSecondArrow = () => setSecondStep((prev) => prev + 1);

  const handleMove = useCallback(
    (event: KeyboardEvent) => {
      if (tanyaKeaboardEnable) {
        maxMishaShift.current = 1800;
      }

      if (mishaRef.current && mishaKeaboardEnable) {
        if (event.code === "KeyD") {
          const newMishaShift = clamp(
            minMishaShift.current,
            mishaShift + 10,
            maxMishaShift.current
          );
          mishaRef.current.style.transform = `translateX(${newMishaShift}px)`;
          setMishaShift(newMishaShift);
        }
        if (event.code === "KeyA") {
          const newMishaShift = clamp(
            minMishaShift.current,
            mishaShift - 10,
            maxMishaShift.current
          );
          mishaRef.current.style.transform = `translateX(${newMishaShift}px) rotateY(180deg)`;
          setMishaShift(newMishaShift);
        }
      }

      if (tanyaRef.current && tanyaKeaboardEnable) {
        if (event.code === "ArrowRight") {
          const newTanyaShift = clamp(
            minTanyaShift.current,
            tanyaShift + 10,
            maxTanyaShift.current
          );
          tanyaRef.current.style.transform = `translateX(${newTanyaShift}px) rotateY(180deg)`;
          setTanyaShift(newTanyaShift);
        }
        if (event.code === "ArrowLeft") {
          const newTanyaShift = clamp(
            minTanyaShift.current,
            tanyaShift - 10,
            maxTanyaShift.current
          );
          tanyaRef.current.style.transform = `translateX(${newTanyaShift}px)`;
          setTanyaShift(newTanyaShift);
        }
      }
    },
    [mishaKeaboardEnable, mishaShift, tanyaKeaboardEnable, tanyaShift]
  );

  const handleClickSound = () => {
    if (!audioRef.current?.paused) {
      audioRef.current?.pause();
    } else {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleMove);

    return () => window.removeEventListener("keydown", handleMove);
  }, [handleMove]);

  useEffect(() => {
    if (
      tanyaShift === maxTanyaShift.current &&
      mishaShift === maxMishaShift.current
    ) {
      router.push("/rave");
    }
  }, [mishaShift, router, tanyaShift]);

  return (
    <div className={styles.page}>
      <img className={styles.background} src={"/field/background.jpg"} alt="" />
      <div className={styles.mishaWrapper} ref={mishaRef}>
        <img className={styles.misha} src={"/misha.png"} alt="" />
        <img
          className={cn(styles.mishaHeart, { [styles.show]: firstStep > 7 })}
          src={"/heart.png"}
          alt=""
        />
      </div>

      <div
        className={cn(styles.tanyaWrapper, { [styles.rigth]: secondStep > 5 })}
        ref={tanyaRef}
      >
        <img className={styles.tanya} src={"/tanya.png"} alt="" />
        <img
          className={cn(styles.tanyaHeart, { [styles.show]: secondStep > 3 })}
          src={"/heart.png"}
          alt=""
        />
      </div>

      {firstMessages[firstStep] && (
        <Notify>
          {firstMessages[firstStep]}
          <img
            className={styles.arrow}
            src="/arrow.png"
            onClick={handleClickFirstArrow}
            alt=""
          />
        </Notify>
      )}

      {secondMessages[secondStep] && mishaShift === maxMishaShift.current && (
        <Notify>
          {secondMessages[secondStep]}
          <img
            className={styles.arrow}
            src="/arrow.png"
            onClick={handleClickSecondArrow}
            alt=""
          />
        </Notify>
      )}
      <audio ref={audioRef} autoPlay loop src="/field/dust.mp3" />
      <img
        className={styles.volume}
        src="/sound.png"
        alt=""
        onClick={handleClickSound}
      />
    </div>
  );
};

export default Field;
