import { Quiz2 } from "../quiz/quiz2";
import { FinancialApiService } from "../quiz/financialApiService";

describe("asyncShouldBuy関数のテスト", (): void => {
  const CURRENT_STOCK_PRICE_136 = 136;
  const symbol = "AAPL";
  let financialApiService: FinancialApiService;
  let quiz2: Quiz2;

  beforeEach((): void => {
    financialApiService = new FinancialApiService();
    quiz2 = new Quiz2(financialApiService);
  });

  test("購入希望価格 >= 株価 の場合は、trueを返す", async (): Promise<void> => {
    const orderBuyingPrice = 136;
    financialApiService.getPrice = jest
      .fn()
      .mockResolvedValue(CURRENT_STOCK_PRICE_136);

    const actual = await quiz2.asyncShouldBuyBySymbol(orderBuyingPrice, symbol);

    expect(true).toBe(actual);
  });

  test("購入希望価格 < 株価 の場合は、falseを返す", async (): Promise<void> => {
    const orderBuyingPrice = 120;
    financialApiService.getPrice = jest
      .fn()
      .mockResolvedValue(CURRENT_STOCK_PRICE_136);

    const actual = await quiz2.asyncShouldBuyBySymbol(orderBuyingPrice, symbol);

    expect(false).toBe(actual);
  });
});
