/* sample에 Image 넣기 */
$(document).ready(
	$('.crop').css({
		'background-image': 'url(icon/img1.jpg)',
		'background-size': '300% 300%' })
);
	
const str = (pid) => {
	return parseInt(pid.id.substr(3,1));
}
	
/* Puzzle의 배열 영역 초기화 */
function Puzzle (num, pid, x, y) {
	this.num = num;
	this.pid = pid;
	this.x = x;
	this.y = y;
}
puzzleArr = new Array();
for(var i=0; i<8; i++) {
	puzzleArr[i] = new Puzzle(i, 'box' + i, 0, 0);
}
		
/* Puzzle Shupple */
//puzzleArr.sort(() => Math.random() - 0.5);
puzzleArr[8] = new Puzzle(8, 'box8', 0, 0);
		
/* Puzzle Init Setting */
for(var i=0; i<9; i++) {
	$('#box' + puzzleArr[i].num).clone().appendTo($('.bg'));
}
								
var boxMove = (pid) => {
	var index = 0, cnt = 0;
	var	targetCell = null, arrTmp = null;
	var xpos1 = 0, xpos2 = 0, ypos1 = 0, ypos2 = 0;
	// White Cell Seraching..
	try {
		for(var i=0; i<9; i++) {
			if(puzzleArr[i].num == str(pid)) {
			console.log('this is ' + i);
			index = i;
			}
		}

		// up - down
		if(index+3 < 9 && puzzleArr[index+3].num == 8) {
			targetCell = $('#box' + puzzleArr[index+3].num);
			
			// x, y 가중치
			puzzleArr[index].y += 10;
			puzzleArr[index+3].y -= 10;
			xpos1 = puzzleArr[index].x;
			ypos1 = puzzleArr[index].y;
			xpos2 = puzzleArr[index+3].x;
			ypos2 = puzzleArr[index+3].y;

			// 퍼즐 배열 위치 바꾸기
			arrTmp = puzzleArr[index+3];
			puzzleArr[index+3] = puzzleArr[index];
			puzzleArr[index] = arrTmp;
		}
		// down - up
		if(index-3 > -1 && puzzleArr[index-3].num == 8) {
			targetCell = $('#box' + puzzleArr[index-3].num);
			
			// x, y 가중치
			puzzleArr[index].y -= 10;
			puzzleArr[index-3].y += 10;
			xpos1 = puzzleArr[index].x;
			ypos1 = puzzleArr[index].y;
			xpos2 = puzzleArr[index-3].x;
			ypos2 = puzzleArr[index-3].y;
			
			// 퍼즐 배열 위치 바꾸기
			arrTmp = puzzleArr[index-3];
			puzzleArr[index-3] = puzzleArr[index];
			puzzleArr[index] = arrTmp;
		}
		// left - right
		if(index+1 < 9 && puzzleArr[index+1].num == 8) {
			targetCell = $('#box' + puzzleArr[index+1].num);
			
			// x, y 가중치
			puzzleArr[index].x += 10;
			puzzleArr[index+1].x -= 10;
			xpos1 = puzzleArr[index].x;
			ypos1 = puzzleArr[index].y;
			xpos2 = puzzleArr[index+1].x;
			ypos2 = puzzleArr[index+1].y;
			
			// 퍼즐 배열 위치 바꾸기
			arrTmp = puzzleArr[index+1];
			puzzleArr[index+1] = puzzleArr[index];
			puzzleArr[index] = arrTmp;
		}
		// right - left
		if(index-1 > -1 && puzzleArr[index-1].num == 8) {
			targetCell = $('#box' + puzzleArr[index-1].num);
			
			// x, y 가중치
			puzzleArr[index].x -= 10;
			puzzleArr[index-1].x += 10;
			xpos1 = puzzleArr[index].x;
			ypos1 = puzzleArr[index].y;
			xpos2 = puzzleArr[index-1].x;
			ypos2 = puzzleArr[index-1].y;
			
			// 퍼즐 배열 위치 바꾸기
			arrTmp = puzzleArr[index-1];
			puzzleArr[index-1] = puzzleArr[index];
			puzzleArr[index] = arrTmp;
			}
	} catch(e) {  }
	if(targetCell != null) changeCell(pid, targetCell, xpos1, xpos2, ypos1, ypos2);
			
	for(var i=0; i<9; i++) {
		// 올바른 퍼즐 계산
		if(puzzleArr[i].num == i) cnt++;
		
		// 퍼즐 성공 판정
		if(cnt == 9) setTimeout(function () { alert('Currect!'); }, 500);
	}
}
		
/* Cell Change Function */
function changeCell(cellOne, cellTwo, xpos1, xpos2, ypos1, ypos2) {
	$(cellOne).css({
		'transition': 'transform 0.5s',
		'transform': 'translate(' + xpos1 + 'vw, ' + ypos1 + 'vw)'
	});
	$(cellTwo).css({
		'transition': 'transform 0.5s',
		'transform': 'translate(' + xpos2 + 'vw, ' + ypos2 + 'vw)'
	});
}