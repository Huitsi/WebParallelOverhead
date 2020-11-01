/* Copyright © 2020 Linus Vanas <linus@vanas.fi>
 * SPDX-License-Identifier: MIT
 */
let GL, Canvas, ErrorDiv;
const Locs = {};

onload = function()
{
	ErrorDiv = document.getElementById("error");

	Canvas = document.getElementById("game-canvas");
	GL = Canvas.getContext("webgl");
	if (!GL)
	{
		ErrorDiv = document.getElementById("No WebGL context received.");
	}

	ErrorDiv.innerText = "Loading resources...";
	text = r => r.ok ? r.text() : Promise.reject(r);
	image = r => r.ok ? r.blob().then(b => createImageBitmap(b)) : Promise.reject(r);
	blob = r => r.ok ? r.blob().then(b => true) : Promise.reject(r);
	const resource_promises =
	[
		fetch("data/vertex.glsl").then(text),
		fetch("data/fragment.glsl").then(text),
		fetch("data/ship.bmp").then(image),
		fetch("data/move.wav").then(blob),
		fetch("data/death.wav").then(blob),
		fetch("data/fast_pulse.wav").then(blob)
	];

	Promise.all(resource_promises).then(init_GL, report_resource_error);
}

function report_resource_error(error)
{
	ErrorDiv.innerText = "Loading resources failed.";
	console.error(error);
}
