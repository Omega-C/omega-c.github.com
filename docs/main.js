console.log("Hey!\nGlad you're looking at the elements and such, but I would prefer if ya didn't.\nThanks!\n\n-S");

function textUser(text) {
	let txt=document.createElement("p")
	txt.className="textUser"
	txt.innerHTML=text.replace(/\n/g, "<br/>").replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
	document.getElementsByName("output")[0].appendChild(txt)
}
function textResp(text) {
	let txt=document.createElement("p")
	txt.className="textResp"
	txt.innerHTML=text.replace(/\n/g, "<br/>").replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
	document.getElementsByName("output")[0].appendChild(txt)
}
function callAPI() {
	sId=document.getElementsByName("session_id")[0].value;
	uName=document.getElementsByName("user_name")[0].value;
	bName=document.getElementsByName("bot_name")[0].value;
	text=document.getElementsByName("message")[0].value;
	textUser(text)
	return false
	$.getJSON(`/api?session=${encodeURIComponent(sId)}&text=${encodeURIComponent(text)}&from=${encodeURIComponent(uName)}&responder=${encodeURIComponent(bName)}`).done(function(data){
		docdat=document.getElementsByName("output")[0].value+`${uName}: ${text}\n--------\n${data["From"]}: ${data["Text"]}\n--------\n`
		document.getElementsByName("output")[0].value=docdat
	})
	return false;
}
function goBack() {
	return false
	sId=document.getElementsByName("session_id")[0].value;
	$.getJSON(`/api?session=${encodeURIComponent(sId)}&back=true`).done(function(data){})
	docdat=document.getElementsByName("output")[0].value.split("\n--------\n").slice(0,-2).join("\n--------\n")
	if (docdat!=""){
		docdat+="\n--------\n"
	}
	document.getElementsByName("output")[0].value=docdat
}
function save() {
	return false
	sId=document.getElementsByName("session_id")[0].value
	saveName=document.getElementsByName("saveName")[0].value
	$.getJSON(`/api?session=${encodeURIComponent(sId)}&save=${saveName}`).done(function(data){})
	let a=document.createElement("a")
	a.href=`/files/database/${saveName}.conversation`
	a.download=`${saveName}.conversation`
	a.style="display: none;"
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
}
function toggleMenu(){
	elem=document.getElementById("details")
	if (elem.style.display=="none") {
		elem.style.display="inline-block"
	}
	else {
		elem.style.display="none"
	}
}