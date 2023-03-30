/* eslint-disable no-unreachable */
import * as T from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

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
		this.renderer.setClearColor(0x000000, 1);
		this.renderer.outputEncoding = T.sRGBEncoding;

		this.container.appendChild(this.renderer.domElement);
		// --------------------------------------------- Environments###

		// --------------------------------------------- Camera
		this.camera = new T.PerspectiveCamera(
			70,
			window.innerWidth / window.innerHeight,
			0.001,
			1000,
		);
		this.camera.position.set(0, 0, 2);

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
		this.addLights();
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
	}

	addLights() {
		const a1 = new T.AmbientLight(0xfffffff, 0.2);

		const l1 = new T.PointLight(0xff0000, 2);
		const l2 = new T.PointLight(0x021bd9, 2);

		l1.position.set(-12, 0, 12);
		l2.position.set(12, 0, 12);

		const h1 = new T.PointLightHelper(l1);
		const h2 = new T.PointLightHelper(l2);

		this.scene.add(l2, l1, h1, h2, a1);
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
		const loader = new OBJLoader();

		const OBJ = new Promise((resolve, reject) => {
			loader.load(
				'./obj.obj',
				(data) => {
					this.obj = data;
					resolve();
				},
				() => {},
				(err) => {
					console.log(err);
					reject();
				},
			);
		});

		return Promise.all([OBJ]);
	}

	setMaterials() {
		this.material = new T.MeshPhysicalMaterial({
			metalness: 0,
			roughness: 1,
			envMapIntensity: 0.9,
			clearcoat: 1,
			transparent: true,
			transmission: 0.95,
			opacity: 0.5,
			reflectivity: 0.2,
			side: T.DoubleSide,
		});
	}

	setGeometries() {
		this.geometry = new T.PlaneGeometry(1, 1, 1, 1);
	}

	addObjects() {
		// this.setGeometries();
		this.setMaterials();

		// this.plane = new T.Mesh(this.geometry, this.material);
		// eslint-disable-next-line prefer-destructuring
		this.mesh = this.obj.children[0];

		this.mesh.material = this.material;
		// this.obj.children[0].material.opacity = 0.2;
		// this.obj.children[0].material.transparent = true;

		this.scene.add(this.obj);
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
		// this.time += 0.05;
		// this.material.uniforms.time.value = this.time;
		window.requestAnimationFrame(this.render.bind(this));
		this.renderer.render(this.scene, this.camera);
	}
}
