$(window).on('load resize',function(){
    $(document).ready(function(){
        if(window.innerWidth>1300){
            $('app-error').removeClass('col-sm-12').addClass('col-sm-10');     
            $('app-water-dispense').removeClass('col-sm-12').addClass('col-sm-10'); 
            $('app-transaction').removeClass('col-sm-12').addClass('col-sm-10');   
            $('app-supervisor').removeClass('col-sm-12').addClass('col-sm-10');
            $('app-operator').removeClass('col-sm-12').addClass('col-sm-10');
        }
        else if(window.innerWidth<=1300){
            $('app-error').addClass('col-sm-12');     
            $('app-water-dispense').addClass('col-sm-12'); 
            $('app-transaction').addClass('col-sm-12');   
            $('app-supervisor').addClass('col-sm-12');
            $('app-operator').addClass('col-sm-12');
        }
    });
});
    