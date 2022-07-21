import React from 'react';

function Login() {
	return (
		<button className="i42-button" onClick={() => window.open(`https://api.intra.42.fr/oauth/authorize?client_id=f4c0d93db7acf37cb140cce5da2617265ab63195b7a60bcd981003b3d289a413&redirect_uri=http%3A%2F%2F10.4.1.7%3A5000%2Fauth%2Flogin&response_type=code`, '_self')}>
							<img className="i42-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/langfr-280px-42_Logo.svg.png" alt="" />
							Connect with 42
		</button>
	)
}

export default Login;
