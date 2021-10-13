var App = new Vue({
	el:"#app",
	data:{
		gerando_status:["",""],
		inputs_status:['', '', ''],
		jogos:[],
		qtn:null,
		qtc:null,
		qtd:null,
		buttodisable:false,
	},
	methods:{
		gerar(){
			if(document.getElementById("gerados")){
				document.getElementById("gerados").remove();
			}
			this.inputs_status = ['', '', ''];
			if(this.validateInputs()){
				this.buttodisable = true;
				this.gerando_status[0] = 'loading';
				this.gerando_status[1] = 'Gerando...';
				var combincao = "";
				var numero;
				this.jogos = "";
				while(this.jogos.split(" ").length -1 != this.qtc){
					numero = Math.floor(Math.random() * this.qtd) + 1;
					if(numero < 10){
						numero = "0"+numero;
					}
					if(combincao.search(numero) == -1){
						combincao += numero;
						combincao += " ";
						if(combincao.split(" ").length -1 == this.qtn){
							var ordenacombinacao = this.order(combincao);
							if(this.jogos.search(ordenacombinacao) == -1){
								this.jogos += ordenacombinacao;
								this.jogos +=" ";
							}
							combincao = "";
						}
					}
				}
				
				this.createTable();
			}else{
				this.gerando_status[0] = "error";
			}
		},
		createTable(){
			var table = document.createElement("table");
			table.id ="gerados";
			table.border = "1px solid";
			table.align = "center";
			table.createCaption();
			table.caption.innerText = "Combinações geradas:"+this.qtc;
			var string = "";
			var jogoscondensados = this.jogos.split(" ").reduce(function(string, i){return string + i}, "");
			jogoscondensados = [jogoscondensados];
			for(var i = 0; i < this.qtc; i++){
				table.insertRow(i);
				for(var j = 0; j < this.qtn + 1; j++){
					table.rows[i].insertCell(j);
				}
			}
			var a1 = 0;
			var a2 = 1;
			for(var i = 0; i < jogoscondensados.length; i++){
				for(var j = 0; j < table.rows.length; j++){
					var cell1 = table.rows[j].cells[0].innerText = "Combinação "+(j + 1);
					for(var k = 0; k < table.rows[j].cells.length; k++){
						var cells = table.rows[j].cells[k];
						if(k !== 0){
							cells.innerText = jogoscondensados[i][a1]+""+jogoscondensados[i][a2];
							a1 += 2
							a2 += 2;
						}
					}
				}
			}
			setTimeout(() => {
				document.getElementById("app").appendChild(table);
				this.gerando_status = [];
				this.buttodisable = false;
			}, 3000);
		},
		validateInputs(){
			this.qtn = Math.trunc(parseInt(this.qtn));
			this.qtc = Math.trunc(parseInt(this.qtc));
			this.qtd = Math.trunc(parseInt(this.qtd));
			if(isNaN(this.qtn) | isNaN(this.qtc) | isNaN(this.qtd)){
				this.inputs_status = ['error', 'error', 'error'];
				this.gerando_status[1] = "Informe os valores que estão faltando";
				return false;
			}else if(this.qtn < 2){
				this.inputs_status[0] = 'error';
				this.gerando_status[1] = "Informe um valor maior ou igual a 2";
				return false;
			}else if(this.qtc < 1){
				this.inputs_status[1] = 'error';
				this.gerando_status[1] = "Informe um valor maior ou igual a 1";
				return false;
			}else if(this.qtd < 2 | this.qtd > 99){
				this.inputs_status[2] = 'error';
				this.gerando_status[1] = this.qtd < 2?"Informe um valor maior ou igual a 2":"Informe um valor menor ou igual a 99";
				return false;
			}else if(this.calculateCombination(this.qtd, this.qtn) < this.qtc){
				this.inputs_status = ['error', 'error', 'error'];
				this.gerando_status[1] = "Valores incompatíveis";
				return false;
			}
			return true;
		},
		calculateCombination(n, s){
			// n! / (s! * (n - s)!)
			return this.toFactorial(n) / (this.toFactorial(s) * (this.toFactorial((n-s))));
		},
		toFactorial(x){
			var r = 1;
			for(var i = x; i > 1; i--){
				r *= i;
			}
			return r;
		},
		order(string){
			var list = [];
			var string = string.split(" ");
			for(var i = 0; i < string.length; i++){
				var n = parseInt(string[i]);
				if(!isNaN(n)){
					list[n] = n;
				}
			}
			var st ="";
			st = list.reduce(function(st, n){
				if(n !== undefined){
					if(n < 10){
						n = "0"+n;
					}
					return st + n;
				}
			}, '');
			return st;
		}
	}
});
