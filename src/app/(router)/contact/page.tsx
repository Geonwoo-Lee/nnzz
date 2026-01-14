import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '냠냠쩝쩝 문의 - Contact',
  description: '냠냠쩝쩝에 대한 문의사항이나 제안사항을 보내주세요.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[640px] mx-auto px-6 py-12">
        <article className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">문의하기</h1>

          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              냠냠쩝쩝을 이용해 주셔서 감사합니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              서비스 이용 중 문의사항, 제안사항, 버그 리포트 등이 있으시다면
              언제든지 연락주세요.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              연락처 정보
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-2">📧 이메일</h3>
                <p className="text-gray-700">
                  <a
                    href="mailto:contact@nnzz.today"
                    className="text-primary-6 hover:underline"
                  >
                    nnzz.today@gmail.com
                  </a>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  영업일 기준 1~2일 내에 답변드리겠습니다.
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-2">🏢 운영 정보</h3>
                <div className="text-gray-700 space-y-1">
                  <p>서비스명: 냠냠쩝쩝 (NNZZ)</p>
                  <p>
                    웹사이트:{" "}
                    <a
                      href="https://www.nnzz.today"
                      className="text-primary-6 hover:underline"
                    >
                      www.nnzz.today
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-2">📱 소셜 미디어</h3>
                <div className="text-gray-700 space-y-2">
                  <p>
                    Instagram:{" "}
                    <a
                      href="https://www.instagram.com/nnzz.today?igsh=MTZ4dW93ZzN6NHR0aA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-6 hover:underline"
                    >
                      @nnzz.today
                    </a>
                  </p>
                  <p>
                    YouTube:{" "}
                    <a
                      href="https://www.youtube.com/channel/UCNV6TRZixTAZeXX9O6CzMzA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-6 hover:underline"
                    >
                      냠냠쩝쩝
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">문의 유형</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-6 mr-2">•</span>
                <div>
                  <strong className="text-gray-800">서비스 이용 문의</strong>
                  <p className="text-gray-600 text-sm">
                    기능 사용법, 계정 관련 문의 등
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary-6 mr-2">•</span>
                <div>
                  <strong className="text-gray-800">버그 리포트</strong>
                  <p className="text-gray-600 text-sm">
                    오류 발견 시 제보해주세요
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary-6 mr-2">•</span>
                <div>
                  <strong className="text-gray-800">제안 및 피드백</strong>
                  <p className="text-gray-600 text-sm">
                    서비스 개선을 위한 소중한 의견
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary-6 mr-2">•</span>
                <div>
                  <strong className="text-gray-800">제휴 및 광고 문의</strong>
                  <p className="text-gray-600 text-sm">비즈니스 협업 제안</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary-6 mr-2">•</span>
                <div>
                  <strong className="text-gray-800">기타 문의</strong>
                  <p className="text-gray-600 text-sm">
                    위 항목에 해당하지 않는 문의
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary-6 pl-4">
                <h3 className="font-bold text-gray-800 mb-1">
                  Q. 회원 가입이 필요한가요?
                </h3>
                <p className="text-gray-700 text-sm">
                  기본적인 메뉴 추천 기능은 회원 가입 없이 이용 가능하지만,
                  개인화된 추천과 맛집 저장 기능은 로그인이 필요합니다.
                </p>
              </div>
              <div className="border-l-4 border-primary-6 pl-4">
                <h3 className="font-bold text-gray-800 mb-1">
                  Q. 위치 정보는 어떻게 사용되나요?
                </h3>
                <p className="text-gray-700 text-sm">
                  사용자 주변의 식당을 추천하기 위해서만 사용되며, 개인정보
                  보호정책에 따라 안전하게 관리됩니다.
                </p>
              </div>
              <div className="border-l-4 border-primary-6 pl-4">
                <h3 className="font-bold text-gray-800 mb-1">
                  Q. 맛집 등록은 어떻게 하나요?
                </h3>
                <p className="text-gray-700 text-sm">
                  현재는 자체 큐레이션을 통해 맛집을 등록하고 있습니다. 추천하고
                  싶은 맛집이 있다면 문의 주세요!
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-primary-1 border-l-4 border-primary-6 p-4 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed">
                💡 <strong>Tip:</strong> 문의하실 때 사용 중인 기기 정보나 문제
                발생 상황을 자세히 알려주시면 더 빠르고 정확한 답변을 드릴 수
                있습니다.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
