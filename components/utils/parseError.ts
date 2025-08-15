export interface ParsedError {
  email?: string[];
  username?: string[];
  password?: string[];
  non_field_errors?: string[];
}

export function parseApiError(err: unknown): ParsedError {
  if (typeof err === 'object' && err !== null && 'data' in err) {
    const errorObj = err as {
      data?: ParsedError;
      error?: ParsedError;
    };
    return errorObj.data || errorObj.error || {};
  }

  return {};
}

export function parseAPIError(err: unknown): string {
  if (
    typeof err === 'object' &&
    err !== null &&
    'data' in err &&
    typeof (err as { data?: Record<string, unknown> }).data === 'object'
  ) {
    const data = (err as { data?: Record<string, unknown> }).data;
    return (
      data?.detail ||
      (Array.isArray(data?.non_field_errors) ? data.non_field_errors[0] : undefined) ||
      (data
        ? Array.isArray(Object.values(data)[0])
          ? (Object.values(data)[0] as string[])[0]
          : undefined
        : undefined) ||
      'An unknown error occurred'
    );
  }
  return 'An unknown error occurred';
}
