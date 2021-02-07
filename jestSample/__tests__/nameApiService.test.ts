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

  test("getFirstName関数が文字列hogeを返す場合、テストは成功する", async (): Promise<
    void
  > => {
    const data: Response = {
      /*eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]*/
      data: {
        first_name: "hoge",
      },
    };
    mockedAxios.get.mockResolvedValue(data);

    const actual = await nameApiService.getFirstName();

    expect("hoge").toBe(actual);
  });

  test("getFirstName関数が文字列hogehogeを返す場合、テストは失敗する", async (): Promise<
    void
  > => {
    const data: Response = {
      /*eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]*/
      data: {
        first_name: "hogehoge",
      },
    };
    mockedAxios.get.mockResolvedValue(data);

    await expect(nameApiService.getFirstName()).rejects.toThrow(
      "firstName is too long!"
    );
  });
});
