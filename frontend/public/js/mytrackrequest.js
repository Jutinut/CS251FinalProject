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

        const complaintContainer = document.getElementById("tracking-container");
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
            item.classList.add("tracking-box");

            item.innerHTML = `
                <div class="tracking-header">
                    <div class="parcel-icon">
                        <img src="img/package.png" alt="Package">
                    </div>
                    <div class="parcel-id">
                        <h2>${request.ParcelID}</h2>
                        <p>On the way - 24 MAY</p>
                    </div>
                </div>
                
                <div class="map-container">
                    <a href="https://maps.app.goo.gl/t13h8ETp1fcVFJJS7" target="_blank">
                        <img src="img/map_cs.png" alt="Tracking Map" class="tracking-map">
                    </a>
                </div>
                
                <div class="status-tracker">
                    <div class="status-line">
                        <div class="status-dot completed"></div>
                        <div class="status-dot completed"></div>
                        <div class="status-dot completed"></div>
                        <div class="status-dot"></div>
                    </div>
                    <div class="status-labels">
                        <div class="status-label">In the midst of verification</div>
                        <div class="status-label">Verify order</div>
                        <div class="status-label">Shipping</div>
                        <div class="status-label">Delivered</div>
                    </div>
                    <button class="delivered-button">Delivered</button>
                </div>`;

            complaintContainer.appendChild(item);
        });
    } catch (error) {
        console.error("Error fetching requests:", error);
        const complaintContainer = document.getElementById("tracking-container");
        if (complaintContainer) {
            complaintContainer.innerHTML = `<p style = "font-size: 18px; font-weight: bold;">Not found any orders.</p>`;
        }
    }
}

window.onload = fetchRequests;
