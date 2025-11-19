import { IUser } from "@/types/user.type";

export function decodeToken(token?: string): IUser | null {
  if (!token) return null;

  try {
    // Split JWT parts
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];

    // Base64 URL Decode Helper
    const base64UrlDecode = (str: string) => {
      str = str.replace(/-/g, "+").replace(/_/g, "/");
      while (str.length % 4) str += "=";
      return decodeURIComponent(
        atob(str)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    };

    const decoded = JSON.parse(base64UrlDecode(payload));
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
