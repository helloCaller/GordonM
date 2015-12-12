var pubnub = PUBNUB({
    subscribe_key: 'sub-c-03f3177c-9c7e-11e5-b829-02ee2ddab7fe', // always required
    publish_key: 'pub-c-8c19144e-3d5a-4e5b-8442-f56d8721b99c'    // only required if publishing
});

function publish() {
pubnub.publish({
    channel: 'GMflash',        
    message:  flashcontrol = {
                color: "red"},
    callback : function(m){console.log(m)}
});
    console.log("fired");
}