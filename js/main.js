(
    function () {
    //当浏览器窗口被调整大小时触发
    window.onresize = function () {
        ShowHideElement("i-link-box", "linkList-item", 845);
    }
    window.onload = function () {
        ShowHideElement("i-link-box", "linkList-item", 845);
    }

    function ShowHideElement(Element1, Element2, Vaule) {
        var Person = document.getElementsByClassName(Element1);
        var BoxHeight = document.getElementsByClassName(Element2);
        var WindowHeight = window.innerHeight || document.body.clientHeight;
        //遍历获取到的元素
        for (var i = 6; i < Person.length; i++) {
            if (WindowHeight <= Vaule && deviceVal === "pc") {
                Person[i].style.display = "none";
                BoxHeight[0].style.marginTop = "5px";
            } else {
                Person[i].style.display = "block";
                BoxHeight[0].style.marginTop = "0px";
            }
        }
    }

    window.ShowHideElement = ShowHideElement;
}());

var now = -1;
var resLength = 0;
var listIndex = -1;
var hotList = 0;
var thisSearch = 'https://www.baidu.com/s?wd=';
var thisSearchIcon = './logo.jpg';
var storage = window.localStorage;
if (!storage.stopHot) {
    storage.stopHot = true
}
storage.stopHot == 'false'
    ? $('#hot-btn').attr(
        'style',
        'background: url(./img/hotg.svg) no-repeat center/cover;'
    )
    : $('#hot-btn').attr(
        'style',
        'background: url(./img/hotk.svg) no-repeat center/cover;'
    );
var ssData = storage.searchEngine;
if (storage.searchEngine != undefined) {
    ssData = ssData.split(',');
    thisSearch = ssData[0];
    $('#search-icon').attr('class', ssData[1])
    $('#search-icon').attr('style', ssData[2])
}

function getHotkeyword(value) {
    $.ajax({
        type: "GET",
        url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
        async: true,
        data: {
            wd: value
        },
        dataType: "jsonp",
        jsonp: "cb",
        success: function (res) {
            $("#box ul").text("");
            hotList = res.s.length;
            if (hotList) {
                $("#box").css("display", "block");
                for (var i = 0; i < hotList; i++) {
                    $("#box ul").append("<li><span>" + (
                        i + 1
                    ) + "</span>" + res.s[i] + "</li>");
                    $("#box ul li")
                        .eq(i)
                        .click(function () {
                            $('#txt').val(this.childNodes[1].nodeValue);
                            window.open(thisSearch + this.childNodes[1].nodeValue);
                            $('#box').css('display', 'none')
                        });
                    if (i === 0) {
                        $("#box ul li")
                            .eq(i)
                            .css({"border-top": "none"});
                        $("#box ul span")
                            .eq(i)
                            .css({"color": "#fff", "background": "#f54545"})
                    } else {
                        if (i === 1) {
                            $("#box ul span")
                                .eq(i)
                                .css({"color": "#fff", "background": "#ff8547"})
                        } else {
                            if (i === 2) {
                                $("#box ul span")
                                    .eq(i)
                                    .css({"color": "#fff", "background": "#ffac38"})
                            }
                        }
                    }
                }
            } else {
                $("#box").css("display", "none")
            }
        },
        error: function (res) {
            console.log(res)
        }
    })
}

// 按键松开时执行
$("#txt").keyup(function (e) {
    if ($(this).val()) {
        if (e.keyCode == 38 || e.keyCode == 40 || storage.stopHot != 'true') {
            return
        }
        $("#search-clear").css("display", "block");
        getHotkeyword($(this).val())
    } else {
        $("#search-clear").css("display", "none");
        $("#box").css("display", "none")
    }
});

