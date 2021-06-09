var lastClaimTime;
var d = new Date();
var currentTime = d.toLocaleString();

function buttonSubmit(){
    // if($('#tokens').val().length<1)
    // {
    //     alert("You must input atleast one(1) token !")
    // }else{
    // var sleep = time => new Promise(resolve => setTimeout(resolve, time))
    // var poll = (promiseFn, time) => promiseFn().then(
    //             sleep(time).then(() => poll(promiseFn, time)))
    // poll(() => new Promise(() => startClaim()), 1000)
    // }
    startClaim();

}

function startClaim(){
    var token = $('#tokens').val().split('\n');
    //var tokenlist = [];
        token.forEach(function(accountNum) {
            var url = "https://api.muyan66.com/api/user/login?account="+accountNum+"&password=csearfarf"
            $.ajax({
               url: url,
               'async': true,
               cache:false,
               type: 'GET',
               dataType: 'json',
               contentType: 'application/json; charset=utf-8'
            }).done(function(result) {
                console.table(result.data.userinfo)
                //var date = new Date(eval(result.time * 1000));
                $('#debugDiv').append('<span>'+accountNum+ " | " +result.data.userinfo.token + " | " + result.data.userinfo.money+ '</span><br/>');
                $('#debugDiv').animate({scrollTop: $('#debugDiv').prop("scrollHeight")}, 0);


                $('#tokenDiv').append('<span>'+result.data.userinfo.token +'</span><br/>');
                $('#tokenDiv').animate({scrollTop: $('#tokenDiv').prop("scrollHeight")}, 0);
                //tokenlist.push(result.data.userinfo.token);
            }).fail(function (error) {
                v//ar date = new Date(eval(error.responseJSON.time * 1000));
                $('#debugDiv').append('<span>'+accountNum+ " | " +error.data.token + " | " + error.data.money+ '</span><br/>');
                $('#debugDiv').animate({scrollTop: $('#debugDiv').prop("scrollHeight")}, 0);
            });
    
        })
}



