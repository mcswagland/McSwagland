$(window).load(function(){
	updateCamera();
	setInterval(updateCamera, 60000);
})

function updateCamera()
{
	$("#picHolder").attr('src',"http://www.princess.com/webcam/coral_bridge.jpg?" + new Date().getTime());
}