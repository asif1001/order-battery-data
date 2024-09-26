document.addEventListener('DOMContentLoaded', () => {
  const dateTimeInput = document.getElementById('date-time');
  const referenceNoInput = document.getElementById('reference-no');

  // Initialize a reference number from localStorage or start at 1000
  let referenceNo = localStorage.getItem('referenceNo') ? parseInt(localStorage.getItem('referenceNo')) : 1000;
  referenceNoInput.value = referenceNo;

  // Set the current date (formatted as needed)
  const currentDate = new Date().toLocaleDateString();
  dateTimeInput.value = currentDate;

  // Handle form submission
  document.getElementById('data-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const orderNo = document.getElementById('order-no').value;
    const batterySerialNo = document.getElementById('battery-serial-no').value;
    const branch = document.getElementById('branch').value;
    const location = document.getElementById('location').value;
    const partNo = document.getElementById('part-no').value;
    const qty = document.getElementById('qty').value;
    const dateTime = document.getElementById('date-time').value;
    const referenceNo = document.getElementById('reference-no').value;

    const data = {
      orderNo,
      batterySerialNo,
      branch,
      location,
      partNo,
      qty,
      dateTime,
      referenceNo
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

    // Increment reference number and update it in localStorage
    referenceNoInput.value = ++referenceNo;
    localStorage.setItem('referenceNo', referenceNo);
  });
});
