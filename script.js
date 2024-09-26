document.addEventListener('DOMContentLoaded', () => {
  const dateTimeInput = document.getElementById('date-time');
  const referenceNoInput = document.getElementById('reference-no');
  const branchInput = document.getElementById('branch');

  // Initialize the reference number from localStorage or start at 1000
  let referenceNo = localStorage.getItem('referenceNo') ? parseInt(localStorage.getItem('referenceNo')) : 1000;
  referenceNoInput.value = referenceNo;

  // Set the current date and time, and ensure it is not editable
  const currentDateTime = new Date().toLocaleString(); // Format as needed
  dateTimeInput.value = currentDateTime;

  // Preserve the branch name during form sessions until submission
  const savedBranchName = localStorage.getItem('branchName');
  if (savedBranchName) {
    branchInput.value = savedBranchName;
    branchInput.readOnly = true; // Make the branch name readonly after the first input
  }

  // Handle form submission
  document.getElementById('data-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const branch = document.getElementById('branch').value;
    const location = document.getElementById('location').value;
    const partNo = document.getElementById('part-no').value;
    const qty = document.getElementById('qty').value;
    const dateTime = document.getElementById('date-time').value;
    const referenceNo = document.getElementById('reference-no').value;

    const data = {
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

    // Increment reference number and update in localStorage
    referenceNoInput.value = ++referenceNo;
    localStorage.setItem('referenceNo', referenceNo);

    // Save the branch name after the first submission, and make it readonly
    localStorage.setItem('branchName', branch);
    branchInput.readOnly = true; // Make branch input read-only after first entry
  });
});
