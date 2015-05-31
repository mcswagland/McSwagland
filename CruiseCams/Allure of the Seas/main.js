$(window).load(function(){
	updateCamera();
	setInterval(updateCamera, 60000);
})

$('#cameraView').change(function(){
	updateCamera();
});

function updateCamera()
{
	$("#picHolder").attr('src',"http://www.royalcaribbean.com/content/shared_assets/webcam/AL/Gallery_" + $('#cameraView').val() + ".jpg" + "?" + new Date().getTime());
}