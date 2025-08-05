import { jwtDecode } from "jwt-decode";

// Define the expected shape of your JWT payload
export type DecodedToken = {
  sub: string;        // usually user ID or email
  exp: number;        // expiration time (in seconds)
  roles?: string[];   // optional roles
  name?: string;      // optional name
  [key: string]: any; // any other custom fields
};

// Type-safe decodeToken utility
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (err:unknown) {
    console.error("Failed to decode token", err);
    return null;
  }
};
