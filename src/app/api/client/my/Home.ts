import BaseApi from "@/src/app/api/client/base/base-api";
import { fetchWithToken } from "@/src/app/api/client/fetch/fetch";
import { FoodHistory } from "@/src/types/page/home/mypick";

class MyApi extends BaseApi {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  static async getMyPick(): Promise<FoodHistory> {
    const url = `${this.BASE_URL}/api/mypick`;
    const response = await fetchWithToken(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
}

export default MyApi;
