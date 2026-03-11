function showToast(text){

let t=document.getElementById("toast")
t.textContent=text

t.classList.add("show")

setTimeout(()=>{
t.classList.remove("show")
},3000)

}

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


async function searchUser(username){

try{

let userResponse = await fetch("https://users.roblox.com/v1/usernames/users",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
usernames:[username],
excludeBannedUsers:false
})
})

let userData = await userResponse.json()

if(!userData.data.length){
document.getElementById("result").innerHTML="User not found"
return
}

let userId = userData.data[0].id

let avatarResponse = await fetch(
`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png`
)

let avatarData = await avatarResponse.json()

let avatar = avatarData.data[0].imageUrl

document.getElementById("result").innerHTML = `
<img src="${avatar}" style="width:80px;border-radius:8px"><br>
<b>${username}</b>
`

}catch(err){
console.log(err)
}

}
