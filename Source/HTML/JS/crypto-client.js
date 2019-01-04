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
    var _;
    return (_ = e ? r : r.slice())[0] = 255 & n, _[1] = n >>> 8 & 255, _[2] = n >>> 16 & 255, _[3] = n >>> 24 & 255, _[4] = 255 & t,
    _[5] = t >>> 8 & 255, _[6] = t >>> 16 & 255, _[7] = t >>> 24 & 255, shaarr(_);
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
    for(var _ = [], o = 0; o < r.length; o++)
        _[o] = r[o];
    e || (e = 0);
    for(var E = 0, T = MAX_SUPER_VALUE_POW, a = e; a <= e + t; a++)
    {
        var i = GetPowValue(GetHashWithValues(_, a, n, !0));
        i < T && (E = a, T = i);
    }
    return E;
};

function CreateHashBody(r,n,t)
{
    var e = r.length - 12;
    r[e + 0] = 255 & n, r[e + 1] = n >>> 8 & 255, r[e + 2] = n >>> 16 & 255, r[e + 3] = n >>> 24 & 255, r[e + 4] = 0, r[e + 5] = 0,
    r[(e = r.length - 6) + 0] = 255 & t, r[e + 1] = t >>> 8 & 255, r[e + 2] = t >>> 16 & 255, r[e + 3] = t >>> 24 & 255, r[e + 4] = 0,
    r[e + 5] = 0;
    for(var _ = sha3(r), o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    E = 0; E < TR_TICKET_HASH_LENGTH; E++)
        o[E] = _[E];
    return WriteUintToArrOnPos(o, n, TR_TICKET_HASH_LENGTH), sha3(o);
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
        for(var _ = r[e], o = 0; o < _.length; o++)
            t.push(_[o]);
    return 0 === t.length ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : 32 === t.length ? t : shaarr(t);
};

function GetArrFromValue(r)
{
    var n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    n[0] = 255 & r, n[1] = r >>> 8 & 255, n[2] = r >>> 16 & 255, n[3] = r >>> 24 & 255;
    var t = Math.floor(r / 4294967296);
    return n[4] = 255 & t, n[5] = t >>> 8 & 255, n;
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
        return Math.trunc((r + CONSENSUS_PERIOD_TIME) / CONSENSUS_PERIOD_TIME);
    }, window.NWMODE = r.NWMODE;
}, window.GetCurrentBlockNumByTime = function ()
{
    return 0;
};
