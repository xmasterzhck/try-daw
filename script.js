// TOAST
function showToast(text){
    let t=document.getElementById("toast")
    t.textContent=text
    t.classList.add("show")
    setTimeout(()=>{ t.classList.remove("show") },3000)
}

// PAYOUT
function sendPayout(){
    let user=document.getElementById("username").value
    let amount=document.getElementById("amount").value
    if(!user || !amount){
        alert("Enter username and amount")
        return
    }
    showToast("Group funds sent! "+amount+" Robux paid to "+user)
    document.getElementById("username").value=""
    document.getElementById("amount").value=""
}
function clearFields(){
    document.getElementById("username").value=""
    document.getElementById("amount").value=""
}

// LIVE SEARCH DROPDOWN
let searchTimeout;
const searchInput = document.getElementById("searchInput");
const dropdown = document.getElementById("searchResultsDropdown");

searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    const query = searchInput.value.trim();
    if (!query) {
        dropdown.style.display = "none";
        dropdown.innerHTML = "";
        return;
    }

    searchTimeout = setTimeout(async () => {
        try {
            // Roblox API: usernames -> userId
            const response = await fetch("https://users.roblox.com/v1/usernames/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usernames: [query], excludeBannedUsers: false })
            });

            const data = await response.json();
            if (!data.data.length) {
                dropdown.style.display = "none";
                dropdown.innerHTML = "";
                return;
            }

            const userIds = data.data.map(u => u.id).join(",");
            const avatarResponse = await fetch(
                `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userIds}&size=48x48&format=Png`
            );
            const avatarData = await avatarResponse.json();

            let html = "";
            for (let i = 0; i < data.data.length; i++) {
                const user = data.data[i];
                const avatar = avatarData.data.find(a => a.targetId === user.id).imageUrl;
                html += `
                    <div class="userCard" onclick="selectUser('${user.name}')">
                        <img src="${avatar}">
                        <span class="username">${user.name}</span>
                    </div>
                `;
            }

            dropdown.innerHTML = html;
            dropdown.style.display = "block";

        } catch (err) {
            console.error(err);
        }
    }, 300);
});

// Fill search input when clicking a user
function selectUser(username) {
    searchInput.value = username;
    dropdown.style.display = "none";
}
