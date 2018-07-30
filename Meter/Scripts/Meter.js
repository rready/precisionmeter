
//$('#demoGrid').dataTable({
//    Select: true,
//    Processing: true,
//    "ajax": {
//        url: "/Repairs/GetMeterList",
//        datatype: "json",
//        type: "GET",
//        dataSrc: ''


//    },

//    "columns": [
//        { "data": "Sysid", "name": "Sysid", "autoWidth": true },
//        { "data": "Batchno", "name": "Batchno", "autoWidth": true },
//        { "data": "Custid", "name": "Custid", "autoWidth": true },
//        { "data": "mfgnum", "title": "mfgnum", "name": "mfgnum", "autoWidth": true },
//        { "data": "conum", "title": "conum", "name": "conum", "autoWidth": true },
//        { "data": "conumandmfgnum", "title": "conumandmfgnum", "name": "conumandmfgnum", "autoWidth": true },
//        { "data": "Mfgsize", "title": "MFG Size", "name": "Mfgsize", "autoWidth": true },
//        { "data": "Afpopen", "title": "AFP Open", "name": "Afpopen", "autoWidth": true },
//        { "data": "Afpcheck", "title": "AFP Check", "name": "Afpcheck", "autoWidth": true },
//        { "data": "Afperro", "title": "AFP Error", "name": "Afperro", "autoWidth": true },
//        { "data": "TextMessage1", "title": "TextMessage", "name": "TextMessage", "autoWidth": true },
//        { "data": "Message1", "title": "Message", "name": "Message1", "autoWidth": true },
//        { "data": "Alopen", "title": "AL Open", "name": "Alopen", "autoWidth": true },
//        { "data": "Alcheck", "title": "AL Check", "name": "Alcheck", "autoWidth": true },
//        { "data": "Alerror", "title": "AL Error", "name": "Alerror", "autoWidth": true },
//        { "data": "Pdate", "title": "Pdate", "name": "Pdate", "autoWidth": true },
//        { "data": "Textmessage2", "title": "TextMessage2", "name": "Textmessage2", "autoWidth": true },
//        { "data": "Message2", "title": "Message2", "name": "Message2", "autoWidth": true },
//        { "data": "Pby", "title": "Pby", "name": "Pby", "autoWidth": true },
//        { "data": "Rft", "title": "Rft", "name": "Rft", "autoWidth": true },
//        { "data": "Irat", "title": "Irat", "name": "Irat", "autoWidth": true },
//        { "data": "Irbt", "title": "Irbt", "name": "Irbt", "autoWidth": true },
//        { "data": "Remarks", "title": "Remarks", "name": "Remarks", "autoWidth": true },
//        { "data": "Statue", "title": "Statue", "name": "Statue", "autoWidth": true },
//        {
//            "render": function (data, type, full, meta) {
//                return '<a class="btn btn-info" href="/Customers/edit/' + full.Custid + '">Edit</a>';
//            }
//        },
//        //{
//        //    "render": function (data, type, full, meta) {
//        //        return '<a class="btn btn-info" href="/Customers/delete/' + full.Custid + '">Delete</a>';
//        //    }
//        //},
 
//    ]
//});



$("#demoGrid").DataTable({
    "processing": true, // for show progress bar  
    "serverSide": true, // for process server side  
    "filter": true, // this is for disable filter (search box)  
    "orderMulti": false, // for disable multiple column at once  
    "responsive": true,
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
                //var rowvalueallday = row["Pdate"];
                //if (rowvalueallday == 0) {
                //    return (moment(rowvalue).format("MM/DD/YYYY (HH:mm)"));
                //} else {
                    return (moment(rowvalue).format("MM/DD/YYYY"));
                //}
            },
            "targets": 15

        }],
    "columns": [
        { "data": "sysid", "name": "sysid", "autoWidth": true },
        { "data": "Batchno", "name": "Batchno", "autoWidth": true },
        { "data": "Custid", "name": "Custid", "autoWidth": true },
        //{ "data": "mfgnum", "title": "mfgnum", "name": "mfgnum", "autoWidth": true },
        //{ "data": "conum", "title": "conum", "name": "conum", "autoWidth": true },
        //{ "data": "conumandmfgnum", "title": "conumandmfgnum", "name": "conumandmfgnum", "autoWidth": true },
        { "data": "Mfgsize", "title": "MFG Size", "name": "Mfgsize", "autoWidth": true },
        { "data": "Afpopen", "title": "AFP Open", "name": "Afpopen", "autoWidth": true },
        { "data": "Afpcheck", "title": "AFP Check", "name": "Afpcheck", "autoWidth": true },
        { "data": "Afperro", "title": "AFP Error", "name": "Afperro", "autoWidth": true },
        //{ "data": "TextMessage1", "title": "TextMessage", "name": "TextMessage", "autoWidth": true },
        //{ "data": "Message1", "title": "Message", "name": "Message1", "autoWidth": true },
        //{ "data": "Alopen", "title": "AL Open", "name": "Alopen", "autoWidth": true },
        //{ "data": "Alcheck", "title": "AL Check", "name": "Alcheck", "autoWidth": true },
        //{ "data": "Alerror", "title": "AL Error", "name": "Alerror", "autoWidth": true },
        //{ "data": "Pdate", "title": "Pdate", "name": "Pdate", "autoWidth": true },
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
        }
        //{
        //    "render": function (data, type, full, meta) { return '<a class="btn btn-info" href="/Repairs/Delete/' + full.sysid + '">Delete</a>'; }
        //},

    ]

});  