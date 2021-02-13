import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  getFirstNameThrowIfLong,
} from "../functions";
import { DatabaseMock } from "../util";
import { NameApiService } from "../nameApiService";

describe("sumOfArray関数のテスト", (): void => {
  // test("sumOfArrayの引数にstring型の配列['1']を渡すとビルドエラーが発生する", (): void => {
  //   expect((): number => sumOfArray(["1"])).toThrowError();
  // });

  test("引数に空配列[]を渡すと0が返ってくる", (): void => {
    const expected = 0;

    const actual = sumOfArray([]);

    expect(actual).toBe(expected);
  });

  test("引数に配列[1]を渡すと1が返ってくる", (): void => {
    const expected = 1;

    const actual = sumOfArray([1]);

    expect(actual).toBe(expected);
  });

  test("引数に配列[1,2]を渡すと3が返ってくる", (): void => {
    const expected = 3;

    const actual = sumOfArray([1, 2]);

    expect(actual).toBe(expected);
  });

  test("引数に配列[-1,2]を渡すと1が返ってくる", (): void => {
    const expected = 1;

    const actual = sumOfArray([-1, 2]);

    expect(actual).toBe(expected);
  });
});

describe("asyncSumOfArray関数のテスト", (): void => {
  // test("引数にstring型の配列['1']を渡すとビルドエラーが発生する", async (): Promise<
  //   void
  // > => {
  //   await expect((): number => sumOfArray(["1"])).toThrowError();
  // });

  test("引数に空配列[]を渡すと0が返ってくる", async (): Promise<void> => {
    const expected = 0;

    const actual = await asyncSumOfArray([]);

    expect(actual).toBe(expected);
  });

  test("引数に配列[1]を渡すと1が返ってくる", async (): Promise<void> => {
    const expected = 1;

    const actual = await asyncSumOfArray([1]);

    expect(actual).toBe(expected);
  });

  test("引数に配列[-1,2]を渡すと1が返ってくる", async (): Promise<void> => {
    const expected = 1;

    const actual = await asyncSumOfArray([-1, 2]);

    expect(actual).toBe(expected);
  });
});

describe("asyncSumOfArraySometimesZero関数のテスト", (): void => {
  let database: DatabaseMock;

  beforeEach((): void => {
    database = new DatabaseMock();
  });

  // test("引数にstring型の配列['1']を渡すとビルドエラーが発生する", async (): Promise<void> => {
  //   database.save = jest.fn();

  //   const actual: number = await asyncSumOfArraySometimesZero(database, ["1"]);

  //   expect(0).toBe(actual);
  // });

  test("引数に空配列[]を渡すと0が返ってくる", async (): Promise<void> => {
    const expected = 0;
    database.save = jest.fn();

    const actual = await asyncSumOfArraySometimesZero(database, []);

    expect(actual).toBe(expected);
  });

  test("引数に配列[1]を渡すと1が返ってくる", async (): Promise<void> => {
    const expected = 1;
    database.save = jest.fn();

    const actual = await asyncSumOfArraySometimesZero(database, [1]);

    expect(actual).toBe(expected);
  });

  test("引数に配列[-1,2]を渡すと1が返ってくる", async (): Promise<void> => {
    const expected = 1;
    database.save = jest.fn();

    const actual = await asyncSumOfArraySometimesZero(database, [-1, 2]);

    expect(actual).toBe(expected);
  });

  test("DatabaseMock.save()が失敗すると0が返る", async (): Promise<void> => {
    const expected = 0;
    database.save = jest.fn(
      (): Error => {
        throw new Error("fail!");
      }
    );

    const actual = await asyncSumOfArraySometimesZero(database, [0]);

    expect(actual).toBe(expected);
  });
});

describe("getFirstNameThrowIfLong関数のテスト", (): void => {
  let nameApiSerivce: NameApiService;

  beforeEach((): void => {
    nameApiSerivce = new NameApiService();
  });

  describe("firstName.length <= maxNameLength の場合、firstName を返す", (): void => {
    test("firstName = 'HOGEHOGE' , maxNameLength = 10 の場合、firstName を返す", async (): Promise<
      void
    > => {
      const firstName = "HOGEHOGE";
      const expected = firstName;
      nameApiSerivce.getFirstName = jest.fn().mockResolvedValue(firstName);

      const actual = await getFirstNameThrowIfLong(nameApiSerivce, 10);

      expect(actual).toBe(expected);
    });

    test("firstName = 'HOGEHOGE' , maxNameLength = 8 の場合、firstName を返す", async (): Promise<
      void
    > => {
      const firstName = "HOGEHOGE";
      const expected = firstName;
      nameApiSerivce.getFirstName = jest.fn().mockResolvedValue(firstName);

      const actual = await getFirstNameThrowIfLong(nameApiSerivce, 8);

      expect(actual).toBe(expected);
    });
  });

  describe("firstName.length > maxNameLength の場合、エラーを返す", (): void => {
    test("firstName = 'HOGEHOGE' , maxNameLength = 7 の場合、エラーを返す", async (): Promise<
      void
    > => {
      const firstName = "HOGEHOGE";
      nameApiSerivce.getFirstName = jest.fn().mockResolvedValue(firstName);

      await expect(getFirstNameThrowIfLong(nameApiSerivce, 7)).rejects.toThrow(
        "first_name too long"
      );
    });
  });
});
