
$(document).ready(function () {
    showList();
});
function showList() {
    $('#listBox').empty()
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/board',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data: {},
        success: function (response) {

            let rows = response

            for (let i = 0; i < rows.length; i++) {
                let boardNum = rows[i]['boardNum']
                let userName = rows[i]['userName']
                let pw = rows[i]['pw']
                let sector = rows[i]['sector']
                let title = rows[i]['title']
                let comment = rows[i]['comment']
                let likeCount = rows[i]['likeCount']

                let temp_html = `<tr>
                                      <td>${userName}</td>
                                      <td>${sector}</td>
                                      <td>${title}</td>
                                      <td>" ${comment} "</td>
                                      <td>${likeCount}</td>
                                      <td><button id="likeBtn" type="button" class="btn btn-outline-danger">Like</button></td>
                                      <td><button onclick="open_box()" id="editBtn" type="button" class="btn btn-outline-warning">Edit</button></td>
                                  </tr>
                                  <tr>
                                      <td colspan="7">
                                        <div class="editBox" id="Box">
                                            <div class="row g-4">
                                                <div class="wrap">
                                                    <div class="col-sm">
                                                        <input id="inputId" type="text" class="form-control" placeholder="ID" aria-label="ID">
                                                    </div>
                                                    <div class="col-sm">
                                                        <input id="inputPw" type="text" class="form-control" placeholder="PW" aria-label="PW">
                                                    </div>
                                                    <div class="col-auto">
                                                        <label class="visually-hidden" for="autoSizingSelect">Preference</label>
                                                        <select class="form-select" id="autoSizingSelect">
                                                          <option selected>Sector</option>
                                                          <option value="영화">영화</option>
                                                          <option value="TV">TV</option>
                                                          <option value="책">책</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-sm">
                                                        <input id="inputTitle" type="text" class="form-control" placeholder="Title" aria-label="Title">
                                                    </div>
                                                </div>
                                                <div class="wrap2">
                                                    <input id="inputComment" type="text" class="form-control" placeholder="Comment" aria-label="Comment">
                                                </div>
                                            </div>
                                            <div class="editBoxBtn" id="boxBtn">
                                               <div class="col-auto">
                                                   <button onclick="close_box()" id="boardUpdateBtn" class="btn btn-light"  type="button">수정하기</button>
                                                   <button onclick="close_box()" id="boardDeleteBtn" class="btn btn-light"  type="button">삭제하기</button>
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

function saveList() {
    let userName = $('#inputId').val()
    let pw = $('#inputPw').val()
    let sector = $('#autoSizingSelect').val()
    let title = $('#inputTitle').val()
    let comment = $('#inputComment').val()

    $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/board',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data: { "userName": userName, "pw": pw, "sector": sector, "title": title, "comment": comment },
        success: function (response) {

            window.location.reload()
        }
    });
}

function open_box(num) {
    let box = document.getElementsByClassName(num);
    box.show()
}
function close_box() {
    $("#Box").hide()
}

