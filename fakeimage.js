function rawurlencode(str) {
    str = (str + '').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
}

$('button').click(function () {
    var height = $('#height').val();
    var width = $('#width').val();

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" height="' + height + '" width="' + width + '">';
    svg += '<rect height="' + height + '" width="' + width + '" style="fill: #ccc"/>';
    svg += '<text x="50%" y="50%" style="dominant-baseline: central; text-anchor: middle; fill: #777; font-weight: bold; font-family: Helvetica, monospace; font-size: 12pt">' + width + 'x' + height + '</text>\n';
    svg += '</svg>';

    var encode = 'data:image/svg+xml;charset=UTF-8,' + rawurlencode(svg);
    $('form').append(svg);
    $('#image').attr('src', encode);
    $('#result').val(encode);

    return false;
});
