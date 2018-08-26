
$('#customerGrid').dataTable({
    Select: true,
    Processing: true,
    Responsive: true,
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
        { "data": "Address1", "title": "Address", "name": "Address1", "autoWidth": true },
        { "data": "Address2", "title": "Address2", "name": "Address2", "autoWidth": true },
        { "data": "City", "title": "City", "name": "City", "autoWidth": true },
        {
            "render": function (data, type, full, meta) {
                return '<a class="btn btn-info" href="/Customers/edit/' + full.Custid + '">Edit</a>';
            }
        },

    ],
});


$("#createBatch").on('click', function () {
    var selectedCustomer = $("#SelectedCustId").val();
    //alert('you selected' + $("#SelectedCustId").val());
    $.ajax({
        url: "/Batches/Create",
        type: 'GET',
        async: false,
        dataType: 'json',
        contentType: 'application/json',
        data: {custid: selectedCustomer},
        success: function (data) { },
        error: function (xhr) { }
    });

});



 