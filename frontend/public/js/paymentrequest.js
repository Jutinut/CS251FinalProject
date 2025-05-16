async function fetchRequests() {
    try {
        const CustID = sessionStorage.getItem("userID");
        if (!CustID) {
            throw new Error("Customer not found orders.");
        }
        const queryURL = `http://localhost:3000/orderuser/${CustID}`;
        console.log(`Query URL: ${queryURL}`);

        const response = await fetch(queryURL);
        if (!response.ok) throw new Error("Failed to fetch data");

        let data = await response.json();
        console.log("Data fetched:", data);

        const complaintContainer = document.getElementById("paymentheader");
        if (!complaintContainer) throw new Error("Complaint container element not found");

        complaintContainer.innerHTML = "";

        if (!Array.isArray(data)) {
            data = [data];
        }

        if (data.length === 0) {
            complaintContainer.innerHTML = "<p>No orders found</p>";
            return;
        }
        
        const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        sortedData.forEach((request) => {
            const item = document.createElement("div");
            item.classList.add("payment");

            item.innerHTML = `
                <div class="payment-box">
      <h2>Payment</h2>
      <img src="img/QR_code.png" alt="QR Code" class="qr-image">
      <p class="tracking-code" id="tracking-code">${request.ParcelID}</p>
      <p class="amount" id="amount">XX Bath</p>
      <div class="upload-box">
        <input type="file" id="fileUpload" hidden onchange="displayFileName()">
        <label for="fileUpload" class="upload-label">Add a file <span>+</span></label>
        <div id="fileName" class="file-name"></div>
      </div>
      <button class="confirm-btn" onclick="confirmPayment()">Confirm</button>
    </div>`;
            complaintContainer.appendChild(item);
        });
    } catch (error) {
        console.error("Error fetching requests:", error);
        const complaintContainer = document.getElementById("paymentheader");
        if (complaintContainer) {
            complaintContainer.innerHTML = `<p style = "font-size: 18px; font-weight: bold;">Not found any orders.</p>`;
        }
    }
}

window.onload = fetchRequests;
