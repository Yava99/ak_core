export type LogDetails = Record<string, unknown>;

export interface ISerializedError {
  name: string;
  message: string;
  stack?: string;
  code?: string;
  details?: Record<string, unknown>;
  cause?: unknown;
}

export type LogWriter = (message: string) => void;