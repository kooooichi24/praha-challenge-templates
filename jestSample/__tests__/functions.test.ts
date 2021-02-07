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
    const actual = sumOfArray([]);

    expect(0).toEqual(actual);
  });

  test("引数に配列[1]を渡すと1が返ってくる", (): void => {
    const actual = sumOfArray([1]);

    expect(1).toEqual(actual);
  });

  test("引数に配列[1,2]を渡すと3が返ってくる", (): void => {
    const actual: number = sumOfArray([1, 2]);

    expect(3).toEqual(actual);
  });

  test("引数に配列[-1,2]を渡すと1が返ってくる", (): void => {
    const actual: number = sumOfArray([-1, 2]);

    expect(1).toEqual(actual);
  });
});

describe("asyncSumOfArray関数のテスト", (): void => {
  // test("引数にstring型の配列['1']を渡すとビルドエラーが発生する", async (): Promise<
  //   void
  // > => {
  //   await expect((): number => sumOfArray(["1"])).toThrowError();
  // });

  test("引数に空配列[]を渡すと0が返ってくる", async (): Promise<void> => {
    const actual = await asyncSumOfArray([]);

    expect(0).toEqual(actual);
  });

  test("引数に配列[1]を渡すと1が返ってくる", async (): Promise<void> => {
    const actual: number = await asyncSumOfArray([1]);

    expect(1).toEqual(actual);
  });

  test("引数に配列[-1,2]を渡すと1が返ってくる", async (): Promise<void> => {
    const actual: number = await asyncSumOfArray([-1, 2]);

    expect(1).toEqual(actual);
  });

  test("引数に配列[-1,1]を渡すと0が返ってくる", async (): Promise<void> => {
    const actual: number = await asyncSumOfArray([-1, 1]);

    expect(0).toEqual(actual);
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

  //   expect(0).toEqual(actual);
  // });

  test("引数に空配列[]を渡すと0が返ってくる", async (): Promise<void> => {
    database.save = jest.fn();

    const actual: number = await asyncSumOfArraySometimesZero(database, []);

    expect(0).toEqual(actual);
  });

  test("引数に配列[1]を渡すと1が返ってくる", async (): Promise<void> => {
    database.save = jest.fn();

    const actual: number = await asyncSumOfArraySometimesZero(database, [1]);

    expect(1).toEqual(actual);
  });

  test("引数に配列[1,2]を渡すと3が返ってくる", async (): Promise<void> => {
    database.save = jest.fn();

    const actual: number = await asyncSumOfArraySometimesZero(database, [1, 2]);

    expect(3).toEqual(actual);
  });

  test("引数に配列[-1,2]を渡すと1が返ってくる", async (): Promise<void> => {
    database.save = jest.fn();

    const actual: number = await asyncSumOfArraySometimesZero(database, [
      -1,
      2,
    ]);

    expect(1).toEqual(actual);
  });

  test("DatabaseMock.save()が失敗すると0が返る", async (): Promise<void> => {
    database.save = jest.fn(
      (): Error => {
        throw new Error("fail!");
      }
    );

    const actual: number = await asyncSumOfArraySometimesZero(database, [0]);

    expect(0).toEqual(actual);
  });
});

describe("getFirstNameThrowIfLong関数のテスト", (): void => {
  let nameApiSerivce: NameApiService;

  beforeEach((): void => {
    nameApiSerivce = new NameApiService();
  });

  test("firstNameが8文字の場合、引数に10を渡すとfirstNameが返ってくる", async (): Promise<
    void
  > => {
    const firstName = "HOGEHOGE";
    nameApiSerivce.getFirstName = jest.fn().mockResolvedValue(firstName);

    const actual = await getFirstNameThrowIfLong(nameApiSerivce, 10);

    expect(firstName).toEqual(actual);
  });

  test("firstNameが8文字の場合、引数に8を渡すとfirstNameが返ってくる", async (): Promise<
    void
  > => {
    const firstName = "HOGEHOGE";
    nameApiSerivce.getFirstName = jest.fn().mockResolvedValue(firstName);

    const actual = await getFirstNameThrowIfLong(nameApiSerivce, 10);

    expect(firstName).toEqual(actual);
  });

  test("firstNameが8文字の場合、引数に7を渡すとエラーが発生する", async (): Promise<
    void
  > => {
    const firstName = "HOGEHOGE";
    nameApiSerivce.getFirstName = jest.fn().mockResolvedValue(firstName);

    await expect(getFirstNameThrowIfLong(nameApiSerivce, 7)).rejects.toThrow(
      "first_name too long"
    );
  });
});
