'use strict';

var request = require('request');

module.exports.logappdynamics = (event, context, callback) => {

  // SES EVENT TEMPLATE
//   {
//   "Records": [
//     {
//       "eventVersion": "1.0",
//       "ses": {
//         "mail": {
//           "commonHeaders": {
//             "from": [
//               "Jane Doe <janedoe@example.com>"
//             ],
//             "to": [
//               "johndoe@example.com"
//             ],
//             "returnPath": "janedoe@example.com",
//             "messageId": "<0123456789example.com>",
//             "date": "Wed, 7 Oct 2015 12:34:56 -0700",
//             "subject": "Test Subject"
//           },
//           "source": "janedoe@example.com",
//           "timestamp": "1970-01-01T00:00:00.000Z",
//           "destination": [
//             "johndoe@example.com"
//           ],
//           "headers": [
//             {
//               "name": "Return-Path",
//               "value": "<janedoe@example.com>"
//             },
//             {
//               "name": "Received",
//               "value": "from mailer.example.com (mailer.example.com [203.0.113.1]) by inbound-smtp.us-west-2.amazonaws.com with SMTP id o3vrnil0e2ic28trm7dfhrc2v0cnbeccl4nbp0g1 for johndoe@example.com; Wed, 07 Oct 2015 12:34:56 +0000 (UTC)"
//             },
//             {
//               "name": "DKIM-Signature",
//               "value": "v=1; a=rsa-sha256; c=relaxed/relaxed; d=example.com; s=example; h=mime-version:from:date:message-id:subject:to:content-type; bh=jX3F0bCAI7sIbkHyy3mLYO28ieDQz2R0P8HwQkklFj4=; b=sQwJ+LMe9RjkesGu+vqU56asvMhrLRRYrWCbVt6WJulueecwfEwRf9JVWgkBTKiL6m2hr70xDbPWDhtLdLO+jB3hzjVnXwK3pYIOHw3vxG6NtJ6o61XSUwjEsp9tdyxQjZf2HNYee873832l3K1EeSXKzxYk9Pwqcpi3dMC74ct9GukjIevf1H46hm1L2d9VYTL0LGZGHOAyMnHmEGB8ZExWbI+k6khpurTQQ4sp4PZPRlgHtnj3Zzv7nmpTo7dtPG5z5S9J+L+Ba7dixT0jn3HuhaJ9b+VThboo4YfsX9PMNhWWxGjVksSFOcGluPO7QutCPyoY4gbxtwkN9W69HA=="
//             },
//             {
//               "name": "MIME-Version",
//               "value": "1.0"
//             },
//             {
//               "name": "From",
//               "value": "Jane Doe <janedoe@example.com>"
//             },
//             {
//               "name": "Date",
//               "value": "Wed, 7 Oct 2015 12:34:56 -0700"
//             },
//             {
//               "name": "Message-ID",
//               "value": "<0123456789example.com>"
//             },
//             {
//               "name": "Subject",
//               "value": "Test Subject"
//             },
//             {
//               "name": "To",
//               "value": "johndoe@example.com"
//             },
//             {
//               "name": "Content-Type",
//               "value": "text/plain; charset=UTF-8"
//             }
//           ],
//           "headersTruncated": false,
//           "messageId": "o3vrnil0e2ic28trm7dfhrc2v0clambda4nbp0g1"
//         },
//         "receipt": {
//           "recipients": [
//             "johndoe@example.com"
//           ],
//           "timestamp": "1970-01-01T00:00:00.000Z",
//           "spamVerdict": {
//             "status": "PASS"
//           },
//           "dkimVerdict": {
//             "status": "PASS"
//           },
//           "processingTimeMillis": 574,
//           "action": {
//             "type": "Lambda",
//             "invocationType": "Event",
//             "functionArn": "arn:aws:lambda:us-west-2:012345678912:function:Example"
//           },
//           "spfVerdict": {
//             "status": "PASS"
//           },
//           "virusVerdict": {
//             "status": "PASS"
//           }
//         }
//       },
//       "eventSource": "aws:ses"
//     }
//   ]
// }

// Email Contents from IPaaS
// Subject: Fault in createAnyEntityService , Process ID : -4286886

// APPDYNAMICS LOG EVENT DETAIL
// application: iPaaS
// channel:  BWS_Rewards
// deviceType:   - 
// eventName: get Member Profile Information
// eventOutcome: Success
// eventTimestamp: 10/18/17 1:28:06 PM
// instanceId: 78703547392
// ipAddress: 10.10.10.10
// origin:  - 
// parentInstanceId: 78703545856
// parentProcessName: profileProcess[cid=78703545856]
// performanceLog: {"Status":"End Process","application_id":"profileProcess[cid=78703545856]"}, Start Time :2017-10-18T17:28:05.488Z, End Time :2017-10-18T17:28:06.297Z, Total Processing Time :PT0.809S / 0.809 Seconds
// pickupTimestamp: 10/18/17 1:28:06 PM
// processName: enericLogProcess
// runtime: 0
// serviceVersion: Ver1.0
// severity: Info
// transactionGuid: trans_guid_78703545856

// IPAAS ENDPOINT INPUT FIELDS
// inp_summary: text
// inp_flow: text
// inp_JSONRequest: text
// inp_JSONResponse: text
// inp_processstarttime: date/time
// inp_trans_guid: text
// inp_event_name: text
// inp_process_name: text
// inp_channel: text
// inp_ip_address: text
// inp_ipaas_parentinstance_id: number
// inp_service_version: text

  var subject = event.Records[0].ses.mail.commonHeaders.subject;
  var inp_process_name = subject.substring(19,subject.indexOf(",")+1);
  console.log ("inp_process_name substring: " + inp_process_name);

  var inp_flow = event.Records[0].ses.mail.commonHeaders.subject;
  var inp_JSONRequest = event;
  var inp_processstarttime = event.Records[0].ses.mail.timestamp;
  var inp_event_name = 

  // test data
  var payload = {
    "inp_summary": '"' + event.Records[0].ses.mail.commonHeaders.subject + '"',
    "inp_flow": text
    "inp_JSONRequest": text
    "inp_JSONResponse": text
    "inp_processstarttime": '"' + inp_processstarttime '"',
    "inp_trans_guid": text
    "inp_event_name": text
    "inp_process_name": "IPaaS Server Alert"
    "inp_channel": text
    "inp_ip_address": text
    "inp_ipaas_parentinstance_id": number
    "inp_service_version": text
  };

  // payload = JSON.parse(JSON.stringify(event, null, 2));
  console.log("Payload eventtype " + payload.toString());

  var options = {
    method: 'POST',
    // url: 'https://ps1w2.rt.informaticacloud.com/active-bpel/public/rt/001J5A/genericLogProcess'
    url: 'http://appdynamics.hotelgroup.com/controller/rest/applications/102/events',
    // url: 'http://demo.appdynamics.com/controller/rest/applications/5/events',
    headers: {  
      'Cache-Control': 'no-cache',
      // 'Authorization': 'reilljoh@customer1:Kasper52',
      'Content-Type': 'application/json'
    },
    json: {
      severity: payload.severity,
      summary: payload.summary,
      eventtype: payload.eventtype,
      customeventtype: payload.customeventtype,
      // propertynames: payload.propertynames,
      // propertyvalues: payload.propertyvalues,
      propertynames: [ 'key1', 'key2' ],
      propertyvalues: [ 'value1', 'value' ],
      verify: 'FALSE'
    }

  };

  console.log("Final Request Options:" + JSON.stringify(options));
  request(options, function (error, response, body) {

      console.log("Response from AppDynamics:" + response.toString());
      // console.log("Response from AppDynamics:" + JSON.stringify(response));
      var parsedBody = JSON.parse(body);
      console.log("parsedBody from Olson:" + parsedBody);
      console.log("Error1 from request: " + error);

      if(error) {
          console.log("Error2 from request: " + error);
      } else {
          console.log("Response Code/Body: " + response.statusCode, body);
      }

      console.log("Test1");
      // const response = {
      //   statusCode: 200,
      //   body: JSON.stringify({
      //     message: 'Go Serverless v1.0!: ' + parsedBody,
      //     input: event,
      //   }),
      // };

    callback(null, response);

  })



  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });

};
