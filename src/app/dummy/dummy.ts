import {FoodItem} from "@/src/app/types/models/food";

const imageLocation = "/images/food/food-swipe"

const foodData: FoodItem[] = [
    // 1. 한식
    {
        id: 1,
        imageUrl: `${imageLocation}/Bibim.png`,
        category: "한식",
        name: "비빔밥",
        representativeMenu: "돌솥비빔밥",
        bgType: "Pink"
    },
    // 2. 탕과국
    {
        id: 2,
        imageUrl: `${imageLocation}/Seolungtang.png`,
        category: "탕과국",
        name: "설렁탕",
        representativeMenu: "설렁탕, 곰탕",
        bgType: "Yellow"
    },
    // 3. 찌개,전골
    {
        id: 3,
        imageUrl: `${imageLocation}/Zzigae.png`,
        category: "한식",
        name: "찌개",
        representativeMenu: "김치찌개, 된장찌개",
        bgType: "Red"
    },
    // 4. 백숙,삼계탕
    {
        id: 4,
        imageUrl: `${imageLocation}/Samgyetang.png`,
        category: "한식",
        name: "삼계탕",
        representativeMenu: "삼계탕, 백숙",
        bgType: "Yellow"
    },
    // 5. 냉면
    {
        id: 5,
        imageUrl: `${imageLocation}/Nengmyun.png`,
        category: "한식",
        name: "냉면",
        representativeMenu: "물냉면, 비빔냉면",
        bgType: "Green"
    },
    // 6. 국수와 면류
    {
        id: 6,
        imageUrl: `${imageLocation}/Kalgooksu.png`,
        category: "한식",
        name: "칼국수",
        representativeMenu: "칼국수, 수제비",
        bgType: "Yellow"
    },
    // 7. 샤브샤브
    {
        id: 7,
        imageUrl: `${imageLocation}/Shabu.png`,
        category: "일식",
        name: "샤브샤브",
        representativeMenu: "샤브샤브",
        bgType: "Pink"
    },
    // 8. 죽
    {
        id: 8,
        imageUrl: `${imageLocation}/Jook.png`,
        category: "한식",
        name: "죽",
        representativeMenu: "죽",
        bgType: "Red"
    },
    // 9. 족발,보쌈
    {
        id: 9,
        imageUrl: `${imageLocation}/Suyook.png`,
        category: "한식",
        name: "수육",
        representativeMenu: "수육, 보쌈",
        bgType: "Pink"
    },
    // 10. 전,빈대떡
    {
        id: 10,
        imageUrl: `${imageLocation}/Jeon.png`,
        category: "한식",
        name: "전",
        representativeMenu: "해물파전, 김치전",
        bgType: "Red"
    },
    // 11. 중식
    {
        id: 11,
        imageUrl: `${imageLocation}/Jjajang.png`,
        category: "중식",
        name: "짜장면",
        representativeMenu: "짜장면",
        bgType: "Yellow"
    },
    // 12. 일식
    {
        id: 12,
        imageUrl: `${imageLocation}/Sushi.png`,
        category: "일식",
        name: "초밥",
        representativeMenu: "초밥",
        bgType: "Blue"
    },
    // 13. 초밥
    {
        id: 13,
        imageUrl: `${imageLocation}/Donkats.png`,
        category: "일식",
        name: "돈까스",
        representativeMenu: "돈까스",
        bgType: "Red"
    },
    // 14. 돈가스
    {
        id: 14,
        imageUrl: `${imageLocation}/Ramen.png`,
        category: "일식",
        name: "라멘",
        representativeMenu: "일본식라면",
        bgType: "Pink"
    },
    // 15. 카레
    {
        id: 15,
        imageUrl: `${imageLocation}/Curry.png`,
        category: "아시아음식",
        name: "카레",
        representativeMenu: "카레",
        bgType: "Green"
    },
    // 16. 아시아음식
    {
        id: 16,
        imageUrl: `${imageLocation}/RiceNoodle.png`,
        category: "아시아음식",
        name: "쌀국수",
        representativeMenu: "베트남쌀국수",
        bgType: "Yellow"
    },
    // 17. 분식
    {
        id: 17,
        imageUrl: `${imageLocation}/Tteockbokki.png`,
        category: "분식",
        name: "떡볶이",
        representativeMenu: "떡볶이",
        bgType: "Pink"
    },
    // 18. 양식
    {
        id: 18,
        imageUrl: `${imageLocation}/Pasta.png`,
        category: "양식",
        name: "파스타",
        representativeMenu: "파스타",
        bgType: "Green"
    },
    // 19. 멕시코,남미음식
    {
        id: 19,
        imageUrl: `${imageLocation}/Taco.png`,
        category: "멕시코, 남미음식",
        name: "타코",
        representativeMenu: "타코",
        bgType: "Blue"
    },
    // 20. 퓨전음식
    {
        id: 20,
        imageUrl: `${imageLocation}/Fusion.png`,
        category: "퓨전음식",
        name: "퓨전",
        representativeMenu: "퓨전요리",
        bgType: "Black"
    },
    // 21. 고기
    {
        id: 21,
        imageUrl: `${imageLocation}/Beef.png`,
        category: "고기",
        name: "고기",
        representativeMenu: "소고기구이, 돼지고기구이",
        bgType: "Pink"
    },
    // 22. 닭,오리
    {
        id: 22,
        imageUrl: `${imageLocation}/Chicken.png`,
        category: "치킨, 닭강정",
        name: "치킨",
        representativeMenu: "후라이드치킨, 양념치킨",
        bgType: "Yellow"
    },
    // 23. 곱창,막창,양
    {
        id: 23,
        imageUrl: `${imageLocation}/Gobchang.png`,
        category: "고기",
        name: "곱창",
        representativeMenu: "곱창구이",
        bgType: "Yellow"
    },
    // 24. 해물
    {
        id: 24,
        imageUrl: `${imageLocation}/Shrimp.png`,
        category: "해물",
        name: "해산물",
        representativeMenu: "해물요리",
        bgType: "Blue"
    },
    // 25. 생선회
    {
        id: 25,
        imageUrl: `${imageLocation}/Hoi.png`,
        category: "해물",
        name: "회",
        representativeMenu: "회",
        bgType: "Blue"
    },
    // 26. 피자
    {
        id: 26,
        imageUrl: `${imageLocation}/Pizza.png`,
        category: "피자",
        name: "피자",
        representativeMenu: "피자",
        bgType: "Green"
    },
    // 27. 햄버거
    {
        id: 27,
        imageUrl: `${imageLocation}/Sandwich.png`,
        category: "분식",
        name: "샌드위치",
        representativeMenu: "샌드위치, 햄버거",
        bgType: "Blue"
    },
    // 29. 술집
    {
        id: 28,
        imageUrl: `${imageLocation}/Beer.png`,
        category: "술집",
        name: "맥주",
        representativeMenu: "맥주, 호프",
        bgType: "Red"
    },
    // 30. 뷔페
    {
        id: 29,
        imageUrl: `${imageLocation}/Buffet.png`,
        category: "뷔페",
        name: "뷔페",
        representativeMenu: "한식뷔페",
        bgType: "Red"
    },
    // 31. 다이어트,샐러드
    {
        id: 30,
        imageUrl: `${imageLocation}/Salad.png`,
        category: "다이어트, 샐러드",
        name: "샐러드",
        representativeMenu: "샐러드",
        bgType: "Green"
    }
];

