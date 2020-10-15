const infoBox = $('#info-box');

infoBox.hide();
let hidden = true;

function toggleInfoBox(){
    if (hidden) {
        infoBox.show();
        hidden = false;
    } else {
        infoBox.hide();
        hidden = true;
    }
}