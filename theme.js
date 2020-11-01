function CreatePostNavigator() {
    // 目录标题的div
    var navigatorTitleDiv = '<div id="navigatorTitleDiv">隐藏目录</div>'
    // 目录所有内容的div
    var navigatorDivContent = '<div id="navigatorDiv">'

    if ($('#cnblogs_post_body :header').length == 0) {
        return
    }

    $.each($('#cnblogs_post_body :header'), function (i, val) {
        // 查找所有的header（h1-h4），并生成header条目，并添加属性class=“dt_h?”
        var headerTagName = $(val)[0].tagName.toLowerCase()
        var navigatorItem = '<dt class="dt_' + headerTagName + '"><a href="#_nav_' + i + '">' + $(val).text() + '</a></dt>'
        // 把header条目加入navigatorDiv
        navigatorDivContent += navigatorItem

        // 给页面上每个header元素之前添加一个跳转标签
        var headerLabel = '<a name="_nav_' + i + '" style="padding:0px"></a>'
        $(val).prepend(headerLabel)
    })

    navigatorDivContent += '</div>'

    $('#cnblogs_post_body').append(navigatorDivContent)
    $('#cnblogs_post_body').append(navigatorTitleDiv)

    // 给目录标题div添加toggle事件
    $('#navigatorTitleDiv').click(function () {
        $('#navigatorDiv').toggle(200, function () {
            var title = $('#navigatorTitleDiv').text() == '隐藏目录' ? '文章目录' : '隐藏目录'
            $('#navigatorTitleDiv').text(title)
        })
    })
    var headerList = ['h1', 'h2', 'h3', 'h4']
    var headerListLen = headerList.length
    // 遍历所有的header，然后给小一级的header设置缩进
    for (var i = 0; i < headerListLen; i++) {
        if (i < (headerListLen - 1) && $('.dt_' + headerList[i]).length > 0) {
            for (var j = headerListLen - 1; j > i; j--) {
                $('.dt_' + headerList[j]).css({
                    'margin-left': (i + 1) * 10 + 'px'
                })
            }
        }
    }
}
CreatePostNavigator()
