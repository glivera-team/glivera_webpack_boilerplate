/* eslint-disable no-unreachable */
import * as T from 'three';
import dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Sketch {
	constructor(options) {
		// --------------------------------------------- Environments
		this.scene = new T.Scene();

		this.container = options.dom;

		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;

		this.renderer = new T.WebGLRenderer();
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0xeeeeee, 1);
		this.renderer.outputEncoding = T.sRGBEncoding;

		this.container.appendChild(this.renderer.domElement);
		// --------------------------------------------- Environments###

		// --------------------------------------------- Camera
		this.camera = new T.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);
		this.camera.position.set(0, 0, 1);

		// const frustumSize = 10;
		// const aspect = window.innerWidth / window.innerHeight;
		// this.camera = new T.OrthographicCamera((frustumSize * aspect) / -2, (frustumSize * aspect) / 2, frustumSize / 2, frustumSize / -2, -1000, 1000);

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		// --------------------------------------------- Camera###

		// --------------------------------------------- Variables
		this.time = 0;
		this.isPlaying = true;
		// --------------------------------------------- Variables###

		this.init();
	}

	async init() {
		try {
			await this.loadObjects();
		} catch (e) {
			console.log(e);
		}

		this.addObjects();
		// this.addLights();
		// this.addGui();
		this.resize();
		this.render();
		this.setupResize();
	}

	addGui() {
		let that = this;
		this.guiSettings = {
			xRotation: 0,
		};

		this.gui = new dat.GUI();
		const controller = this.gui.add(this.settings, 'xRotation', -1, 1, 0.01);
		controller.onChange((val) => {
			console.log(val);
		});
	}

	addLights() {
		const l1 = new T.AmbientLight(0xfffffff, 0.2);

		const l2 = new T.HemisphereLight(0xfffffff, 1);

		l2.position.set(-4, 4, 2);

		// const helper = new T.HemisphereLightHelper(l2);

		this.scene.add(l2, l1);
	}

	setupResize() {
		window.addEventListener('resize', this.resize.bind(this));
	}

	resize() {
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
		this.renderer.setSize(this.width, this.height);
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
	}

	loadObjects() {
		const loader = new T.FileLoader();

		const fragment = new Promise((resolve, reject) => {
			loader.load(
				'./shader/fragment.glsl',
				(data) => {
					this.fragment = data;
					resolve();
				},
				() => {},
				(err) => {
					console.log(err);
					reject();
				},
			);
		});

		const vertex = new Promise((resolve, reject) => {
			loader.load(
				'./shader/vertex.glsl',
				(data) => {
					this.vertex = data;
					resolve();
				},
				() => {},
				(err) => {
					console.log(err);
					reject();
				},
			);
		});

		return Promise.all([fragment, vertex]);
	}

	setMaterials() {
		this.material = new T.ShaderMaterial({
			//
			extensions: {
				derivatives: '#extension GL_OES_standard_derivatives : enable',
			},
			side: T.DoubleSide,
			uniforms: {
				time: { type: 'f', value: 0 },
				resolution: { type: 'v4', value: new T.Vector4() },
				uvRate1: {
					value: new T.Vector2(1, 1),
				},
			},
			// wireframe: true,
			// transparent: true, // если в текстурке используется альфа-канал
			vertexShader: this.vertex,
			fragmentShader: this.fragment,
		});
	}

	setGeometries() {
		this.geometry = new T.PlaneGeometry(1, 1, 1, 1);
	}

	addObjects() {
		this.setGeometries();
		this.setMaterials();

		this.plane = new T.Mesh(this.geometry, this.material);
		this.scene.add(this.plane);
	}

	stop() {
		this.isPlaying = false;
	}

	play() {
		if (!this.isPlaying) {
			this.render();
			this.isPlaying = true;
		}
	}

	render() {
		if (!this.isPlaying) return;
		this.time += 0.05;
		this.material.uniforms.time.value = this.time;
		window.requestAnimationFrame(this.render.bind(this));
		this.renderer.render(this.scene, this.camera);
	}
}
