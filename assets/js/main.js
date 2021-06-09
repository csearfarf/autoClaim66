var lastClaimTime;
var d = new Date();
var currentTime = d.toLocaleString();
var firstRun = false;
function buttonSubmit(){
    if($('#tokens').val().length<1)
    {
        alert("You must input atleast one(1) token !")
    }else{
    
  showRemaining();
    }

}

function getTimeRemaining() {
    var t = Date.now();
    var seconds = (60 - Math.floor(t % 6e4 / 1e3)) % 60;
    var minutes = 60 - Math.ceil(t % 3.6e6 / 6e4) + (seconds? 0:1);
    return {
      'minutes': ('0' + minutes).slice(-2),
      'seconds': ('0' + seconds).slice(-2)      };
  }
  
  // Simple show remaining function
  function showRemaining() {
    var r = getTimeRemaining();
    var remainingTime;
    if(!firstRun){
        startClaim();
        firstRun=true;
    }
    
    remainingTime = (r.minutes + ':' + ('0' + r.seconds).slice(-2));
    $('#nextClaimTime').text(remainingTime);
    //console.log(remainingTime)
    if($('#nextClaimTime').text() =='59:50' || $('#nextClaimTime').text() =='59:30' || $('#nextClaimTime').text() =='59:10' || $('#nextClaimTime').text() =='54:50'){
        startClaim();
    }
    // Run again just after next full second
    setTimeout(showRemaining, 1020 - (Date.now() % 1000));
  }

function startClaim(){
    $("#debugDiv").html("");
    var token = $('#tokens').val().split('\n');
    var totalBalances = 0;
    var lastClaim ;
    var nextClaimTime;
    var successClaimCount = 0;
    $('#totalSimCount').text(token.length);
        token.forEach(function(tokenvalue) {
            var url = "https://api.muyan66.com/api/signlog/Signin";
            $.ajax({
               url: url,
               type: 'GET',
               dataType: 'json',
               headers: {
                   'Token': tokenvalue,
                   'accept-language': "zh-en",
                   'content-type': "application/json; charset=UTF-8",
                   'accept': "application/json",
                   'x-requested-with': "XMLHttpRequest",
               },
               contentType: 'application/json; charset=utf-8'
            }).done(function(result) {
                var date = new Date(eval(result.time * 1000));
                //$('#debugDiv').append('<span>'+tokenvalue+ " | " +date.toLocaleString()+ " | " + result.msg+ '</span><br/>');
                //checkBalance(tokenvalue);
                lastClaim = date.toLocaleTimeString();
                var resultClaim = '<span>'+date.toLocaleString()+ " | " + result.msg+ ' |</span>';
                var resultBal;
                var url = "https://api.muyan66.com/api/user/Info";
                $.ajax({
                   url: url,
                   type: 'GET',
                   dataType: 'json',
                   headers: {
                        'token': tokenvalue,
                        'accept-language': "zh-en",
                        'content-type': "application/json; charset=UTF-8",
                        'accept': "application/json",
                        'x-requested-with': "XMLHttpRequest",
                    },
                   contentType: 'application/json; charset=utf-8'
                }).done(function(result) {
                   color = result.data.money < 4 ? "text-danger":"text-success";
                   resultBal='<span> # : <b class="text-info">'+ result.data.mobile+ '</b> |  New Balance : <b class="'+color+'">'+ result.data.money+ '</b> |  Token : <b class="text-secondary">'+ result.data.token+ '</b></span><br/>';
              $('#debugDiv').append(resultClaim+resultBal);
                    
                    $('#debugDiv').animate({scrollTop: $('#debugDiv').prop("scrollHeight")}, 0);
                   totalBalances = totalBalances + parseFloat(result.data.money);
                   $('#totalBalance').text(parseFloat(totalBalances).toFixed(2));
                   $('#lastClaimTime').text(lastClaim);
                   successClaimCount++;
                   $('#totalSim').text(successClaimCount);
                   var time = new Date();
                        time.setHours(time.getHours()+1);
                        nextClaimTime = time.getHours() +':'+time.getMinutes();
                        $('#nextClaimTime').text(nextClaimTime);
                });
                
            }).fail(function (error) {
                console.log(error)
            });

    
        })
     
}



