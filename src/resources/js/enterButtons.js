function invertButtons(buttons) {
  const type0 = buttons[0].getAttribute('type');
  const type1 = buttons[1].getAttribute('type');
  buttons[0].setAttribute('type', type1);
  buttons[1].setAttribute('type', type0);

  const classList0 = buttons[0].classList;
  const classList1 = buttons[1].classList;

  const isPrimary0 = classList0.contains('primary');
  const isSecondary0 = classList0.contains('secondary');
  const isPrimary1 = classList1.contains('primary');
  const isSecondary1 = classList1.contains('secondary');

  if (isPrimary0 !== isPrimary1) {
    classList0.toggle('primary');
    classList1.toggle('primary');
  }
  if (isSecondary0 !== isSecondary1) {
    classList0.toggle('secondary');
    classList1.toggle('secondary');
  }
}

function swapDirection(footer) {
  const style = window.getComputedStyle(footer);

  footer.style.flexDirection = style.flexDirection === 'row' ? 'row-reverse' : 'row';
  footer.style.flexWrap = style.flexWrap === 'wrap' ? 'wrap-reverse' : 'wrap';
}

function invertPasswordField(rows) {
  const windowRows = rows.querySelectorAll('.window-row');
  const passwordAgainRow = Array.from(windowRows).find(row =>
    row.querySelector('input[name="password-again"]')
  );

  if (windowRows.length === 3 && passwordAgainRow) {
    passwordAgainRow.remove();
  } else if (windowRows.length === 2 && !passwordAgainRow) {
    const newRow = document.createElement('label');
    newRow.className = 'window-row';
    newRow.innerHTML = `
      <input type="password" class="field-input medium" name="password-again" placeholder="Повторите пароль" autocomplete="off" required="">
    `;
    rows.appendChild(newRow);
  }
}

function invertHeader(header) {
  header.textContent = header.textContent === 'Вход' ? 'Регистрация' : 'Вход';
}

export function initEnterButtons() {
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector(".window-header > p");
    const rows = document.querySelector(".window-rows-container");
    const footer = document.querySelector(".window-footer");
    const buttons = footer.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        if (button.getAttribute('type') === 'button') {
          event.preventDefault();
          invertButtons(buttons);
          swapDirection(footer);
          invertHeader(header);
          invertPasswordField(rows);
        }
      });
    });
  });
}