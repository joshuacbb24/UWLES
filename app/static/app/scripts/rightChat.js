var accr = document.getElementsByClassName("rightAccordion");
var j;

for (j = 0; j < accr.length; j++) {
    accr[j].addEventListener("click", function() {
      this.classList.toggle("rightActive");
      var rightPanel = this.nextElementSibling;
      if (rightPanel.style.maxHeight) {
        rightPanel.style.maxHeight = null;
      } else {
        rightPanel.style.maxHeight = rightPanel.scrollHeight + "px";
      } 
    });
  }