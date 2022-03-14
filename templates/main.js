$(document).ready(function () {
    bestBoardList();
    showList();
    
});

//로딩 후 전체 글 조회

function showList() {
    
    $('#listBox').empty()

    $.ajax({
        type: 'GET',
        url: 'http://heritage-env-1.eba-dvm4baup.ap-northeast-2.elasticbeanstalk.com/board',
        contentType: 'application/json;charset=utf-8',
        dataType: 'JSON',
        data: {},

        success: function (response) {

            let rows = response

            for (let i=0; i<rows.length; i++){
                let boardNum = rows[i]['boardNum']
                let userName = rows[i]['userName']
                let pw = rows[i]['pw']
                let sector = rows[i]['sector']
                let title = rows[i]['title']
                let comment = rows[i]['comment']
                let likeCount = rows[i]['likeCount']
                            
                let temp_html = `

                    <tr class="${userName}and${comment}">

                        <td>${userName}</td>
                        <td>${sector}</td>
                        <td>${title}</td>
                        <td>" ${comment} "</td>
                        <td>${likeCount}</td>
                        
                        <td><button id="likeBtn" onclick="likeClick(${boardNum})"  type="button" class="btn btn-outline-danger"> Like </button></td>

                        <td><button id="editBtn" onclick="open_box(${boardNum})"  type="button" class="btn btn-outline-warning"> Edit </button></td>
                        
                    </tr>

                    <tr class="${boardNum}">
                        <td colspan="7">

                            <div class="editBox" id="Box${boardNum}">

                                <div class="row g-4">
                                    <div class="wrap">
                                        <div class="col-sm">
                                            <input id="inputUserName${boardNum}" type="text" class="form-control" placeholder="userName" aria-label="userName" value="${userName}" disabled>
                                        </div>                                                    
                                        <div class="col-auto">
                                            <label class="visually-hidden" for="autoSizingSelect${boardNum}">Preference</label>
                                            <select class="form-select" id="autoSizingSelect${boardNum}">
                                                <option>Sector</option>
                                                <option value="영화" selected>영화</option>
                                                <option value="TV">TV</option>
                                                <option value="책">책</option>
                                                <option value="다큐">다큐</option>
                                                <option value="음악">음악</option>
                                                <option value="미술">미술</option>
                                            </select>
                                        </div>

                                        <div class="col-sm">
                                            <input id="inputTitle${boardNum}" type="text" class="form-control" placeholder="title" aria-label="title" value="${title}">
                                        </div>
                                    </div>

                                    <div class="wrap2">
                                        <input id="inputComment${boardNum}" type="text" class="form-control" placeholder="comment" aria-label="comment" value="${comment}">
                                    </div>
                                </div>
                                <div class="editBoxBtn" id="boxBtn">
                                    <div class="col-auto">
                                        <button onclick="updateList(${boardNum},${pw})" id="boardUpdateBtn" class="btn btn-light"  type="button">수정하기</button>
                                        <button onclick="deleteList(${boardNum},${pw})" id="boardDeleteBtn" class="btn btn-light"  type="button">삭제하기</button>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>`
                    
                $('#listBox').append(temp_html)

            } 
        } 
    }); 
}

//새 글 작성
function saveList() {
    let userName = $('#inputUserName').val()
    let pw = $('#inputPw').val()
    let sector = $('#autoSizingSelect').val()
    let title = $('#inputTitle').val()
    let comment = $('#inputComment').val()

    $.ajax({
        type: 'POST',
        url: 'http://heritage-env-1.eba-dvm4baup.ap-northeast-2.elasticbeanstalk.com/board/',
        contentType: 'application/json;charset=utf-8',
        dataType: 'JSON',
        data: JSON.stringify({ userName: userName, pw: pw, sector: sector, title: title, comment: comment }),

        success: function (response) {
            alert("글이 작성되었습니다")
            window.location.reload()
        }
    });
}

//박스열기
function open_box(num){
    $("#Box" + num).show()
}
//박스닫기
function close_box(num){
    $("#Box"+ num).hide()
}

// 글 수정
function updateList(num, pw) {
    let sector = $('#autoSizingSelect' + num).val()
    let title = $('#inputTitle' + num).val()
    let comment = $('#inputComment' + num).val()

    const pwch = prompt("비밀번호");
    if (pwch == pw) {

        $.ajax({
            type: 'PATCH',
            url: 'http://heritage-env-1.eba-dvm4baup.ap-northeast-2.elasticbeanstalk.com/board/' + num,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({ sector: sector, title: title, comment: comment }),
            success: function (response) {
                alert('글이 업데이트 되었습니다.')
                window.location.reload()
            }
        });

    }
    else {
        alert('비밀번호가 틀렸습니다.');
    }
}

// 글 삭제
function deleteList(num, pw) {

    const pwch = prompt("비밀번호");
    if (pwch == pw) {
        $.ajax({
            type: 'DELETE',
            url: 'http://heritage-env-1.eba-dvm4baup.ap-northeast-2.elasticbeanstalk.com/board/' + num,
            contentType: 'application/json;charset=utf-8',
            data: {},
            success: function (response) {
                alert('글이 삭제되었습니다.');
                window.location.reload();
            }
        });
    } else {
        alert('비밀번호가 틀렸습니다.');
    }

}

//좋아요 count 추가 
function likeClick(boardNum) {

    $.ajax({
        type: 'PATCH',
        url: 'http://heritage-env-1.eba-dvm4baup.ap-northeast-2.elasticbeanstalk.com/board/' + boardNum + "/like",
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({ like: true }),

        success: function (response) {
            alert('좋아요 성공❤');
            window.location.reload()
        }
    });
}


//bestBoardList 보여주기
function bestBoardList(){
      
    $.ajax({
		url: 'http://heritage-env-1.eba-dvm4baup.ap-northeast-2.elasticbeanstalk.com/board/best',
		type: 'GET',
        async:false,
        contentType: 'application/json;charset=utf-8',
		data: {},

        // data : {
        //        boardNum: 3
        //        comment: "자나깨다 잊지 못하다"
        //        likeCount: 7
        //        pw: "3333"
        //        sector: "책"
        //        title: "해리포터"
        //        userName: "헤르미오매불망"
        //        writeDate: "2022-03-
        //}

		success: function bestBoardCreate(response) {          
            
           let rows = response

           for(let i=0; i<rows.length; i++){
            let boardNum = rows[i]['boardNum']
            let comment = rows[i]['comment']
            let likeCount = rows[i]['likeCount']
            let pw = rows[i]['pw']
            let sector = rows[i]['sector']
            let title = rows[i]['title']
            let userName = rows[i]['userName']
            
            let temp_best=`
            
                <div class="${boardNum}and${likeCount}">

                    <div class="card" style="width: 20rem;">
                        <div class="ranking">
                            <B> 🥇 ${i+1}위</B>
                            <B><i> 좋아요 ${likeCount} 회</i></B>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${sector}</h6>
                            <p class="card-text">" ${comment} " </p>
                            <p class="card-text">From ${userName}</p>
                        
                        </div>
                    </div>
                </div>`

                $('#best3').append(temp_best)
                                    
           }
    
  		}
    });
      
}











