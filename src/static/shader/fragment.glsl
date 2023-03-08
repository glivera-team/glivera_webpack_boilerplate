uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;
void main()	{

	float fTime = sin(time) / 2. + 0.5;

	float borderPos = sin(vUv.y * 15. + time) / 20. + vUv.y / vUv.x;

	bool isBlack = vUv.x > borderPos;

	gl_FragColor = vec4(0., 0., 0., 1.);
	// bool isBlack = bool(1);
	if (isBlack) {
		gl_FragColor.y = ((1. - vUv.x) + vUv.y) / 2.;
	} else {
		gl_FragColor.y = 1. - ((1. - vUv.x) + vUv.y) / 2.;
	}

	// gl_FragColor.x = 1. - gl_FragColor.y;
	gl_FragColor.z = 0.4;
}

