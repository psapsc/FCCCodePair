function formControl (id){
  element = document.getElementById(id);
  if(id === "signup" && !element.classList.contains('clicked')){
    document.getElementById('signin').style.display = "none";
    element.classList.add("clicked");
    document.getElementById('signon').style.top = "calc(50% - 145px);";
    document.getElementById('signupForm').style.opacity = '1';
    document.getElementById('signupForm').style.height = 'auto';
  }
  else if(id === "signup" && element.classList.contains('clicked')){
    document.getElementById('signin').style.display = "inline";
    element.classList.remove('clicked');
    document.getElementById('signon').style.marginTop = "-100px";
    document.getElementById('signupForm').style.display = 'none';
  }

  if(id === "signin" && !element.classList.contains('clicked')){
    document.getElementById('signup').style.display = "none";
    element.classList.add("clicked");
    document.getElementById('signon').style.marginTop = "-145px";
    document.getElementById('signinForm').style.display = 'inline';
  }
  else if(id === "signin" && element.classList.contains('clicked')){
    document.getElementById('signup').style.display = "inline";
    element.classList.remove('clicked');
    document.getElementById('signon').style.marginTop = "-100px";
    document.getElementById('signinForm').style.display = 'none';
  }
}
