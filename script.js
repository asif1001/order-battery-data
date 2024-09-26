document.addEventListener('DOMContentLoaded', () => {
  const dateTimeInput = document.getElementById('date-time');
  const referenceNoInput = document.getElementById('reference-no');
  const branchInput = document.getElementById('branch');

  // Generate Reference No based on date+time (DDMMYYYYHHMM)
  function generateReferenceNo() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}${month}${year}${hours}${minutes}`;
  }

  // Set current date and time in the input field (not editable)
  const currentDateTime = new Date().toLocaleString(); // Format as needed
  dateTimeInput.value = currentDateTime;

  // Set the reference number to date+time
  referenceNoInput.value = generateReferenceNo();

  // Preserve branch name during form sessions until submission
  const savedBranchName = localStorage.getItem('branchName');
  if (savedBranchName) {
    branchInput.value = savedBranchName;
    branchInput.readOnly = true; // Make the branch name readonly after the first input
  }

  // Initialize EmailJS
  (function() {
    emailjs.init('YOUR_USER_ID'); // Replace with your EmailJS user ID
  })();

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

    // Send email using EmailJS
    const emailParams = {
      to_email: 'your_email@example.com', // Replace with your actual email
      branch,
      location,
      partNo,
      qty,
      dateTime,
      referenceNo
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      }, (error) => {
        console.log('Failed to send email:', error);
      });

    // Save branch name after submission, and make it readonly
    localStorage.setItem('branchName', branch);
    branchInput.readOnly = true; // Make branch input read-only after first entry
  });
});
