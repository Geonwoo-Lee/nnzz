import MealTarotMaster from "@/src/component/server/page/meal-tarot/features/MealTaroist";
import MealTarotList from "@/src/component/client/page/meal-tarot/features/MealTarotList";

const MealTarot = () => {
  return (
    <div className="flex flex-col h-bottom-menu-body-with-header">
      <div className="flex-1 w-full min-h-0">
        <MealTarotMaster />
      </div>
      <div className="flex-1 w-full min-h-0">
        <MealTarotList />
      </div>
    </div>
  );
};

export default MealTarot;