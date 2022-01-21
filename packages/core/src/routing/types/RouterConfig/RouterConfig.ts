export interface RouterConfig {
  hashPrefix: string;
  additionalHeight: number;
  handleNotification: (tag: string, data: unknown) => void;
  allowedOrigins: string;
}
