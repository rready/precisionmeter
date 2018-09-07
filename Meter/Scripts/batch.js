
$('#batchGrid').dataTable({
    Select: true,
    Processing: true,
    "order": [[2, "desc"]],
    "ajax": {
        url: "/Batches/GetBatchList",
        datatype: "json",
        type: "GET",
        dataSrc: ''

    },
    "columnDefs":
        [{
            "render": function (data, type, row) {
                var rowvalue = row["BatchDate"];
                return (moment(rowvalue).format("MM/DD/YYYY"));
            },
            "targets": 2

        }],
 

    "columns": [
        { "data": "BatchNo", "name": "BatchNo", "autoWidth": true },
        { "data": "Custid", "name": "Custid", "autoWidth": true },
        { "data": "BatchDate", "name": "BatchDate", "type":"date", "autoWidth": true },
        { "data": "Totaldone", "title": "Totaldone", "name": "Contact", "autoWidth": true },
        { "data": "Printed", "title": "Printed", "name": "Printed" },
        //{ "data": "Active" , "title": "Active", "name": "Active"},
        {
            "render": function (data, type, full, meta) {
                return '<a class="btn btn-info" href="/Batches/edit/' + full.BatchNo + '">Edit</a>';
            }
        }

    ]
   
});

