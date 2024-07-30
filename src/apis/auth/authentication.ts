export const logout = async () => {
  const res = await fetch("/api/auth/login", { method: "DELETE" });
  console.log("authentication >>", res);
};
