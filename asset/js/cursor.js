(function () {
    window.onclick = function (event) {
        var texts = [
            "浮生梦雪飘零",
            "梦里不知身是客，一晌贪欢",
            "世事漫随流水，算来一梦浮生。",
            "『那是非常渺小的、非常壯大的、非常重要的、愛與勇氣的童話故事──』",
            "『今日、海を見た。もう怖くない』",
            "『鬼若现世，灭尽恶鬼！恶若现世，断绝邪恶——』",
            "『いいえ、知らない人』",
            "『この、くそったれな世界に、精一杯の爱をこめて。』",
            "「“习惯小小的幸福就OK了”的意思哦」",
            "「晚安，诗音」",
            "「晚安，太一」",
            "異議あり！",
            "你是一个有价值、有能力、有潜力的人，你的生活是充满意义、充满可能、充满希望的。你只需要相信自己，继续努力，继续学习，继续探索，继续成长。",
            "世间甲子须臾事，逢着仙人莫看棋。",
            "人世几回伤往事，山形依旧枕寒流",
            "往者不可谏，来者犹可追",
            "憎者唯见其恶，爱者止见其善。爱憎之间，所宜详慎。",
            "向之所欣，俯仰之间，已为陈迹，犹不能不以之兴怀。",
            "已识乾坤大，犹怜草木青。",
            "从水下第一个生命的萌芽开始……到石器时代的巨型野兽……再到人类第一次直立行走，您已经历许多。现在，开启您最伟大的探索吧：从早期文明的摇篮到浩瀚星宇。",
            "♪おお 神の刃は 人類の愛♪",
            "♪But I need one last time I want to tell you, how I feel inside for you ♪ I want you to know...♪"
        ];

        var text = texts[Math.floor(Math.random() * texts.length)]; // 随机选择一段文本
        var fontSize = 16; // 字体大小
        var duration = text.length * 55; // 根据字数计算持续时间，每个字符50毫秒

        var heart = document.createElement("b");
        heart.onselectstart = new Function('event.returnValue=false');
        document.body.appendChild(heart).innerHTML = text;

        heart.style.cssText =
            "position: fixed; font-size: " +
            fontSize +
            "px; cursor: default; left: -100%;";

        var x = event.clientX - fontSize / 2;
        var y = event.clientY - fontSize;
        var c = randomColor();
        var a = 1;
        var s = 1.2;

        var startTime = Date.now(); // 记录动画开始时间

        var timer = setInterval(function () {
            var elapsed = Date.now() - startTime; // 计算已经过去的时间
            if (elapsed >= duration) {
                document.body.removeChild(heart);
                clearInterval(timer);
            } else {
                var progress = elapsed / duration; // 计算动画进度（0到1之间）
                var opacity = 1 - progress; // 根据进度计算透明度
                var scale = 1 + 0.2 * progress; // 根据进度计算缩放比例

                heart.style.cssText =
                    "position: fixed; font-size: " +
                    fontSize +
                    "px; cursor: default; color: " +
                    c +
                    "; left: " +
                    x +
                    "px; top: " +
                    y +
                    "px; opacity: " +
                    opacity +
                    "; transform: scale(" +
                    scale +
                    ");";
            }
        }, 15);
    };

    function randomColor() {
        return (
            "rgb(" +
            ~~(Math.random() * 255) +
            "," +
            ~~(Math.random() * 255) +
            "," +
            ~~(Math.random() * 255) +
            ")"
        );
    }
})();
