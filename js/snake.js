window.onload=function () {
	
//初始化  分数num 速度speed  暂停继续开关flag	
    var num=0;
    var speed=200;
	var flag=true;
 //获取元素  
	var play = document.getElementById("play");
	var fenshu= document.getElementById("fenshu");
	var zanting = document.getElementById("zanting");
    var chongxin = document.getElementById("chongxin");
    var jieshu = document.getElementById("jieshu");
    var dianji= document.getElementById("dianji");
    var defen= document.getElementById("defen");
    var tuichu= document.getElementById("tuichu");
    var guanka= document.getElementById("guanka");
    var nandubox= document.getElementById("nandubox");
    var kaishi= document.getElementById("kaishi");
    var likai= document.getElementById("likai");
    var nandu= document.getElementsByClassName("nandu");
    var nandu4= document.getElementById("nandu4");
    var xishu= document.getElementById("xishu");

//关卡设置
    guanka.onclick=function(){
    	nandubox.style.display="block";
    }

 //关卡点击效果  初级
	nandu[0].onclick=function(){
		
		speed=250;
		xishu.innerHTML="初级";

		for(var j=0;j<nandu.length;j++){

			nandu[j].style.background="#003000"; 	  
		} 

		   nandu[0].style.background="green";
	}

	//关卡点击效果  中级

	nandu[1].onclick=function(){

		speed=200;
		xishu.innerHTML="中级";

		for(var j=0;j<nandu.length;j++){
		  nandu[j].style.background="#003000"; 	  
		} 

		nandu[1].style.background="green";
	

	}

	//关卡点击效果  高级

	nandu[2].onclick=function(){

		speed=150;
		xishu.innerHTML="高级";
		for(var j=0;j<nandu.length;j++){
			nandu[j].style.background="#003000"; 	  
		} 

		nandu[2].style.background="green";
		nandu4.innerHTML= "自定义难度";
	}

	//关卡点击效果  自定义
	nandu[3].onclick=function(){

		speed=prompt("每多少毫秒移动一格？") ;
		xishu.innerHTML=speed+"毫秒/格";
		for(var j=0;j<nandu.length;j++){
			nandu[j].style.background="#003000"; 	  
		} 

		nandu[3].style.background="green";

		nandu4.innerHTML= speed+"毫秒/格"
	}

//首页  关闭游戏
	likai.onclick=function(){
		if(confirm("你确定要退出吗")){
			 window.close();//退出当前页面
		}	    		
	}  
 // 点击开始进入游戏   
	kaishi.onclick=function(){

		play.style.display="none";
		zanting.style.display="block";
		fenshu.style.display="block";
		jieshu.style.display="block";
		xishu.style.display="block";
		var tcs = new TCS();
		tcs.play();


    }  
//针对贪吃蛇 定义一个类  
	class TCS{
		constructor(){
			this.sence = this.getid("sence");
			this.she = [{x:0,y:0},
						{x:0,y:1},
						{x:0,y:2}];
			this.fx = "right";
            this.food = {};
			this.t;
			

		}
		play(){
			//创建场景
			this.createSence();
			//创建蛇
			this.createSnake();
			//创建食物
			this.createFood();
			//蛇动
			this.snakeMove();
			//方向
			this.controlSnake();
			//结束
			this.jieshu();
					
			
		}
		//创建场景
		createSence(){
			//20*20的格子布局
			for (var i = 0; i < 20; i++) {
				for (var j = 0; j < 20; j++) {
					var gezi = document.createElement("div");
					gezi.id = i+"-"+j;
					gezi.classList.add("gezi");
					this.sence.appendChild(gezi);
				}
			}
		}
		//创建蛇
		createSnake(){
			for(var i in this.she){
				var id = this.she[i].x+"-"+this.she[i].y;
				this.getid(id).classList.add("she");
				this.getid(id).classList.remove("shetou");
			}
			var touid = this.she[this.she.length-1].x+"-"+this.she[this.she.length-1].y;
			this.getid(touid).classList.add("shetou");
			var weiid = this.she[0].x+"-"+this.she[0].y;
			this.getid(weiid).classList.add("shewei");
		}
		//创建食物
		createFood(){
			do{
				this.food.x = Math.floor(Math.random()*20)
				this.food.y = Math.floor(Math.random()*20)
			}while(this.check(this.she,this.food.x,this.food.y))
			this.getid(this.food.x+"-"+this.food.y).classList.add("shiwu");

			

		}
		//蛇动
		snakeMove(){
			var that = this;
			this.t = setInterval(function(){

				//每个方向执行不同的函数 控制方向
				if (that.fx=="right") {
					

					var newtouX = that.she[that.she.length-1].x;
					var newtouY = that.she[that.she.length-1].y+1;


				}else if (that.fx=="left") {
					var newtouX = that.she[that.she.length-1].x;
					var newtouY = that.she[that.she.length-1].y-1;
				}else if (that.fx=="up") {
					var newtouX = that.she[that.she.length-1].x-1;
					var newtouY = that.she[that.she.length-1].y;
				}else if (that.fx=="down") {
					var newtouX = that.she[that.she.length-1].x+1;
					var newtouY = that.she[that.she.length-1].y;
				}

                //规则  撞到四周则失败
				if(newtouX==-1 || newtouX==20 || newtouY==-1 || newtouY==20){
                      
					     that.gameover();
			    }
                //规则 撞到自己失败
				for(var i in that.she){

					if(newtouX== that.she[i].x && newtouY== that.she[i].y){
                         
						 that.gameover();						 
						  
					}
				}


               //如果没有失败  则由于程序解析的顺序执行下面部分
                //让蛇移动
				var newtou = {x:newtouX,y:newtouY};
                that.she.push(newtou);
                //吃到食物  是让num+1   并且不移除第一个
				if (newtouX == that.food.x && newtouY == that.food.y) {
					num++;
					fenshu.innerHTML=num+"分";
					defen.innerHTML="你本次的得分："+num+"分";

                    that.getid(that.food.x+"-"+that.food.y).classList.remove("shiwu");
					that.createFood();

				}else{
					//如果下一步不是食物  则在尾部增加一个数组的基础上 移出第一个数组
					var weiba = that.she.shift();
					that.getid(weiba.x+"-"+weiba.y).classList.remove("she");
					that.getid(weiba.x+"-"+weiba.y).classList.remove("shewei")
				}

               //对数组处理之后再画一次蛇
               that.createSnake();
                     
          //点击时的暂停与继续效果 
			var jixu= document.getElementById("jixu");
			zanting.onclick=function(){

				zanting.style.display="none";
				jixu.style.display="block";
				clearInterval(that.t);

              
            }
			jixu.onclick=function(){

	                //蛇动
					that.snakeMove();
				    jixu.style.display="none";
				    zanting.style.display="block";
                
				  
		   }


			}, speed)
		}

        
        //方向控制
		controlSnake(){
			var that = this;
    
			document.onkeydown=function(e){
				if (e.keyCode == 37) {
					if (that.fx != 'right') {
						that.fx = "left";
					}


				}
				if (e.keyCode == 38) {
					if (that.fx != 'down') {
						that.fx = "up";
					}
				}
				if (e.keyCode == 39) {
					if (that.fx != 'left') {
						that.fx = "right";
					}
				}
				if (e.keyCode == 40) {
					if (that.fx != 'up') {
						that.fx = "down";
					}
				}

            //按空格键可以暂停和继续
				if (e.keyCode == 32) {
					if(flag){
						clearInterval(that.t);
						zanting.style.display="none";
						jixu.style.display="block";
						flag=false;
					}else{
						that.snakeMove();
						jixu.style.display="none";
						zanting.style.display="block";
						flag=true;
					}

				}
			}
		}
       
       //获取元素
		getid(id){
			return document.getElementById(id)
		}


		check(she,fx,fy) {
			for(var i in she){
				if(she[i].x==fx && she[i].y==fy){
					return true;
				}
			}
			return false;
		}

       //游戏结束
		gameover(){

           
			
			fenshu.style.display="none";
			clearInterval(this.t);
            chongxin.style.display="block";
             zanting.style.display="none";
             jieshu.style.display="none";
			 xishu.style.display="none";


			dianji.onclick=function(){
                location.reload();
			 }
			
	    }


        //结束
	    jieshu(){
	    	jieshu.onclick=function(){
	    		 if(confirm("你确定要退出吗")){
	    			 
	    			 window.close();//退出当前页面
	    		}

	    	}

	    	tuichu.onclick=function(){
	    		if(confirm("你确定要退出吗")){
	    			 window.close();//退出当前页面
	    		}	    		
	    	}

	    	
	   			
       }


    }

}