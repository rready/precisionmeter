﻿$(document).ready(function () {

    var batchid = $("#BatchNo").val();

    var mTable = $("#meters").DataTable({
        "processing": true, // for show progress bar
        //"serverSide": true, // for process server side
        "filter": true, // this is for disable filter (search box)
        "orderMulti": false, // for disable multiple column at once
        //"scrollY": "530px",
        //"scrollX": true,
        //"scrollCollapse": true,
        "responsive": true,
        "deferRender": true,
        "order": [[2, "asc"]],
        "ajax": {
            "url": "/Batches/GetBatchMeters?batchno=" + batchid,
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
                "targets": 9

            }],
        "columns": [
            { "data": "sysid", "name": "sysid", "autoWidth": true },
            { "data": "Batchno", "name": "Batchno", "autoWidth": true },
            { "data": "Company", "name": "Company", "autoWidth": true },
            //{ "data": "mfgnum", "title": "mfgnum", "name": "mfgnum", "autoWidth": true },
            //{ "data": "conum", "title": "conum", "name": "conum", "autoWidth": true },
            //{ "data": "conumandmfgnum", "title": "conumandmfgnum", "name": "conumandmfgnum", "autoWidth": true },
            { "data": "Mfgsize", "title": "MFG Size", "name": "Mfgsize", "autoWidth": true },
            { "data": "Afpopen", "title": "AFP Open", "name": "Afpopen", "autoWidth": true },
            { "data": "Afpcheck", "title": "AFP Check", "name": "Afpcheck", "autoWidth": true },
            { "data": "Afperro", "title": "AFP Error", "name": "Afperro", "autoWidth": true },
            //{ "data": "TextMessage1", "title": "TextMessage", "name": "TextMessage", "autoWidth": true },
            //{ "data": "Message1", "title": "Message", "name": "Message1", "autoWidth": true },
            { "data": "Alopen", "title": "AL Open", "name": "Alopen", "autoWidth": true },
            { "data": "Alcheck", "title": "AL Check", "name": "Alcheck", "autoWidth": true },
            { "data": "Alerror", "title": "AL Error", "name": "Alerror", "autoWidth": true },
            { "data": "Pdate", "title": "Pdate", "name": "Pdate", "autoWidth": true },
            //{ "data": "Textmessage2", "title": "TextMessage2", "name": "Textmessage2", "autoWidth": true },
            //{ "data": "Message2", "title": "Message2", "name": "Message2", "autoWidth": true },
            //{ "data": "Pby", "title": "Pby", "name": "Pby", "autoWidth": true },
            //{ "data": "Rft", "title": "Rft", "name": "Rft", "autoWidth": true },
            //{ "data": "Irat", "title": "Irat", "name": "Irat", "autoWidth": true },
            //{ "data": "Irbt", "title": "Irbt", "name": "Irbt", "autoWidth": true },
            //{ "data": "Remarks", "title": "Remarks", "name": "Remarks", "autoWidth": true },
            //{ "data": "Statue", "title": "Statue", "name": "Statue", "autoWidth": true },

            {
                "render": function (data, type, full, meta) { return '<a class="btn btn-info" href="/Repairs/Edit/' + full.sysid + '">Edit</a>'; }
            },
            {
                "render": function (data, type, full, meta) { return '<a class="btn btn-info" href="/Repairs/Delete/' + full.sysid + '">Delete</a>'; }
            }

        ],
        "dom": '<"topcustom"lfr>t<"bottomcustom"ip>',
        'rowCallback': function (row, data, index) {
            if (data.Afperro < 0) {
                $(row).find('td:eq(5)').css('color', 'red');
            } else {
                $(row).find('td:eq(5)').css('color', '#179b06');
            }
            //if (data[2].toUpperCase() == 'EE') {
            //    $(row).find('td:eq(2)').css('color', 'blue');
            //}
        }
    });
});
            //$('#meter tbody').on('click', 'tr', function () {
            //    if ($(this).hasClass('selected')) {
            //        $(this).removeClass('selected');
            //    }
            //    else {
            //        meterTable.$('tr.selected').removeClass('selected');
            //        $(this).addClass('selected');
            //        var idx = meterTable.cell('.selected', 0).index();
            //        var data = meterTable.row(idx.row).data();
            //    }
            //});