$("#txt").keydown(function (e) {
    if (e.keyCode === 40) {
        listIndex === (hotList - 1)
            ? listIndex = 0
            : listIndex++;
        $("#box ul li")
            .eq(listIndex)
            .addClass("current")
            .siblings()
            .removeClass("current");
        var hotValue = $("#box ul li")
            .eq(listIndex)[0]
            .childNodes[1]
            .nodeValue;
        $("#txt").val(hotValue)
    }
    if (e.keyCode === 38) {
        if (e.preventDefault) {
            e.preventDefault()
        }
        if (e.returnValue) {
            e.returnValue = false
        }
        listIndex === 0 || listIndex === -1
            ? listIndex = (hotList - 1)
            : listIndex--;
        $("#box ul li")
            .eq(listIndex)
            .addClass("current")
            .siblings()
            .removeClass("current");
        var hotValue = $("#box ul li")
            .eq(listIndex)[0]
            .childNodes[1]
            .nodeValue;
        $("#txt").val(hotValue)
    }
    if (e.keyCode === 13) {
        window.open(thisSearch + $("#txt").val());
        $("#box").css("display", "none");
        $("#txt").blur();
        $("#box ul li").removeClass("current");
        listIndex = -1
    }
});
$("#search-clear").click(function () {
    $('#txt').val("");
    $('#search-clear').css('display', 'none');
    $("#box").css("display", "none");
});
$(".search-btn").click(function () {
    window.open(thisSearch + $("#txt").val());
    $("#box").css("display", "none");
    $("#txt").blur();
    $("#box ul li").removeClass("current");
    listIndex = -1
});
$("#txt").focus(function () {
    $(".search-box").css("box-shadow", "0 4px 6px #0000001f");
    $(".search-box").css("border", "1px solid #cecece");
    if ($(this).val() && storage.stopHot == 'true') {
        getHotkeyword($(this).val())
    }
});
$("#txt").blur(function () {
    $(".search-box").css("box-shadow", "0 2px 3px #0000000f");
    $(".search-box").css("border", "1px solid #00000026");
    setTimeout(function () {
        $("#box").css("display", "none")
    }, 400)
});
$(function () {
    // $('#box ul').html() === '' ? $('#box').css('height','0px') :
    // $('#box').css('height','auto');
    var search = {
        data: [
            {
                name: '百度',
                icon: './img/so/baidu.svg',
                color: '#3385ff',
                url: 'https://www.baidu.com/s?wd='
            }, {
                name: '谷歌',
                icon: './img/so/google.svg',
                color: '#4c8bf5',
                url: 'https://www.google.com/search?q='
            }, {
                name: '夸克',
                icon: './img/so/quark.svg',
                color: '#03bc11',
                url: 'https://quark.sm.cn/s?q='
            }, {
                name: '必应',
                color: '#0a8583',
                icon: './img/so/bing.svg',
                url: 'https://cn.bing.com/search?q='
            }, {
                name: '搜狗',
                icon: './img/so/sougou.svg',
                color: '#fe620d',
                url: 'https://www.sogou.com/web?query='
            }, {
                name: '好搜',
                icon: './img/so/so.svg',
                color: '#f8b616',
                url: 'https://www.so.com/s?q='
            }, {
                name: 'magi',
                icon: './img/so/magi.svg',
                color: '#ffb744',
                url: 'https://magi.com/search?q='
            },{
	name:"searx",
	icon:"./img/so/searx.svg",
	color:"#e61a0f",
	url:"https://lihantao.com/?q="
             },{
	name:"萌搜",
	icon:"./img/so/mengso.svg",
	color:"#e61a0f",
	url:"https://mengso.com/search?q="
             },{
	name:"Yandex",
	icon:"./img/so/yandex.svg",
	color:"#e61a0f",
	url:"https://yandex.com/search/?text="
             }
        ]
    }
    for (var i = 0; i < search.data.length; i++) {
        var addList = '<li><i style="background: url(' + search
            .data[i]
            .icon + ') no-repeat center/cover;color: ' + search
            .data[i]
            .color + '"></i><span>' + search
            .data[i]
            .name + '</span></li>'
        $('.search-engine-list').append(addList);
    }

    $('#search-icon, .search-engine').hover(function () {
        $('.search-engine').css('display', 'block')
    }, function () {
        $('.search-engine').css('display', 'none')
    });

    $('#hot-btn').on('click', function () {
        // $(this).toggleClass('icon-kaiguanclose-copy');
        if (storage.stopHot == 'true') {
            $(this).attr(
                'style',
                'background: url(./img/hotg.svg) no-repeat center/cover;'
            )
            storage.stopHot = false
        } else {
            storage.stopHot = true
            $(this).attr(
                'style',
                'background: url(./img/hotk.svg) no-repeat center/cover;'
            )
        }
        console.log(storage.stopHot)
    });

    $('.search-engine-list li').click(function () {
        var _index = $(this).index();
        var thisIcon = $(this)
            .children()
            .attr('style');
        var thisColor = $(this)
            .children()
            .attr('style');
        $('#search-icon').attr('style', thisIcon)
        $('#search-icon').attr('style', thisColor)
        thisSearch = search
            .data[_index]
            .url;
        $('.search-engine').css('display', 'none')

        storage.searchEngine = [thisSearch, thisIcon, thisColor]
    })
})

$(document).ready(function () {
    //菜单点击
    $("#menu").click(function (event) {
        $(this).toggleClass('on');
        $(".list").toggleClass('closed');
        $(".mywth").toggleClass('hidden');
    });
    $("#content").click(function (event) {
        $(".on").removeClass('on');
        $(".list").addClass('closed');
        $(".mywth").removeClass('hidden');
    });
});
