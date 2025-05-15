  const parcelData = {
    "PKG123": "📦 จัดส่งสำเร็จแล้ว",
    "PKG456": "🚚 ระหว่างขนส่ง",
    "PKG789": "⏳ รอจัดส่ง",
  };

  document.querySelector(".track-button").addEventListener("click", function () {
    const trackingInput = document.getElementById("tracking-number");
    const trackingNumber = trackingInput.value.trim().toUpperCase();
    const resultBox = document.getElementById("status-result");

    if (!trackingNumber) {
      resultBox.textContent = "⚠️ กรุณาใส่หมายเลขพัสดุก่อนติดตาม";
      resultBox.style.color = "orangered";
      return;
    }

    // ตรวจสอบหมายเลขในฐานข้อมูลจำลอง
    if (parcelData[trackingNumber]) {
      resultBox.textContent = parcelData[trackingNumber];
      resultBox.style.color = "green";
    } else {
      resultBox.textContent = "❌ ไม่พบข้อมูลพัสดุ " + trackingNumber;
      resultBox.style.color = "crimson";
    }
  });

async function fetchRequests() {
    try {
        const trackingInput = document.getElementById("tracking-number");
        const CustID = trackingInput.value.trim();
        if (!CustID) {
            throw new Error("Customer not found orders.");
        }
        const queryURL = `http://localhost:3000/order/${CustID}`;
        console.log(`Query URL: ${queryURL}`);

        const response = await fetch(queryURL);
        if (!response.ok) throw new Error("Failed to fetch data");

        let data = await response.json();
        console.log("Data fetched:", data);

        const complaintContainer = document.getElementById("trackbox");
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
            item.classList.add("track");

            item.innerHTML = `
                <table>
          <thead>
            <tr>
              <th scope="col">ParcelID</th>
              <th scope="col">Phone</th>
              <th scope="col">Name</th>
              <th scope="col">City</th>
              <th scope="col">Address</th>
              <th scope="col">Weight</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">${request.ParcelID}</th>
              <td>${request.Phone}</td>
              <td>${request.Name}</td>
              <td>${request.City}</td>
              <td>${request.Address}</td>
              <td>${request.Weight}</td>
              <td>${request.Status}</td>
            </tr>
          </tbody>
        </table>`;
            complaintContainer.appendChild(item);
        });
    } catch (error) {
        console.error("Error fetching requests:", error);
        const complaintContainer = document.getElementById("tracking-container");
        if (complaintContainer) {
            complaintContainer.innerHTML = `<p>Error loading requests. Please try again later.</p>`;
        }
    }
}