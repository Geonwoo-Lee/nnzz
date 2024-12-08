import {FoodItemFromClient} from "@/src/app/types/models/food";

const imageLocation = "/images/food/food-swipe"

const foodData: FoodItemFromClient[] = [
    {
        categoryId: 1,
        imageUrl: `${imageLocation}/Bibim.png`,
        bgType: "Pink"
    },
    // 2. 탕과국
    {
        categoryId: 7,
        imageUrl: `${imageLocation}/Seolungtang.png`,
        bgType: "Yellow"
    },
    // 3. 찌개,전골
    {
        categoryId: 14,
        imageUrl: `${imageLocation}/Zzigae.png`,
        bgType: "Red"
    },
    // 4. 백숙,삼계탕
    {
        categoryId: 4,
        imageUrl: `${imageLocation}/Samgyetang.png`,
        bgType: "Yellow"
    },
    // 5. 냉면
    {
        categoryId: 16,
        imageUrl: `${imageLocation}/Nengmyun.png`,
        bgType: "Green"
    },
    // 6. 국수와 면류
    {
        categoryId: 17,
        imageUrl: `${imageLocation}/Kalgooksu.png`,
        bgType: "Yellow"
    },
    // 7. 샤브샤브
    {
        categoryId: 21,
        imageUrl: `${imageLocation}/Shabu.png`,
        bgType: "Pink"
    },
    // 8. 죽
    {
        categoryId: 22,
        imageUrl: `${imageLocation}/Jook.png`,
        bgType: "Red"
    },
    // 9. 족발,보쌈
    {
        categoryId: 9,
        imageUrl: `${imageLocation}/Suyook.png`,
        bgType: "Pink"
    },
    // 10. 전,빈대떡
    {
        categoryId: 24,
        imageUrl: `${imageLocation}/Jeon.png`,
        bgType: "Red"
    },
    // 11. 중식
    {
        categoryId: 25,
        imageUrl: `${imageLocation}/Jjajang.png`,
        bgType: "Yellow"
    },
    // 12. 일식
    {
        categoryId: 28,
        imageUrl: `${imageLocation}/Sushi.png`,
        bgType: "Blue"
    },
    // 13. 초밥
    {
        categoryId: 32,
        imageUrl: `${imageLocation}/Donkats.png`,
        bgType: "Red"
    },
    // 14. 돈가스
    {
        categoryId: 33,
        imageUrl: `${imageLocation}/Ramen.png`,
        bgType: "Pink"
    },
    // 15. 카레
    {
        categoryId: 34,
        imageUrl: `${imageLocation}/Curry.png`,
        bgType: "Green"
    },
    // 16. 아시아음식
    {
        categoryId: 35,
        imageUrl: `${imageLocation}/RiceNoodle.png`,
        bgType: "Yellow"
    },
    // 17. 분식
    {
        categoryId: 41,
        imageUrl: `${imageLocation}/Tteockbokki.png`,
        bgType: "Pink"
    },
    // 18. 양식
    {
        categoryId: 45,
        imageUrl: `${imageLocation}/Pasta.png`,
        bgType: "Green"
    },
    // 19. 멕시코,남미음식
    {
        categoryId: 51,
        imageUrl: `${imageLocation}/Taco.png`,
        bgType: "Blue"
    },
    // 20. 퓨전음식
    {
        categoryId: 52,
        imageUrl: `${imageLocation}/Fusion.png`,
        bgType: "Black"
    },
    // 21. 고기
    {
        categoryId: 53,
        imageUrl: `${imageLocation}/Beef.png`,
        bgType: "Pink"
    },
    // 22. 닭,오리
    {
        categoryId: 22,
        imageUrl: `${imageLocation}/Chicken.png`,
        bgType: "Yellow"
    },
    // 23. 곱창,막창,양
    {
        categoryId: 64,
        imageUrl: `${imageLocation}/Gobchang.png`,
        bgType: "Yellow"
    },
    // 24. 해물
    {
        categoryId: 67,
        imageUrl: `${imageLocation}/Shrimp.png`,
        bgType: "Blue"
    },
    // 25. 생선회
    {
        categoryId: 78,
        imageUrl: `${imageLocation}/Hoi.png`,
        bgType: "Blue"
    },
    // 26. 피자
    {
        categoryId: 79,
        imageUrl: `${imageLocation}/Pizza.png`,
        bgType: "Green"
    },
    // 27. 햄버거
    {
        categoryId: 80,
        imageUrl: `${imageLocation}/Sandwich.png`,
        bgType: "Blue"
    },
    // 29. 술집
    {
        categoryId: 90,
        imageUrl: `${imageLocation}/Beer.png`,
        bgType: "Red"
    },
    // 30. 뷔페
    {
        categoryId: 98,
        imageUrl: `${imageLocation}/Buffet.png`,
        bgType: "Red"
    },
    // 31. 다이어트,샐러드
    {
        categoryId: 101,
        imageUrl: `${imageLocation}/Salad.png`,
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

