function getInternetExplorerVersion()
{
	var rv = -1;
	if (navigator.appName == 'Microsoft Internet Explorer')
	{
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat( RegExp.$1 );
	}
	return rv;
}
function checkVersion()
{
	ver = getInternetExplorerVersion();
	if ( ver > -1 )
		if ( ver <= 10.0 ) 
			alert("You're using a ancient copy of Internet Explorer.");
}
checkVersion();
versionObj={}
versionObj.Ubuntu={
	"12.04":"precise",
	"14.04":"trusty",
	"16.04":"xenial",
	"16.10":"yakkety"
};
versionObj.Debian={
	"6 (Squeeze)":"squeeze",
	"7 (Wheezy)":"wheezy",
	"8 (Jessie)":"jessie",
	"9 (Stretch)":"stretch"
};
versionObj.ArchLinux={
	"All Versions":"all"
};
versionObj.Fedora={
	"22 (TwentyTwo)": "TwentyTwo",
	"23 (TwentyThree)": "TwentyThree",
	"24 (TwentyFour)": "TwentyFour"
};
versionObj.CentOS={
	"5":"5",
	"6":"6",
	"7":"7"
};
versionObj.LinuxMint={
	"17 Qiana":"qiana",
	"17.1 Rebecca": "rebecca",
	"17.2 Rafaela": "rafaela",
	"17.3 Rosa": "rosa",
	"18 Sarah": "sarah",
	"18.1 Serena": "serena"
};
/*
 * We stoped support for Deepin generator because
 * Deepin use a version number different from underlying
 * codename, which seems to make the upgraded deepin system
 * and original deepin system has different codename and
 * repos.
 *
versionObj.Deepin={
	"12.06":"precise"
};*/
versionObj.openSUSE={
	"13.1":"13.1",
	"13.2":"13.2",
	"Leap 42.1":"Leap"
};
versionObj.Raspbian={
	"7 (Wheezy)":"wheezy",
	"8 (Jessie)":"jessie",
	"9 (Stretch)":"stretch"
};


var dist;
var version;
function loadSettings(e){
	e.preventDefault();
	$(".version-val").text(e.target.innerHTML);

	dist=$(".dist-val").text();
	version=versionObj[dist][$(".version-val").text()];

	$(".build-btn").show(0);
	$(".build-result").hide(0);
}
function loadMenuItems(e)
{
	e.preventDefault();
	$(".dist-val").text(e.target.innerHTML);
	$(".version-menu").empty();
	$(".version-val").text("请选择版本");
	$(".build-btn").hide(0);
	$(".build-result").hide(0);

	for(var obj in versionObj[e.target.innerHTML]){
		$(".version-menu").append($("<li><a href='#'>"+obj+"</a></li>"));
	}

	$(".version-menu a").click(loadSettings);
}
function generateConfig()
{
	$(".build-helper-text").text(builder.getHelperText(dist,version));
	var ctxt=builder.getCodeText(dist,version);
	if(ctxt=="!!NO_CONFIG!!"){
		$(".build-code-text").hide(0);
	}else{
		$(".build-code-text").text(ctxt);
		$(".build-code-text").show(0);
	}
	$(".build-result").show(500);
}
function delayedConfig(e){
	e.preventDefault();
	$(".waiting").fadeIn(100);
	setTimeout(function(){
		$(".waiting").fadeOut(100);
	},100);
	setTimeout(generateConfig,300);
}

$(".dist-selector a").click(loadMenuItems);
$(".build-btn").hide(0);
$(".build-result").hide(0);

$(".build-btn").click(delayedConfig);
$(".waiting").fadeOut(0);
