function formControl (id){
  element = document.getElementById(id);
  if(id === "signup"){
    document.getElementById('signin').style.display = "none";
    element.classList.add("clicked");
    document.getElementById('signon').style.marginTop = "-145px";
    document.getElementById('signupForm').style.display = 'inline';
  }
  if(id === "signup" && element.classList.contains('clicked')){
    document.getElementById('signin').style.display = "none";
    element.classList.remove('clicked');
  }
}
