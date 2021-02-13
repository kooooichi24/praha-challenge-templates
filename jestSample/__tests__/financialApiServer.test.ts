import axios from "axios";
import { FinancialApiService } from "../quiz/financialApiService";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

interface Response {
  data: Quote[];
}

interface Quote {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  volume: number;
  avgVolume: number;
  exchange: string;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
  earningsAnnouncement: string;
  sharesOutstanding: number;
  timestamp: number;
}

describe("FinancialApiServerクラスのテスト", (): void => {
  let financialApiService: FinancialApiService;

  beforeEach((): void => {
    financialApiService = new FinancialApiService();
  });

  test("getPrice関数が株価136.76を返す", async (): Promise<void> => {
    const symbol = "AAPL";
    const data: Response = {
      data: [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: 136.76, // 株価
          changesPercentage: -0.31,
          change: -0.425,
          dayLow: 135.86,
          dayHigh: 137.41,
          yearHigh: 145.09,
          yearLow: 53.1525,
          marketCap: 2295940513792.0,
          priceAvg50: 133.1088,
          priceAvg200: 119.777916,
          volume: 72317009,
          avgVolume: 106948454,
          exchange: "NASDAQ",
          open: 137.35,
          previousClose: 137.185,
          eps: 3.687,
          pe: 37.092484,
          earningsAnnouncement: "2021-01-27T16:30:00.000+0000",
          sharesOutstanding: 16788099691,
          timestamp: 1612684344,
        },
      ],
    };
    mockedAxios.get.mockResolvedValue(data);

    const actual = await financialApiService.getPrice(symbol);

    expect(136.76).toBe(actual);
  });
});
