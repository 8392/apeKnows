//--------将中国标准时间格式转化换成yy-mm-dd hh:mm:ss格式-----------
export const geTime_weWant = function (a) {
    //将中国标准时间格式转化换成yy-mm-dd hh:mm:ss格式
    let d = new Date(a);
    let month = d.getMonth() + 1;
    let data = d.getDate();
    if (month < 10) {
        month = "0" + (d.getMonth() + 1);
    }
    if (data < 10) {
        data = "0" + d.getDate();
    }

    let time =
        d.getFullYear() +
        "-" +
        month +
        "-" +
        data +
        " " +
        (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) +
        ":" +
        (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) +
        ":" +
        (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
    return time;
};
/**
 * 将数字格式化为金额显示格式（100,000.00）
 *例: 250000.01 返回金额格式字符串  250,000.01
 */
export const amountFormat = (num, type) => {
    var num = (num || 0)
        .toString()
        .replace(/\,/g, "")
        .split(".");
    let result = "";
    while (num[0].length > 3) {
        result = "," + num[0].slice(-3) + result;
        num[0] = num[0].slice(0, num[0].length - 3);
    }
    if (num[0]) {
        result = num[0] + result;
    }
    if (num.length > 1) {
        result +=
            "." +
            (num[1].length > 1
                ? num[1].substring(0, 2)
                : num[1].length == 1
                    ? num[1] + "0"
                    : "");
    } else if (num.length == 1 && type != 0) {
        result += ".00";
    }
    return result;
};

export const twoFloat = val => {
    let _v = (val || 0)
        .toString()
        .replace(/\,/g, "")
        .split(".");
    if (_v.length <= 1) {
        return _v[0] + ".00";
    } else {
        if (_v[1].length == 1) {
            return _v[0] + "." + _v[1] + "0";
        } else {
            return _v[0] + "." + _v[1].substr(0, 2);
        }
    }
};
/**
 * 处理时间差
 * @DateTime 2017-08-30
 * @version  [version]
 * @param    {[type]}   difference [毫秒]的数值
 * @return   {[type]}              返回多少天多少小时多少分多少秒
 */

export const timeConvert = difference => {
    let curDay = handlerSingleDigit(
        parseInt(difference / (1000 * 60 * 60 * 24), 10)
    ),
        curHours = handlerSingleDigit(
            parseInt((difference / (1000 * 60 * 60)) % 24, 10)
        ),
        curMinutes = handlerSingleDigit(
            parseInt((difference / (1000 * 60)) % 60, 10)
        ),
        curSeconds = handlerSingleDigit(parseInt((difference / 1000) % 60, 10));
    return {
        d: curDay,
        h: curHours,
        m: curMinutes,
        s: curSeconds
    };
};

/* 检测是否存在某个类名 */
export function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(" ") !== -1)
        throw new Error("className should not contain space.");
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
    }
}

/* 添加类名 */
export function addClass(el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || "").split(" ");

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else {
            if (!hasClass(el, clsName)) {
                curClass += " " + clsName;
            }
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}

/* 删除类名 */
export function removeClass(el, cls) {
    if (!el || !cls) return;
    var classes = cls.split(" ");
    var curClass = " " + el.className + " ";

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else {
            if (hasClass(el, clsName)) {
                curClass = curClass.replace(" " + clsName + " ", " ");
            }
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

//合并对象
export const merge = (...arg) => {
    if (arg.length == 0) {
        throw Error(`merge error=>请传入需要合并的对象`);
    }
    let target = arg[0] || {},
        depath = false,
        length = arg.length,
        i = 1;

    if (Object.prototype.toString.call(target) == "[object Boolean]") {
        depath = target;
        target = arg[i];
        i++;
    }

    if (typeof target !== "object") {
        target = {};
    }

    if (i == 2 && length <= 1) {
        throw Error(`merge error=>请传入需要合并的对象`);
    }

    for (; i < length; i++) {
        let source = arg[i] || {};
        if (source != null) {
            for (let key in source) {
                let src = target[key],
                    copy = source[key];
                if (target === copy) {
                    continue;
                }
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    if (
                        depath &&
                        copy &&
                        (isObject(copy) || Array.isArray(copy))
                    ) {
                        let clone;
                        if (Array.isArray(copy)) {
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && isObject(src) ? src : {};
                        }
                        target[key] = merge(depath, clone, copy);
                    } else if (copy !== void 0) {
                        target[key] = copy;
                    }
                }
            }
        }
    }
    return target;
};

//检索字符串str是否存在于ary数组中
export const arrayErgodic = (str, ary) => {
    let val;
    if (typeof str == "string" && ary instanceof Array) {
        val = ary.indexOf(str);
        val > -1 ? (val = true) : (val = false);
    } else {
        throw Error(`arrayErgodic error=>传值有误`);
    }
    return val;
};

/*
 *左匹配对象合并
 * 例：{a:1,b:2}与{b:3,c:4}左匹配合并为{a:1,b:3}
 * */
export const mergeLeft = (obj1, obj2) => {
    if (isObject(obj1) && isObject(obj2)) {
        Object.keys(obj1).map((item, index) => {
            Object.keys(obj2).map((item2, index2) => {
                if (item == item2) {
                    obj1[item] = obj2[item] || "";
                }
            });
        });
    } else {
        throw Error(`mergeLeft error=>请传入对象`);
    }
    return obj1;
};

//判断是否是对象
export const isObject = target => {
    return Object.prototype.toString.call(target) === "[object Object]";
};

//判断是否是空对象
export const isEmptyObject = obj => {
    for (let key in obj) {
        return false;
    }
    return true;
};
