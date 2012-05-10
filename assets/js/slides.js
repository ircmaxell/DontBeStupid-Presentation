(function($, Markdown) {
    var converter = new Markdown.Converter();
    
    $(function() {
        $('.markdown').each(function() {
            var txt = normalize($(this).text());
            
            $(this).html(converter.makeHtml(txt)).removeClass('markdown');
        });
    });
    
    function normalize(str) {
        var arr = str.replace("\r", "").split("\n");
        var minChars = str.length;
        var re1 = /^\s*/;
        var re2 = /^\s*$/;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == '' || re2.test(arr[i])) {
                arr[i] = '';  
            } else {
                arr[i] = arr[i].replace("\t", "    ");
                minChars=Math.min(re1.exec(arr[i])[0].length, minChars);
            }
        }
        var re3 = new RegExp('^\\\s{' + minChars + '}');
        for (i = 0; i < arr.length; i++) {
            arr[i] = arr[i].replace(re3, '');
        }
        return arr.join("\n");
    }
    
})(jQuery, Markdown);