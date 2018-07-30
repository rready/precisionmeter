
$('#demoGrid').dataTable({
    Select: true,
    Processing: true,
    "ajax": {
        url: "/Customers/GetEmpList",
        datatype: "json",
        type: "GET",
        dataSrc: ''


    },

    "columns": [
        { "data": "Custid", "name": "Custid", "autoWidth": true },
        { "data": "Company", "name": "Company", "autoWidth": true },
        { "data": "ShortName", "name": "ShortName", "autoWidth": true },
        { "data": "Contact", "title": "Contact", "name": "Contact", "autoWidth": true },
        {
            "render": function (data, type, full, meta) {
                return '<a class="btn btn-info" href="/Customers/edit/' + full.Custid + '">Edit</a>';
            }
        },
        //{
        //    "render": function (data, type, full, meta) {
        //        return '<a class="btn btn-info" href="/Customers/delete/' + full.Custid + '">Delete</a>';
        //    }
        //},
 
    ]
});

 