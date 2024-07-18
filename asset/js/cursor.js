(function () {
    // 检查是否是特殊页面
    function isSpecialPage() {
        const { protocol, hostname, pathname } = window.location;
        return (
            protocol === "https:" &&
            hostname === "dangokanako.github.io" &&
            pathname === "/1918/11/11/%E6%8A%80%E6%9C%AF/test/"
        );
    }


    // 如果不是特殊页面，才添加点击事件
    if (!isSpecialPage()) {
        window.onclick = function (event) {
            // 检查本地环境
            function isLocalhost() {
                const { protocol, hostname } = window.location;
                return (
                    (protocol === "http:" || protocol === "https:") &&
                    (hostname === "localhost" || hostname === "127.0.0.1")
                );
            }

            //禁止F12  
            if (!isLocalhost()) {
                document.addEventListener('keydown', (event) => {
                    if ((event.code === 'F12') || (event.ctrlKey && event.shiftKey && event.code === 'KeyI') || (event.ctrlKey && event.code === 'KeyU')) {
                        event.preventDefault();
                    }
                });
            }

            var texts = [
                // 台词
                "『那是非常渺小的、非常壯大的、非常重要的、<br/>愛與勇氣的童話故事──』",
                "『今日、海を見た。もう怖くない』",
                "『鬼若现世，灭尽恶鬼！<br/>恶若现世，断绝邪恶——』",
                "『いいえ、知らない人』",
                "『この、くそったれな世界に、<br/>精一杯の爱をこめて。』",
                "「“习惯小小的幸福就OK了”的意思哦」",
                "「晚安，诗音」",
                "「晚安，太一」",
                "「晚安，兰斯」",
                "我们的情人，不过是随便借个名字，用幻想吹出来的肥皂泡。",
                "愿得我心如明月，<br/>独映暗夜迷途人。",
                "梦里不觉秋已深，<br/>余情岂是为他人。",
                "晨意微寒秋渐深，<br/>侧伴无事俏佳人。",
                "月入层云光黯淡，<br/>今宵月明正宜死。",
                "长夜伴浪破晓梦，<br/>梦晓破浪伴夜长。",
                "異議あり！！",
                "堕落的准备，OK？",
                "「只要抓住这只手，我就带领你前往更加深邃的世界。<br/>那是个可恶的世界哦。最差最烂最最凶险的<br/>‘我们’的世界哦。<br/>我有带领你一同前行的觉悟。<br/>只要你愿意，我便去做与你携手领略的准备。<br/>在最差劲的地方欣赏最棒的景色。」",
                // 诗词
                "世间甲子须臾事，<br/>逢着仙人莫看棋。",
                "人世几回伤往事，<br/>山形依旧枕寒流。",
                "梦里不知身是客，<br/>一晌贪欢。",
                "世事漫随流水，<br/>算来一梦浮生。",
                "愿得一人心，<br/>白首不相离。",
                "往者不可谏，<br/>来者犹可追。",
                "已识乾坤大，<br/>犹怜草木青。",
                "花有重开日，<br/>人无再少年。",
                "天意怜幽草，<br/>人间重晚晴。",
                "无意苦争春，<br/>一任群芳妒。",

                "梅须逊雪三分白，<br/>雪却输梅一段香。",
                "偷得浮生半日闲。",
                "憎者唯见其恶，爱者止见其善。<br/>爱憎之间，所宜详慎。",
                "向之所欣，俯仰之间，已为陈迹，<br/>犹不能不以之兴怀。",
                "宠辱不惊，闲看庭前花开花落；<br/>去留无意，漫随天外云卷云薛。",
                // 佳句
                "人类的过去历史是可能性的随机坍缩，<br/>未来历史是想象力的路径积分。",
                "你是一个有价值、有能力、有潜力的人，<br/>你的生活是充满意义、充满可能、充满希望的。<br/>你只需要相信自己，继续努力，继续学习，继续探索，继续成长。",
                "从水下第一个生命的萌芽开始……到石器时代的巨型野兽……再到人类第一次直立行走，您已经历许多。<br/>现在，开启您最伟大的探索吧：从早期文明的摇篮到浩瀚星宇。",
                "即使没有足够的冰糖，<br/>我们也能够品尝纯净透明的清风和桃红色的美丽晨光，<br/>我多么希望，<br/>这些小故事里的某些东西，<br/>能够成为你纯净透明的真正粮食啊。",
                "人只不过是一根苇草，是自然界最脆弱的东西；但他是一根能思想的苇草。用不着整个宇宙都拿起武器来才能毁灭；一口气、一滴水就足以致他死命了。<br/>然而，纵使宇宙毁灭了他，人却仍然要比致他于死命的东西更高贵得多；因为他知道自己要死亡，以及宇宙对他所具有的优势，而宇宙对此却是一无所知。<br/>因而，我们全部的尊严就在于思想。正是由于它而不是由于我们所无法填充的空间和时间我们才必须提高自己。因此，我们要努力好好地思想；这就是道德的原则。",
                "有两样东西，越是经常而持久地对它们进行反复思考，<br/>它们就越是使心灵充满常新而日益增长的惊赞和敬畏：<br/>我头上的星空和我心中的道德法则。",
                // 歌曲
                "♪ おお 神の刃は 人類の愛 ♪",
                "♪ さよなら　愛しい　大切な人　どうか“幸せに” ♪",
                "♪ 寄予真实的光斑从木叶间洒落的那一日 ♪",
                "♪ 届かない恋をしていても <br/>♪ 映しだす日がくるかな ",
                "♪ おお 神の刃は 人類の愛<br/>♪ 祈りを 込めて つらぬけ",
                "♪ But I need one last time I want to tell you ♪<br/> ♪ how I feel inside for you ♪<br/>♪ I want you to know...♪"
            ];

            var text = texts[Math.floor(Math.random() * texts.length)]; // 随机选择一段文本
            var fontSize = 16; // 字体大小
            var duration = text.length * 80; // 根据字数计算持续时间，每个字符50毫秒
            if (duration < 750)
                duration = 750;
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
    }

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

