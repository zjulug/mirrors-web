#!/usr/bin/env python3
# by vxst

import pystache
import os


def get_status():
    dist_list = os.listdir("/srv/mirrors/status")
    result = {}
    for item in dist_list:
        with open(os.path.join("/srv/mirrors/status", item), "r") as status:
            result[item] = status.read()
    return result


if __name__ == "__main__":
    with open("index.mustache", "r") as template,\
            open("index.html", "w") as html:
        html.write(pystache.render(template.read(), get_status()))
