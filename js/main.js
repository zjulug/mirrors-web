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
//From MSDN!!!
function checkVersion()
{
	ver = getInternetExplorerVersion();
	if ( ver > -1 )
		if ( ver <= 10.0 ) 
			alert("You're using a ancient copy of Internet Explorer. Please upgrade it to IE 11 or newer version!");
}
checkVersion();
versionObj={}
versionObj.Ubuntu={
	"10.04":"lucid",
	"12.04":"precise",
	"13.04":"raring",
	"13.10":"saucy"
};
versionObj.Debian={
	"6 (Squeeze)":"squeeze",
	"7 (Wheezy)":"wheezy"
};
versionObj.ArchLinux={
	"All Versions":"all"
};
versionObj.Fedora={
	"19 (Schrödinger's Cat)":"Schrödinger's Cat",
	"20 (Heisenbug)":"Heisenbug"
};
versionObj.CentOS={
	"5":"5",
	"6":"6"
};
versionObj.LinuxMint={
	"13 Maya":"maya",
	"14 Nadia":"nadia",
	"16 Petra":"petra"
};
versionObj.Deepin={
	"12.06":"precise"
};
versionObj.openSUSE={
	"11.4":"11.4",
	"12.3":"12.3",
	"13.1":"13.1"
};
versionObj.Raspbian={
	"7 (Wheezy)":"wheezy"
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
		console.log (obj);
	}

	$(".version-menu a").click(loadSettings);
}
function doCalc()
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
function resCalc(e){
	e.preventDefault();
	$(".waiting").fadeIn(100);
	setTimeout(function(){
		$(".waiting").fadeOut(100);
	},700);
	setTimeout(doCalc,900);
}

$(".dist-selector a").click(loadMenuItems);
$(".build-btn").hide(0);
$(".build-result").hide(0);

$(".build-btn").click(resCalc);
$(".waiting").fadeOut(0);
