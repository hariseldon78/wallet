/*
 * @project: TERA
 * @version: Development (beta)
 * @copyright: Yuriy Ivanov 2017-2019 [progr76@gmail.com]
 * @license: MIT (not for evil)
 * Web: http://terafoundation.org
 * GitHub: https://github.com/terafoundation/wallet
 * Twitter: https://twitter.com/terafoundation
 * Telegram: https://web.telegram.org/#/im?p=@terafoundation
*/

var BufIP, fs = require("fs");
require("./library.js");
var MapNames = {}, FileIp = "./SITE/DB/iplocation.db", FileNames = "./SITE/DB/locationnames.csv", Format = "{Value:uint32,Length:uint32, id:uint32, latitude:uint32, longitude:uint32}",
FormatStruct = {};

function SetGeoLocation(e)
{
    if(!e.ip || !BufIP || !BufIP.length)
        return !1;
    var t = IPToUint(e.ip), i = FindItem(BufIP, 20, t);
    return i && (e.latitude = i.latitude, e.longitude = i.longitude, e.name = MapNames[i.id]), e.Geo = 1, !0;
};

function ReadItem(e,t)
{
    return BufIP.len = e * t, BufLib.Read(BufIP, Format, void 0, FormatStruct);
};

function FindItem(e,t,i)
{
    var n, r = Math.trunc(e.length / t), a = (ReadItem(0, t), ReadItem(r, t), 0), u = r, o = Math.trunc(i * r / 4294967296);
    r <= o && (o = r - 1), o < a && (o = a);
    for(var f = 40; 0 < f; )
    {
        if(f--, !(n = ReadItem(o, t)))
            return void ToLog("GEO FindItem - Error read num: " + o);
        if(n.Value > i)
        {
            if(u = o - 1, 0 === (l = o - a))
                return ;
            o -= l = Math.trunc((1 + l) / 2);
        }
        else
            if(n.Value < i)
            {
                if(n.Value + n.Length >= i)
                    return n;
                var l;
                if(a = o + 1, 0 === (l = u - o))
                    return ;
                o += l = Math.trunc((1 + l) / 2);
            }
            else
                if(n.Value === i)
                    return n;
    }
};

function Init()
{
    if(fs.existsSync(FileIp) && fs.existsSync(FileNames))
    {
        BufIP = fs.readFileSync(FileIp);
        for(var e = fs.readFileSync(FileNames), t = 0; ; )
        {
            var i = e.indexOf("\n", t);
            if(i < 0)
                break;
            var n = e.toString("utf-8", t, i - 1);
            t = i + 1;
            var r = n.split(","), a = parseInt(r[0]);
            if(a)
            {
                0;
                var u = r[10];
                u || (u = r[7]), u || (u = r[5]), MapNames[a] = u;
            }
        }
    }
};

function IPToUint(e)
{
    var t = e.split(".");
    return 256 * (256 * (256 *  + t[0] +  + t[1]) +  + t[2]) +  + t[3];
};
global.SetGeoLocation = SetGeoLocation, Init();
