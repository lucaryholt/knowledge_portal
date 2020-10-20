const list = $('#content-list');
const toggle = $('#note-content-collapse-toggle');
let contentListCollapsed = true;
list.hide();

function toggleContentListCollapse() {
    if(contentListCollapsed){
        toggle.html('<i class="fas fa-chevron-up"></i>');
        list.show();
        contentListCollapsed = false;
    } else {
        toggle.html('<i class="fas fa-chevron-down"></i>');
        list.hide();
        contentListCollapsed = true;
    }
}