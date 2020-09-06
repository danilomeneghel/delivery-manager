$(document).ready(function () {
    var error = location.search.split('error=')[1];

    if(error) {
        $("#contents div:nth-child(2)").show();
        $(".tabs div:nth-child(2)").addClass("selected");
        $("#msg").text(decodeURI(error)).addClass("alert alert-danger");
    } else {
        $("#contents div:first").show();
        $(".tabs div:first").addClass("selected");
    }

    $(".tab").click(function () {
        $(".tab").removeClass("selected");
        $(this).addClass("selected");
        var indice = $(this).index();
        indice++;
        $("#contents .content").hide();
        $("#contents .content:nth-child(" + indice + ")").show();
    });

    $(".tab").hover(
        function () { $(this).addClass("active") },
        function () { $(this).removeClass("active") }
    );
});