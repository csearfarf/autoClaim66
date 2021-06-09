var lastClaimTime;
var d = new Date();
var currentTime = d.toLocaleString();
var firstRun = false;
function buttonSubmit(){
    if($('#tokens').val().length<1)
    {
        alert("You must input atleast one(1) token !")
    }else{
    // var sleep = time => new Promise(resolve => setTimeout(resolve, time))
    // var poll = (promiseFn, time) => promiseFn().then(
    //             sleep(time).then(() => poll(promiseFn, time)))
    // poll(() => new Promise(() => startClaim()), 1000)
    
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
    if($('#nextClaimTime').text() =='59:00' || $('#nextClaimTime').text() =='45:00' || $('#nextClaimTime').text() =='30:00' || $('#nextClaimTime').text() =='15:00'){
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
        token.forEach(function(tokenvalue) {
            var url = "https://api.muyan66.com/api/signlog/Signin";
            $.ajax({
               url: url,
               'async': true,
               cache:false,
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
                   'async': true,
                   cache:false,
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
                   // $('#debugDiv').append('<span>'+ result.data.money+ '</span><br/>');
                   totalBalances = totalBalances + parseFloat(result.data.money);
                   //console.log(totalBalances)
                   $('#totalBalance').text(parseFloat(totalBalances).toFixed(2));
                   $('#lastClaimTime').text(lastClaim);

                   var time = new Date();
                        time.setHours(time.getHours()+1);
                        nextClaimTime = time.getHours() +':'+time.getMinutes();
                        $('#nextClaimTime').text(nextClaimTime);
                });
                
            }).fail(function (error) {
                console.log(error)
            });

        //       (function worker() {
        //     var url = "https://api.muyan66.com/api/signlog/Signin";
        //     $.ajax({
        //         type: "GET",
        //         url: url,
        //         headers: {
        //             'Token': tokenvalue,
        //         },
        //         dataType: "JSON",
        //         success: function(result) {

        //             var date = new Date(eval(result.time * 1000));
        //             //$('#debugDiv').append('<span>'+tokenvalue+ " | " +date.toLocaleString()+ " | " + result.msg+ '</span><br/>');
        //             //checkBalance(tokenvalue);
        //             lastClaim = date.toLocaleTimeString();
        //             var resultClaim = '<span>'+date.toLocaleString()+ " | " + result.msg+ ' |</span>';
        //             var resultBal;
        //             var url = "https://api.muyan66.com/api/user/Info";
        //             $.ajax({
        //                 type: "GET",
        //                 url: url,
        //                 headers: {
        //                     'token': tokenvalue,
        //                 },
        //                 dataType: "JSON",
        //                 success: function(result) {
        //                     color = result.data.money < 4 ? "text-danger":"text-success";
        //                     resultBal='<span> # : <b class="text-info">'+ result.data.mobile+ '</b> |  New Balance : <b class="'+color+'">'+ result.data.money+ '</b> |  Token : <b class="text-secondary">'+ result.data.token+ '</b></span><br/>';
        //                     $('#debugDiv').append(resultClaim+resultBal);
                            
        //                     $('#debugDiv').animate({scrollTop: $('#debugDiv').prop("scrollHeight")}, 0);
        //                    // $('#debugDiv').append('<span>'+ result.data.money+ '</span><br/>');
        //                    totalBalances = totalBalances + parseFloat(result.data.money);
        //                    //console.log(totalBalances)
        //                    $('#totalBalance').text(parseFloat(totalBalances).toFixed(2));
        //                    $('#lastClaimTime').text(lastClaim);
        
        //                    var time = new Date();
        //                         time.setHours(time.getHours()+1);
        //                         nextClaimTime = time.getHours() +':'+time.getMinutes();
        //                         $('#nextClaimTime').text(nextClaimTime);
        //                 },
        //                 error: function() {
        //                     console.log('Error occured');
        //                 }
        //             });


        //         },
        //         complete: function() {
        //             // Schedule the next request when the current one's complete
        //             setTimeout(worker, 1000);
        //         },
        //         error: function() {
        //             console.log('Error occured');
        //         }
        //     });
        // })();
    
        })
     
}


function checkBalance(token){
    var url = "https://api.muyan66.com/api/user/Info";
    // $.ajax({
    //    url: url,
    //    'async': true,
    //    cache:false,
    //    type: 'GET',
    //    dataType: 'json',
    //    contentType: 'application/json; charset=utf-8'
    // }).done(function(result) {
    //     $('#debugDiv').append('<span>'+ result.data.money+ '</span><br/>');
    // });

    $.ajax({
        type: "GET",
        url: url,
        headers: {
            'Token': token,
        },
        dataType: "JSON",
        success: function(result) {
            $('#debugDiv').append('<span>'+ result.data.money+ '</span><br/>');
        },
        error: function() {
            alert('Error occured');
        }
    });

}



