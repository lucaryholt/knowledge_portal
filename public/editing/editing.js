function livePreview(){
    const input = $('#body-input');
    const preview = $('#body-tester');

    preview.html(input.val());
}

livePreview();