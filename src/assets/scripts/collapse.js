check = false;
$(window).on('load resize scroll',function(){
    $(document).ready(function(){
        if(window.innerWidth>1300){
            class10();            
            $('.verticalNav').css({"opacity":"1"});
            $('#verticalCollapse').css({"maxWidth":"16.7%"})
            $('#toggleButton').html('');
            $('#settings').html('');
            check = true;
        }
        else if(window.innerWidth<=1300 ){
            if(check){
                $('.verticalNav').css({"opacity":"0"});
                $('#verticalCollapse').css({"maxWidth":"0%"});
                check =false;
            }
            class12()
            $('#settings').html('');;
            $('#toggleButton').html('<button  class="bars"><i class="fas fa-bars"></i></button>');
            $('.bars').css({
                "background":"none",
                "border":"none",
                "color":"white",
                "font-size":"1.2em"
            })
            if (window.innerWidth<=792){
                $('#settings').html('<button  class="user"><i class="fas fa-user-cog"></i></button>');                        
                $('.user').css({
                    "background":"none",
                    "border":"none",
                    "color":"white",
                    "font-size":"1.2em",
                    "margin-right":"10px"
                })
                if(check){
                    $('.verticalNav').css({"opacity":"0"});
                    $('#verticalCollapse').css({"maxWidth":"0%"});
                    check =false;                    
                }            
            }
        }

    });
});



class12=function (){
    $('.components').addClass('col-sm-12');     
}
class10=function (){
    $('.components').removeClass('col-sm-12').addClass('col-sm-10');     
    $('#verticalCollapse').removeClass('col-sm-3');   
}
class3_9=function (){
    $('.components').removeClass('col-sm-12').removeClass('col-sm-10').addClass('col-sm-9');     
    $('#verticalCollapse').addClass('col-sm-3');

}