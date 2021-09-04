function getInternetExplorerVersion() {
	var rv = -1;
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat(RegExp.$1);
	}
	return rv;
}
function checkVersion() {
	ver = getInternetExplorerVersion();
	if (ver > -1)
		if (ver <= 10.0)
			alert("You're using a ancient copy of Internet Explorer.");
}
checkVersion();
versionObj = {}
versionObj.Ubuntu = {
	"14.04 LTS": "trusty",
	"16.04 LTS": "xenial",
	"18.04 LTS": "bionic",
	"20.04 LTS": "focal",
	"20.10": "groovy",
	"21.04": "hirsute",
	"21.10": "impish"
};
versionObj.Debian = {
	"7 (Wheezy)": "wheezy",
	"8 (Jessie)": "jessie",
	"9 (Stretch)": "stretch",
	"10 (Buster)": "buster",
	"11 (Bullseye)": "bullseye",
	"Next Stable (testing)": "testing",
	"Sid": "sid"
};
versionObj.ArchLinux = {
	"All Versions": "all",
};
versionObj.Fedora = {
	"27 (TwentySeven)": "TwentySeven",
	"28 (TwentyEight)": "TwentyEight"
};
versionObj.CentOS = {
	"6": "6",
	"7": "7",
	"8": "8"
};
versionObj.LinuxMint = {
	"All Versions": "all",
	// "17 Qiana": "qiana",
	// "17.1 Rebecca": "rebecca",
	// "17.2 Rafaela": "rafaela",
	// "17.3 Rosa": "rosa",
	// "18 Sarah": "sarah",
	// "18.1 Serena": "serena",
	// "18.2 Sonya": "sonya",
	// "18.3 Sylvia": "sylvia",
	// "19 Tara": "tara"
};
versionObj.openSUSE = {
	"15.2": "15.2",
	"Leap 42.3": "Leap"
};
versionObj.Raspbian = {
	// "7 (Wheezy)": "wheezy",
	// "8 (Jessie)": "jessie",
	"9 (Stretch)": "stretch",
	"10 (Buster)": "buster",
	"11 (Bullseye)": "bullseye",
	"12 (Bookworm)": "bookworm"
};


var dist;
var version;
function loadSettings(e) {
	e.preventDefault();
	$(".version-val").text(e.target.innerHTML);

	dist = $(".dist-val").text();
	version = versionObj[dist][$(".version-val").text()];

	$(".build-btn").show(0);
	$(".build-result").hide(0);
}
function loadMenuItems(e) {
	e.preventDefault();
	$(".dist-val").text(e.target.innerHTML);
	$(".version-menu").empty();
	$(".version-val").text("请选择版本");
	$(".build-btn").hide(0);
	$(".build-result").hide(0);

	for (var obj in versionObj[e.target.innerHTML]) {
		$(".version-menu").append($("<li><a href='#'>" + obj + "</a></li>"));
	}

	$(".version-menu a").click(loadSettings);
}
function generateConfig() {
	$(".build-helper-text").text(builder.getHelperText(dist, version));
	var ctxt = builder.getCodeText(dist, version);
	if (ctxt == "!!NO_CONFIG!!") {
		$(".build-code-text").hide(0);
	} else {
		$(".build-code-text").text(ctxt);
		$(".build-code-text").show(0);
	}
	$(".build-result").show(500);
}
function delayedConfig(e) {
	e.preventDefault();
	$(".waiting").fadeIn(100);
	setTimeout(function () {
		$(".waiting").fadeOut(100);
	}, 100);
	setTimeout(generateConfig, 300);
}

$(".dist-selector a").click(loadMenuItems);
$(".build-btn").hide(0);
$(".build-result").hide(0);

$(".build-btn").click(delayedConfig);
$(".waiting").fadeOut(0);
