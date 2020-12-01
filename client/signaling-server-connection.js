let signalingServer

export function getDefaultSignalingServer() {
	return `wss://${location.hostname}:8080`
}

export function connectToSignalingServer(serverUrl, messageHandlers) {
	return new Promise((resolve) => {
		signalingServer = new WebSocket(serverUrl, "json");

		signalingServer.onopen = () => {
			resolve()
			signalingServer.onopen = undefined
		}

		signalingServer.onmessage = (event) => {
			let message = JSON.parse(event.data);
			let messageHandler = messageHandlers[message.type]
	
			if (messageHandler) {
				messageHandler(message)
			}
		};
	})
}

export function sendSignalMessage(message) {
	signalingServer.send(JSON.stringify(message))
}