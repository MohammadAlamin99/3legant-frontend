export default function authorize(user: string) {
  if (user === "unauthorized") {
    return false;
  }
  return true;
}
