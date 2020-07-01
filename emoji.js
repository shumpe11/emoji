/**
 * Unicodeで使える絵文字をランダムに返す関数
 * 127744~129685という数字はUnicodeの絵文字の文字コード
 * @return {[string]} 文字コードではなく、絵文字そのものを返す
 */
const randomizeEmoji = function(){
  // let emojiCode = Math.floor( Math.random() * (129685 + 1 - 127744) ) + 127744 ;
  let emojiCode = random(10) > 7.75 ? floor(random(128512, 128592)) : floor(random(127744, 128318));
  let emoji = String.fromCodePoint(emojiCode);
  return emoji;
}

//ユーザーからのコマンド操作で動く関数
const stopEmoji = function(){
  emojispeed = 0;
}
const startEmoji = function(){
  emojispeed = 4;
}
const changePien = function(){
  let emoji = String.fromCodePoint(129402);
  emojiObj.emoji = emoji
}

// // スクロール禁止
// const no_scroll = function(){
//     // PCでのスクロール禁止
//     document.addEventListener("mousewheel", scroll_control, { passive: false });
//     // スマホでのタッチ操作でのスクロール禁止
//     document.addEventListener("touchmove", scroll_control, { passive: false });
// }
// スクロール禁止解除
// const return_scroll = function(){
//     // PCでのスクロール禁止解除
//     document.removeEventListener("mousewheel", scroll_control, { passive: false });
//     // スマホでのタッチ操作でのスクロール禁止解除
//     document.removeEventListener('touchmove', scroll_control, { passive: false });
// }

// // スクロール関連メソッド
// const scroll_control = function(event){
//     event.preventDefault();
// }
//
let circs = [];
let numEmojis = 60;
let cir;
let emojispeed = 4;
let archive = []
// console.log(window.width)
// // 1. 変数mqlにMediaQueryListを格納
// const mql = window.matchMedia('(min-width: 769px)');
//
// // 2. メディアクエリに応じて実行したい処理を関数として定義
// const handleMediaQuery = function(mql) {
//   if (mql.matches) {
//     // 769px以上の場合の処理
//     emojispeed = 4
//   } else {
//     // 769px未満の場合の処理
//     emojispeed = 4;
//   }
// };


// // 3. イベントリスナーを追加（メディアクエリの条件一致を監視）
// mql.addListener(handleMediaQuery);
//
// // 4. 初回チェックのため関数を一度実行
// handleMediaQuery(mql);
function setup() {
  bg = loadImage('universe.jpg');
	createCanvas(1100,12000);
	for(i=0;i<numEmojis;i++){
		c = new emojiObj(random(10,440), i ) // generate a random sized emojiObj and store it's ID for later
		circs.push(c); //add it to the array.
	}
  // no_scroll();
}


function draw(){
	background(255);


	for(j=0;j<numEmojis;j++){
		circs[j].place(circs); //try to place a emojiObj on the screen
	}

	for(j=0;j<numEmojis;j++){
		circs[j].y -= emojispeed; //try to place a emojiObj on the screen
	}

	for(k=0;k<numEmojis;k++){ // display the objects
		circs[k].disp();
	}
}

function emojiObj(d,id){
	this.x = random(width) - d
	this.y = random(height) - d
	this.d = d
	this.id = id;
	this.color = color(random(255),random(255),random(255))
	this.hit = true;
  this.emoji = randomizeEmoji();

	this.place = function(objArray){

			for(i=0;i<objArray.length;i++){
				if(this.id != i){
					this.hit = collideCircleCircle(this.x, this.y, this.d, objArray[i].x, objArray[i].y, objArray[i].d);
					if(this.hit == true){
						this.x = random(width)
						this.y = random(height)
					}
				}
			}
	}

	this.disp = function(){
		noStroke();
		fill(this.color);
    textSize(this.d)
    // console.log(this.emoji)
		text(this.emoji,this.x,this.y);
    archive.push(this.emoji)
    textSize(this.d)
		text(this.emoji,this.x,this.y);
    archive.push(this.emoji)
    textSize(this.d)
		text(this.emoji,this.x,this.y);
    archive.push(this.emoji)

	}

}
