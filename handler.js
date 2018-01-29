'use strict';

var request = require('request');


module.exports.parseCloudWatchLog = (event, context, callback) => {
  const payload = new Buffer(event.awslogs.data, 'base64');
  zlib.gunzip(payload, (err, res) => {
    if (err) {
      return callback(err);
    }
    const parsed = JSON.parse(res.toString('utf8'));
    console.log('Decoded payload:', JSON.stringify(parsed));
    callback(null, `Successfully processed ${parsed.logEvents.length} log events.`);
  });
};


module.exports.logsesemail = (event, context, callback) => {

  var subject = event.Records[0].ses.mail.commonHeaders.subject;
  var inp_process_name = subject.substring(19,subject.indexOf(",")+1);
  console.log ("inp_process_name substring: " + inp_process_name);

  var inp_flow = event.Records[0].ses.mail.commonHeaders.subject;
  var inp_JSONRequest = event;
  var inp_processstarttime = event.Records[0].ses.mail.timestamp;
  var inp_event_name = 

  payload = JSON.parse(JSON.stringify(event, null, 2));

  var logPayload = {
    json: [{
      transactionGuid: "123e4567-e89b-12d3-a456-426655440000",
      application: "IPaaS",
      applicationLog: "Log AWS Fault",
      eventName: event.processId,
      processName: event.processName,
      serviceVersion: "Ver1.0",
      channel: event.channel,
      ipAddress: event.ipAddress,
      eventOutcome: event.eventOutcome,
      summary: event.fault,
      deviceType: event.deviceType,
      severity: "Server_Error",
      origin: "Application",
      responseBody: event.responseBody,
      instanceId: event.instanceId,
      runtime:event.runtime
    }]
  };

  console.log("Payload eventtype " + payload.toString());

  ipaasFaultSendToAppDynamics(payload, function (error, response, responseBody) {
    const final = {
      statusCode: 200,
      body: JSON.stringify({
        responseBody
      })
    };
    console.log("Returned from IPaaS Endpoint in ipaasFaultApp: " + JSON.stringify(response));
    callback(null, final);
  }).catch(function(err) {
    console.log('An error occurred IPaaS Endpoint in ipaasFaultApp:', err.message);
    callback(null, err.message);
  });


};


module.exports.logcloudwatchtoappd = (event, context, callback) => {

  parsedEvent = parseCloudWatchLog(event,context,callback);

  var logPayload = {
    json: [{
      transactionGuid: "123e4567-e89b-12d3-a456-426655440000",
      application: "IPaaS",
      applicationLog: "Log AWS Fault",
      eventName: event.processId,
      processName: event.processName,
      serviceVersion: "Ver1.0",
      channel: event.channel,
      ipAddress: event.ipAddress,
      eventOutcome: event.eventOutcome,
      summary: event.fault,
      deviceType: event.deviceType,
      severity: "Server_Error",
      origin: "Application",
      responseBody: event.responseBody,
      instanceId: event.instanceId,
      runtime:event.runtime
    }]
  };

  console.log("Payload eventtype " + payload.toString());

  ipaasFaultSendToAppDynamics(logPayload, function (error, response, responseBody) {
    const final = {
      statusCode: 200,
      body: JSON.stringify({
        responseBody
      })
    };
    console.log("Returned from IPaaS Endpoint in ipaasFaultApp: " + JSON.stringify(response));
    callback(null, final);
  }).catch(function(err) {
    console.log('An error occurred IPaaS Endpoint in ipaasFaultApp:', err.message);
    callback(null, err.message);
  });

};


module.exports.ipaasFaultSendToAppDynamics = (payload, context, callback) => {

  var options = {
    method: 'POST',
    url: 'https://appdynamics-rqa.hotelgroup.com/events/publish/applicationdetail',
    headers:
    {
      'accept': 'application/json',
      'cache-control': 'no-cache',
      'content-type': 'application/vnd.appd.events+json;v=2',
      'X-Events-API-AccountName': 'customer1_f38c6e66-77bc-4296-8b86-f432abbad142',
      'X-Events-API-Key': '555d38d2-5028-4263-8eac-d846aebdc9ae'
    },
    json: [{
      transactionGuid: payload.transactionGuid,
      application: payload.application,
      applicationLog: payload.applicationLog,
      eventName: payload.processId,
      processName: payload.processName,
      serviceVersion: payload.serviceVersion,
      channel: payload.channel,
      ipAddress: payload.ipAddress,
      eventOutcome: payload.eventOutcome,
      summary: payload.fault,
      deviceType: payload.deviceType,
      severity: payload.severity,
      origin: payload.severity,
      responseBody: payload.responseBody,
      instanceId: payload.instanceId,
      runtime:payload.runtime
    }]
  };

  console.log("Payload eventtype " + payload.toString());

  request(options, function (error, response, responseBody) {
    if(error) {
      console.log("Error from request: " + error);
    } else {
      const final = {
        statusCode: 200,
        body: JSON.stringify({
          responseBody
        }),
      };
      console.log("Returned from IPaaS Endpoint in ipaasFaultApp: " + JSON.stringify(response));
      callback(null, final);
    }

  }).catch(function(err) {
    console.log('An error occurred:', err.message);
    callback(null, err.message);
  });

};


module.exports.ipaasHeartbeatOlson = (payload, context, callback) => {

  var options = {
    method: 'GET',
    url: 'https://operations.wyndhamrewards.com/trec/restconsumer/v1/promotion.do?code',
    headers:
    {
      'client_id': 'DT',
      'client_secret':'fmUsn87asd2cawf2k'
    }
  };

  request(options, function (error, response, responseBody) {

    var logPayload = {
      json: [{
        transactionGuid: "",
        application: "IPaaS",
        applicationLog: "Log AWS Fault",
        eventName: "HB:Olson Promo",
        processName: "Heartbeat",
        serviceVersion: "Ver1.0",
        channel: "Monitoring",
        ipAddress: "",
        // eventOutcome: "Error",
        summary: error,
        deviceType: "",
        severity: "Partner_Error",
        origin: "Application",
        responseBody: responseBody,
        instanceId: "",
        runtime:null
      }]
    };

    if (error) {

      console.log("Error from request: " + error);
      logPayload.eventOutcome = "Error";
      console.log("Payload HB Olson: " + logPayload.toString());

      ipaasFaultSendToAppDynamics(logPayload, function (error, response, responseBody) {
        const final = {
          statusCode: 200,
          body: JSON.stringify({
            responseBody
          })
        };
        console.log("Returned Error in ipaasHeartbeatOlson: " + JSON.stringify(response));
      }).catch(function(err) {
        console.log('An error occurred IPaaS Endpoint in ipaasFaultApp:', err.message);
      });

    } else {

      console.log("Error from request: " + response);
      logPayload.eventOutcome = "Success";
      console.log("Payload HB Olson: " + logPayload.toString());

      ipaasFaultSendToAppDynamics(logPayload, function (error, response, responseBody) {
        const final = {
          statusCode: 200,
          body: JSON.stringify({
            responseBody
          })
        };
        console.log("Returned Success in ipaasHeartbeatOlson: " + JSON.stringify(response));
      }).catch(function(err) {
        console.log('An error occurred IPaaS Endpoint in ipaasFaultApp:', err.message);
      });

    };

  });

};