$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage', '4rdPage', '5rdPage', '6rdPage', '7rdPage', '8rdPage', '9rdPage', '10rdPage'],
        // sectionsColor: ['#8FB98B', '#DE564B', '#EAE1C0'],
        afterLoad: function(anchorLink, index) {
            var loadedSection = $(this);
            console.log(index);
            if (index == 9) {
                $(".arr").remove();
            }

        },
        onLeave: function(index, nextIndex, direction) {

        }
    });


    //初始化点击率
    $.get("/marketingactivity/f89aa7644e1ea45e014e1eff343c12b6/clickno", function(no) {});
   



    var myVideo = document.getElementById("song");


    document.getElementById("play").onclick = function() {
        playVid();
        document.getElementById("pause").style.display = "block";
        document.getElementById("play").style.display = "none";
    };
    document.getElementById("pause").onclick = function() {
        pauseVid();
        document.getElementById("pause").style.display = "none";
        document.getElementById("play").style.display = "block";
    };




    function playVid() {
        myVideo.play();
    }

    function pauseVid() {
        myVideo.pause();
    }
    initDate();
});


function initDate() {
    $.get("/wxuserdatareport/timemachine?openId=" + RequestParameter()['openId'], function(res) {
        $("#name").text(removeAndoridMojiText(res.nickName));
        if (res.signature != "") {
            $("#signature").text(res.signature);
        }

        if (res.headPicUrl == null) {
            $("#head-pic").remove();
        } else {
            $("#head-pic").attr("src", res.headPicUrl);
        }

        $("#totalDays").text(res.totalWeixinDays);
        //初见
        var meetTime = new Date(parseInt(res.firstMessageDetail.messageDetail.postTime));
        $("#meet-year").text(meetTime.getFullYear());
        $("#meet-month").text(meetTime.getMonth() + 1);
        $("#meet-day").text(meetTime.getDate());
        $("#meet-hour").text(meetTime.getHours());
        $("#meet-munite").text(meetTime.getMinutes());
        // 初见照片
        if (res.firstMessageDetail.imageVOs.length == 0) {
            $("#meet-first-pic").remove();
        } else {
            $("#meet-first-pic").attr("src", res.firstMessageDetail.imageVOs[0].imageUrl);
        }
        $("#meet-say").text(res.firstMessageDetail.content);
        //至今
        $(".total-day").text(res.totalWeixinDays);
        $(".total-state").text(res.totalDetailsNum);
        $(".total-pic").text(res.totalImagesNum);
        $(".total-words").text(res.totalWordsNum);


        //随机5张照片
        $(".random-img-1").attr("src", res.randomImages[0].imageUrl);
        $(".random-img-2").attr("src", res.randomImages[1].imageUrl);
        $(".random-img-3").attr("src", res.randomImages[2].imageUrl);
        $(".random-img-4").attr("src", res.randomImages[3].imageUrl);
        $(".random-img-5").attr("src", res.randomImages[4].imageUrl);
        $("#total-page").text(res.totalPagesNum);

        //最活跃
        $(".active-year").text(res.mostDetailsMonth[0]);
        $(".active-month").text(res.mostDetailsMonth[1]);
        $(".month-states-num").text(res.mostDetailsMonthDetailsNum);
        $(".month-pics-num").text(res.mostDetailsMonthImagesNum);
        $(".month-fonts-num").text(res.mostDetailsMonthWordsNum);

        //TODO:那年今日
        if (res.sameDayMessageDetail == null) {
            $(".last-today-p").remove();
            $(".last-date").remove();
        } else {
            var historyTime = new Date(parseInt(res.sameDayMessageDetail.messageDetail.postTime));
            $("#history-year").text(historyTime.getFullYear());
            $("#history-month").text(historyTime.getMonth() + 1);
            $("#history-day").text(historyTime.getDate());
            $("#history-hour").text(historyTime.getHours());
            $("#history-munite").text(historyTime.getMinutes());

            $("#history-words").text(res.sameDayMessageDetail.content);
            $("#history-pic").attr("src", res.sameDayMessageDetail.imageVOs[0].imageUrl);

        }

    });
}

function RequestParameter() {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;

}


function removeAndoridMojiText(text) {
    if (text == null) {
        return "";
    } else {
        var newText = text.replace(/\[emoji_.{4}\]/g, function(emoji) {
            return "";
        });
        return newText;
    }

}

$("#begin-trip").click(function() {
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9a0c51de15b24815&redirect_uri=http%3a%2f%2fwww.whiletime.com%2fwxshu%2fwtMakeBookSteps.html%3fsettingsId%3dwxplatform1&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
});