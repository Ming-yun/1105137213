kendo.culture("zh-TW");
var bookDataFromLocalStorage = [];
var bookCategoryList = [
    { text: "資料庫", value: "database", src: "image/database.jpg" },
    { text: "網際網路", value: "internet", src: "image/internet.jpg" },
    { text: "應用系統整合", value: "system", src: "image/system.jpg" },
    { text: "家庭保健", value: "home", src: "image/home.jpg" },
    { text: "語言", value: "language", src: "image/language.jpg" }
];

// 載入書籍資料
function loadBookData() {
    bookDataFromLocalStorage = JSON.parse(localStorage.getItem('bookData'));
    if (bookDataFromLocalStorage == null) {
        bookDataFromLocalStorage = bookData;
        localStorage.setItem('bookData', JSON.stringify(bookDataFromLocalStorage));
    }
}

$(function () {
    loadBookData();
});


//change image
$(function () {
    $("#book_category").change(function () {
        $(".book-image").attr("src", "image/" + $("#book_category").val() + ".jpg");
    });
});

//time
$(function () {
    function startChange() {
        var startDate = start.value(),
            endDate = end.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate());
            end.min(startDate);
        } else if (endDate) {
            start.max(new Date(endDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    function endChange() {
        var endDate = end.value(),
            startDate = start.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate());
            start.max(endDate);
        } else if (startDate) {
            end.min(new Date(startDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    var start = $("#bought_datepicker").kendoDatePicker({
        value: new Date(),
        change: startChange, format: "yyyy-MM-dd"
    }).data("kendoDatePicker");

    var end = $("#delivered_datepicker").kendoDatePicker({

        change: endChange, format: "yyyy-MM-dd"
    }).data("kendoDatePicker");

    start.max(end.value());
    end.min(start.value());
});

//total(jQ)
$(function () {
    //price
    $("#book_price").click(function () {
        $('#book_total').html($("#book_amount").val() * $("#book_price").val());
    });
    //amount
    $("#book_amount").click(function () {
        $('#book_total').html($("#book_amount").val() * $("#book_price").val());
    });
});

//彈出視窗
$("#add_book").click(function () {
    var myWindow = $("#add_window"),
        undo = $("#add_book");

    undo.click(function () {
        myWindow.data("kendoWindow").open();
        undo.fadeOut();
    });

    function onClose() {
        undo.fadeIn();
    }

    myWindow.kendoWindow({
        width: "500px",
        title: "新增書籍",
        visible: false,
        actions: [
            "Pin",
            "Minimize",
            "Maximize",
            "Close"
        ],
        close: onClose
    }).data("kendoWindow").center().open();
});


//查詢結果
$(function () {

    $("#book_grid").kendoGrid({
        dataSource: {
            data: bookData,
            schema: {
                model: {
                    fields: {
                        BookId: { type: "string" },
                        BookName: { type: "string" },
                        BookCategory: { type: "string" },
                        BookAuthor: { type: "string" },
                        BookBoughtDate: { type: "string" },
                        BookDeliveredDate: { type: "string" },
                        BookPrice: { type: "number" },
                        BookAmount: { type: "number" },
                        BookTotal: { type: "number" },
                    }
                }
            },
            pageSize: 20
        },
        height: 600,
        groupable: true,
        sortable: true,
        pageable: {
            buttonCount: 5
        },
        columns: [
            { command: "destroy", title: "&nbsp;", width: 150, editor: customBoolEditor },
            { field: "BookId", title: "書籍" + "<br>" + "編號", width: 100 },
            { field: "BookName", title: "書籍" + "<br>" + "名稱", width: 100 },
            { field: "BookCategory", title: "書籍" + "<br>" + "種類", width: 120 },
            { field: "BookAuthor", title: "作者", width: 100 },
            { field: "BookBoughtDate", title: "購買" + "<br>" + "日期", width: 100 },
            { field: "BookDeliveredDate", title: "送達" + "<br>" + "狀態", width: 100 },
            { field: "BookPrice", title: "金額", width: 100 },
            { field: "BookAmount", title: "數量", width: 100 },
            { field: "BookTotal", title: "總計", width: 100 }
        ],
        sortable: true,
        editable: true
    });
    function customBoolEditor(container) {
        var guid = kendo.guid();
        $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
        $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
    }
});



