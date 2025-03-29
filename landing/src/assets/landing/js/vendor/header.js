window.onscroll = function() {
    var navbar = document.getElementById("mainNav");
    if (document.body.scrollTop >= 300 || document.documentElement.scrollTop >= 300) {
      navbar.classList.add("fixed");
    } else {
      navbar.classList.remove("fixed");
    }
  };
  
