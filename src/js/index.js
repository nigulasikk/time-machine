$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage', '4rdPage', '5rdPage', '6rdPage', '7rdPage','8rdPage','9rdPage','10rdPage'],
        // sectionsColor: ['#8FB98B', '#DE564B', '#EAE1C0'],
        afterLoad: function(anchorLink, index) {
            var loadedSection = $(this);
            console.log(index);
           

        },
        onLeave: function(index, nextIndex, direction) {
            
        }
    });


    var joinNo;
    //初始化点击率
    $.get("/marketingactivity/f89aa7644dc286fb014dc3dad365269d/clickno", function(no) {
        joinNo = no.clickno;
        initwx();
    });

    function initwx() {
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
            title: '这几天的时光书小编全包了，我是第' + joinNo + '个参与“时光书”亲子节的妈妈！', // 分享标题
            link: 'www.whiletime.com/dearDay/dear.html', // 分享链接
            imgUrl: 'http://whiletime.com/dearDay/img/sharepic.png', // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
                $.get("/marketingactivity/f89aa7644dc286fb014dc3dad365269d/addshare");
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareAppMessage({
            title: '这几天的时光书小编全包了！', // 分享标题
            desc: '我是第' + joinNo + '个参与“时光书”亲子节的妈妈！', // 分享描述
            link: 'www.whiletime.com/dearDay/dear.html', // 分享链接
            imgUrl: 'http://whiletime.com/dearDay/img/sharepic.png', // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
                $.get("/marketingactivity/f89aa7644dc286fb014dc3dad365269d/addshare");

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
         document.getElementById("pause").style.display="block";
        document.getElementById("play").style.display="none";
    };
    document.getElementById("pause").onclick = function() {
        pauseVid();
        document.getElementById("pause").style.display="none";
        document.getElementById("play").style.display="block";
    };




    function playVid() {
        myVideo.play();
    }

    function pauseVid() {
        myVideo.pause();
    }

});


function initDate(){
    $.get("/wxuserdatareport/timemachine?openId=oStCms_QVacAlErYQQ4vQJKvh_bY",function(){
        
    });
}




