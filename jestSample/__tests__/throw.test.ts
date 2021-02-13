class ApplicationError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "ApplicationError";
  }
}

class DisgustingFlavorError extends ApplicationError {
  public constructor(message: string) {
    super(message);
    this.name = "DisgustingFlavorError";
    this.message = message;
  }
}

const throwError1 = (): Error => {
  throw "throw error 1";
};

const throwError2 = (): Error => {
  throw new Error("throw error 2");
};

const throwError3 = (): DisgustingFlavorError => {
  throw new DisgustingFlavorError("yuck, octopus flavor");
};

test("throwError1のテスト", (): void => {
  expect(throwError1).toThrow();
  expect(throwError1).toThrow("throw error 1");
  expect(throwError1).toThrow(Error("throw error 1"));
  expect(throwError1).toThrow(new Error("throw error 1"));

  expect(throwError1).toThrowError();
  expect(throwError1).toThrowError("throw error 1");
  expect(throwError1).toThrowError(Error("throw error 1"));
  expect(throwError1).toThrowError(new Error("throw error 1"));
});

test("throwError2のテスト", (): void => {
  expect(throwError2).toThrow();
  expect(throwError2).toThrow("throw error 2");
  expect(throwError2).toThrow(Error("throw error 2"));
  expect(throwError2).toThrow(new Error("throw error 2"));

  expect(throwError2).toThrowError();
  expect(throwError2).toThrowError("throw error 2");
  expect(throwError2).toThrowError(Error("throw error 2"));
  expect(throwError2).toThrowError(new Error("throw error 2"));
});

test("throwError3のテスト", (): void => {
  expect(throwError3).toThrow();
  expect(throwError3).toThrow("yuck, octopus flavor");
  expect(throwError3).toThrow(Error);
  expect(throwError3).toThrow(Error("yuck, octopus flavor"));
  expect(throwError3).toThrow(new Error("yuck, octopus flavor"));
  expect(throwError3).toThrow(
    new DisgustingFlavorError("yuck, octopus flavor")
  );

  expect(throwError3).toThrowError();
  expect(throwError3).toThrowError("yuck, octopus flavor");
  expect(throwError3).toThrowError(Error("yuck, octopus flavor"));
  expect(throwError3).toThrowError(new Error("yuck, octopus flavor"));
  expect(throwError3).toThrowError(
    new DisgustingFlavorError("yuck, octopus flavor")
  );
});
