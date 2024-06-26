document.addEventListener('DOMContentLoaded', () => {
  const dateTimeInput = document.getElementById('date-time');
  dateTimeInput.value = new Date().toLocaleString();

  document.getElementById('data-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const orderNo = document.getElementById('order-no').value;
    const batterySerialNo = document.getElementById('battery-serial-no').value;
    const dateTime = document.getElementById('date-time').value;

    const data = {
      orderNo,
      batterySerialNo,
      dateTime
    };

    console.log('Submitting data:', data);

    // Send data to your backend API
    const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
  });
});
