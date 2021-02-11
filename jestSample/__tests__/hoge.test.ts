const hoge = (): Promise<string> => {
  return new Promise((resolve): void => {
    resolve("hoge");
  });
};

test("非同期関数hogeのテスト1", async (): Promise<void> => {
  expect(await hoge()).toBe("hoge");
});

test("非同期関数hogeのテスト2", (): void => {
  expect(hoge()).resolves.toBe("hoge");
});

test("非同期関数hogeのテスト3", (): void => {
  hoge().then((data: string): void => {
    expect(data).toBe("hoge");
  });
});
