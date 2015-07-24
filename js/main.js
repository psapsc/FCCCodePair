function formControl (id){
  element = document.getElementById(id);
  if(id === "signup"){
    document.getElementById('signin').style.display = "none";
    element.classList.add("clicked");
    document.getElementById('signon').style.top = "calc(50% - 145px);";
    document.getElementById('signupForm').style.opacity = '1';
    document.getElementById('signupForm').style.height = 'auto';
  }
  if(id === "signup" && element.classList.contains('clicked')){
    document.getElementById('signin').style.display = "none";
    element.classList.remove('clicked');
  }
}
