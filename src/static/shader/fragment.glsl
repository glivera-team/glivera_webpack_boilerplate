uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;
void main()	{
	// vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
	// gl_FragColor = vec4(vPosition, 1.);
	// gl_FragColor = vec4(vUv,0.0,1.);

	// bool isBlack = sin(vUv.x * 15.) / 10. + 0.5 > sin(vUv.y * 15.) / 10. + 0.5;
	// bool isRed = vUv.x > 0.5;
	float fTime = sin(time) / 2. + 0.5;

	float borderPos = sin(vUv.y * 15. + time) / 10. + vUv.y / vUv.x;

	bool isBlack = vUv.x > borderPos;
	gl_FragColor = vec4(0., 0., 0., 1.);
	// bool isBlack = bool(1);
	if (isBlack) {
		gl_FragColor.x = ((1. - vUv.x) + vUv.y) / 2.;
	} else {
		gl_FragColor.x = 1. - ((1. - vUv.x) + vUv.y) / 2.;
	}

	gl_FragColor.z = 1. - gl_FragColor.x;
	gl_FragColor.y = fTime * .2;
	// gl_FragColor = vec4(sin(vUv.x), 0., 0., 1.);
}