var BoxOpened = "";
var ImgOpened = "";
var Counter = 0;
var ImgFound = 0;

var Source = "#boxcard";

var ImgSource = [
  'http://vossenwheels.com/Gallery/FileUpload/Gallery/Ford_Mustang_VWS-1_56c01031.jpg?width=1600&quality=75', 
  'http://vossenwheels.com/Gallery/FileUpload/Gallery/Audi_R8_HC-2_a4697688.jpg?width=1600&quality=75', 
  'http://vossenwheels.com/Gallery/FileUpload/Gallery/Audi_A6_CV3R_517e2d10.jpg?width=1600&quality=75', 
  'http://vossenwheels.com/Gallery/FileUpload/Gallery/Lexus_IS_CG-207_8d2889b7.jpg?width=1600&quality=75',
  'http://vossenwheels.com/Gallery/FileUpload/Gallery/Lexus_IS_CG-207_a4ffe235.jpg?width=1600&quality=75',
  'http://vossenwheels.com/Gallery/FileUpload/Gallery/Toyota_Supra_LC-101_64c87da2.jpg?width=1600&quality=75',
  'http://vossenwheels.com/Gallery/FileUpload/Gallery/Toyota_Supra_LC-101_2d5b9e75.jpg?width=1600&quality=75',
  'http://vossenwheels.com/Gallery/FileUpload/Gallery/BMW_3%20Series%20-%20M3_VWS-2_18b190cf.jpg?width=1600&quality=75',
];

function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
	
function ShuffleImages() {
	var ImgAll = $(Source).children();
	var ImgThis = $(Source + " div:first-child");
	var ImgArr = new Array();

	for (var i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}
	
		ImgThis = $(Source + " div:first-child");
	
	for (var z = 0; z < ImgAll.length; z++) {
	var RandomNumber = RandomFunction(0, ImgArr.length - 1);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		ImgArr.splice(RandomNumber, 1);
		ImgThis = ImgThis.next();
	}
}

function ResetGame() {
	ShuffleImages();
	$(Source + " div img").hide();
	$(Source + " div").css("visibility", "visible");
	Counter = 0;
	$("#success").remove();
	$("#counter").html("" + Counter);
	BoxOpened = "";
	ImgOpened = "";
	ImgFound = 0;
	return false;
}

function OpenCard() {
	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
		$(Source + " div").unbind("click", OpenCard);
	
		$("#" + id + " img").slideDown('fast');

		if (ImgOpened == "") {
			BoxOpened = id;
			ImgOpened = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 300);
		} else {
			CurrentOpened = $("#" + id + " img").attr("src");
			if (ImgOpened != CurrentOpened) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('fast');
					$("#" + BoxOpened + " img").slideUp('fast');
					BoxOpened = "";
					ImgOpened = "";
				}, 400);
			} else {
				$("#" + id + " img").parent().css("visibility", "hidden");
				$("#" + BoxOpened + " img").parent().css("visibility", "hidden");
				ImgFound++;
				BoxOpened = "";
				ImgOpened = "";
			}
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 400);
		}
		Counter++;
		$("#counter").html("" + Counter);

		if (ImgFound == ImgSource.length) {
			$("#counter").prepend('<span id="success">You Found All Pictues With </span>');
		}
	}
}

$(function() {

for (var y = 1; y < 3 ; y++) {
	$.each(ImgSource, function(i, val) {
		$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
	});
}
	$(Source + " div").click(OpenCard);
	ShuffleImages();
});