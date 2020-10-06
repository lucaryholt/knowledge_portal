function toggleDark(){
    const button = $('#color-mode');
    button.html('<i class="fas fa-sun"></i>');
    button.attr('onclick', 'toggleLight()');
    $('#style').attr('href', 'style/style-dark.css');
    $('#code-style').attr('href', '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.2.1/build/styles/gruvbox-light.min.css');
}

function toggleLight(){
    const button = $('#color-mode');
    button.html('<i class="fas fa-moon"></i>');
    button.attr('onclick', 'toggleDark()');
    $('#style').attr('href', 'style/style-light.css');
    $('#code-style').attr('href', '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.2.1/build/styles/gruvbox-dark.min.css');
}