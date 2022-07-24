var diaSemana= [];
var pageatual = $("#page0");
var nameUser = "Usuário";
const usuario = {
    "nome": "Usuário",
    "pontos": 45,
    "ofensivas": 3,
};

const atividade = {
    0:{
        "name":"Alongar", 
        "value" : 10,
    },
    1:{
        "name":"Caminhar", 
        "value" : 20,
    },
    2:{
        "name":"Correr", 
        "value" : 25,
    },
    3:{
        "name":"CrossFit", 
        "value" : 30,
    },
    4:{
        "name":"Exercícios Casa", 
        "value" : 15,
    },
    5:{
        "name":"Funcional", 
        "value" : 20,
    },
    6:{
        "name":"Ioga", 
        "value" : 20,
    },
    7:{
        "name":"Musculação", 
        "value" : 25,
    },
    8:{
        "name":"Nadar", 
        "value" : 20,
    },
    9:{
        "name":"Pedalar", 
        "value" : 15,
    },
    10:{
        "name":"Outros", 
        "value" : 15,
        "dados": [],
    },
};


const historico = {
    0:{
        "nome" : "Alongar",
        "realizado" : true,
        "data": "10/05/2022",
    },
    1:{
        "nome" : "Pedalar",
        "realizado" : false,
        "data": "13/05/2022",
    },
    2:{
        "nome" : "Musculação",
        "realizado" : true,
        "data": "16/05/2022",
    },
    3:{
        "nome" : "Alongar",
        "realizado" : true,
        "data": "19/05/2022",
    },
}

function panel(h=false){
    if(!h){
        pageatual.removeClass("r-panel-open")
        pageatual.find('.r-body').removeClass('r-panel-active')
        $(".r-panel-show").removeClass("r-panel-show")
    }else{
        pageatual.addClass("r-panel-open")
        pageatual.find('.r-body').addClass('r-panel-active')
        h.addClass('r-panel-show');
    }
}

function href(t){ //Trocar Telas
    const h = (t.attr('h') != undefined) ? $("#"+t.attr('h')): t;
    if(pageatual.find(h).length){
        panel(h);
    }else if(h.length){
        panel();
        pageatual.removeClass('r-active');
        pageatual = h;
        pageatual.addClass('r-active');
    }

    return pageatual;
}

function addHistorico(hist, atv, r, data){
    if (hist==undefined || atv ==undefined || !r || !data) return undefined;
    hist.push({"nome": atv.name, "realizado": r, "data": data});
    return hist;
}

function addOfensivas(user){
    if (user.ofensivas == undefined) return 0;
    user.ofensivas += 1;
    return user;
}

function addPontosAtividades(user, pt){
    if (user.pontos == undefined || pt == undefined) return 0;
    user.pontos = user.pontos + pt;
    return user;
}

function concluiuAtividade(r, data, user, atv, hist){
    if (atv.value == undefined || user.pontos == undefined) return false;
    if(r===true){
        addPontosAtividades(user, atv.value);
        addOfensivas(user);
    }
    geraListaHistorico(addHistorico(hist, atv, r, data));
    
    return user;
}

function showLoading(t){
    if(t){
        $("#load").show()
    }else{
        setTimeout(() => {$("#load").hide()}, 0);
    }
}

function diasNoMes(mes, ano) {
    var data = new Date(ano, mes + 1, 0);
    return data.getDate();
}

function day(d="", m=""){
    return (d=="") ? "<span class='jzdb'></span>" : "<span "+m+">"+d+"</span>";
}

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function calendar(){
    const today= new Date();
    $("#data_atual").html(meses[today.getMonth()]+" "+today.getFullYear());
    const date = new Date(today.getFullYear(), today.getMonth());
    const dias = diasNoMes(date.getMonth(), date.getFullYear())
    const c = $('#calendario');
    c.find("span").not(".r-calendar-day").remove()
    let d = 0;
    let h = "";
    for (let i = 0; i < 42; i++) {
        if((date.getDay() == i && d==0) || (d>0 && d<dias)){
            d++;
            let m = (diaSemana[i]=="0") ? '' : (d > today.getDate()) ? "class='r-calendar-yellow'": "class='r-calendar-green'";
            m +=(d == today.getDate()) ? " id='today'": ""; 
            h = day(d, m);
        }else{
            h = day();
        }
        c.append(h);
    }
    let v = true;
    for (let i = 48; 41 < i; i--) {
        let obj = c.find("span").eq(i);
        if(obj.is(".jzdb")){obj.addClass("jzdba")
        }else{v=false;i=0;}
    }
    if(v){$(".jzdba").remove();}else{$(".jzdba").removeClass("jzdba")}

}

