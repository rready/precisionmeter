
$('#batchGrid').dataTable({
    Select: true,
    Processing: true,
    "ajax": {
        url: "/Batches/GetBatchList",
        datatype: "json",
        type: "GET",
        dataSrc: ''


    },

    "columns": [
        { "data": "BatchNo", "name": "BatchNo", "autoWidth": true },
        { "data": "Custid", "name": "Custid", "autoWidth": true },
        { "data": "BatchDate", "name": "BatchDate", "autoWidth": true },
        { "data": "Totaldone", "title": "Totaldone", "name": "Contact", "autoWidth": true },
        { "data": "Printed", "title": "Printed", "name": "Printed" }

    ],
   

    
});