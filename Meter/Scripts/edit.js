$(document).ready(function () {
    computeAFTopen();
 
    $("#Afpopen").blur(function () {
        computeAfTopen();
     });

    $("#Afpcheck").blur(function () {
        computeAFTopen();

    });


    function computeAFTopen() {
        var openCal = $("#Afpopen").val();
        var checkCal = $("#Afpcheck").val();
        var Cal2 = openCal * .25;
        var Cal3 = checkCal * .75;
        var Cal4 = Cal2 + Cal3;
        var Cal5 = Cal4 - 100;
        var FinalNumber = Math.round(Cal5 * 100) / 100;
        if (FinalNumber < 0) {
            $("#Afperro").css({ 'background-color': '#ce0815' });
            $("#Afperro").css('color', 'white');
        } else {
            $("#Afperro").css({ 'background-color': '#0aa504' });
            $("#Afperro").css('color', 'black');
        }
        $("#Afperro").val(FinalNumber);
    }

});