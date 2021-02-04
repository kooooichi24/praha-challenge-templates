import axios from "axios";
import { NameApiService } from "../nameApiService";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

interface Response {
  data: Data;
}

interface Data {
  first_name: string;
}

describe("NameApiServiceクラスのテスト", (): void => {
  test("hoge", async (): Promise<void> => {
    const nameApiService = new NameApiService();
    const data: Response = {
      /*eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]*/
      data: {
        first_name: "hoge",
      },
    };
    mockedAxios.get.mockResolvedValue(data);

    const actual = await nameApiService.getFirstName();

    expect("hoge").toEqual(actual);
  });
});
