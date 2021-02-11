import nodeFetch from "node-fetch";
import {
  sortAndPartition,
  countWordsOfJoke,
  JokeApiResponse,
  frequencyOfWordOccurrence,
} from "../quiz/tomoki";

jest.mock("node-fetch");
const mockedFetch = nodeFetch as jest.MockedFunction<typeof nodeFetch>;

describe("sortAndPartition関数のテスト", (): void => {
  describe("引数に配列を渡す場合、受け取った配列の要素をソートして同じものをまとめる", (): void => {
    describe("数値型の配列を引数に渡す場合", (): void => {
      test("引数に [3, 2, 1] を渡すと、[[1], [2], [3]] を返す", (): void => {
        const expected = [[1], [2], [3]];

        const actual = sortAndPartition([3, 2, 1]);

        expect(actual).toEqual(expected);
      });

      test("引数に [3, 2, 2, 1] を渡すと、[[1], [2, 2], [3]] を返す", (): void => {
        const expected = [[1], [2, 2], [3]];

        const actual = sortAndPartition([3, 2, 2, 1]);

        expect(actual).toEqual(expected);
      });
    });

    describe("文字型の配列を引数に渡す場合", (): void => {
      test("引数に ['3', '2', '1'] を渡すと、[['1'], ['2'], ['3']] を返す", (): void => {
        const expected = [["1"], ["2"], ["3"]];

        const actual = sortAndPartition(["3", "2", "1"]);

        expect(actual).toEqual(expected);
      });

      test("引数に ['3', '2', '2', '1'] を渡すと、[['1'], ['2', '2'], ['3']] を返す", (): void => {
        const expected = [["1"], ["2", "2"], ["3"]];

        const actual = sortAndPartition(["3", "2", "2", "1"]);

        expect(actual).toEqual(expected);
      });
    });

    describe("数値型と文字列型を含む配列を引数に渡す場合", (): void => {
      test("引数に [2, '1'] を渡すと、[['1'], [2]] を返す", (): void => {
        const expected = [["1"], [2]];

        const actual = sortAndPartition([2, "1"]);

        expect(actual).toEqual(expected);
      });

      test("引数に ['3', '2', '2', '1', 'a', ''] を渡すと、[[''], ['1'], ['2', '2'], ['3'], ['a']] を返す", (): void => {
        const expected = [[""], ["1"], ["2", "2"], ["3"], ["a"]];

        const actual = sortAndPartition(["3", "2", "2", "1", "a", ""]);

        expect(actual).toEqual(expected);
      });
    });

    describe("引数に空配列 [] を渡す場合", (): void => {
      test("引数に空配列 [] を渡すと、空配列 [] を返す", (): void => {
        const expected: number[] = [];

        const actual = sortAndPartition([]);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe.skip("引数に配列以外を渡す場合、エラーが発生する", (): void => {
    // test("引数に number型の3 を渡すと、エラーが発生する", (): void => {
    //   expect(sortAndPartition(3)).toThrowError();
    //   expect(sortAndPartition(3)).toThrowError("Only arrays are allowed");
    // });
    // test("引数に { key: `value`} を渡すと、エラーが発生する", (): void => {
    //   expect(sortAndPartition({ key: "value" })).toThrowError();
    //   expect(sortAndPartition({ key: "value" })).toThrowError(
    //     "Only arrays are allowed"
    //   );
    // });
  });
});

interface Response {
  json(): JokeApiResponse;
}

const response = (joke: string): Response => {
  return {
    json: (): JokeApiResponse => {
      return { joke };
    },
  };
};

describe("countWordsOfJoke関数のテスト", (): void => {
  test("apiから取得した文が 'I have a pen' のとき、単語数として4を返す", async (): Promise<
    void
  > => {
    const expected = 4;
    mockedFetch.mockResolvedValue(response("I have a pen."));

    const actual = await countWordsOfJoke();

    expect(actual).toBe(expected);
  });

  test("apiから取得した文が '' のとき、単語数として0を返す", async (): Promise<
    void
  > => {
    const expected = 0;
    mockedFetch.mockResolvedValue(response(""));

    const actual = await countWordsOfJoke();

    expect(actual).toBe(expected);
  });
});

describe("frequencyOfWordOccurrence関数のテスト", (): void => {
  test("引数に 'a b a ' を渡すと、{ a: 2, b: 1 } を返す", (): void => {
    const expected = { a: 2, b: 1 };

    const actual = frequencyOfWordOccurrence("a b a");

    expect(actual).toEqual(expected);
  });
});
