$(document).ready(function(){

    let noAvatar = false;
  
  
  let profileImg = $('#profile-pic')
  
  // double check how to access "src" attribute
  if (!profileImg.attr('src')) {
  
    var username = profileImage.data('username');
    //var intial = JSON.stringify(username);
    var profileImage = profileImg.text(username.charAt(0));
  
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    
    let bgAvatar = {{user.bgColor}};
    if (bgAvatar){
       profileImg.style.backgroundColor = bgAvatar
    }
    else {
      //in db save value like 00ff00
      <form id="background-post" method="post">
          <input type="text" value="bgColor"></input>
      </form>
      document.getElementById("background-post").submit();
      profileImg.style.backgroundColor = bgColor
    }
  
  
  }
  
  
  });