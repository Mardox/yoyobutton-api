// ******************************************/
// YoYoButton JS library 
// ------------------------------------------
// Wrritten by: Mardox
// 22/10/2013
// ******************************************/ 
//  Usage:
//  var myYoYouButton = new YoYoButton(sandbox, api_key);
//  myYoYoButton.open(email, security_token);   
//  
//  *****************************************/



    //constructor to set the init variables
    //sandbox : true/false
    //apikey : live key 
    var YoYoButton = function(sandbox, apikey){
        this.sand_box_mode = sandbox;
        this.user_email = email;
        this.api_key = apikey;
        this.handeled = false;

        if(this.sand_box_mode){
            //sandbox + sandbox API key
            this.main_url = 'http://sandbox.yoyobutton.com/mobile/wallet?api=b37f6860-0e3c-488d-807c-ece631401739';
        }else{
            //live
            this.main_url = 'http://mobile.yoyobutton.com/mobile/wallet?api='+this.api_key;
        }
    }; 

    //open the yoyobutton wallet
    // email : user's email
    // security token : generated by generate_security_token function
    // ------------------------------
    // returns: void
    // opens the webview (wallet)
    YoYoButton.prototype.openWallet = function (email, security_token){

        var main_url = this.main_url;
        var iabRef;  // Global InAppBrowser reference
       
        iabRef = window.open(encodeURI(main_url+'&email='+email+'&security='+security_token), '_blank', 'location=no');
        iabRef.addEventListener('loadstart', iabLoadStart);
        iabRef.addEventListener('exit', iabClose);
    };

    //security code token generator
    // returns: generated security token
    YoYoButton.prototype.generateSecurityToken = function() {
        var delim = "-";
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
    };

    //inAPPBrowser Close event
    function iabClose(event){
        iabRef.removeEventListener('loadstart', iabClose);
        iabRef.removeEventListener('exit', iabClose);
        window.history.back();
    }

    //inAppBrowser Load Start Check 
    function iabLoadStart(event){
         var href = event.url;
         var segment = href.substr(href.lastIndexOf('/') + 1);
         if (segment == 'close'){
            iabRef.close();           
         }
    }

    //email validator
    function isEmail(email){
        var x=email;
        var atpos=x.indexOf("@");
        var dotpos=x.lastIndexOf(".");
        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
            return false;
        }
        return true;
    }
