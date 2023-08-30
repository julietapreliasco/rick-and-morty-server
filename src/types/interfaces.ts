export interface User {
  firebaseUid?: string;
  email: string;
  name: string;
}

export interface BodyResponse<T> {
  message: string;
  data?: T;
  error: boolean;
}
