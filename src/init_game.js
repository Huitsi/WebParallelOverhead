/* Copyright © 2020 Linus Vanas <linus@vanas.fi>
 * SPDX-License-Identifier: MIT
 */
const FULL_ANGLE = 2 * Math.PI;
const Events = [], Textures = [];

function init_game(resources)
{
	ErrorDiv.innerText = "Initializing the game...";
	const sector_angle = FULL_ANGLE/Settings.game.sectors;
	const vertices = new Float32Array((4 + 2*Settings.game.sectors + 2)*3);

	//Ship vertices
	vertices[0] = 1;
	vertices[1] = 0;
	vertices[2] = 0;

	vertices[3] = 1;
	vertices[4] = 0;
	vertices[5] = sector_angle;

	vertices[6] = 1;
	vertices[7] = sector_angle;
	vertices[8] = 0;

	vertices[9] = 1;
	vertices[10] = sector_angle;
	vertices[11] = sector_angle;

	//Wall vertices
	for (let i = 0; i <= Settings.game.sectors; i++)
	{
		const pos = 12 + i * 6;
		const angle = i * sector_angle;

		vertices[pos + 0] = 1;
		vertices[pos + 1] = angle;
		vertices[pos + 2] = 0;
		vertices[pos + 3] = 1;
		vertices[pos + 4] = angle;
		vertices[pos + 5] = Settings.game.rings;
	}

	const vertex_buffer = GL.createBuffer();
	GL.bindBuffer(GL.ARRAY_BUFFER, vertex_buffer);

	GL.bufferData(GL.ARRAY_BUFFER, vertices, GL.STATIC_DRAW);

	const ship_texture = GL.createTexture();
	const wall_texture = GL.createTexture();
	const timer_texture = GL.createTexture();
	Textures.push(ship_texture, wall_texture, timer_texture);

	//Ship texture
	const ship_image = resources[2];

	GL.bindTexture(GL.TEXTURE_2D, ship_texture);
	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

	GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, ship_image);

	//Timer
	/*init_hud();
	SDL_Surface *timer_surface = SDL_CreateRGBSurface(0, 7*7+2*3+7*1, 2*11+1, 32, 0, 0, 0, 0);
	glBindTexture(GL_TEXTURE_2D, timer_texture);
	glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MAG_FILTER,GL_NEAREST);
	glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MIN_FILTER,GL_NEAREST);
	*/

	GL.clearColor(0,0,0,1);

	const w = innerWidth;
	const h = innerHeight;
	Canvas.width = w;
	Canvas.height = h;
	GL.uniform2f(Locs.screen_wh, w, h);
	GL.viewport(0,0,w,h);

	GL.vertexAttribPointer(Locs.vertex_pos_polar, 3, GL.FLOAT, GL.FALSE, 0, 0);
	GL.enableVertexAttribArray(Locs.vertex_pos_polar);

	//Wall texture
	GL.bindTexture(GL.TEXTURE_2D, wall_texture);
	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

	if (report_GL_errors("Initializing the game"))
	{
		return;
	}

	addEventListener("keyup", push_event);
	addEventListener("resize", push_event);
	function push_event(e)
	{
		Events.push(e);
	}

	run_game();
}
