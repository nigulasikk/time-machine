$(document).ready(function() {
    var shareDay, shareState, shareWords, sharePic;
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

    function initWx() {
        var curl = window.location.href;
        var url = "/wxpay/prepare";
        $.ajax({
            type: "post",
            url: url,
            data: {
                "curl": curl
            },
            success: function(response) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: response['appid'], // 必填，公众号的唯一标识
                    timestamp: response['timestamp'], // 必填，生成签名的时间戳
                    nonceStr: response['noncestr'], // 必填，生成签名的随机串
                    signature: response['sign_result'], // 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                });
            },
            error: function(response) {
                console.log("ERROR:", response)
            }
        });
    }


    wx.ready(function() {
        wx.onMenuShareTimeline({
            title: '在微信' + shareDay + '天，我已经记录了' + shareState + '条状态、' + sharePic + '个图片、' + shareWords + '个文字', // 分享标题
            link: 'http://whiletime.com/timemachineDist/html/timemachine.html?openId=' + RequestParameter()['openId'], // 分享链接
            imgUrl: 'http://whiletime.com/timemachineDist/img/sharepic.jpg', // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
                $.get("/marketingactivity/f89aa7644e1ea45e014e1eff343c12b6/addshare");
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareAppMessage({
            title: '时光机', // 分享标题
            desc: '在微信' + shareDay + '天，我已经记录了' + shareState + '条状态、' + sharePic + '个图片、' + shareWords + '个文字', // 分享描述
            link: 'http://whiletime.com/timemachineDist/html/timemachine.html?openId=' + RequestParameter()['openId'], // 分享链接
            imgUrl: 'http://whiletime.com/timemachineDist/img/sharepic.jpg', // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
                $.get("/marketingactivity/f89aa7644e1ea45e014e1eff343c12b6/addshare");

            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });

        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });



    wx.error(function(res) {
        console.log(res);
    });



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



    function initDate() {
        $.get("/wxuserdatareport/timemachine?openId=" + RequestParameter()['openId'], function(res) {

            shareDay = res.totalWeixinDays;
            shareState = res.totalDetailsNum;
            shareWords = res.totalWordsNum;
            sharePic = res.totalImagesNum;
            // 分享内容
            initWx();



            $("#name").text(removeAndoridMojiText(res.nickName));
            if (res.signature != ""&&res.signature!=null) {
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
        window.location.href = "follow.html";
    });





});