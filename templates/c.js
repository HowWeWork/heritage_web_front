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