var selectedBatch;

var meterTable = $("#meterGrid").DataTable({
    "processing": true, // for show progress bar  
    //"serverSide": true, // for process server side  
    "filter": true, // this is for disable filter (search box)  
    "orderMulti": false, // for disable multiple column at once  
    "responsive": true,
    "deferRender": true,
    "order": [[1, "desc"]],
    "ajax": {
        "url": "/Repairs/GetMeterList",
        "type": "POST",
        "datatype": "json",
        "dataSrc": ''
    },
    "columnDefs":
         [{
            "targets": [0],
            "visible": false,
            "searchable": false,
            "select": true,
        },
        {
            "render": function (data, type, row) {
                var rowvalue = row["Pdate"];
                return (moment(rowvalue).format("MM/DD/YYYY"));
            },
            "targets": 7

        }],
    "columns": [
        { "data": "sysid", "name": "sysid", "autoWidth": true },
        { "data": "Batchno", "name": "Batchno", "autoWidth": true },
        { "data": "Company", "title":"Company","name": "Company", "autoWidth": true },
        //{ "data": "mfgnum", "title": "mfgnum", "name": "mfgnum", "autoWidth": true },
        //{ "data": "conum", "title": "conum", "name": "conum", "autoWidth": true },
        //{ "data": "conumandmfgnum", "title": "conumandmfgnum", "name": "conumandmfgnum", "autoWidth": true },
        { "data": "Mfgsize", "title": "MFG<br>Size", "name": "Mfgsize", "autoWidth": true },
        { "data": "Afpopen", "title": "As Found<br>(Open)", "name": "Afpopen", "autoWidth": true },
        { "data": "Afpcheck", "title": "As Found<br>(Check)", "name": "Afpcheck", "autoWidth": true },
        { "data": "Afperro", "title": "As Found<br>(Error)", "name": "Afperro", "autoWidth": true },
        //{ "data": "TextMessage1", "title": "TextMessage", "name": "TextMessage", "autoWidth": true },
        //{ "data": "Message1", "title": "Message", "name": "Message1", "autoWidth": true },
        //{ "data": "Alopen", "title": "AL Open", "name": "Alopen", "autoWidth": true },
        //{ "data": "Alcheck", "title": "AL Check", "name": "Alcheck", "autoWidth": true },
        //{ "data": "Alerror", "title": "AL Error", "name": "Alerror", "autoWidth": true },
        { "data": "Pdate", "title": "Proved<br>Date", "name": "Pdate", "autoWidth": true },
        //{ "data": "Textmessage2", "title": "TextMessage2", "name": "Textmessage2", "autoWidth": true },
        //{ "data": "Message2", "title": "Message2", "name": "Message2", "autoWidth": true },
        //{ "data": "Pby", "title": "Pby", "name": "Pby", "autoWidth": true },
        //{ "data": "Rft", "title": "Rft", "name": "Rft", "autoWidth": true },
        //{ "data": "Irat", "title": "Irat", "name": "Irat", "autoWidth": true },
        //{ "data": "Irbt", "title": "Irbt", "name": "Irbt", "autoWidth": true },
        //{ "data": "Remarks", "title": "Remarks", "name": "Remarks", "autoWidth": true },
        //{ "data": "Statue", "title": "Status", "name": "Statue", "autoWidth": true },

        {
            "render": function (data, type, full, meta) { return '<a class="btn btn-info" href="/Repairs/Edit/' + full.sysid + '">Edit</a>'; }
        },
        {
            "render": function (data, type, full, meta) { return '<a class="btn btn-info" href="/Repairs/Delete/' + full.sysid + '">Delete</a>'; }
        }

    ],
    'rowCallback': function (row, data, index) {
        if (data.Afperro < 0) {
            $(row).find('td:eq(5)').css('color', 'white');
            $(row).find('td:eq(5)').css('background-color', '#ce0815');
        
        } else {
            $(row).find('td:eq(5)').css('color', 'black');
            $(row).find('td:eq(5)').css('background-color', '#0aa504');
        

        }
        //if (data[2].toUpperCase() == 'EE') {
        //    $(row).find('td:eq(2)').css('color', 'blue');
        //}
    }
});  

$('#meterGrid tbody').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
         $(this).removeClass('selected');
    }
    else {
        meterTable.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        var idx = meterTable.cell('.selected', 0).index();
        var data = meterTable.row(idx.row).data();
        selectedBatch = data.Batchno;
        //Session("Batchno") = data.Batchno;
        //HttpContext.Current.Session["CurrentUser"] = data.Batchno;
    }
});


//100.4 on open  99.4 on check   Take 100.4 x .25 = 25.1   99.4 x .75 = 74.55  
//Take 25.1 + 74.55 =  99.65 - 100 = +.35 is to be shown in 
var openCal = $("#Afpopen").val();
var checkCal = $("#Afpcheck").val();
var Cal2 = openCal * .25;
var Cal3 = checkCal * .75;
var Cal4 = Cal2 + Cal3;
var Cal5 = Cal4 - 100

$("#Afperro").val(Cal5);

$("#Afpopen").blur(function () {
    var openCal = $("#Afpopen").val();
    var checkCal = $("#Afpcheck").val();
    var Cal2 = openCal * .25;
    var Cal3 = checkCal * .75;
    var Cal4 = Cal2 + Cal3;
    var Cal5 = Cal4 - 100
    var FinalNumber = Math.round(Cal5 * 100) / 100;
    if (FinalNumber < 0) {
        $("#Afperro").css({ 'background-color': '#ce0815' });
        $("#Afperro").css('color', 'white');
    } else {
        $("#Afperro").css({ 'background-color': '#0aa504' });
        $("#Afperro").css('color', 'black');
    }
    $("#Afperro").val(FinalNumber);
});

$("#Afpcheck").blur(function () {
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
});

$('#meterGrid tbody').on('click', 'input[type="checkbox"]', function(e) {
        var $row = $(this).closest('tr');

        var data = table.row($row).data();
        var key = data[1];

        if(this.checked){
            $row.addClass('selected');
            rows_selected[key] = data;
        } else {
            $row.removeClass('selected');
            delete rows_selected[key];
        }
       // selectedBatch = data.Batchno;
        e.stopPropagation();
});


$("#createmeter").on('click', function () {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: "/Repairs/Create",
        //data: JSON.stringify(selectedBatch),
        data: { id: selectedBatch},
        dataType: "json",
        success: function (data) {
            window.open("/Repairs/Create");
        },
        error: function (xhr) {
            alert(xhr);
        }
    });


    //$.ajax({
    //    url: '/RepairsController/Create',
    //    dataType: "json",
    //    type: "Get",
    //    cache: false,
    //    data: { id: selectedBatch },
    //    success: function (data) {
    //        if (data.success) {
    //            alert(data.message);
    //        }
    //    },
    //    error: function (xhr) {
    //        alert(xhr.responseText);
    //    }
    //});
    //alert("clicked " + selectedBatch);
});









