if(builder==null)
	builder={};
textDebianLike="请将/etc/apt/sources.list替换为下述内容";
textCentLike="请删除/etc/yum.repos.d/fedora.repo和/etc/yum.repos.d/fedora-updates.repo，然后在/etc/yum.repos.d目录中建立fedora.repo文件，并填入下列内容"
textCent="请删除/etc/yum.repos.d中的所有文件，然后在/etc/yum.repos.d目录中建立CentOS.repo文件，并填入下列内容"
textArch="请将/etc/pacman.d/mirrorlist替换为以下内容"

builder.getHelperText=function(dist,version){
	if(dist=="Ubuntu"||dist=="Debian"||dist=="Deepin"){
		return textDebianLike;
	}else if(dist=='Fedora'){
		return textCentLike;
	}else if(dist=="CentOS"){
		return textCent;
	}else if(dist=="ArchLinux"){
		return textArch;
	}else if(dist=="OpenSuSE"){
		return "打开YaST点击Software分组中的Software Repositories，在打开的窗口上方的列表中点击openSUSE-"+version+"-Non-Oss，点击Edit将download.opensuse.org替换为mirrors.zju.edu.cn/opensuse，点OK。再用同样的方法编辑openSUSE-"+version+"-Oss和openSUSE-"+version+"-Update";
	}else if(dist=="LinuxMint"){
		return "打开Software Manager，点击Edit⇒Software Sources，在Download from中选择Other，选择China⇒mirrors.zju.edu.cn，点击Choose Server即可";
	}
}
