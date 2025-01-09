export class AppError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    if (message) {
      super(message);
    } else {
      super("A generic error occurred!");
    }
    this.statusCode = statusCode;
  }
}
