$(document).ready(function () {
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
                        
                        <td><button onclick="likeClick(${boardNum})" id="likeBtn" type="button" class="btn btn-outline-danger"> Like </button></td>

                        <td><button onclick="open_box(${boardNum})" id="editBtn" type="button" class="btn btn-outline-warning"> Edit </button></td>
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
                                                <option value="영화">영화</option>
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

