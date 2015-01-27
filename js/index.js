$(document).ready(function () {
    initFnNav();
    initOrderQuery();
});


//功能区 tab 切换效果
function initFnNav() {

    var _conf = {
        items: [
        { tab: ".nav-item-0", container: "#nav-container-0", _default: true },
        { tab: ".nav-item-1", container: "#nav-container-1" },
        { tab: ".nav-item-2", container: "#nav-container-2" },
        { tab: ".nav-item-3", container: "#nav-container-3" }
        ],
        activeClass: "active",
        event:"click"
    }
    var hideContaienr = function () {
        $.each(_conf.items, function () {
            $(this.container).hide();
        });
    }
    var clearTab = function () {
        $.each(_conf.items, function () {
            $(this.tab).removeClass("active");
        });
    }
    $.each(_conf.items, function () {
        var that = this;
        if (that._default) {
            $(that.tab).addClass(_conf.activeClass);
            $(that.container).show();
        } else {
            $(that.tab).removeClass(_conf.activeClass);
            $(that.container).hide();
        }
        $(that.tab).bind(_conf.event, function () {
            hideContaienr();
            clearTab();
            $(that.tab).addClass(_conf.activeClass);
            $(that.container).show();
        });
    });
}

function initOrderQuery() {
    //公路物流-始发城市
    $("#road_leave_city").chooseCity({
        tips: "请选择发货地",
        tipsClass: "",
        valueClass: "black",
        callback: function (data) {
            road_leave_geo = data;
            $('[name="jsonLeaveCityParams"]').val(JSON.stringify(data));
        }
    });

    //公路物流-到达城市
    $("#road_arrive_city").chooseCity({
        tips: "请选择收货地",
        tipsClass: "",
        valueClass: "black",
        callback: function (data) {
            road_arrive_geo = data;
            $('[name="jsonArriveCityParams"]').val(JSON.stringify(data));
        }
    });
}

function RoadQuery() {
    var $leave_city = $("#road_leave_city");
    var data_leave_city = $leave_city.data("geo");
    if (typeof (data_leave_city) != "object" || data_leave_city.provinceID == null) {
        setTimeout(function () {
            $leave_city.trigger("click");
        }, 10);
        return;
    }
    var $arrive_city = $("#road_arrive_city");
    var data_arrive_city = $arrive_city.data("geo");
    if (typeof (data_arrive_city) != "object" || data_arrive_city.provinceID == null) {
        setTimeout(function () {
            $arrive_city.trigger("click");
        }, 10);
        return;
    }

    var temp_leave = road_leave_geo;
    var temp_arrive = road_arrive_geo;

    for (var p in temp_leave) {
        if (temp_leave[p] == -1 || temp_leave[p] === undefined)
            temp_leave[p] = 0;
    }
    for (var p in temp_arrive) {
        if (temp_arrive[p] == -1 || temp_arrive[p] === undefined)
            temp_arrive[p] = 0;
    }

    var leave_str = temp_leave["provinceID"] + "_" + temp_leave["cityID"] + "_" + temp_leave["districtID"];
    var arrive_str = temp_arrive["provinceID"] + "_" + temp_arrive["cityID"] + "_" + temp_arrive["districtID"];

    var url = "/road/s-" + leave_str + "-" + arrive_str + "-0_0-0_0-0_0-0_0-0-0-0-0-1.html";

    alert(url);
    window.location.href = url;
    //$("#RoadForm").trigger("submit");
}


function ExpressCommpanyCallback(expCom) {
    expressCom = expCom;
}

