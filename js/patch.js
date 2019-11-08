window.margin = 10;

function layout(bodyMargin = 0) {
	var css = `
		input:focus {
			outline-width: 0;
		}
		body {
			visibility: initial;
			position: relative;
			margin: ${bodyMargin}px;
			width: calc(100% - ${bodyMargin * 2}px);
			height: calc(100% - ${bodyMargin * 2}px);
		}
		#ExplainGitZen-Container .playground-container {
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			margin-top: 0;
		}
		#ExplainGitZen-Container .svg-container.remote-container {
			top: 215px;
			right: 15px;
            border: 0;
		}
		.control-box {
			z-index: 1000;
			height: 200px;
			border-color: white;
			width: 100%;
			border: 0;
		}
		.control-box .log {
			top: 0;
			bottom: 47px;
			border: 0;
			border-bottom: 1px solid gray;
		}
		.control-box .log .info:first-child {
			display: none;
		}
		.control-box .log * {
			font-size: 20pt !important;
			line-height: 20pt !important;
			background-position: 0px 5px !important;
		}
		.control-box .log .info > span {
			display: block;
		}
		.control-box .log .error {
			display: none;
		}
		.control-box select {
			display: none;
		}
		.control-box input[type="text"] {
			font-size: 30pt;
			width: calc(100% - 15px);
		}
		#ExplainGitZen-Container .svg-container {
			left: 0;
			border: 0;
			top: 200px;
		}
		#sergiocabral {
			position: fixed;
			top: ${bodyMargin + 5}px;
			right: ${bodyMargin + 20}px;
			cursor: pointer;
			z-index: 2000;
		}
	`;

	var style = document.getElementById("layout") || document.createElement("STYLE");
	style.id = "layout";
	style.innerHTML = css;
	document.body.append(style);

	document.body.style.display = "";
	document.title = "Git Playground";
}

function hideAllWhenLoading() {
	var style = document.getElementById("hideAllWhenLoading") || document.createElement("STYLE");
	style.id = "hideAllWhenLoading";
	style.innerHTML = "body { visibility: hidden; }";
	document.body.append(style);
}
hideAllWhenLoading();

function addLinkButtonToProject() {
  var img = document.createElement("IMG");
  img.onclick = function() { window.open("https://github.com/sergiocabral/App.GitPlayground"); }
  img.id = "sergiocabral";
  img.src = "data:image/png;base64,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"
  document.body.append(img);
}

function whenErrorReloadPage() { 
	if (document.querySelector('.control-box')) return;
	return location.href = location.origin;
}

function selectGitMode(mode = "free-remote") {	
	var select = document.querySelector('.control-box select');
	select.value = mode;
	select.dispatchEvent(new Event('change'));
}

window.confirm = function() {
	console.log("confirm", arguments);
	return true;
}

document.onreadystatechange = function () {
	if (document.readyState != "interactive") return;
	var load = function () {
		if (whenErrorReloadPage()) return;
		selectGitMode();
		layout(window.margin);
		addLinkButtonToProject();
	};
	setTimeout(load, 1000);
}
