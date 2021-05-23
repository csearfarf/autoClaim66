var lastClaimTime;
var d = new Date();
var currentTime = d.toLocaleString();

function buttonSubmit(){
    if($('#tokens').val().length<1)
    {
        alert("You must input atleast one(1) token !")
    }else{
    var sleep = time => new Promise(resolve => setTimeout(resolve, time))
    var poll = (promiseFn, time) => promiseFn().then(
                sleep(time).then(() => poll(promiseFn, time)))
    poll(() => new Promise(() => startClaim()), 1000)
    }

}

function startClaim(){
    var token = $('#tokens').val().split('\n');
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
               },
               contentType: 'application/json; charset=utf-8'
            }).done(function(result) {
                var date = new Date(eval(result.time * 1000));
                $('#debugDiv').append('<span>'+tokenvalue+ " | " +date.toLocaleString()+ " | " + result.msg+ '</span><br/>');
                $('#debugDiv').animate({scrollTop: $('#debugDiv').prop("scrollHeight")}, 0);
            }).fail(function (error) {
                var date = new Date(eval(error.responseJSON.time * 1000));
                $('#debugDiv').append('<span>'+tokenvalue+ " | " +date.toLocaleString()+ " | " + error.responseJSON.msg+ '</span><br/>');
                $('#debugDiv').animate({scrollTop: $('#debugDiv').prop("scrollHeight")}, 0);
            });
    
        })
}