function progress(ele ="", porc =""){
    
    if (ele == "" || porc == ""){ return false;}

    var el = document.getElementById(ele);
    
    if(el == undefined) return false;

    var options = {
        percent:  porc,
        size: el.getAttribute('data-size'),
        lineWidth: el.getAttribute('data-line'),
        rotate: el.getAttribute('data-rotate')
    }


    var canvas = document.createElement('canvas');
    var span = document.createElement('span');
    canvas.className = "canvaPorc";
    span.className = "spanPorce";
    span.textContent = options.percent + '%';
        
    if (typeof(G_vmlCanvasManager) !== 'undefined') {G_vmlCanvasManager.initElement(canvas);}
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.height = options.size;
    el.appendChild(span);
    el.appendChild(canvas);
    ctx.translate(options.size / 2, options.size / 2);
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);
    var radius = (options.size - options.lineWidth) / 2;
    var drawCircle = function(color, lineWidth, percent) {
            percent = Math.min(Math.max(0, percent || 1), 1);
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
            ctx.strokeStyle = color;
            ctx.lineCap = 'round';
            ctx.lineWidth = lineWidth
            ctx.stroke();
    };

    drawCircle('#fff0', options.lineWidth, 100 / 100);
    drawCircle('#4269cf', options.lineWidth, options.percent / 100);
    return el;
}

function geraSemana(){
    var a = $("#diaSemana");
    var b = a.find("label").find("input");
    var s = "";
    for (let i = 0; i < 7; i++){s += ""+ (b.eq(i).is(":checked") ? 1 : 0);}
    s = s.repeat(6)
    diaSemana = s.split('');

    return diaSemana;
}   

function geraAtiv(ativ){
    var a = $("#minhasAtiv");
    var b = a.find("label").find("input");
    let div = '<select id="selectAtiv" style="text-align: center;color: #7950f5;text-transform: uppercase;">';                            
    
    for (let i = 0; i < b.length - 1; i++){
        let d = (b.eq(i).is(":checked") ? 1 : 0);
        atividade[i].value = d;
        if(d==1){div += '<option value="'+i+'">'+atividade[i].name+'</option>';}
    }
    if(b.eq(b.length - 1).is(":checked")){
        const o = $("#outraAtiv").find('.r-input-btn')
        atividade[b.length - 1].value = 1;
        atividade[b.length - 1].dados = [];
        for (let i = 0; i < o.length; i++) {
            let d = o.eq(i).find('input').val();
            atividade[b.length - 1].dados.push(d)
            div += '<option value="10.'+i+'">'+d+'</option>';
        }
    }else{
        atividade[b.length - 1].value = 0; 
    }

    div +='</select><i>&#xe804;</i>';
    $("#selAtiv").html(div);
    return div;

}

function geraOpt(v=''){
    return '<div class="r-input-btn"><div class="r-input"><input type="text" value="'+v+'"></div><button class="r-btn deletAtiv"><i>&#xe809;</i></button></div>'
}

function getListHistory(nome, data, i){
    var icon = "&#xe811;"
    if(!i){
       icon = "&#xe812;";
    }
    return '<div class="r-historico-list"><div class="r-historico-info"><div class="r-historico-name">'+nome+'</div><div class="r-historico-data">'+data+'</div></div><div class="r-historico-feito"><i style="color:'+((i) ? "green": "red")+'">'+icon+'</i></div></div>';
}

function geraListaHistorico(h){
    const obj = $("#historico");
    obj.html("");
    var div = "";
    for (var i in h) {
        if (h[i].nome == undefined || h[i].data == undefined || h[i].realizado == undefined) return false;

        div = getListHistory(h[i].nome, h[i].data, h[i].realizado) + div;        
    }
    obj.append(div);
    return div;
}

function preencheCampos(){
    $("#nomeUser").val(usuario.nome);
    var a = $("#diaSemana")
    var b = a.find("label").find("input")
    for (let i = 0; i < 7; i++){
        let t = (diaSemana[i]=="0") ? false: true;
        b.eq(i).prop('checked', t);
    }
    var a = $("#minhasAtiv")
    var b = a.find("label").find("input")
    for (let i = 0; i < b.length; i++){
        let t = (atividade[i].value=="0") ? false: true;
        b.eq(i).prop('checked', t)
    }
    const o = $("#outraAtiv");
    o.find('.r-input-btn').remove()
    if(atividade[b.length - 1].value == 1){$(".opAti").show()}else{$(".opAti").hide()}
    const dados = atividade[b.length - 1].dados;
    if(dados.length > 0){
        for (let i = 0; i < dados.length; i++) {o.append(geraOpt(dados[i]))}
    }else{o.append(geraOpt())}
}

function isChecked(a){
    const b = a.find("label").find("input");
    let t = false;
    for (let i = 0; i < b.length; i++){
        let d = (b.eq(i).is(":checked") ? 1 : 0);
        if(d==1){
            t = true;
            i = b.length;
        }
    }
    return t;
}

function attPontos(){
 $("#pontos").find(".r-header-info-span").html(usuario.pontos+" pontos");
}

function attOfensivas(){
    $("#ofensivas").find(".r-header-info-span").html(usuario.ofensivas+" dias");
}
