'use strict';

var request = require('request');

module.exports.ipaasHeartbeatOlson = (payload, context, callback) => {

  var logPayload;
  var urlOlson = "https://operations.wyndhamrewards.com/trec/restconsumer/v1/promotion.do?code=";
  var urlAppDynamics = "https://ps1w2.rt.informaticacloud.com/active-bpel/public/rt/001J5A/AppDynamicsAnalyticsLoggingProcess";
  var endResponse = "";

  var optionsOlsonPromo = {
    method: 'GET',
    url: urlOlson,
    headers:
    {
      'client_id': 'DT',
      'client_secret':'fmUsn87asd2cawf2k'
    }
  };

  request(optionsOlsonPromo, function (error, response, responseBody) {

    console.log ("Calling: " + urlOlson);
    console.log ("Response from Olson: " + JSON.stringify(response));
    console.log ("ResponseBody from Olson: " + JSON.stringify(responseBody));
    console.log ("Error from Olson: " + JSON.stringify(error));

    if (error) {
      endResponse = "Error";
      console.log ("ipaasHeartbeatOlson Error: " + error.message);
      console.log ("End Response Error: " + endResponse);
    } else {
      endResponse = "Success";
      console.log ("ipaasHeartbeatOlson: Success");
      console.log ("End Response Success: " + endResponse);
    }

    var options = {
      method: 'POST',
      url: urlAppDynamics,
      headers: 
       { 'Cache-Control': 'no-cache',
         'Content-Type': 'application/json' },
      body: 
       { in_trans_guid: 12345,
         in_event_name: 'HB_Olson_Promo',
         in_process_name: 'HB_Olson',
         in_ipass_parentinstance_id: 10000,
         in_channel: 'TEST',
         in_runtime: 1000,
         in_ip_address: '10.10.10.10',
         in_event_outcome: endResponse,
         in_flow: "Start" },
      json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });

  });
  
}

