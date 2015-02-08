angular.module('stroll.services', [])

.factory('Sinch', function(sinchKeys, $http) {
  // var sinchClient = new SinchClient({
  //   applicationKey: '<application_key>',
  //   capabilities: {messaging: true},
  // });
  // // Get the messageClient
  // var messageClient = sinchClient.getMessageClient();
  // // Create a new Message
  // var message = messageClient.newMessage('Alice', 'Hello World!');
  // // Success and fail handlers
  // var handleSuccess = function() {console.log('message sent');};
  // var handleFail = function() {console.log('message failed to send');};
  // // Alt 1: Send it with success and fail handler
  // // messageClient.send(message, handleSuccess, handleFail)
  // // Alt 2: Send it and append handlers using the promise returned

  // // var sendMessage = function() {
  // //   messageClient.send(message)
  // //   .then(handleSuccess)
  // //   .then(some_other_success)
  // //   .fail(handleFail);
  // // }

  var sendMessage = function(key, secret) {
    return $http({
      method: 'POST',
      url: '/sendSinchMessage',
      data: {
        key: sinchKeys.key,
        secret: sinchKeys.secret
      }
    })
  };

  // var sendMessage = function() {
    // console.log('send message called');
    // return $http({
    //   method: 'POST',
    //   url: 'https://messagingapi.sinch.com/v1/sms/19738655005',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*'
    //   },
    //   data: {
    //     "message":"TEST"
    //   },
    //   user:
    //     "application\\" + sinchKeys.key + ":" + sinchKeys.secret

    // })
    // .then(function(res) {
    //   console.log('res happened');
    //   return res;
    // })
    // .catch(function(error) {
    //   console.log('Error sending message');
    // });
  // };

  return {
    sendMessage: sendMessage
  };

});
