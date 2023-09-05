export class ErrorHandler extends Error {
    statusCode: number;
    message: string;
  
    constructor(statusCode: number, message: string) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
  export const handleError = (err: ErrorHandler, res: any) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    });
  };
  