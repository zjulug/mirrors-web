var build, builder, centos, debian, deepin, epel, fedora, ubuntu;

build = {};

ubuntu = {};

ubuntu.line = function(val, release) {
  return "" + val + " http://mirrors.zju.edu.cn/ubuntu " + release + " main universe restricted multiverse\n";
};

ubuntu.block = function(val, release) {
  return ubuntu.line(val, release) + ubuntu.line(val, "" + release + "-security") + ubuntu.line(val, "" + release + "-updates") + ubuntu.line(val, "" + release + "-backports");
};

build.ubuntu = function(release) {
  return ubuntu.block("deb", release) + ubuntu.block("deb-src", release);
};

debian = {};

debian.line = function(val, flag, release) {
  return "" + val + " http://mirrors.zju.edu.cn/debian" + flag + " " + release + " main non-free contrib\n";
};

debian.block = function(val, release) {
  return debian.line(val, '/', release) + debian.line(val, '/', "" + release + "-proposed-updates") + debian.line(val, '-security/', "" + release + "/updates") + debian.line(val, '-multimedia/', "" + release + "-backports");
};

build.debian = function(release) {
  return debian.block("deb", release) + debian.block("deb-src", release);
};

deepin = {};

deepin.line = function(val, release) {
  return "" + val + " http://mirrors.zju.edu.cn/deepin " + release + " main non-free\n";
};

deepin.block = function(val, release) {
  return deepin.line(val, release) + deepin.line(val, "" + release + "-updates");
};

build.deepin = function(release) {
  return ubuntu.block('deb', release) + ubuntu.block('deb-src', release) + deepin.block('deb', release) + deepin.block('deb-src', release);
};

centos = {};

centos.singleBlock = function(name, url, version) {
  return "[" + name + "]\nname=CentOS-$releasever - " + (name.substr(0, 1).toUpperCase() + name.substr(1)) + "\nbaseurl=http://mirrors.zju.edu.cn/centos/$releasever/" + url + "/$basearch/\ngpgcheck=1\ngpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-" + version + "\n\n";
};

build.centos = function(release) {
  return centos.singleBlock('base', 'os', release) + centos.singleBlock('updates', 'updates', release) + centos.singleBlock('extras', 'extras', release) + centos.singleBlock('centosplus', 'centosplus', release) + centos.singleBlock('contrib', 'contrib', release);
};

epel = {};

epel.singleBlock = function(name, url, version) {
  return "[" + name + "]\nname=Extra Packages for Enterprise Linux " + version + " - $basearch " + (name.toUpperCase()) + "\nbaseurl=http://mirrors.zju.edu.cn/epel/" + version + "/$basearch" + url + "\nenabled=1\ngpgcheck=1\ngpgkey=http://mirrors.zju.edu.cn/epel/RPM-GPG-KEY-EPEL-" + version + "\n\n";
};

build.epel = function(release) {
  return epel.singleBlock('epel', '', release) + epel.singleBlock('epel-debuginfo', '/debug', release) + epel.singleBlock('epel-source', '/SRPMS', release);
};

fedora = {};

fedora.singleBlock = function(name, url, system) {
  return "[" + name + "]\nname=Fedora $releasever - $basearch\nbaseurl=http://mirrors.zju.edu.cn/fedora/" + system + "/$releasever/" + url + "/\nenabled=1\ngpgcheck=1\ngpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$basearch\n\n";
};

build.fedora = function(what) {
  return fedora.singleBlock("fedora", "Everything/$basearch/os", "releases") + fedora.singleBlock("fedora-debuginfo", "Everything/$basearch/debug", "releases") + fedora.singleBlock("fedora-source", "Everything/source/SRPMS", "releases") + fedora.singleBlock("updates", "$basearch", "updates") + fedora.singleBlock("updates-debuginfo", "$basearch/debug", "updates") + fedora.singleBlock("updates-source", "SRPMS", "updates");
};

build.archlinux = function(what) {
  return "Server = http://mirrors.zju.edu.cn/archlinux/$repo/os/$arch";
};

builder = {};

builder.getCodeText = function(dist, version) {
  if (!(build[dist.toLowerCase()] != null)) {
    return "!!NO_CONFIG!!";
  } else {
    return build[dist.toLowerCase()](version);
  }
};
