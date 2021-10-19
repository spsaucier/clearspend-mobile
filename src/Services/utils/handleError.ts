export interface Error {
  message?: string;
  data?: any;
  status?: number;
}

export default function handleError({ message, data, status }: Error) {
  // @ts-ignore
  return Promise.reject(new Error({ message, data, status }));
}
