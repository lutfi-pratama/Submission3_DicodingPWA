var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BO1ri8S3XaQR5TyFfYSoO9FUZXs9irCfoIlr8rKxpbrf14-6BEaBYI0_1M5M-MzVdfh6E8qCotmVNHV12NlJi68",
   "privateKey": "aI9s2F2QXpTOr-ibgE3unFD6qT2GG49VMZs5qNehZiI"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cpLCB_pQuuc:APA91bE1KuRfNt99ym9yjI1C0I5YXZDrHjTOvEJsOWh54ss15-3bcp0WVeSJaGU-sXTvwBCLnbnXmyRJyDMY92vIekcYyG2B0p88R7mBXB0i15xYc-pkW6TBykd--oVxpcxoi_vvAM7_",
   "keys": {
       "p256dh": "BEmWB4a9Sjx7f9QPI/Ey1wxcFkozDB6ZBzQO7TotA1S8SRHeLskeiB5L9ytyIMPWWT9fQt/eOkOHTcSPFOlyBrY=",
       "auth": "7ZcJDfIJRbbuK8TxUPbRhA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!!!';
 
var options = {
   gcmAPIKey: '741241322251',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);