import axios from 'axios';

export default axios.create({
	baseURL: 'http://localhost:8080/3.00/',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})