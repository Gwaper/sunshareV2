exports.generateMockData = (payload) => {
  let msg2 = {};
  let msg = {
    payload: payload
  }

  let secondMonth = 0;
  let onTime= new Date() 
  let timeNow = onTime - 365*24*60*60*1000 + (msg.payload - onTime)* 60;

  msg.timenow = timeNow;
  timeNow = new Date(timeNow);

  let SnSrSimul = {
    timestamp: 1524820844838,
    time: "2018-04-27T09:20:44.838Z",
    soutiridx: 7003029.282917704,
    injectidx: 39192296.51599542,
    prodidx: 33698025.71109029,
    autoconsoidx: 1505728.1950948501,
    prodmoyidx: 31432228.449570265,
    prodmaxidx: 55864457.89914053
  }

  let conso = 0;
  let soutir = 0;
  let inject = 0;
  let prod = 0;
  let autoconso = 0;

  let rand = Math.random()/5;
  let rand1 = Math.round(Math.random());

  let puis = 3;
  let productible = 1200;

  let annee = timeNow.getFullYear();
  let mois = timeNow.getMonth()+1 ;
  let jour = timeNow.getDate();
  let hours  = timeNow.getHours();
  let minutes = timeNow.getMinutes();
  let secondes = timeNow.getSeconds();

  let SunCal = [];
  SunCal.push([355,'20181221','084123','165620',0.294]);
  SunCal.push([21,'20180121','083301','173100',0.388]);
  SunCal.push([52,'20180221','074648','182127',0.758]);
  SunCal.push([80,'20180321','065008','190508',1.054]);
  SunCal.push([111,'20180421','064703','205123',1.3]);
  SunCal.push([141,'20180521','060050','213335',1.476]);
  SunCal.push([172,'20180621','054659','215758',1.576]);
  SunCal.push([202,'20180721','0601032','214333',1.541]);
  SunCal.push([233,'20180821','065224','205452',1.352]);
  SunCal.push([264,'20180921','073618','195045',1.107]);
  SunCal.push([294,'20181021','082049','184929',0.768]);
  SunCal.push([325,'20181121','080920','170347',0.392]);
  SunCal.push([355,'20181221','084123','165620',0.294]);
  SunCal.push([386,'20180121','083301','173100',0.388]);

  let LeverSoleil = new Date(annee, mois-1, jour, parseInt(SunCal[mois][2].substring(0,2)), parseInt(SunCal[mois][2].substring(2,4)), parseInt(SunCal[mois][2].substring(4,6)));
  let CoucherSoleil = new Date(annee, mois-1, jour, parseInt(SunCal[mois][3].substring(0,2)), parseInt(SunCal[mois][3].substring(2,4)), parseInt(SunCal[mois][3].substring(4,6)));

  if (jour < 21) {let secondMonth = mois - 1;}
      else {let secondMonth = mois + 1;}
  if (secondMonth == 13) {secondMonth= 1;}
  if (secondMonth === 0) {secondMonth= 12;}

  let dateNow = timeNow.getTime();
  let millidate = SnSrSimul.timestamp;

  if ((hours < 6 ) || (hours > 18)) {
    conso = ((dateNow - millidate)/1000)*rand;
  } else { 
    conso = ((dateNow - millidate)/1000) * 0.28 * (rand+rand1);
  }

  let prodmoy = Math.max((((dateNow - millidate)/(1000*60*60)) * (puis/2 * puis * 1000/2.3955 * (-1 * (Math.pow(((((hours*60+minutes)/60)-13)/7),2)) + 1))), 0);
  let prodmax = Math.max((((dateNow - millidate)/(1000*60*60)) * (puis * puis * 1000/2.3955 * (-1 * (Math.pow(((((hours*60+minutes)/60)-13)/7),2)) + 1))), 0);

  let CS = SunCal[mois][4];
  let CS2 = SunCal[secondMonth][4];
  CS = CS + ((21-jour)*(CS-CS2)/Math.abs(SunCal[secondMonth][0] - SunCal[mois][0]));
  let Jour100 = Math.round(100*(timeNow - LeverSoleil.getTime())/(CoucherSoleil.getTime() - LeverSoleil.getTime()));
  let parabole = 1 + (-1 * (Math.pow(((Jour100-50)/50 ), 2)));
  let facteurX = 3047.380505;

  let facteurP = puis * productible * facteurX /(365*24);
  let DeltaT = (dateNow - millidate)/(1000*60*60);
  prod = Math.max((DeltaT * facteurP * parabole * CS), 0);

  if (prod <= 0) {
    prod = 0;
    autoconso = 0;
    inject = 0;
    soutir = conso;
  } else {
    if (prod < conso) {
      soutir = conso - prod;
      inject = 0;
      autoconso = prod;
    } else {
      soutir = 0;
      autoconso =  conso;
      inject = prod - conso;
    }
  }

  SnSrSimul.timestamp = timeNow.getTime();
  SnSrSimul.time = timeNow;
  SnSrSimul.soutiridx = SnSrSimul.soutiridx + soutir;
  SnSrSimul.injectidx = SnSrSimul.injectidx + inject;
  SnSrSimul.prodidx = SnSrSimul.prodidx + prod;
  SnSrSimul.autoconsoidx = SnSrSimul.autoconsoidx + autoconso;
  SnSrSimul.prodmoyidx = SnSrSimul.prodmoyidx + prodmoy;
  SnSrSimul.prodmaxidx = SnSrSimul.prodmaxidx + prodmax;

  msg2.SnSrSimul = SnSrSimul;
  msg2.payload = 'SIMUL';
  msg2.count = SnSrSimul.prodidx;
  msg2.timenow = msg.timenow;

  return msg2;
}