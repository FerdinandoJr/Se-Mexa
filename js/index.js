
$(document).ready(function(){

    $(".lbtn").on('click', function(){href($(this))})
    $(".r-panel-back").on('mouseup touchend', function(){pageatual.find('.r-body').removeClass('r-panel-active');pageatual.find('.r-panel-show').removeClass('r-panel-show')});
    $(".r-menu-btn").on("click", function(){href($(this))})
    $("#btn-historico").on("click", function(){geraListaHistorico(historico)});
    $("#btn-calendario").on("click", function(){calendar()})
    $("#btn-relatorio").on("click", function(){
        const n = $("#relatorio").find('.r-list').length;
        for (let i = 1; i <= n; i++) {
            let e = $("#g"+i).find("span");
            if(e.length ==0){
                progress("g"+i, 35)
            }
        }
    })
    $("#geraName").on('click', function(){
        const n = $("#nomeUser").val();
        usuario.nome = (n!="") ? n: "Usuário";
     });
    $("#geraAtiv").on('click', function(){if(isChecked($("#minhasAtiv"))){geraAtiv();href($(this)) } attPontos(); attOfensivas(); });
    $('#geraSemana').on('click', function(){if(isChecked($("#diaSemana"))){geraSemana();href($(this))}});
    
    $("#startAtiv").on('click', function(){
        $(".r-ativ").removeClass("r-ativ-show")
        $("#tarefa").addClass("r-ativ-show")
    });
    
    $("#r-tarefa-neg, #stopAtiv").on('click', function(){
        $(".r-ativ").removeClass("r-ativ-show")
        $("#descanso").addClass("r-ativ-show")
    });

    $("#r-tarefa-ace").on('click', function(){
        $(".r-ativ").removeClass("r-ativ-show")
        $("#executando").addClass("r-ativ-show")
        let id = $("#selAtiv").find("select").val();
        if(parseInt(id) < 10){
            $("#escolhaAtiv").html(atividade[parseInt(id)].name);
        }else{
            var c = id.split(".");
            $("#escolhaAtiv").html(atividade[parseInt(c[0])].dados[parseInt(c[1])]);
        }
        
    });
    
    $("#r-tarefa-ace").on('click', function(){

    });

    $(document).on('click', '.deletAtiv', function(){if($('.r-input-btn').length > 1){$(this).parent().remove();}});

    $("#addOpt").on('click', function(){
        const d = geraOpt();
        $("#outraAtiv").append(d);
    });

    $("#outraActive").on('click', function(){if($(this).find('input').is(":checked")){$(".opAti").show();}else{$(".opAti").hide();}});
    

    progress("all", 36);
});

