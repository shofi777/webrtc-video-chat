import {
	getCallSettings,
} from './template-util.js'

export function getIceServers() {
	let iceServers = []
	let callSettings = getCallSettings()

	if (callSettings.stunServer) {
		iceServers.push({ urls: callSettings.stunServer })
	}

	if (callSettings.turnServer) {
		iceServers.push({
			urls: callSettings.turnServer,
			credentialType: 'password',
			username: callSettings.turnUserName,
			password: callSettings.turnPassword
		})
	}

	return iceServers
}
