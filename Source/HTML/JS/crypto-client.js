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

var MAX_SUPER_VALUE_POW = 2 * (1 << 30);

function GetHashWithValues(r,n,t,e)
{
    var o;
    return (o = e ? r : r.slice())[0] = 255 & n, o[1] = n >>> 8 & 255, o[2] = n >>> 16 & 255, o[3] = n >>> 24 & 255, o[4] = 255 & t,
    o[5] = t >>> 8 & 255, o[6] = t >>> 16 & 255, o[7] = t >>> 24 & 255, shaarr(o);
};

function GetPowPower(r)
{
    for(var n = 0, t = 0; t < r.length; t++)
    {
        var e = Math.clz32(r[t]) - 24;
        if(n += e, 8 !== e)
            break;
    }
    return n;
};

function GetPowValue(r)
{
    var n = 2 * (r[0] << 23) + (r[1] << 16) + (r[2] << 8) + r[3];
    return n = 256 * (n = 256 * n + r[4]) + r[5];
};

function CreateNoncePOWExtern(r,n,t,e)
{
    for(var o = [], a = 0; a < r.length; a++)
        o[a] = r[a];
    e || (e = 0);
    for(var i = 0, _ = MAX_SUPER_VALUE_POW, E = e; E <= e + t; E++)
    {
        var T = GetPowValue(GetHashWithValues(o, E, n, !0));
        T < _ && (i = E, _ = T);
    }
    return i;
};

function CreateHashBody(r,n,t)
{
    var e = r.length - 12;
    r[e + 0] = 255 & n, r[e + 1] = n >>> 8 & 255, r[e + 2] = n >>> 16 & 255, r[e + 3] = n >>> 24 & 255, r[e + 4] = 0, r[e + 5] = 0,
    r[(e = r.length - 6) + 0] = 255 & t, r[e + 1] = t >>> 8 & 255, r[e + 2] = t >>> 16 & 255, r[e + 3] = t >>> 24 & 255, r[e + 4] = 0,
    r[e + 5] = 0;
    for(var o = sha3(r), a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    i = 0; i < TR_TICKET_HASH_LENGTH; i++)
        a[i] = o[i];
    return WriteUintToArrOnPos(a, n, TR_TICKET_HASH_LENGTH), sha3(a);
};

function GetBlockNumTr(r)
{
    var n = 1 + GetCurrentBlockNumByTime();
    if(r[0] === TYPE_TRANSACTION_CREATE)
    {
        var t = 10 * Math.floor(n / 10);
        t < n && (t += 10), n = t;
    }
    return n;
};

function CreateHashBodyPOWInnerMinPower(r,n)
{
    var t = GetBlockNumTr(r);
    void 0 === n && (n = MIN_POWER_POW_TR + Math.log2(r.length / 128));
    for(var e = 0; ; )
    {
        if(n <= GetPowPower(CreateHashBody(r, t, e)))
            return e;
        ++e % 2e3 == 0 && (t = GetBlockNumTr(r));
    }
};

function CalcHashFromArray(r,n)
{
    void 0 === n && r.sort(CompareArr);
    for(var t = [], e = 0; e < r.length; e++)
        for(var o = r[e], a = 0; a < o.length; a++)
            t.push(o[a]);
    return 0 === t.length ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : 32 === t.length ? t : shaarr(t);
};

function GetArrFromValue(r)
{
    var n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    n[0] = 255 & r, n[1] = r >>> 8 & 255, n[2] = r >>> 16 & 255, n[3] = r >>> 24 & 255;
    var t = Math.floor(r / 4294967296);
    return n[4] = 255 & t, n[5] = t >>> 8 & 255, n;
};

function LoadLib(r)
{
    var n = document.createElement("script");
    n.type = "text/javascript", n.src = r, document.getElementsByTagName("head")[0].appendChild(n);
};

function IsMS()
{
    return 0 < window.navigator.userAgent.indexOf("MSIE ") || navigator.userAgent.match(/Trident.*rv\:11\./) ? 1 : 0;
};

function LoadSignLib()
{
    window.SignLib || (IsMS() ? (LoadLib("./JS/typedarray.js"), global = window, setTimeout(function ()
    {
        LoadLib("./JS/sign-lib-min.js");
    }, 200)) : LoadLib("./JS/sign-lib-min.js"));
};
window.TYPE_TRANSACTION_CREATE = 100, window.TR_TICKET_HASH_LENGTH = 10, window.MIN_POWER_POW_TR = 0, window.MIN_POWER_POW_ACC_CREATE = 0,
window.SetBlockChainConstant = function (r)
{
    var n = new Date - r.CurTime;
    r.DELTA_CURRENT_TIME || (r.DELTA_CURRENT_TIME = 0), window.DELTA_CURRENT_TIME2 = r.DELTA_CURRENT_TIME - n, window.MIN_POWER_POW_TR = r.MIN_POWER_POW_TR,
    window.MIN_POWER_POW_ACC_CREATE = r.MIN_POWER_POW_ACC_CREATE + 3, window.FIRST_TIME_BLOCK = r.FIRST_TIME_BLOCK, window.CONSENSUS_PERIOD_TIME = r.CONSENSUS_PERIOD_TIME,
    window.GetCurrentBlockNumByTime = function ()
    {
        var r = Date.now() + DELTA_CURRENT_TIME2 - FIRST_TIME_BLOCK;
        return Math.floor((r + CONSENSUS_PERIOD_TIME) / CONSENSUS_PERIOD_TIME);
    }, window.NWMODE = r.NWMODE;
}, window.GetCurrentBlockNumByTime = function ()
{
    return 0;
};
