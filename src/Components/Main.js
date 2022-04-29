import { useEffect, useState } from "react";

import classes from "./Main.module.scss";

import pattern1 from "../Assets/pattern-divider-desktop.svg";
import pattern2 from "../Assets/pattern-divider-mobile.svg";

import dice from "../Assets/icon-dice.svg";

const Main = () => {
  const [advice, setAdvice] = useState({
    id: "",
    advice: "",
  });

  const [hasLoaded, setHasLoaded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let data;
    const getAdvice = async () => {
      try {
        if (hasLoaded) {
          const res = await fetch("https://api.adviceslip.com/advice");

          if (!res.ok) {
            throw new Error("Something went wrong!!");
          }

          const adviceData = await res.json();

          for (const key in adviceData) {
            data = adviceData[key];
          }

          setAdvice(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getAdvice();
  }, [hasLoaded]);

  const onGenerateAdviceHandler = async () => {
    try {
      setIsLoading(true);
      setHasLoaded(false);
      let data;

      const res = await fetch("https://api.adviceslip.com/advice");

      if (!res.ok) {
        throw new Error("Something went wrong!!");
      }

      const adviceData = await res.json();

      for (const key in adviceData) {
        data = adviceData[key];
      }

      setAdvice(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <main className={classes.main}>
      <div className={classes["main__box"]}>
        <p className={classes["main__box-advice-number"]}>
          ADVICE #{advice.id}
        </p>
        {advice.advice && (
          <p className={classes["main__box-advice-text"]}>
            &ldquo;{advice.advice}&rdquo;
          </p>
        )}
        <div className={classes["main__box-logo-pattern"]}>
          <img
            srcSet={`${pattern2} 295w, ${pattern1} 444w`}
            sizes={`(max-width: 800px) 295px`}
            src={pattern2}
            alt="pattern desktop"
          />
        </div>
        <div
          className={`${classes["main__box-logo-dice"]}`}
          onClick={onGenerateAdviceHandler}
        >
          <img
            src={dice}
            alt="dice"
            className={isLoading ? classes.isloading : ""}
          />
        </div>
      </div>
    </main>
  );
};

export default Main;
