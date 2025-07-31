import { removeCookie } from "./cookies";

export function logout() {
  removeCookie('user_id');
  window.location.href = '/';
}