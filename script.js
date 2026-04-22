// LOGIN
function login(){

  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  if(name && email.includes("@gmail.com")){

    const user = {name,email};
    localStorage.setItem("user", JSON.stringify(user));

    startApp();

  } else {
    alert("Enter valid Gmail");
  }
}

// START APP
function startApp(){

  const user = JSON.parse(localStorage.getItem("user"));

  document.getElementById("login").style.display="none";
  document.getElementById("app").style.display="block";

  document.getElementById("user").innerText = user.name;
  document.getElementById("profileName").innerText = user.name;

  updateDashboard();
  showSection("home");
}

// NAVIGATION
function showSection(id){
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// LOGOUT
function logout(){
  localStorage.clear();
  location.reload();
}

// COURSE DATA
const courses = {
  c:{title:"C Programming",video:"https://www.youtube.com/embed/KJgsSFOSQv0",pdf:"https://share.google/zLBEbFSCijP8za2PK"},
  cpp:{title:"C++",video:"https://www.youtube.com/embed/vLnPwxZdW4Y",pdf:"https://share.google/r8Rva08ptKmaiy3CI"},
  java:{title:"Java",video:"https://www.youtube.com/embed/eIrMbAQSU34",pdf:"https://share.google/E8vKlV4A79CY7x7KR"},
  python:{title:"Python",video:"https://www.youtube.com/embed/_uQrJ0TkZlc",pdf:"https://share.google/ZxF0auirnJjfvIMcZ"},
  ai:{title:"AI",video:"https://www.youtube.com/embed/JMUxmLyrhSk",pdf:"https://share.google/6W6dt79YTyboMsxrm"},
  web:{title:"Full Stack",video:"https://www.youtube.com/embed/3JluqTojuME",pdf:"https://share.google/6DFPawTiVE51n7LQG"}
};

let currentCourse="";

// LOAD COURSE
function loadCourse(c){
  currentCourse=c;

  document.getElementById("courseTitle").innerText=courses[c].title;

  document.getElementById("enrollBox").style.display="block";
  document.getElementById("content").style.display="none";

  showSection("coursePlayer");
}

// ENROLL
function enrollCourse(){

  document.getElementById("video").src=courses[currentCourse].video;
  document.getElementById("pdf").href=courses[currentCourse].pdf;

  document.getElementById("enrollBox").style.display="none";
  document.getElementById("content").style.display="block";

  localStorage.setItem(currentCourse,"Completed");
  updateDashboard();
}

// BACK
function goBack(){
  document.getElementById("video").src="";
  showSection("courses");
}

// DASHBOARD
function updateDashboard(){
  ["c","cpp","java","python","ai","web"].forEach(x=>{
    let el=document.getElementById(x);
    if(el){
      el.innerText=localStorage.getItem(x)||"Not Started";
    }
  });
}

// AUTO LOAD
window.onload=function(){
  if(localStorage.getItem("user")){
    startApp();
  }
};