import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "냠냠쩝쩝 소개 - About",
  description:
    "냠냠쩝쩝은 직장인들의 점심·저녁 메뉴 고민을 해결하는 서비스입니다.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[640px] mx-auto px-6 py-12">
        <article className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            냠냠쩝쩝 소개
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              우리는 누구인가요?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              냠냠쩝쩝은 매일 &ldquo;오늘 뭐 먹지?&rdquo;라는 고민에 빠지는 직장인들을 위한
              메뉴 추천 서비스입니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              점심시간마다, 저녁 퇴근 후마다 반복되는 메뉴 고민을 AI와 데이터
              기반으로 해결해드립니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              무엇을 제공하나요?
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-6 mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>빠른 메뉴 추천:</strong> 시간이 없을 때 빠르게 메뉴를
                  결정할 수 있습니다.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-6 mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>꼼꼼한 선택:</strong> 여러 옵션을 비교하며 신중하게
                  고를 수 있습니다.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-6 mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>위치 기반 추천:</strong> 현재 위치 주변의 맛집을
                  추천받을 수 있습니다.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-6 mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>맛집 정보:</strong> 블로그와 쇼츠를 통해 다양한 맛집
                  정보를 제공합니다.
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              우리의 미션
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              &ldquo;모든 직장인이 점심·저녁 메뉴 고민 없이 맛있는 식사를 즐기는 세상&rdquo;
            </p>
            <p className="text-gray-700 leading-relaxed">
              냠냠쩝쩝은 단순한 메뉴 추천을 넘어, 여러분의 식사 시간을 더욱
              즐겁고 편리하게 만들기 위해 노력합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              서비스 특징
            </h2>
            <div className="grid gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-2">
                  🎯 개인화된 추천
                </h3>
                <p className="text-gray-700 text-sm">
                  사용자의 선호도와 이전 선택을 학습하여 맞춤형 메뉴를
                  추천합니다.
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-2">
                  📍 위치 기반 서비스
                </h3>
                <p className="text-gray-700 text-sm">
                  현재 위치 또는 설정한 장소 주변의 식당 정보를 제공합니다.
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-2">
                  📝 풍부한 콘텐츠
                </h3>
                <p className="text-gray-700 text-sm">
                  블로그와 쇼츠를 통해 맛집 정보, 메뉴 리뷰 등 다양한 콘텐츠를
                  제공합니다.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              소셜 미디어
            </h2>
            <div className="space-y-3">
              <p className="text-gray-700">
                Instagram:{" "}
                <a
                  href="https://www.instagram.com/nnzz.today?igsh=MTZ4dW93ZzN6NHR0aA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-6 hover:underline font-medium"
                >
                  @nnzz.today
                </a>
              </p>
              <p className="text-gray-700">
                YouTube:{" "}
                <a
                  href="https://www.youtube.com/channel/UCNV6TRZixTAZeXX9O6CzMzA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-6 hover:underline font-medium"
                >
                  냠냠쩝쩝
                </a>
              </p>
            </div>
          </section>

          <section>
            <p className="text-gray-700 leading-relaxed">
              <a
                href="/contact"
                className="text-primary-6 hover:underline font-medium"
              >
                문의하기 페이지
              </a>
              를 통해 언제든지 연락주세요.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
