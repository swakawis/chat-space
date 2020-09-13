$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MessageBox">
          <div class="main-chat__message-list__contents">
            <div class="main-chat__message-list__contents--user-name">
              ${message.user_name}
            </div>
            <div class="main-chat__message-list__contents--datetime">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__message-list__text">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="MessageBox">
          <div class="main-chat__message-list__contents">
            <div class="main-chat__message-list__contents--user-name">
              ${message.user_name}
          </div>
          <div class="main-chat__message-list__contents--datetime">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__message-list__text">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-chat__message-list').append(html); 
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.send').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.send').prop('disabled', false);
    });
  });
});