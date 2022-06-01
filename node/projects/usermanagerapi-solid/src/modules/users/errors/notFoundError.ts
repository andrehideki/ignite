class NotFoundError implements Error {
  name: string;
  message: string;
  stack?: string;

  constructor(entity: string) {
    this.name = "NotFoundError";
    this.message = `${entity} not found`;
  }
}

export { NotFoundError };
