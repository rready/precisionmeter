$(document).ready(function () {
    $('#meterReportGrid tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" style="width:45px" placeholder="Search ' + title + '" />');
    });
    var selectedMeterBatch;
    //var name;
    //$('#meterReportGrid').append('<caption style="caption-side: bottom">PRECISION METER</caption>');
    var meterReportTable = $("#meterReportGrid").DataTable({
        "processing": true, // for show progress bar  
        "filter": true, // this is for disable filter (search box)  
        "orderMulti": false, // for disable multiple column at once  
        "responsive": true,
        "deferRender": true,
        "order": [[2, "asc"]],
        "ajax": {
            "url": "/vw_batchMeterReport/GetMeterList",
            "type": "POST",
            "datatype": "json",
            "dataSrc": ''
        },
        "columnDefs":
            [
                {
                    "targets": [0],
                    "visible": true,
                    "searchable": false,
                    "width":"10px;"

                },
                {
                    "width": "10px",
                    "searchable": true,
                    "targets": 1
                },
                {
                    "width": "20px",
                    "searchable": true,
                    "targets":2
                },
                {
                    "targets": [12],
                    "visible": true,
                    "searchable": false
                },
                {
                    "targets": [13],
                    "visible": true,
                    "searchable": false
                },
                {
                    "targets": [14],
                    "visible": true,
                    "searchable": false
                },
                {
                    "render": function (data, type, row) {
                        var rowvalue = row["Pdate"];
                        return (moment(rowvalue).format("MM/DD/YYYY"));
                    },
                    "targets": 11

                }],
        "columns": [
            { "data": null, "defaultContent": '',"width":"10px" },
            { "data": "Batchno", "title": "Batch", "name": "Batchno", "width": "10px" },
            { "data": "Company", "title": "CO#", "name": "Company", "autoWidth": true },
            { "data": "mfgnum", "title": "MFG#", "name": "mfgnum", "autoWidth": true },
            { "data": "Mfgsize", "title": "MFG Size", "name": "Mfgsize", "autoWidth": true },
            { "data": "Afpopen", "title": "AFP Open", "name": "Afpopen", "autoWidth": true },
            { "data": "Afpcheck", "title": "AFP Check", "name": "Afpcheck", "autoWidth": true },
            { "data": "Afperro", "title": "AFP Error", "name": "Afperro", "autoWidth": true },
            { "data": "Alopen", "title": "ALP Open", "name": "Alopen", "autoWidth": true },
            { "data": "Alcheck", "title": "ALP Check", "name": "Alcheck", "autoWidth": true },
            { "data": "Alerror", "title": "ALP Error", "name": "Alerror", "autoWidth": true },
            { "data": "Pdate", "title": "By Date", "name": "Pdate", "type": "date", "autoWidth": true },
            { "data": "Rft", "title": "For Test", "name": "Rft", "autoWidth": true },
            { "data": "Irbt", "title": "Before", "name": "Irbt", "autoWidth": true },
            { "data": "Irat", "title": "After", "name": "Irat", "autoWidth": true },
            { "data": "Remarks", "title": "Remarks", "name": "Remarks", "autoWidth": true }
        ],
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'pdf',
                header: true,
                orientation: 'landscape',
                pageSize: 'LEGAL',
                title: 'PRECISION METER REPAIR, INC.' + '\n' + '4410 Airport Road' + '\n' + 'Plant City, Fl',
                //messageTop: 'Plant City, Fl',
                filename: function () {
                    var date = new Date();
                    var d = myFunction(date);
                    var name = meterReportTable.buttons.exportData();
                    var batch = name.body[0][0];
                    var co = name.body[0][1];
                    return batch + "_" + co + "_" + d;
                },
                customize: function (doc) {
                    doc['footer'] = (function (page, pages) {
                        return {
                            columns: [
                                '',
                                {
                                    alignment: 'right',
                                    text: [
                                        { text: page.toString(), italics: true },
                                        ' of ',
                                        { text: pages.toString(), italics: true }
                                    ]
                                }
                            ],
                            margin: [10, 0]
                        }
                    });
                }
            },
            {
                extend: 'excel',
                //header: true,
                title: 'PRECISION METER REPAIR, INC.' + '\n' + '4410 Airport Road' + '\n' + 'Plant City, Fl',
                //messageTop:'Plant City, Fl',
                orientation: 'landscape',
                pageSize: 'LEGAL',
                filename: function () {
                    var date = new Date();
                    var d = myFunction(date);
                    var name = meterReportTable.buttons.exportData();
                    var batch = name.body[0][0];
                    var co = name.body[0][1];
                    return batch + "_" + co + "_" + d;
                }
            },
            {
                extend: 'print'
                //orientation: 'landscape',
                //pageSize:'LEGAL'
            }
        ],
        'rowCallback': function (row, data, index) {
            if (data.Afperro < 0) {
                $(row).find('td:eq(7)').css('color', 'white');
                $(row).find('td:eq(7)').css('background-color', '#ce0815');

            } else {
                $(row).find('td:eq(7)').css('color', 'white');
                $(row).find('td:eq(7)').css('background-color', '#0aa504');

            }
            if (data.Alperro < 0) {
                $(row).find('td:eq(10)').css('color', 'white');
                $(row).find('td:eq(10)').css('background-color', '#ce0815');
            } else {
                $(row).find('td:eq(10)').css('color', 'white');
                $(row).find('td:eq(10)').css('background-color', '#0aa504');
            }

            //var info = this.api.page.info();
            var info = meterReportTable.page.info();
            var page = info.page;
            var length = info.length;
            index = (page * length + (index + 1));
            $('td:eq(0)', row).html(index);
            //if (data[2].toUpperCase() == 'EE') {
            //    $(row).find('td:eq(2)').css('color', 'blue');
            //}
        }

    });

    $('#meterReportGrid tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            meterReportTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            var idx = meterReportTable.cell('.selected', 0).index();
            var data = meterReportTable.row(idx.row).data();
            selectedMeterBatch = data.Batchno;
            //Session("Batchno") = data.Batchno;
            //HttpContext.Current.Session["CurrentUser"] = data.Batchno;
        }
    });

    //$('#column1_search').on('keyup', function () {
    //    meterReportTable
    //        .columns(1)
    //        .search(this.value)
    //        .draw();
    //});


    //100.4 on open  99.4 on check   Take 100.4 x .25 = 25.1   99.4 x .75 = 74.55  
    //Take 25.1 + 74.55 =  99.65 - 100 = +.35 is to be shown in 
    var openCal = $("#Afpopen").val();
    var checkCal = $("#Afpcheck").val();
    var Cal2 = openCal * .25;
    var Cal3 = checkCal * .75;
    var Cal4 = Cal2 + Cal3;
    var Cal5 = Cal4 - 100;
    var prepender = "";
    $("#Afperro").val(Cal5);

    $("#Afpopen").blur(function () {
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
            prepender = "-";
        } else {
            $("#Afperro").css({ 'background-color': '#0aa504' });
            $("#Afperro").css('color', 'white');
            prepender = "+";
        } $("#Afperro").val(prepender + FinalNumber);
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
            prepender = "-";
        } else {
            $("#Afperro").css({ 'background-color': '#0aa504' });
            $("#Afperro").css('color', 'white');
            prepender = "+";
        }
        $("#Afperro").val(prepender + FinalNumber);
    });

    $('#meterGrid tbody').on('click', 'input[type="checkbox"]', function (e) {
        var $row = $(this).closest('tr');

        var data = table.row($row).data();
        var key = data[1];

        if (this.checked) {
            $row.addClass('selected');
            rows_selected[key] = data;
        } else {
            $row.removeClass('selected');
            delete rows_selected[key];
        }
        // selectedBatch = data.Batchno;
        e.stopPropagation();
    });

    //$("#selectedFile").on('click', function () {

    //});

    $(document).on('click', '#selectedFile', function () {
        $.ajax({
            "url": "/vw_batchMeterReport/GetExportedFiles",
            "type": "POST",
            "success": function (data) {

            }
        });
    });

    $("#meterReportGrid").on("click", "tr", function () {
        var $name = $(this).children(":first").text();
    });

    $(document).on('click', '#ShowReport', function () {

        $.ajax({
            "url": "/vw_batchMeterReport/ExportToPDF",
            "type": "POST",
            //"data": {custid: }
            "success": function (data) {

            }
        });
    });



    $(document).on('click', '#showFiles', function () {
        //$("#meterGrid").tableExport({ type: 'pdf', escape: 'false', tableName: 'meterGrid' });
        //$('#meterGrid').tableExport({
        //    type: 'pdf',
        //    jspdf: {
        //        orientation: 'l',
        //        margins: { left: 20, top: 10 },
        //        autotable: false
        //    }
        //});
    });

    function myFunction(date) {
        var today = date;
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            ;
            mm = '0' + mm;
        }

        today = mm + '/' + dd + '/' + yyyy;
        return today;

    }

    meterReportTable.on('order.dt search.dt', function () {
        meterReportTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();


    //meterReportTable.columns('.select-filter').every(function () {
    //    var that = this;

    //    // Create the select list and search operation
    //    var select = $('<select />')
    //        .appendTo(
    //            this.footer()
    //        )
    //        .on('change', function () {
    //            that
    //                .search($(this).val())
    //                .draw();
    //        });

    //    // Get the search data for the first column and add to the select list
    //    this
    //        .cache('search')
    //        .sort()
    //        .unique()
    //        .each(function (d) {
    //            select.append($('<option value="' + d + '">' + d + '</option>'));
    //        });
    //});

    meterReportTable.columns().every(function () {
        var that = this;

        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });


   
    //========================================================================================

});