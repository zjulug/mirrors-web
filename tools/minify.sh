#!/bin/bash

cat js/jquery.min.js js/bootstrap.js js/maker.js js/helper.js js/waiting.js js/main.js|java -jar tools/yuicompressor-2.4.8.jar -o release/all.min.js --type js --line-break 80
cat css/*.css|java -jar tools/yuicompressor-2.4.8.jar -o release/all.min.css --type css --line-break 80
cp index.html release/index.html
