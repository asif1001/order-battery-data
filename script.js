document.addEventListener('DOMContentLoaded', () => {
  const dateTimeInput = document.getElementById('date-time');
  const referenceNoInput = document.getElementById('reference-no');
  const branchInput = document.getElementById('branch');
  const tempDataTable = document.getElementById('temp-data-table');
  let tempDataArray = []; // Array to store the temporary data entries

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

  // Function to add data to the temporary table
  document.getElementById('add-data-btn').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    const partNo = document.getElementById('part-no').value;
    const qty = document.getElementById('qty').value;

    if (!location || !partNo || !qty) {
      alert('Please fill out all fields before adding data.');
      return;
    }

    // Add the entry to the temporary data array
    tempDataArray.push({ location, partNo, qty });

    // Clear the inputs and reset the focus to Location field
    document.getElementById('location').value = '';
    document.getElementById('part-no').value = '';
    document.getElementById('qty').value = '';
    document.getElementById('location').focus();

    // Render the updated temporary data table
    renderTempDataTable();
  });

  // Function to render the temporary data table
  function renderTempDataTable() {
    tempDataTable.innerHTML = ''; // Clear current table rows
    tempDataArray.forEach((data, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${data.location}</td>
        <td>${data.partNo}</td>
        <td>${data.qty}</td>
      `;
      tempDataTable.appendChild(row);
    });
  }

  // Handle final form submission
  document.getElementById('data-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const branch = document.getElementById('branch').value;
    const dateTime = document.getElementById('date-time').value;
    const referenceNo = document.getElementById('reference-no').value;

    if (tempDataArray.length === 0) {
      alert('Please add at least one entry to the table.');
      return;
    }

    // Construct HTML table for email with all the captured data
    let emailBody = `
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Reference No</th>
            <th>Date & Time</th>
            <th>Branch Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${referenceNo}</td>
            <td>${dateTime}</td>
            <td>${branch}</td>
          </tr>
        </tbody>
      </table><br>
      <h3>Captured Data:</h3>
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Location</th>
            <th>Part No</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
    `;

    // Add all captured entries to the email table
    tempDataArray.forEach((data) => {
      emailBody += `
        <tr>
          <td>${data.location}</td>
          <td>${data.partNo}</td>
          <td>${data.qty}</td>
        </tr>
      `;
    });

    emailBody += '</tbody></table>';

    // Send email using EmailJS
    const emailParams = {
      to_email: 'your_email@example.com', // Replace with your actual email
      message_html: emailBody // Pass the HTML table as the email content
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      }, (error) => {
        console.log('Failed to send email:', error);
      });

    // Reset
