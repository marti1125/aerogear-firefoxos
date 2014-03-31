 (function() {
     var endpoint, endpointRequest, SPClient, UPClient;

     // config params for UnifiedPush server
     var variantId = "0d5b3eb4-84aa-4381-a1a3-7a4fd712b130";
     var variantSecret = "b13df3c1-12d5-4632-83b5-b483b52d6ecd";
     var unifiedPushUrl = "https://aerogear-sgmes.rhcloud.com/";
     var simplePushUrl = "https://aerogear-sgmes.rhcloud.com/";

      // create the 'UnifiedPush' client object:
     UPClient = AeroGear.UnifiedPushClient(variantId, variantSecret, unifiedPushUrl + "/rest/registry/device");

     // onConnect callback function called when SimplePush
     // successfully establishes connection to the server
     function spConnect() {

         // use 'PushManager' to request a new PushServer URL endpoint for 'Mail' notifications:
         endpointRequest = navigator.push.register();
          // the DOMRequest returns 'successfully':
         endpointRequest.onsuccess = function( event ) {
             // extract the endpoint object from the event:
             endpoint = event.target.result;

             // if it is the first registration, need to register
             // the 'pushEndpoint' with the UnifiedPush server.
             if ( endpoint.pushEndpoint ) {
                 // assemble the metadata for registration with the UnifiedPush server
                 var metadata = {
                     deviceToken: mailEndpoint.channelID,
                     simplePushEndpoint: mailEndpoint.pushEndpoint
                 };

                 var settings = {
                     success: function() {
                        //success handler
                        alert('Success')
                     },
                     error: function() {
                        //error handler
                     }
                 };

                 settings.metadata = metadata;

                 // register with the server
                 UPClient.registerWithPushServer(settings);
             } else {
                 console.log("'Endpoint' was already registered!");
             }
         };
         // set the notification handler:
         navigator.setMessageHandler( "push", function( message ) {
             if ( message.channelID === mailEndpoint.channelID ) {
                 // let's react on the endpoint
             }
         });
     }

     // onClose callback function:
     function spClose() {
         $("#reconnect").show();
         $("#appendTextArea").html("\nConnection Lost!\n");
     }

    SPClient = AeroGear.SimplePushClient({
         simplePushServerURL: simplePushUrl,
         onConnect: spConnect,
         onClose: spClose
    });

 })();