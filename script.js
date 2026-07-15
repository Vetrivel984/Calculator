const display = document.getElementById('display');
let expression = '';

function updateDisplay(value) {
  display.textContent = value || '0';
}

function cleanExpression(expr) {
  return expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
}

function handleButton(value, action) {
  if (action === 'clear') {
    expression = '';
    updateDisplay(expression);
    return;
  }

  if (action === 'backspace') {
    expression = expression.slice(0, -1);
    updateDisplay(expression);
    return;
  }

  if (action === 'equals') {
    if (!expression) {
      return;
    }
    try {
      const result = eval(cleanExpression(expression));
      expression = String(result);
      updateDisplay(expression);
    } catch {
      updateDisplay('Error');
      expression = '';
    }
    return;
  }

  if (['+', '-', '*', '/', '%', '.'].includes(value)) {
    const lastChar = expression.slice(-1);
    if (!expression && value !== '.') {
      if (value === '-' || value === '%') {
        expression += value;
      }
      updateDisplay(expression);
      return;
    }
    if (['+', '-', '*', '/', '%', '.'].includes(lastChar) && value !== '.') {
      expression = expression.slice(0, -1) + value;
    } else {
      expression += value;
    }
    updateDisplay(expression);
    return;
  }

  expression += value;
  updateDisplay(expression);
}

function handleKeyPress(event) {
  const key = event.key;
  if (/^[0-9]$/.test(key) || ['+', '-', '*', '/', '%', '.'].includes(key)) {
    handleButton(key);
  }
  if (key === 'Enter' || key === '=') {
    handleButton(null, 'equals');
  }
  if (key === 'Backspace') {
    handleButton(null, 'backspace');
  }
  if (key.toLowerCase() === 'c') {
    handleButton(null, 'clear');
  }
}

document.querySelectorAll('.button').forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;
    handleButton(value, action);
  });
});

document.addEventListener('keydown', handleKeyPress);
