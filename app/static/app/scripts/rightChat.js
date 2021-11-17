var accr = document.getElementsByClassName("rightAccordion");
var j;
var o = 140;

for (j = 0; j < accr.length; j++) {
    accr[j].addEventListener("click", function () {
        this.classList.toggle("rightActive");
        console.log("this button", this);
        var arrow = this.getElementsByClassName('arrow-icon')[0];
        $(arrow).toggleClass('la-angle-up la-angle-down');
        var rightPanel = this.nextElementSibling;
        if (rightPanel.style.maxHeight) {
            rightPanel.style.maxHeight = null;
        } else {
            rightPanel.style.maxHeight = o + "px";
        }
    });
}