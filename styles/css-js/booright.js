var ps = new PerfectScrollbar('#postbox', {
	wheelSpeed: 0.5,
	swipeEasing: false,
	suppressScrollX: false
});
if (($("#post_box").height() + $("#comments").height()) > 800) {
	$("#rightSchedule").text("0%");
	document.getElementById("postbox").addEventListener('ps-scroll-y', function () {
		var post_top = $("#postbox").scrollTop();
		var post_height = $("#post_box").height() + $("#comments").height() - 698;
		var rightSchedule = parseInt((post_top / post_height) * 100);
		$("#rightSchedule").text(rightSchedule + "%");
	});
} else {};
var img = $(".post-content").find("img");
if (img.length > 0) {
	for (var i = 0; i < img.length; i++) {
		var img_1 = img.eq(i);
		var img_title = img_1.attr("title");
		img_1.wrapAll("<div class='img_box'></div>");
		var img_box = img_1.parent(".img_box");
		img_box.append(
			"<span class='img_tape img_tape_top'></span><span class='img_tape img_tape_buttom'></span><span class='img_title'></span>"
		);
		img_box.find(".img_title").text(img_title);
	};
	img.click(function () {
		imgbig(this);
	});
}
if ($(".post-content").find("pre").length > 0) {
	Prism.highlightAll();
};
$("#category").children("a").attr("pajx-left", "");
$(".tags").children("a").attr("pajx-left", "");
openBook("withOutAnimat");