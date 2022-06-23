import React from 'react';

function Login() {
	return (
		<button className="i42-button" onClick={() => window.open(`https://api.intra.42.fr/oauth/authorize?client_id=a01408a8db08e01f6d1fcfddca9b393eb7dcce3bb4bd42222e8080d1e87c816d&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Flogin&response_type=code`, '_self')}>
							<img className="i42-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/langfr-280px-42_Logo.svg.png" alt="" />
							Connect with 42
		</button>
	)
}

export default Login;
