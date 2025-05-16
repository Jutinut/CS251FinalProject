/*   const parcelData = {
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
  }); */

async function fetchRequests() {
  try {
    const trackingInput = document.getElementById("tracking-number");
    const CustID = trackingInput.value.trim();
    if (!CustID) {
      throw new Error("กรุณาใส่หมายเลขพัสดุก่อนติดตาม");
    }

    const queryURL = `http://localhost:3000/order/${CustID}`;
    console.log(`Query URL: ${queryURL}`);

    const response = await fetch(queryURL);

    // หากสถานะตอบกลับเป็น 404 (ไม่พบข้อมูล)
    if (response.status === 404) {
      throw new Error(`❌ ไม่พบข้อมูลพัสดุ ${CustID}`);
    }

    if (!response.ok) throw new Error("ไม่สามารถดึงข้อมูลได้");

    let data = await response.json();
    console.log("Data fetched:", data);

    const complaintContainer = document.getElementById("trackbox");
    if (!complaintContainer) throw new Error("ไม่พบส่วนแสดงผล");

    complaintContainer.innerHTML = "";

    if (!Array.isArray(data)) {
      data = [data];
    }

    if (data.length === 0) {
      complaintContainer.innerHTML = "<p>ไม่พบคำสั่งซื้อ</p>";
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
    const complaintContainer = document.getElementById("trackbox");
    if (complaintContainer) {
      complaintContainer.innerHTML = `<p style="color: crimson; font-size: 18px; font-weight: bold;">${error.message}</p>`;
    }
  }
}
