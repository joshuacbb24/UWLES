var accl = document.getElementsByClassName("leftAccordion");
var i;


for (i = 0; i < accl.length; i++) {
  accl[i].addEventListener("click", function() {
    this.classList.toggle("leftActive");
    var leftPanel = this.nextElementSibling;
    if (leftPanel.style.maxHeight) {
      leftPanel.style.maxHeight = null;
    } else {
      leftPanel.style.maxHeight = leftPanel.scrollHeight + "px";
    } 
  });
}

