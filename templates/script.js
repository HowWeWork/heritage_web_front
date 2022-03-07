
$(document).ready(function () {
    showList();
});
function showList() {
    $('#listBox').empty()
    $.ajax({
        type: 'GET',
        url: '/board',
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
                let temp_html = `<tr class="${userName}and${comment}">
                                              <td>${userName}</td>
                                              <td>${sector}</td>
                                              <td>${title}</td>
                                              <td>" ${comment} "</td>
                                              <td>${likeCount}</td>
                                              <td><button id="likeBtn" type="button" class="btn btn-outline-danger">Like</button></td>
                                              <td><button onclick="open_box()" id="editBtn" type="button" class="btn btn-outline-warning">Edit</button></td>
                                          </tr>
                                          <tr class="${userName}and${comment}">
                                              <td colspan="7">
                                                <div class="editBox" id="Box">
                                                    <div class="row g-4">
                                                        <div class="wrap">
                                                            <div class="col-sm">
                                                                <input id="inputuserName${userName}and${comment}" type="text" class="form-control" placeholder="userName" aria-label="userName">
                                                            </div>
                                                            <div class="col-sm">
                                                                <input id="inputPw${userName}and${comment}" type="text" class="form-control" placeholder="pw" aria-label="pw">
                                                            </div>
                                                            <div class="col-auto">
                                                                <label class="visually-hidden" for="autoSizingSelect${userName}and${comment}">Preference</label>
                                                                <select class="form-select" id="autoSizingSelect${userName}and${comment}">
                                                                  <option selected>Sector</option>
                                                                  <option value="영화">영화</option>
                                                                  <option value="TV">TV</option>
                                                                  <option value="책">책</option>
                                                                </select>
                                                            </div>
                                                            <div class="col-sm">
                                                                <input id="inputTitle${userName}and${comment}" type="text" class="form-control" placeholder="title" aria-label="title">
                                                            </div>
                                                        </div>
                                                        <div class="wrap2">
                                                            <input id="inputComment${userName}and${comment}" type="text" class="form-control" placeholder="comment" aria-label="comment">
                                                        </div>
                                                    </div>
                                                    <div class="editBoxBtn" id="boxBtn">
                                                       <div class="col-auto">
                                                           <button onclick="updateList('${userName}and${comment}')" id="boardUpdateBtn" class="btn btn-light"  type="button">수정하기</button>
                                                           <button onclick="deleteList('${userName}and${comment}')" id="boardDeleteBtn" class="btn btn-light"  type="button">삭제하기</button>
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
            let userName = $('#inputuserName').val()
            let pw = $('#inputpw').val()
            let sector = $('#autoSizingSelect').val()
            let title = $('#inputtitle').val()
            let comment = $('#inputcomment').val()

            $.ajax({
                type: 'POST',
                url: '/heritage',
                data: {userName_give: userName, pw_give: pw, sector_give: sector, title_give: title, comment_give: comment},
                success: function (response) {
                    alert(response['msg'])
                    window.location.reload()
                }
            });
        }

        // 글 삭제하는 로직
        function deleteList(str) {
            let words = str.split('and');
            let userName = words[0]
            let comment = words[1]

            $.ajax({
                type: 'POST',
                url: '/delete',
                data: {userName_give: userName, comment_give: comment},
                success: function (response) {
                    alert('글이 삭제되었습니다.')
                    window.location.reload()
                }
            });
        }

         // 글 업데이트하는 로직
        function updateList(str) {
            let words = str.split('and');
            let ID_origin = words[0]
            let comment_origin = words[1]
            let userName = $('#inputuserName'+str).val()
            let pw = $('#inputPw'+str).val()
            let sector = $('#autoSizingSelect'+str).val()
            let title = $('#inputTitle'+str).val()
            let comment = $('#inputComment'+str).val()

            $.ajax({
                type: 'POST',
                url: '/update',
                data: { ID_origin: ID_origin, comment_origin: comment_origin, userName_give: userName, pw_give:pw, sector_give: sector, title_give: title, comment_give : comment },
                success: function (response) {
                    alert('글이 업데이트되었습니다.')
                    window.location.reload()
                }
            });
        }

        function open_box(){
            $("#Box").show()
        }
        function close_box(){
            $("#Box").hide()
        }


