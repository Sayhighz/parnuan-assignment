export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export class ResponseUtil {
  static success<T>(
    data: T,
    message?: string,
    meta?: { page?: number; limit?: number; total?: number }
  ): ApiResponse<T> {
    const response: ApiResponse<T> = {
      success: true,
      data,
    };

    if (message) response.message = message;
    if (meta) response.meta = meta;

    return response;
  }

  static error(message: string, error?: string): ApiResponse {
    return {
      success: false,
      message,
      error,
    };
  }

  static created<T>(data: T, message = 'Resource created successfully'): ApiResponse<T> {
    return this.success(data, message);
  }

  static updated<T>(data: T, message = 'Resource updated successfully'): ApiResponse<T> {
    return this.success(data, message);
  }

  static deleted(message = 'Resource deleted successfully'): ApiResponse {
    return this.success(null, message);
  }

  static paginated<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    message?: string
  ): ApiResponse<T[]> {
    return this.success(data, message, { page, limit, total });
  }
}