
async function calculateSum() {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    
    if (!num1 || !num2) {
        document.getElementById('result').textContent = 'Please enter both numbers';
        return;
    }

    try {
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ num1, num2 })
        });
        
        const data = await response.json();
        document.getElementById('result').textContent = `Sum: ${data.result}`;
    } catch (error) {
        document.getElementById('result').textContent = 'Error calculating sum';
    }
}
