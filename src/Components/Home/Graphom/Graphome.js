import React, { useState, useEffect } from 'react';
import { XYPlot, ArcSeries } from 'react-vis';
import '../../../../node_modules/react-vis/dist/style.css';
import axios from 'axios';

export default function Graphome() {

  const tableauEnergie = [{
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527120461580,
    time: "2018-05-24T00:07:41.580Z",
    soutiridx: 7114205.96287611,
    injectidx: 39514502.392657034,
    prodidx: 34213013.29219721,
    autoconsoidx: 1698509.8995402209,
    prodmoyidx: 31905274.201101813,
    prodmaxidx: 56810549.40220363
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527132273720,
    time: "2018-05-24T03:24:33.720Z",
    soutiridx: 7116234.955246287,
    injectidx: 39514502.392657034,
    prodidx: 34213013.29219721,
    autoconsoidx: 1698509.8995402209,
    prodmoyidx: 31905274.201101813,
    prodmaxidx: 56810549.40220363
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527144115920,
    time: "2018-05-24T06:41:55.920Z",
    soutiridx: 7116510.388970531,
    injectidx: 39514502.392657034,
    prodidx: 34216406.61532297,
    autoconsoidx: 1701903.222665981,
    prodmoyidx: 31909103.711903315,
    prodmaxidx: 56818208.42380663
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527155988180,
    time: "2018-05-24T09:59:48.180Z",
    soutiridx: 7116510.388970531,
    injectidx: 39519518.15141127,
    prodidx: 34222086.95748488,
    autoconsoidx: 1702567.8060736554,
    prodmoyidx: 31915168.116677467,
    prodmaxidx: 56830337.23335493
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527167890500,
    time: "2018-05-24T13:18:10.500Z",
    soutiridx: 7116510.388970531,
    injectidx: 39525259.730600335,
    prodidx: 34227888.03509359,
    autoconsoidx: 1702627.3044933032,
    prodmoyidx: 31920708.37719144,
    prodmaxidx: 56841417.75438288
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527179822820,
    time: "2018-05-24T16:37:02.820Z",
    soutiridx: 7116510.388970531,
    injectidx: 39525647.47186638,
    prodidx: 34231617.35228478,
    autoconsoidx: 1705968.8804184494,
    prodmoyidx: 31922926.13501826,
    prodmaxidx: 56845853.27003652
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527191785200,
    time: "2018-05-24T19:56:25.200Z",
    soutiridx: 7116746.478596579,
    injectidx: 39525647.47186638,
    prodidx: 34231617.35228478,
    autoconsoidx: 1705968.8804184494,
    prodmoyidx: 31922926.13501826,
    prodmaxidx: 56845853.27003652
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527203777640,
    time: "2018-05-24T23:16:17.640Z",
    soutiridx: 7118209.209539127,
    injectidx: 39525647.47186638,
    prodidx: 34231617.35228478,
    autoconsoidx: 1705968.8804184494,
    prodmoyidx: 31922926.13501826,
    prodmaxidx: 56845853.27003652
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527215800140,
    time: "2018-05-25T02:36:40.140Z",
    soutiridx: 7119430.96879919,
    injectidx: 39525647.47186638,
    prodidx: 34231617.35228478,
    autoconsoidx: 1705968.8804184494,
    prodmoyidx: 31922926.13501826,
    prodmaxidx: 56845853.27003652
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527227852700,
    time: "2018-05-25T05:57:32.700Z",
    soutiridx: 7120273.54480366,
    injectidx: 39525647.47186638,
    prodidx: 34234375.14085861,
    autoconsoidx: 1708726.6689922814,
    prodmoyidx: 31925942.047385838,
    prodmaxidx: 56851885.094771676
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527239935260,
    time: "2018-05-25T09:18:55.260Z",
    soutiridx: 7120273.54480366,
    injectidx: 39530607.13318256,
    prodidx: 34239860.44703479,
    autoconsoidx: 1709252.3138522725,
    prodmoyidx: 31931875.01312517,
    prodmaxidx: 56863751.02625034
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527252047880,
    time: "2018-05-25T12:40:47.880Z",
    soutiridx: 7120273.54480366,
    injectidx: 39536488.19223316,
    prodidx: 34245898.51305002,
    autoconsoidx: 1709409.3208169,
    prodmoyidx: 31937837.21492929,
    prodmaxidx: 56875675.42985858
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527264190560,
    time: "2018-05-25T16:03:10.560Z",
    soutiridx: 7120273.54480366,
    injectidx: 39537359.79853011,
    prodidx: 34250249.14326865,
    autoconsoidx: 1712888.3447385808,
    prodmoyidx: 31940875.678026553,
    prodmaxidx: 56881752.35605311
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527276363300,
    time: "2018-05-25T19:26:03.300Z",
    soutiridx: 7121608.361839869,
    injectidx: 39537359.79853011,
    prodidx: 34250492.94826492,
    autoconsoidx: 1713132.14973485,
    prodmoyidx: 31940875.678026553,
    prodmaxidx: 56881752.35605311
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527288566100,
    time: "2018-05-25T22:49:26.100Z",
    soutiridx: 7122263.400660905,
    injectidx: 39537359.79853011,
    prodidx: 34250492.94826492,
    autoconsoidx: 1713132.14973485,
    prodmoyidx: 31940875.678026553,
    prodmaxidx: 56881752.35605311
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527300799020,
    time: "2018-05-26T02:13:19.020Z",
    soutiridx: 7122292.519524528,
    injectidx: 39537359.79853011,
    prodidx: 34250492.94826492,
    autoconsoidx: 1713132.14973485,
    prodmoyidx: 31940875.678026553,
    prodmaxidx: 56881752.35605311
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527313061940,
    time: "2018-05-26T05:37:41.940Z",
    soutiridx: 7123848.937080595,
    injectidx: 39537359.79853011,
    prodidx: 34252717.29479407,
    autoconsoidx: 1715356.4962639953,
    prodmoyidx: 31943490.063971642,
    prodmaxidx: 56886981.127943285
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527325354920,
    time: "2018-05-26T09:02:34.920Z",
    soutiridx: 7123848.937080595,
    injectidx: 39538710.38250912,
    prodidx: 34258108.45339191,
    autoconsoidx: 1719397.0708828268,
    prodmoyidx: 31949398.351887476,
    prodmaxidx: 56898797.70377495
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527337677960,
    time: "2018-05-26T12:27:57.960Z",
    soutiridx: 7123848.937080595,
    injectidx: 39541058.1391351,
    prodidx: 34264277.747740805,
    autoconsoidx: 1723218.6086057385,
    prodmoyidx: 31955552.746057667,
    prodmaxidx: 56911106.49211533
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527350031060,
    time: "2018-05-26T15:53:51.060Z",
    soutiridx: 7123848.937080595,
    injectidx: 39541602.3429481,
    prodidx: 34268818.908048026,
    autoconsoidx: 1727215.5650999607,
    prodmoyidx: 31958861.652325194,
    prodmaxidx: 56917724.30465039
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527362414220,
    time: "2018-05-26T19:20:14.220Z",
    soutiridx: 7125686.015786417,
    injectidx: 39541602.3429481,
    prodidx: 34269065.98527647,
    autoconsoidx: 1727462.6423284058,
    prodmoyidx: 31958861.652325194,
    prodmaxidx: 56917724.30465039
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527374827440,
    time: "2018-05-26T22:47:07.440Z",
    soutiridx: 7127877.683671364,
    injectidx: 39541602.3429481,
    prodidx: 34269065.98527647,
    autoconsoidx: 1727462.6423284058,
    prodmoyidx: 31958861.652325194,
    prodmaxidx: 56917724.30465039
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527387270720,
    time: "2018-05-27T02:14:30.720Z",
    soutiridx: 7128068.82488839,
    injectidx: 39541602.3429481,
    prodidx: 34269065.98527647,
    autoconsoidx: 1727462.6423284058,
    prodmoyidx: 31958861.652325194,
    prodmaxidx: 56917724.30465039
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527399744060,
    time: "2018-05-27T05:42:24.060Z",
    soutiridx: 7128068.82488839,
    injectidx: 39543750.182072,
    prodidx: 34271517.71255941,
    autoconsoidx: 1727766.5304874505,
    prodmoyidx: 31961639.15541773,
    prodmaxidx: 56923279.31083546
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527412247400,
    time: "2018-05-27T09:10:47.400Z",
    soutiridx: 7128068.82488839,
    injectidx: 39548662.16516885,
    prodidx: 34277068.076885186,
    autoconsoidx: 1728404.9117163753,
    prodmoyidx: 31967716.010245446,
    prodmaxidx: 56935433.02049089
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527424780860,
    time: "2018-05-27T12:39:40.860Z",
    soutiridx: 7128068.82488839,
    injectidx: 39554620.99473028,
    prodidx: 34283268.45807958,
    autoconsoidx: 1728646.4633493347,
    prodmoyidx: 31973892.740372404,
    prodmaxidx: 56947786.48074481
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527437344380,
    time: "2018-05-27T16:09:04.380Z",
    soutiridx: 7128068.82488839,
    injectidx: 39558749.45352171,
    prodidx: 34287596.93719609,
    autoconsoidx: 1728846.4836744145,
    prodmoyidx: 31976900.042763367,
    prodmaxidx: 56953801.085526735
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527449937960,
    time: "2018-05-27T19:38:57.960Z",
    soutiridx: 7128114.8308494985,
    injectidx: 39558749.45352171,
    prodidx: 34287596.93719609,
    autoconsoidx: 1728846.4836744145,
    prodmoyidx: 31976900.042763367,
    prodmaxidx: 56953801.085526735
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527462561540,
    time: "2018-05-27T23:09:21.540Z",
    soutiridx: 7130234.840932121,
    injectidx: 39558749.45352171,
    prodidx: 34287596.93719609,
    autoconsoidx: 1728846.4836744145,
    prodmoyidx: 31976900.042763367,
    prodmaxidx: 56953801.085526735
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527475215180,
    time: "2018-05-28T02:40:15.180Z",
    soutiridx: 7132554.839500742,
    injectidx: 39558749.45352171,
    prodidx: 34287596.93719609,
    autoconsoidx: 1728846.4836744145,
    prodmoyidx: 31976900.042763367,
    prodmaxidx: 56953801.085526735
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527487898820,
    time: "2018-05-28T06:11:38.820Z",
    soutiridx: 7133149.282165616,
    injectidx: 39558749.45352171,
    prodidx: 34290651.23516018,
    autoconsoidx: 1731900.7816385068,
    prodmoyidx: 31980384.833429184,
    prodmaxidx: 56960770.66685837
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527500612520,
    time: "2018-05-28T09:43:32.520Z",
    soutiridx: 7133149.282165616,
    injectidx: 39564116.15916727,
    prodidx: 34296578.512406416,
    autoconsoidx: 1732461.35323919,
    prodmoyidx: 31986796.009810247,
    prodmaxidx: 56973593.01962049
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527513356280,
    time: "2018-05-28T13:15:56.280Z",
    soutiridx: 7133149.282165616,
    injectidx: 39565975.78004314,
    prodidx: 34302695.67232777,
    autoconsoidx: 1736718.8922846687,
    prodmoyidx: 31992758.8158688,
    prodmaxidx: 56985518.6317376
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527526130100,
    time: "2018-05-28T16:48:50.100Z",
    soutiridx: 7133218.997695137,
    injectidx: 39565975.78004314,
    prodidx: 34306466.59961643,
    autoconsoidx: 1740489.81957333,
    prodmoyidx: 31994848.2552002,
    prodmaxidx: 56989697.5104004
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527538933920,
    time: "2018-05-28T20:22:13.920Z",
    soutiridx: 7135020.499071816,
    injectidx: 39565975.78004314,
    prodidx: 34306466.59961643,
    autoconsoidx: 1740489.81957333,
    prodmoyidx: 31994848.2552002,
    prodmaxidx: 56989697.5104004
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527551767800,
    time: "2018-05-28T23:56:07.800Z",
    soutiridx: 7136280.737387249,
    injectidx: 39565975.78004314,
    prodidx: 34306466.59961643,
    autoconsoidx: 1740489.81957333,
    prodmoyidx: 31994848.2552002,
    prodmaxidx: 56989697.5104004
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527564631740,
    time: "2018-05-29T03:30:31.740Z",
    soutiridx: 7136921.75845814,
    injectidx: 39565975.78004314,
    prodidx: 34306466.59961643,
    autoconsoidx: 1740489.81957333,
    prodmoyidx: 31994848.2552002,
    prodmaxidx: 56989697.5104004
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527577525680,
    time: "2018-05-29T07:05:25.680Z",
    soutiridx: 7136942.10319562,
    injectidx: 39565975.78004314,
    prodidx: 34310576.90911275,
    autoconsoidx: 1744600.1290696508,
    prodmoyidx: 31999470.084807903,
    prodmaxidx: 56998941.169615805
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527590449680,
    time: "2018-05-29T10:40:49.680Z",
    soutiridx: 7136942.10319562,
    injectidx: 39568553.37795629,
    prodidx: 34316888.06863175,
    autoconsoidx: 1748333.6906754978,
    prodmoyidx: 32006198.687332194,
    prodmaxidx: 57012398.37466439
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527603404040,
    time: "2018-05-29T14:16:44.040Z",
    soutiridx: 7136942.10319562,
    injectidx: 39574315.73578068,
    prodidx: 34322679.79067868,
    autoconsoidx: 1748363.054898039,
    prodmoyidx: 32011486.30383536,
    prodmaxidx: 57022973.60767072
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527616388160,
    time: "2018-05-29T17:53:08.160Z",
    soutiridx: 7136942.10319562,
    injectidx: 39575528.18561925,
    prodidx: 34325212.376138926,
    autoconsoidx: 1749683.1905197152,
    prodmoyidx: 32011710.264021125,
    prodmaxidx: 57023421.52804225
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527629402280,
    time: "2018-05-29T21:30:02.280Z",
    soutiridx: 7137434.947498437,
    injectidx: 39575528.18561925,
    prodidx: 34325212.376138926,
    autoconsoidx: 1749683.1905197152,
    prodmoyidx: 32011710.264021125,
    prodmaxidx: 57023421.52804225
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527642446460,
    time: "2018-05-30T01:07:26.460Z",
    soutiridx: 7138059.456273082,
    injectidx: 39575528.18561925,
    prodidx: 34325212.376138926,
    autoconsoidx: 1749683.1905197152,
    prodmoyidx: 32011710.264021125,
    prodmaxidx: 57023421.52804225
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527655520700,
    time: "2018-05-30T04:45:20.700Z",
    soutiridx: 7138059.456273082,
    injectidx: 39576292.62937289,
    prodidx: 34326444.914328456,
    autoconsoidx: 1750151.2849556026,
    prodmoyidx: 32013093.866566714,
    prodmaxidx: 57026188.73313343
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527668625000,
    time: "2018-05-30T08:23:45.000Z",
    soutiridx: 7138059.456273082,
    injectidx: 39577315.17457822,
    prodidx: 34331688.093233116,
    autoconsoidx: 1754371.9186549303,
    prodmoyidx: 32018976.349090457,
    prodmaxidx: 57037953.698180914
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527681759360,
    time: "2018-05-30T12:02:39.360Z",
    soutiridx: 7138059.456273082,
    injectidx: 39583723.11118938,
    prodidx: 34338194.539068,
    autoconsoidx: 1754470.4278786473,
    prodmoyidx: 32025680.661409333,
    prodmaxidx: 57051362.32281867
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527694923780,
    time: "2018-05-30T15:42:03.780Z",
    soutiridx: 7138059.456273082,
    injectidx: 39588377.448190466,
    prodidx: 34343093.37983979,
    autoconsoidx: 1754714.9316493617,
    prodmoyidx: 32029453.195606105,
    prodmaxidx: 57058907.39121221
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527708118260,
    time: "2018-05-30T19:21:58.260Z",
    soutiridx: 7139112.590427469,
    injectidx: 39588377.448190466,
    prodidx: 34343352.62926117,
    autoconsoidx: 1754974.1810707396,
    prodmoyidx: 32029453.195606105,
    prodmaxidx: 57058907.39121221
  },
  {
    starttime: "2019-04-28T10:54:40.779Z",
    timestamp: 1527721342740,
    time: "2018-05-30T23:02:22.740Z",
    soutiridx: 7141683.866332501,
    injectidx: 39588377.448190466,
    prodidx: 34343352.62926117,
    autoconsoidx: 1754974.1810707396,
    prodmoyidx: 32029453.195606105,
    prodmaxidx: 57058907.39121221
  }]

  const autoConso= (tableauEnergie[0].autoconsoidx - tableauEnergie[0].injectidx) + (tableauEnergie[47].autoconsoidx - tableauEnergie[47].injectidx);
  const consoTotal = (autoConso + (tableauEnergie[47].soutiridx - tableauEnergie[0].soutiridx ))/1000;
  const autoconsoTotal = consoTotal - ((tableauEnergie[0].autoconsoidx + tableauEnergie[47].autoconsoidx) / 1000);
  const injectTotal = consoTotal - ((tableauEnergie[0].soutiridx + tableauEnergie[47].soutiridx) / 1000);

console.log(autoConso);

return (
    <div className="App">
      <XYPlot
        xDomain={[-3, 3]}
        yDomain={[-3, 3]}
        width={300}
        getAngle={d => d.time}
        getAngle0={d => 0}
        height={300}
      >
        {/* <ArcSeries
          animation={{
            damping: 9,
            stiffness: 300
          }}
          radiusDomain={[0, 3]}
          data={[
            { time: (seconds / 60) * 2 * PI, radius0: 1, radius: 1.5, color: 0 },
            {
              time: (minutes / 60) * 2 * PI,
              radius0: 1.6,
              radius: 2.1,
              color: 1
            }
          ]}
        /> */}
      </XYPlot>
    </div>
  )
}
 // const PI = Math.PI;
  // let time = 1050;
  // const seconds = time % 60;
  // const minutes = (time / 60) % 60;
  // const hours = (time / (60 * 24)) % 24;
