import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'
import easingDict from "../easings.js"
import { participants } from "../../models/components/avatar.js"
import { noParticipants } from "../../scene/settings.js"

window.beginRandomSwaying = beginRandomSwaying
export default function beginRandomSwaying() {
	for (let par=0; par<noParticipants; par++) {
		randomSway(par);
		randomNeckTurn(par);
	}
}

function randomSway(who, direction=1) {
	let randomDuration = 2000 + Math.random()*5000;
	let randomRotation = Math.random()*0.025 * direction;
	if (participants[who].states.speaking) {
		randomDuration /= 2;
		randomRotation *= 2;
	}
	participants[who].sway = new TWEEN.Tween(participants[who].movableBodyParts.spine.rotation).to({z: randomRotation}, randomDuration)
		.easing(easingDict["cubicInOut"])
		.start()
	participants[who].sway.onComplete( function() {
		randomSway(who, direction*=-1)
	})
}

function randomNeckTurn(who, direction=1) {
	let randomDuration = 2000 + Math.random()*5000;
	let randomRotation = Math.random()*0.075 * direction;
	if (participants[who].states.speaking) {
		randomDuration /= 2;
		randomRotation *= 2;
	}
	participants[who].neckTurn = new TWEEN.Tween(participants[who].movableBodyParts.neck.rotation).to({y: randomRotation}, randomDuration)
		.easing(easingDict["cubicInOut"])
		.start()
	participants[who].neckTurn.onUpdate(function (object) {
		if ( participants[who].states.focalPoint !== undefined ) {
			participants[who].movableBodyParts.leftEye.lookAt(participants[who].states.focalPoint)
			participants[who].movableBodyParts.rightEye.lookAt(participants[who].states.focalPoint)
		}
	})
	participants[who].neckTurn.onComplete( function() {
		randomNeckTurn(who, direction*=-1)
	})
}

