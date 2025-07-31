import { getCookieValue } from "./cookies"; 
import { logout } from "./logout";
import signIn from '../svg/signin.svg';
import account from '../svg/account.svg';

function initButtons() {
  const header = document.querySelector(".header-right-side");
  const userId = getCookieValue('user_id');
  if (userId) {
    const logoutButton = document.createElement('button');
    logoutButton.className = "button clear medium";
    logoutButton.innerHTML = `
    <p>Выйти</p>
    <img src="${signIn}" alt="Logout">
    `;
    logoutButton.addEventListener('click', () => {
      logout('user_id');
      window.location.reload();
    });
    header.appendChild(logoutButton);

    const accountLink = document.createElement('a');
    accountLink.href = "/user";
    accountLink.innerHTML = `
    <img src="${account}" alt="Account">
    `;
    header.appendChild(accountLink);
  } else {
    const registerLink = document.createElement('a');
    registerLink.href = "/enter?register=true";
    registerLink.className = "button clear medium";
    registerLink.innerHTML = `
    <p>Зарегистрироваться</p>
    <img src="${signIn}" alt="Sign-up">
    `;
    header.appendChild(registerLink);

    const loginLink = document.createElement('a');
    loginLink.href = "/enter";
    loginLink.className = "button clear medium";
    loginLink.innerHTML = `
    <p>Войти</p>
    <img src="${signIn}" alt="Sign-in">
    `;
    header.appendChild(loginLink);
  }
}

export function setupHeader() {
  document.addEventListener('DOMContentLoaded', () => {
    initButtons();
  });
}