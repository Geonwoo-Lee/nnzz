"use client";

import TarotCard from "@/src/component/client/page/meal-tarot/features/TarotCard";
import { useSpring, animated } from "@react-spring/web";
import { useState, useRef, useEffect } from "react";
import { useLoginBottomSheet } from "@/src/core/LoginBottomSheetProvider";
import { useRouter } from "next/navigation";
import AuthUtils from "@/src/func/common/auth.utils";

const AnimatedCard = ({
  delay,
  onAnimationEnd,
}: {
  delay: number;
  onAnimationEnd: () => void;
}) => {
  const router = useRouter();
  const [start, setStart] = useState(false);
  const animationEndedRef = useRef(false);
  const { showLoginSheet } = useLoginBottomSheet();

  useEffect(() => {
    const timer = setTimeout(() => setStart(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const style = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(100px) scale(0.8)",
    },
    to: start
      ? {
          opacity: 1,
          transform: "translateY(0px) scale(1)",
        }
      : undefined,
    config: {
      duration: 300, // 0.3초
    },
    onRest: () => {
      if (!animationEndedRef.current && start) {
        animationEndedRef.current = true;
        onAnimationEnd();
      }
    },
  });

  return (
    <animated.div
      style={style}
      onClick={() => {
        const isLogin = AuthUtils.isLoggedIn()
        if(isLogin) {
          router.push('/meal-result')
        }else {
          showLoginSheet().then(() => {
            router.push('/meal-result')
          })
        }
      }}
      className="flex-1 min-w-0"
    >
      <TarotCard />
    </animated.div>
  );
};

const MealTarotList = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const completedCountRef = useRef(0);

  const handleAnimationEnd = () => {
    completedCountRef.current += 1;
    if (completedCountRef.current === 3) {
      setAnimationComplete(true);
    }
  };

  return (
    <div className="bg-slate-900 w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-8 py-8 justify-center items-center px-8 w-full">
        <div className="text-center text-body1 font-medium text-text-7">
          카드를 골라보세요
        </div>
        <div
          className={`flex flex-row gap-4 w-full transition-opacity ${!animationComplete ? "pointer-events-none" : ""}`}
        >
          <AnimatedCard delay={0} onAnimationEnd={handleAnimationEnd} />
          <AnimatedCard delay={100} onAnimationEnd={handleAnimationEnd} />
          <AnimatedCard delay={200} onAnimationEnd={handleAnimationEnd} />
        </div>
      </div>
    </div>
  );
};

export default MealTarotList;
