"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Star from "../../../lib/lotties/star.json";
import TarotCard from "@/src/component/client/page/meal-tarot/features/TarotCard";
import Twinkle from "../../../../public/svg/items/common/Twinkle.svg";
import { categoryNames } from "@/src/dummy/dummy";

import RandomTile from "../../../../public/svg/items/common/RandomTitle.svg";
import Header from "@/src/component/server/common/header/Header";
import { HeaderTypes } from "@/src/types/common/header";
import { useRouter } from "next/navigation";

const RandomResult = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    image: string;
  } | null>(null);

  useEffect(() => {
    const categoryEntries = Object.entries(categoryNames);
    const randomIndex = Math.floor(Math.random() * categoryEntries.length);
    const [imageFile, categoryName] = categoryEntries[randomIndex];

    setSelectedCategory({
      name: categoryName,
      image: `/images/food/food-swipe/${imageFile}`,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowExplosion(true);

      setTimeout(() => {
        setShowExplosion(false);
        setShowResult(true);
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center max-w-[640px] mx-auto bg-slate-900">
        <div className="flex flex-col items-center gap-8">
          <Twinkle className="animate-pulse" />

          <div className="w-full max-w-[200px] animate-subtle-wiggle">
            <TarotCard />
          </div>

          <div className="text-title1 font-bold text-text-7 text-center animate-pulse">
            두근두근 <br />
            냠냠님의 오늘의 메뉴는?
          </div>
        </div>

        <style jsx>{`
          @keyframes subtle-wiggle {
            0%,
            100% {
              transform: translateX(0) rotate(0deg);
            }
            25% {
              transform: translateX(1px) rotate(0.3deg);
            }
            50% {
              transform: translateX(0) rotate(0deg);
            }
            75% {
              transform: translateX(-1px) rotate(-0.3deg);
            }
          }
          .animate-subtle-wiggle {
            animation: subtle-wiggle 0.6s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  if (showExplosion) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center max-w-[640px] mx-auto bg-slate-900">
        <div className="relative w-full max-w-[200px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
            <Lottie
              animationData={Star}
              loop={false}
              style={{ width: 500, height: 500 }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className=" inset-0 z-50 flex flex-col max-w-[640px] mx-auto"
      style={{
        background: "linear-gradient(180deg, #FFF1F3 0%, #FFC5CC 100%)",
      }}
    >
      <div className="px-4 w-full flex-shrink-0">
        <Header.HeaderLayout
          headerBg="bg-transparent"
          type={HeaderTypes.history}
          title={"랜덤 뽑기"}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4">
          <div className="flex flex-col items-center gap-4 w-full py-6 min-h-full justify-center">
            <div className="flex-shrink-0">
              <RandomTile />
            </div>

            {selectedCategory && (
              <div
                className="relative bg-gradient-to-b from-red-50 to-red-200 rounded-3xl shadow-2xl border-4 border-white w-full max-w-[296px] flex-shrink-0"
                style={{ aspectRatio: "296/441" }}
              >
                <div className="h-full flex flex-col">
                  <div className="text-center pt-8 px-6 pb-4">
                    <p className="text-title1 font-bold text-gray-800">
                      오늘은
                    </p>
                    <p className="text-title1 font-bold text-gray-900">
                      {selectedCategory.name} 어때요?
                    </p>
                  </div>

                  <div
                    className="flex-1 flex items-center justify-center bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url(/images/bg/RandomBg.png)" }}
                  >
                    <img
                      src={selectedCategory.image}
                      alt={selectedCategory.name}
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex gap-3 px-4 py-4 flex-shrink-0">
          <button
            className="flex-1 bg-gray-800 text-white py-4 rounded-lg font-bold text-base"
            onClick={() => {
              router.push("/meal-tarot");
            }}
          >
            다시뽑기
          </button>
          <button
            className="flex-1 bg-red-500 text-white py-4 rounded-lg font-bold text-base"
            onClick={() => {
              if (!selectedCategory) return;
              const searchQuery = encodeURIComponent(selectedCategory.name);
              const naverMapUrl = `https://map.naver.com/p/search/${searchQuery}`;

              const isMobile = /iPhone|iPad|iPod|Android/i.test(
                navigator.userAgent,
              );

              if (isMobile) {
                window.location.href = naverMapUrl;
              } else {
                window.open(naverMapUrl, "_blank");
              }
            }}
          >
            지도에서 식당 확인
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RandomResult;