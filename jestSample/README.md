# jest で単体テストを書こう

## 課題内容

[airtable](https://airtable.com/tblTnXBXFOYJ0J7lZ/viwyi8muFtWUlhNKG/recatNRhwyLZts9AL?blocks=hide)

## 課題 3(質問)

### 1.

- **なぜ元の関数はカバレッジ 100%のテストを書けなかったか**

  `function.ts`の`asyncSumOfArraySometimesZero`メソッドを例に挙げる

  ```ts
  export const asyncSumOfArraySometimesZero = (
    numbers: number[]
  ): Promise<number> => {
    return new Promise((resolve): void => {
      try {
        const database = new DatabaseMock(); // fixme: この関数をテストするには、DatabaseMockの使い方を変える必要がありそ う！ヒント：依存性の注入
        database.save(numbers);
        resolve(sumOfArray(numbers));
      } catch (error) {
        resolve(0);
      }
    });
  };
  ```

  回答

  ```
  asyncSumOfArraySometimesZeroメソッドには、try…catch文が存在する。
  try…catch文とは、tryブロック内で例外が発生した場合にcatchブロック内の処理が実行されます。
  そのため、テストカバレッジ100%を達成をするためには、tryブロック内の処理結果が正常な場合と例外な場合の両方のケースを実行する必要があります。
  しかしながら、tryブロック内で例外を発生させる処理は、DatabaseMockクラスのsaveメソッドが役割を担っています。
  つまり、テスト対象メソッドは外部の処理結果に依存しています。
  カバレッジ100%のテストを書くことができない理由は、外部の処理結果に依存しているからです。
  ```

- **依存性の注入**

  - 依存性の注入とは何か

    ```
    結合度を低くするために、依存関係を外部から注入する手法
    ```

  - どのような問題を解決するために使われるか

    ```
    結合度が高いことによる、弊害柔軟性が乏しい問題

    単体テストがしずらい問題
    ```

  - 参考文献
    - [猿でも分かる! Dependency Injection: 依存性の注入 | Qiita](https://qiita.com/hshimo/items/1136087e1c6e5c5b0d9f)
    - [依存性注入(DI)の解説とやり方 | Qiita](https://qiita.com/1000k/items/aef6aed46b0fc34cc15e)

- **結合度の強さはどのように変化したか**

  ```
  モジュール結合度が内容結合からデータ結合 (?)
  ```

  [結合度 | Wikipedia](https://ja.wikipedia.org/wiki/%E7%B5%90%E5%90%88%E5%BA%A6)

#### メモ

- 依存性の注入 の種類

  - インタフェース注入 (引数で渡す手法！今回の課題で用いた手法)
  - setter 注入
  - コンストラクタ注入 (Java の Class 内ではコンストラクタによる注入をよく目にした)

  [DI の種類 | Wikipedia](https://ja.wikipedia.org/wiki/%E4%BE%9D%E5%AD%98%E6%80%A7%E3%81%AE%E6%B3%A8%E5%85%A5#DI%E3%81%AE%E7%A8%AE%E9%A1%9E)

- コンストラクタ注入 と setter 注入 はどちらが良いか

  - 結論

    - コンストラクタ注入

  - 理由（TODO: まだ読んでない）

    - [抄訳: Constructor Injection vs. Setter Injection](https://qiita.com/1000k/items/df08e0dd5e64ec72cb3e)
      - 翻訳元の記事が消えてた、、
    - [Spring で Field Injection より Constructor Injection が推奨される理由](http://pppurple.hatenablog.com/entry/2016/12/29/233141)

---

### 2.

- **単体テストで外部サービスとの通信が発生すると、どのようなデメリットがあるか？**
  - 回答
    - 通常のテストよりも外部への実際の呼び出しは低速
    - 外部の API が常に利用可能であることや、常に正しい処理結果を返すことを保証できない(外部のサービスを自分たちが制御することは不可)
    - 自前のサーバーにテスト版の API を用意すればある程度はコントロール可能だが、通常のテストよりも低速かつ API が停止している場合はテスト不可な状況は変わらない
  - 参考文献
    - [実践 JUnit 達人プログラマーのユニットテスト技法 | O'REILLY](https://www.oreilly.co.jp/books/9784873117300/) / 10 章 モックオブジェクト / 10.1 テストでの課題 / p145

---

### 3.

- **修正内容**

  - 実装コード
  - テストコード

- **なぜそのような修正をしたのか**

  ```

  ```