export default foodData;

export const foodDetailData = [
    {
        id: 0,
        imageUrl: '/images/food/food-details/bear.png',
        name: '술집'
    },
    {
        id: 1,
        imageUrl: '/images/food/food-details/bibim.png',
        name: '한식'
    },
    {
        id: 2,
        imageUrl: '/images/food/food-details/chicken.png',
        name: '닭, 오리'
    },
    {
        id: 3,
        imageUrl: '/images/food/food-details/curry.png',
        name: '카레'
    },
    {
        id: 4,
        imageUrl: '/images/food/food-details/gobchang.png',
        name: '곱창'
    },
    {
        id: 5,
        imageUrl: '/images/food/food-details/hamburger.png',
        name: '햄버거'
    },
    {
        id: 6,
        imageUrl: '/images/food/food-details/jjajangmyun.png',
        name: '중식'
    },
    {
        id: 7,
        imageUrl: '/images/food/food-details/pasta.png',
        name: '양식'
    },
    {
        id: 8,
        imageUrl: '/images/food/food-details/pizza.png',
        name: '피자'
    }, {
        id: 9,
        imageUrl: '/images/food/food-details/ramen.png',
        name: '일식'
    },{
        id: 10,
        imageUrl: '/images/food/food-details/rice-noodle.png',
        name: '아시아 음식'
    },{
        id: 11,
        imageUrl: '/images/food/food-details/sushi.png',
        name: '초밥'
    },{
        id: 12,
        imageUrl: '/images/food/food-details/sandwich.png',
        name: '빵'
    },{
    id: 13,
        imageUrl: '/images/food/food-details/steak.png',
        name: '고기'
    },{
        id: 14,
        imageUrl: '/images/food/food-details/taco.png',
        name: '멕시코・남미음식'
    },
    {
        id: 15,
        imageUrl: '/images/food/food-details/ttuckboki.png',
        name: '분식'
    },

]

