import {
  shouldBuy,
  asyncShouldBuy,
  asyncShouldBuyBySymbol,
} from "../quiz/quiz";
import { FinancialApiService } from "../quiz/financialApiService";

describe("shouldBuy関数のテスト", (): void => {
  test("購入希望価格 >= 株価 の場合は、trueを返す", (): void => {
    const actual = shouldBuy(120);

    expect(true).toBe(actual);
  });

  test("購入希望価格 < 株価 の場合は、falseを返す", (): void => {
    const actual = shouldBuy(80);

    expect(false).toBe(actual);
  });
});

describe("asyncShouldBuy関数のテスト", (): void => {
  test("購入希望価格 >= 株価 の場合は、trueを返す", async (): Promise<void> => {
    const actual = await asyncShouldBuy(120);

    expect(true).toBe(actual);
  });

  test("購入希望価格 < 株価 の場合は、falseを返す", async (): Promise<void> => {
    const actual = await asyncShouldBuy(80);

    expect(false).toBe(actual);
  });
});

describe("asyncShouldBuy関数のテスト", (): void => {
  const CURRENT_STOCK_PRICE_136 = 136;
  const symbol = "AAPL";
  let financialApiService: FinancialApiService;

  beforeEach((): void => {
    financialApiService = new FinancialApiService();
  });

  test("購入希望価格 >= 株価 の場合は、trueを返す", async (): Promise<void> => {
    const orderBuyingPrice = 136;
    financialApiService.getPrice = jest
      .fn()
      .mockResolvedValue(CURRENT_STOCK_PRICE_136);

    const actual = await asyncShouldBuyBySymbol(
      financialApiService,
      orderBuyingPrice,
      symbol
    );

    expect(true).toBe(actual);
  });

  test("購入希望価格 < 株価 の場合は、falseを返す", async (): Promise<void> => {
    const orderBuyingPrice = 120;
    financialApiService.getPrice = jest
      .fn()
      .mockResolvedValue(CURRENT_STOCK_PRICE_136);

    const actual = await asyncShouldBuyBySymbol(
      financialApiService,
      orderBuyingPrice,
      symbol
    );

    expect(false).toBe(actual);
  });
});
