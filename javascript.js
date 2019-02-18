var user = cookie.get('user');

if (!user) {
	user = prompt('Digite seu nome: ');
	if (!user) {
		alert('Usuario Invalido')
	} else {
		cookie.set('user', user);
	}
}

var socket = io();

socket.on('count', function (data){
	$('.user-count').html(data);
});

socket.on('message', function (data){
	$('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');
})

$('form').submit(function (e) {

	e.preventDefault();

	var message = $(e.target).find('input').val();
	
	socket.emit('message',{
		user: cookie.get('user') || 'Anonnymous',
		message: message
	});

	e.target.reset();
	$(e.target).find('input').focus();
})
