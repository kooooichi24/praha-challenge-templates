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
  let nameApiService: NameApiService;

  beforeEach((): void => {
    nameApiService = new NameApiService();
  });

  describe("API から取得した firstName が 4 文字以下の場合、firstName を返す", (): void => {
    test("firstName = 'hoge' の場合、'hoge' を返す", async (): Promise<
      void
    > => {
      const data: Response = {
        /*eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]*/
        data: {
          first_name: "hoge",
        },
      };
      mockedAxios.get.mockResolvedValue(data);
      const expected = "hoge";

      const actual = await nameApiService.getFirstName();

      expect(actual).toBe(expected);
    });

    test("firstName = 'hog' の場合 'hog' を返す", async (): Promise<void> => {
      const data: Response = {
        /*eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]*/
        data: {
          first_name: "hog",
        },
      };
      mockedAxios.get.mockResolvedValue(data);
      const expected = "hog";

      const actual = await nameApiService.getFirstName();

      expect(actual).toBe(expected);
    });
  });

  describe("API から取得した firstName が 5 文字以上の場合、エラーを返す", (): void => {
    test("firstName = 'hogeh' の場合、エラーを返す", async (): Promise<
      void
    > => {
      const data: Response = {
        /*eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]*/
        data: {
          first_name: "hogeh",
        },
      };
      mockedAxios.get.mockResolvedValue(data);
      const expected = "firstName is too long!";

      await expect(nameApiService.getFirstName()).rejects.toThrow(expected);
    });
  });
});
